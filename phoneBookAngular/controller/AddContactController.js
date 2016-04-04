/**
 * Created by User on 04.04.2016.
 */
(function () {
    function AddContactController(ViewService) {
        this.viewService = ViewService;
        this.telephones=new Array(1);


    }
    AddContactController.prototype.submit=function(e){
        e.preventDefault();
        alert(this.telephones[0]);
    };

    AddContactController.prototype.addTel=function(){
        this.telephones.push(null);
    };

    AddContactController.prototype.removeTel=function(){
        if(this.telephones.length>1){
            this.telephones.pop();
        }
    };
    angular.module("myApp").controller("AddContactController", AddContactController);
})();