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
    
    if(location.pathname.indexOf('seek') != -1){
        $('.pagination').hide()
    }
    if(!localStorage.getItem('newtoken')){
        $('.loginshide').css('color','#666')
        $('.signshide').css('color','#666')
    }
    //下拉菜单
    (function () {
        $('.users').on('mouseover','.usersId ',function () {
            $(this).find('em').css({
                transform:'rotate(180deg)',
                top:'35%',
                transition:'all 0.5s',
            })
           
        });
        $('.users').on('mouseout','.usersId ',function () {
            $(this).find('em').css({
                transform:'rotate(0deg)',
                top:'50%',
                transition:'all 0.5s',
            })
        });
        $('.userhover').hover(function () {
            if($(this).find('.loginshide').text() != '登录'){
                $('.downloads').stop().slideDown(200)
            }
        },function () {
            $('.downloads').stop().slideUp(200)
        });
    })();
    //获取用户数据
    (function () {
        if(localStorage.getItem('newtoken')){
            $.ajax({
                type:'get',
                url:'http://localhost/web/user/info',
                dataType:'json',
                success:function (res) {
                    $('.usermain a').attr('href',`http://localhost/usermain`)
                    $('.userset a').attr('href',`http://localhost/userset`)
                    $('.userinfo').html(template('userinfo',res))
                }
            })
        }
        $('.unlogin').on('click','a',function () {
            localStorage.removeItem('newtoken')
            window.open('http://localhost/category/1','_self')
        })
    })()
    });
  
   


