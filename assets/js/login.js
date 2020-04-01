$(function () {
    let uPattern = /^[a-zA-Z0-9_-]{6,16}$/;
    let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/;
   
    $('.ipt').on('click',function (e) {
        if(!uPattern.test($('.username').val())){
            e.preventDefault()
            $('.hint').show().text('用户名格式为:4到16位（字母，数字，下划线，减号）')
            setTimeout(() => {
                $('.hint').hide()
            },3000)
            return
        }
        if(!pPattern.test($('.password').val())){
            e.preventDefault()
            $('.hint').show().text('密码格式为:最少6位,包含数字和字母')
            setTimeout(() => {
                $('.hint').hide()
            },3000)
            return
        }
        e.preventDefault()
        let username = $('.username').val()
        let password = $('.password').val()
        $.ajax({
            type:'post',
            url:'http://localhost/userlogin',
            data:{username,password},
            dataType:'json',
            success:function(res) {
                if(res.code == 200){
                localStorage.setItem('newtoken',res.token)
                window.open('http://localhost/category/1','_self')
                }else{
                $('.hint').show().text(res.msg)
                setTimeout(() => {
                    $('.hint').hide()
                },3000)
                }
            }
        })
    })
})