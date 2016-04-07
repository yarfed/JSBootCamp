/**
 * Created by User on 03.04.2016.
 */
(function () {
    "use strict";
    function NavigationController(viewService, dataService,$rootScope) {
        this.viewService = viewService;
        this.dataService = dataService;
        this.scope=$rootScope;
        this.request=null;
    }

    NavigationController.prototype.upHandler = function () {
        var currentView = this.viewService.currentView;
        var currentItem = this.viewService.currentItem;

        if (currentView == 'addGroup' ||
            currentView == 'addContact' ||
            currentItem.id == 0) {
            console.log("not allow");
            return;
        }

        this.viewService.currentItem = this.dataService.itemsIndex[currentItem.parentId];
        this.viewService.currentView = this.viewService.currentItem.type;
        this.scope.$emit("up");
    };

    NavigationController.prototype.addGroup = function () {
        var currentView = this.viewService.currentView;
        if (currentView == "contact" || currentView == "search") {
            console.log("not allow");
            return;
        }
        this.viewService.group = new Group();
        this.viewService.currentView = "addGroup";
    };

    NavigationController.prototype.addContact = function () {
        var currentView = this.viewService.currentView;
        if (currentView == "contact" || currentView == "search") {
            console.log("not allow");
            return;
        }
        this.viewService.contact = new Contact();
        this.viewService.currentView = "addContact";
    };

    angular.module("myApp").controller("navigationController", NavigationController);
})();
