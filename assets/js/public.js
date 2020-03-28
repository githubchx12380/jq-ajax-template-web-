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

    (function () {
     
      $('.default li a').each((index,item) => {
          if($(item).text() == $('.hidden-content h4').text()){
              $(item).addClass('borderactive').siblings().removeClass('borderactive')
              $('.navbar-nav span').css('left',$(index)[0] * $(item).outerWidth() + 'px')
              
          }
      })
    })()
})