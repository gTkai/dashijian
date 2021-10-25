$(function () {
    $('#link_reg').click(function () {
        $('.reg-box').show()
        $('.login-box').hide()

    })
    $('#link_login').click(function () {
        $('.login-box').show()
        $('.reg-box').hide()

    })
    var form = layui.form
   
    form.verify({
        regpwd: [
            /^\S{6,15}$/,
            '密码长度必须是6~15位字符串'
        ],
        samepwd: function (value, itme) {
            if (value != $('#password').val()) {
                return '两次打印不一样'
            }
        }
    });
    var layer = layui.layer;
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data={
            username:$('#form_reg input[name=username]').val(),
            password:$('#form_reg input[name=password]').val(),
            repassword:$('#form_reg input[name=repassword]').val(),

        }
        $.post('/api/reg',data,function(res){
            console.log(res);
            if (res.code!=0) {
               return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录');
            $('#link_login').click()
        })
    })
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if (res.code!=0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                localStorage.setItem('token',res.token)
                location.href='./index.html'
            }
        })
    })
})