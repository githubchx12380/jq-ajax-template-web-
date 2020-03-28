$(function () {
    $('.default li a').each((index,item) => {
        if($(item).text() == $('.date .flcate').text()){
            $(item).addClass('borderactive')
            console.log($(item).outerWidth(),$(index)[0]);
            
            $('.navbar-nav span').css('left',$(index)[0] * $(item).outerWidth() + 'px')
        }
    })
})