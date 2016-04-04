/**
 * Created by User on 03.04.2016.
 */
(function () {
    function NavigationController(ViewService) {
        this.viewService = ViewService;
    }

    angular.module("myApp").controller("NavigationController", NavigationController);
})();
