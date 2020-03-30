$(function () {
   
    (function () {
        //nav开局调用获取宽度
        $('.navbar-nav span').css('width',$('.navbar-nav li')[0].offsetWidth)
        //mouseover改变动画
        $('.navbar-nav').on('mouseover','li',function () {
            let index = $(this).index()
            $('.navbar-nav span').stop().animate({
                left:$(this).outerWidth() * index,
                width:$(this).outerWidth() + 'px'
            },100)
        })
        $(document).on('scroll',function () {
            if($(document).scrollTop() > 300){
                $('.navdisplay').fadeIn()
            }else{
                $('.navdisplay').fadeOut()
            }
        })
    })();

    //导航底部动画完成
    (function () {
      $('.default li a').each((index,item) => {
          if($(item).text() == $('.hidden-content h4').text()){
              $(item).addClass('borderactive').siblings().removeClass('borderactive')
              $('.navbar-nav span').css('left',$(index)[0] * $(item).outerWidth() + 'px')
          }
      })
      $('.default li a').on('mouseover',function(){
        $('.navbar-nav span').show()
      })
      $('.default li a').on('mouseout',function () {
        $('.default .navbar-nav span').hide()
      })
    })();

    //模糊搜索
    (function () {
        //得到焦点,如果表单有val,显示,渲染数据
        $('.formdata .ipt').on('focus',function () {
            if($(this).val() != ''){
                $('.seekresult').slideDown()
            }
        })
        //失去焦点,隐藏
        $('.formdata .ipt').on('blur',function () {
                setTimeout(() => {
                    $('.seekresult').slideUp()
                },100)
        })
        //进入详情页,text清空
        $('.seekresult').on('click','a',function () {
            $('.formdata .ipt').val('')
            $('.seekresult').hide()
        })
        //搜索防抖
        function deseek() {
            $.ajax({
                type:'post',
                url:'http://localhost/seek',
                dataType:'json',
                data:$('.formdata').serialize(),
                success:function (res) {
                    let html = template('norTemplate',{res})
                    if(res.length){
                        $('.seekresult').show()
                    }
                    $('.seekresult ul').html(html)
                }
            })
        }
        const hiddenFun = (fun,time) => {
            let timeout = null;
            return () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                fun()
            },time)
        }
        }
        $('.formdata .ipt').on('input',hiddenFun(deseek,400))
    })();
    
    //翻页
    (function () {
        let iid = location.pathname.replace('/category/','')
       
        let num;
        if(!parseInt(location.search.replace('?page=','')) || parseInt(location.search.replace('?page=','')) < 3){
            num = 3
        }else{
            
            num = parseInt(location.search.replace('?page=',''))
        }
        $.ajax({
            type:'get',
            url:'http://localhost/pagelength',
            data:{iid},
            dataType:'json',
            success: async function  (res) {
                const len = res.len
                   max = Math.ceil(len / 20)
                   initpage(max);
            }
        })
        let arr;
        function initpage(max) {
            if(num > max - 2){
                num = max - 2
            }
             arr = [num - 2,num - 1,num,parseInt(num) + 1,parseInt(num) + 2]
             let html = template('categorypage',{arr})
             $('.pagination').html(html)
        }
        initpage()
    })();


    //获取用户数据
    (function () {
        if(localStorage.getItem('newtoken')){
            $.ajax({
                type:'get',
                url:'http://localhost/web/user/info',
                dataType:'json',
                success:function (res) {
                    let html = template('userinfo',res)
                    $('.userinfo').html(html)
                }
            })
        }
    })()
})

