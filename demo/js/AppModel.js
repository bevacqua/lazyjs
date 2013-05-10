!function(window){
    'use strict';

    window.AppModel = function(){
        this.sum = 0;

        for(var i = 0; i < arguments.length; i++){
            this.sum += arguments[i];
        }
    };
}(window);