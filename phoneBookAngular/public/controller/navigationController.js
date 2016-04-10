/**
 * Created by User on 03.04.2016.
 */
(function () {
    "use strict";
    function NavigationController(viewService, dataService, $rootScope) {
        this.viewService = viewService;
        this.dataService = dataService;
        this.scope = $rootScope;
        this.request = null;
    }

    NavigationController.prototype.upHandler = function () {
        var currentView = this.viewService.currentView;
        var currentGroup = this.viewService.currentGroup;

        if (currentView == 'addGroup' || currentView == 'addContact') {
            console.log("not allow");
            return;
        }

        if (currentView == 'group' && currentGroup.id == 0) {
            console.log("top level");
            return;
        }

        if (currentView =='group') {
            this.viewService.currentGroup = this.dataService.getItem(currentGroup.parentId);
        }

        if (currentView =='contact') {
            this.viewService.currentGroup = this.dataService.getItem(this.viewService.contact.parentId);
        }

        this.scope.$broadcast("showCurrentGroup");
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
