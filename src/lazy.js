!function(window,document){
    'use strict';

    var debug = function(){
        if(debug.enabled){
            console.log.apply(console, arguments);
        }
    };
    debug.enabled = false;

    var lazyjs = {
        ajaxGet: function(url, done){
            var xhr;

            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.open('GET', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(null);
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4) {
                    done(xhr, xhr.responseText);
                }
            };
        },
        debug: debug
    };

    window.lazyjs = lazyjs;
}(window,document);