/*! lazy require js/AppModel.js */

!function(window){
    'use strict';

    window.AppController = function(){
        this.sayHello = function(){
            var cost = new AppModel(1, 5).sum;
            console.log('1 + 5: ' + cost);
        };
    };
}(window);