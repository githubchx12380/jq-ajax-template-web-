$(function () {
    $('.default li a').each((index,item) => {
        if($(item).text() == $('.date .flcate').text()){
            $(item).addClass('borderactive')
            $('.navbar-nav span').css('left',$(index)[0] * $(item).outerWidth() + 'px')
        }
    })
})