$(function () {
    var image = $('#image')
    var options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    image.cropper(options)
    $('#selectImg').click(function () {
        $('#file').click()
    })
    var layer = layui.layer;
    $('#file').on('change', function (e) {
        console.log(e.target.files[0]);
        var filelist = e.target.files
        if (filelist.length == 0) {
            return layer.msg('请选择图片')
        }
        var file = filelist[0]
        var url = URL.createObjectURL(file)
        // image.cropper('destroy')
        // image.attr('src',url)
        // image.cropper(options)
        image.cropper('replace', url)
    })
    $('#btnUpload').click(function () {
        var dataUrl = image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')
        console.log(dataUrl);
        $.ajax({
            method: 'patch',
            url: '/my/update/avatar',
            data: {
                avatar: dataUrl
            },
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('更新头像失败')
                }
                layer.msg('更新头像成功')
                window.parent.getUserInfo()
            }
        })
    })
})