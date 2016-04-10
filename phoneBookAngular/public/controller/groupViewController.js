/**
 * Created by User on 05.04.2016.
 */
(function () {
    "use strict";
    function GroupViewController(viewService, dataService, $scope) {
        var self = this;
        this.viewService = viewService;
        this.dataService = dataService;
        this.items = [];
        this.request = null;

        $scope.$on("showCurrentGroup", function () {
            self.showGroup(viewService.currentGroup);
        });

        $scope.$on("search", function (event, request) {
            self.search(request)
        });

        console.log('ctrl init');
    }

    GroupViewController.prototype.breadCrumbs = function () {
        var group = this.viewService.currentGroup;
        this.viewService.breadCrumbs = [];
        while (group) {
            this.viewService.breadCrumbs.push(group);
            group = this.dataService.getItem(group.parentId);
        }
        this.viewService.breadCrumbs.reverse();
    };

    GroupViewController.prototype.search = function (request) {
        this.items = this.dataService.search(request);
        this.request = request;
        this.viewService.currentView = "search";
    };

    GroupViewController.prototype.showContact = function (contact) {
        this.viewService.contact = angular.copy(contact);
        this.viewService.currentView = "contact";
    };

    GroupViewController.prototype.showGroup = function (group) {
        this.items = this.dataService.getChilds(group);
        this.viewService.currentView = "group";
        this.viewService.currentGroup = group;
        this.breadCrumbs();
    };

    GroupViewController.prototype.deleteItem = function (item) {
        var self = this;
        this.dataService.deleteItem(item).then(function () {
            self.showGroup(self.viewService.currentGroup);
        });
    };

    GroupViewController.prototype.submitGroup = function (e) {
        e.preventDefault();
        var self = this;
        this.viewService.group.parentId = this.viewService.currentGroup.id;
        this.dataService.addItem(this.viewService.group).then(function () {
            self.showGroup(self.viewService.currentGroup);
        });
    };

    GroupViewController.prototype.submitContact = function (e) {
        e.preventDefault();
        var self = this;
        if (this.viewService.contact.parentId == null) {
            this.viewService.contact.parentId = this.viewService.currentGroup.id;
        }

        this.dataService.addItem(self.viewService.contact).then(function () {
            self.showGroup(self.viewService.currentGroup);
        });
    };

    GroupViewController.prototype.addTel = function () {
        this.viewService.contact.phones.push(null);
    };

    GroupViewController.prototype.removeTel = function () {
        if (this.viewService.contact.phones.length > 1) {
            this.viewService.contact.phones.pop();
        }
    };


    angular.module("myApp").controller("groupViewController", GroupViewController);
})();
