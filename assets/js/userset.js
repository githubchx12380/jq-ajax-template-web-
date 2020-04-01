$(function () {
    
    function init() {
        $.ajax({
            type:'get',
            url:'http://localhost/web/user/info', 
            dataType:'json',
            success:function (res) {
                $('.imgusername').text(res.data[0].username).attr('href',`http://localhost/usermain/${res.data[0].id}`)
                $('#imgfiles').attr('src',res.data[0].img)
                $('.btner').attr('data-id',res.data[0].id)
                $('.nickname').html(template('userset',res))
            }
        })
    }
    init()
    $('.unlogin').on('click','a',function () {
        localStorage.removeItem('newtoken')
        window.open('http://localhost/category/1','_self')
    })

    //头像上传
    $('.filename').on('change',function () {
        let myfile  = $('.filename')[0].files[0]
        let url = URL.createObjectURL(myfile)
        $('#imgfiles').attr('src',url)
        $('.filename').attr('name','img')
    })

    //发送表单数据
    $('.nickname').on('click','#btn',function () {
        let form = $('.box')[0]
        let formdata = new FormData(form)
        formdata.append('id',$(this).data('id'))
        $.ajax({
            type:'post',
            url:'http://localhost/userupdate',
            data:formdata,
            dataType:'json',
            processData:false,
            contentType:false,
            success:function (res) {
                if(res.code == 200){
                    window.location.href = '/category/1'
                }
            }
        })
    })

    //密码表单切换不同页面
    $('.btnyi').on('click',function () {
        $('.fileDiv').show()
        init()
    })
    $('.btner').on('click',function () {
        $('.nickname').html(template('passwordedit',{}))
        $('.fileDiv').hide()
    })
    $('.btnsan').on('click',function () {
        localStorage.removeItem('newtoken')    
        window.location.href = '/category/1'
    })

    $('.nickname').on('click','.btn-default-template',function () {  
        if($('#exampleInputPassword1').val() != $('#exampleInputPassword2').val()){
            $('.help-block').text('两次密码输入不一致')
            setTimeout(() => { $('.help-block').text('密码长度为6～16位')},3000)
            return
        }
        let form = $('.box')[0]
        let formdata = new FormData(form)
        formdata.append('id',$('.btner').data('id'))
        formdata.append('username',$('.imgusername').text())
        $.ajax({
            type:'post',
            url:'http://localhost/new/psd',
            dataType:'json',
            data:formdata,
            processData:false,
            contentType:false,
            success:function (res) {
               if(res.code == 200){
                   window.location.href = '/category/1'
               }
               $('.help-block').text('原' + res.msg)
               setTimeout(() => { $('.help-block').text('密码长度为6～16位')},3000)
            }
        })        
    })

    
})