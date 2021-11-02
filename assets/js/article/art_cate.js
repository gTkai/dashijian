$(function () {
    // /my/cate/list
    var layer = layui.layer;
    getCateList()
    function getCateList() {
        $.get('/my/cate/list', function (res) {
            if (res.code != 0) {
                return layer.msg('获取分类列表失败')
            }
            var strHTMl = template('tpl-table', res)
            $('tbody').html(strHTMl)
        })
    }

    var index = null

    $('#btnAddCate').click(function () {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#dialog-add').html()
        });
    })

    // /my/cate/add
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/cate/add',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('添加文章分类失败')
                }
                layer.close(index)
                getCateList()
            }
        })
    })
    var form = layui.form
    var indexEdit = null
    $('body').on('click', '#btn-edit', function () {
        var id = $(this).attr('data-id')
        if (id == 1 || id == 2) {
            return layer.msg('不能修改', { icon: 0 })
        }
        $.ajax({
            type: 'get',
            url: '/my/cate/info?id=' + id,
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('获取分类信息失败')
                }
                form.val('form-edit', res.data)
            }
        })
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            , content: $('#dialog-edit').html()
        });
    })

    $('body').on('submit', '#form-edit', function (e) {
        console.log(123);
        e.preventDefault()
        $.ajax({
            url: '/my/cate/info',
            method: 'put',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('添加文章分类失败')
                }
                layer.close(indexEdit)
                getCateList()
            }
        })
    })
    $('body').on('click', '#btn-delete', function () {
        var id = $(this).attr('data-id')
        if (id == 1 || id == 2) {
            return layer.msg('不能删除', { icon: 0 })
        }
        layer.confirm('确认删除吗？', { icon: 3, title: '提示' },
            function (index, layero) {
              $.ajax({
                  type:'DELETE',
                  url:'/my/cate/del?id='+id,
                  success:function(res){
                      if (res.code !=0) {
                          return layer.msg('删除分类失败')
                      }
                      layer.msg('删除分类成功',{icon:1})
                      getCateList()
                  }
              })
            })
    })
})