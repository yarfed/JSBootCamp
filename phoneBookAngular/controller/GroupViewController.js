/**
 * Created by User on 05.04.2016.
 */
(function () {
    "use strict";
    function GroupViewController(viewService, dataService, $rootScope) {
        var self = this;
        this.viewService = viewService;
        this.dataService = dataService;
        this.items = [];
        this.showItem(viewService.currentItem);
        $rootScope.$on("up", function () {
            self.showItem(self.viewService.currentItem)
        });
        $rootScope.$on("search", function (event, request) {
            var parentId;
            if (self.viewService.currentItem.type == 'search') {
                parentId = self.viewService.currentItem.parentId;
            } else {
                parentId = self.viewService.currentItem.id;
            }
            self.showItem(new Search(request, parentId));
        })
    }

    GroupViewController.prototype.showItem = function (item) {
        var self = this;
        if (item.type == 'contact') {
            this.viewService.contact = angular.copy(item);
            this.viewService.currentView = "contact";
        }
        if (item.type == 'group') {
            this.dataService.getItems(item).then(function (data) {
                self.items = data;
            });
            this.viewService.currentView = "group";
        }
        if (item.type == 'search') {
            this.items = this.dataService.search(item.request);
            this.viewService.currentView = "search";
        }
        this.viewService.currentItem = item;
    };

    GroupViewController.prototype.deleteItem = function (item) {
        var self = this;
        this.dataService.deleteItem(item);
        this.showItem(this.viewService.currentItem);
    };

    GroupViewController.prototype.submitGroup = function (e) {
        e.preventDefault();
        this.viewService.group.parentId = this.viewService.currentItem.id;
        this.dataService.addItem(this.viewService.group);
        this.showItem(this.viewService.currentItem);
    };

    GroupViewController.prototype.submitContact = function (e) {
        e.preventDefault();
        if (this.viewService.contact.parentId == null) {
            this.viewService.contact.parentId = this.viewService.currentItem.id;
        }
        if (this.viewService.currentView == 'contact') {
            this.viewService.currentItem = this.dataService.itemsIndex[this.viewService.currentItem.parentId];
        }
        this.dataService.addItem(this.viewService.contact);
        this.showItem(this.viewService.currentItem);
    };

    GroupViewController.prototype.addTel = function () {
        this.viewService.contact.phones.push(null);
    };

    GroupViewController.prototype.removeTel = function () {
        if (this.viewService.contact.phones.length > 1) {
            this.viewService.contact.phones.pop();
        }
    };

    GroupViewController.prototype.cancel = function () {
        if (this.viewService.currentView == 'contact') {
            this.viewService.currentItem = this.dataService.itemsIndex[this.viewService.currentItem.parentId];
        }
        this.viewService.currentView = "group";
    };

    angular.module("myApp").controller("groupViewController", GroupViewController);
})();
