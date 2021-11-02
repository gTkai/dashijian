$(function(){
    var form = layui.form
    var layer = layui.layer;
    getCateList()
    function getCateList() {
        $.get('/my/cate/list', function (res) {
            if (res.code != 0) {
                return layer.msg('获取分类列表失败')
            }
            var strHTMl = template('tpl-case', res)
            $('select[name=cate_id]').html(strHTMl)
            form.render()
        })
    }
    initEditor() 
    $('#chooseImage').click(function(){
        // console.log(111);
        $('#coverFile').click()
    })
    $('#coverFile').on('change',function(e){
        var files=e.target.files;
        if (files.length==0) {
            return layer.msg('请选择图片')
        }
        var reader=new FileReader()
        reader.onload=function(event){
            $('.cover-img img').attr('src',event.target.result)
        }
        reader.readAsDataURL(files[0])
    })
    var state='已发布'
    $('#form-draft').click(function(){
        state='草稿'
    })
    $('#form-pub').on('submit',function(e){
        e.preventDefault()
        var fd=new FormData($(this)[0])
        fd.append('state',state)
        if ( $('#coverFile')[0].files.length===0) {
            return layer.msg('请选择图片')
        }
        fd.append('cover_img', $('#coverFile')[0].files[0])
        $.ajax({
            type:'post',
            url:'/my/article/add',
            data:fd,
            contentType:false,
            processData:false,
            success:function(res){
                if (res.code !=0) {
                    return layer.msg('添加文章失败')
                }
                 layer.msg('发布文章成功')
                 location.href='art_list.html'
            }
        })
    })
})