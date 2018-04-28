//get请求 url 回调函数

function ajaxGet(url, call) {
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        dataType:'json',
        success:function (data) {
            console.info(data);
            call(data);
        },
        error:function (err) {
            console.info(err);
        }
    })
}


//post请求
function ajaxPost(url,data,call) {
    $.ajax({
        url:url,
        type:'POST',
        async:false,
        data:data,
        dataType:'json',
        cache: false,
        processData: false,
        contentType: false,
        success:function (data) {
            console.info(data);
            call(data);
        },
        error:function (err) {
            console.info(err);
        }

    })
}