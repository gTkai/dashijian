$(function () {
    var params = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    var layer = layui.layer;
    initTable()
    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: params,
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('获取文章数据失败')
                }
                var strHTMl = template('tpl-table', res)
                $('tbody').html(strHTMl)
                renderPage(res.total)
            }
        })
    }
    function renderPage(total) {
        console.log(total);
        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total,//数据总数，从服务端得到
            limit: params.pagesize,
            curr: params.pagenum,
            limits: [2, 5, 10, 15, 20],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数
                params.pagenum = obj.curr
                params.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    initTable()
                }
            }

        });
    }
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        var len = $('.btn-delete').length
        layer.confirm('确认删除吗？', { icon: 3, title: '提示' },
            function (index, layero) {
                $.ajax({
                    type: 'DELETE',
                    url: '/my/article/info?id=' + id,
                    success: function (res) {
                        if (res.code != 0) {
                            return layer.msg('删除分类失败')
                        }
                        layer.msg('删除分类成功', { icon: 1 })
                        if (len === 1) {
                            params.pagenum = params.pagenum === 1 ? 1 : params.pagenum - 1
                        }
                        initTable()
                    }

                })
                layer.close(index)
            })
    })

    template.defaults.imports.dateFormat = function (data) {
        var dt = new Date(data)
        var y = dt.getFullYear()
        var m = dt.getMonth() + 1
        var d = dt.getDate()
        var hh = dt.getHours()
        var mm = dt.getMinutes()
        var ss = dt.getSeconds()
        return y + '-' + addZero(m) + '-' + addZero(d) + ' ' + addZero(hh) + ':' + addZero(mm) + ':' + addZero(ss)
    }
    function addZero(n) {
        return n < 10 ? '0' + n : n
    }
    $('body').on('click', 'td a', function () {
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/info',
            data: {
                id: id
            },
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('获取详情信息失败')
                }
                var strHtml = template('tpl-detail', res)
                layer.open({
                    type: 1,
                    area: ['85%', '85%'],
                    title: '预览文章'
                    , content: strHtml
                });
            }
        })
    })
    var form = layui.form
    getCateList()
    function getCateList() {
        $.get('/my/cate/list', function (res) {
            if (res.code != 0) {
                return layer.msg('获取分类列表失败')
            }
            var strHTMl = template('tpl-case', res)
            $('select[name=cate_name]').html(strHTMl)
            form.render()
        })
    }
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        params.cate_id = $('select[name=cate_name]').val()
        params.state = $('select[name=cate_statu]').val()
        initTable()
    })
    $('#form-search').on('reset', function (e) {
        params.cate_id = '',
            params.state = ''
        initTable()
    })
})