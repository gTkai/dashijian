$(function () {
    var form = layui.form

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6位之间'
            }
        }
    });
    var layer = layui.layer;
    getUserInfo()
    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('获取用户信息错误')
                }
                form.val('getUserInfo',res.data)
            }
        })
    }
    $('#btnreset').click(function(e){
        e.preventDefault()
        getUserInfo()
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'put',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if (res.code !=0) {
                    return layer.msg('更新信息失败')
                }
                layer.msg('修改成功')
                window.parent.getUserInfo()
            }
        })
    })
})