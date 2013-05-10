/*! lazy define js/AppController.js */
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

/*! lazy define js/AppModel.js */
!function(window){
    'use strict';

    window.AppModel = function(){
        this.sum = 0;

        for(var i = 0; i < arguments.length; i++){
            this.sum += arguments[i];
        }
    };
}(window);

/*! lazy define js/app.js */
/*! lazy require js/AppController.js */
!function(window){
    'use strict';

    var controller = new window.AppController();
    controller.sayHello();
}(window);