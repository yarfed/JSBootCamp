/**
 * Created by User on 13.04.2016.
 */
(function () {
    'use strict';
    function myController(colorService) {
        console.log(colorService.getColor());
    }

    angular.module('myApp').controller('myController', myController);
})();
