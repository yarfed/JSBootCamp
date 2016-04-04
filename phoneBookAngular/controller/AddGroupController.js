/**
 * Created by User on 03.04.2016.
 */
(function () {
    function AddGroupController(ViewService) {
        this.viewService = ViewService;
        this.name=null;
    }
    AddGroupController.prototype.submit=function(e){
        e.preventDefault();
        alert(this.name);
    };
    angular.module("myApp").controller("AddGroupController", AddGroupController);
})();