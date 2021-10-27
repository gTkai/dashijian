$(function () {
    var layer = layui.layer;
    getUserInfo()


    $('#logoutbtn').click(function () {
        layer.confirm('确认退出登录？', { icon: 3, title: '提示' },
            function (index, layero) {
                localStorage.removeItem('token')
                location.href = 'login.html'
                layer.close(index)
            })
    })

})
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.code != 0) {
                return layer.msg('获取用户信息错误')
            }
            renderAvatar(res.data)
        },
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎' + name)
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').show()
        $('.text-avatar').text(name[0].toUpperCase())
    }
}