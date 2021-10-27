$(function () {
    var form = layui.form
    var layer = layui.layer;
    form.verify({
        regpwd: [
            /^\S{6,15}$/,
            '密码长度必须是6~15位字符串'
        ],
        userpwd: function (value, itme) {
            if (value != $('#old').val()) {
                return '旧密码不能一致'
            }
        },
        samepwd: function (value, itme) {
            if (value != $('#password').val()) {
                return '两次密码不一样'
            }
        }
    });
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'/my/updatepwd',
            type:'PATCH',
            data:$(this).serialize(),
            success:function(res){
                if (res.code !=0) {
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})
