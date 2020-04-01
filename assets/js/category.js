$(function () {

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
})