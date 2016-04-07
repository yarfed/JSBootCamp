/**
 * Created by User on 03.04.2016.
 */
(function () {
    "use strict";
    function DataService(viewService, $q, $http) {
        this.nextId = 0;
        this.items = [];
        this.itemsIndex = {};
        this.root = new Group("root group");
        this.addItem(this.root);
        viewService.currentItem = this.root;
        viewService.breadCrumbs.push(this.root);
        this.$q = $q;
        this.$http = $http;
    }

    DataService.prototype.getDataIndex = function (data) {
        var result = {};
        data.forEach(function (item) {
            result[item.id] = item;
        });
        return result;
    };

    DataService.prototype.getItems = function (item) {
        var result = [];
        var self = this;
        var deferred = self.$q.defer();
        self.sync().then(function () {
            self.items.forEach(function (current) {
                if (current.parentId == item.id) {
                    result.push(current);
                }
            });
            deferred.resolve(result);
        },function () {
           alert("LOCAL!");
            self.items.forEach(function (current) {
                if (current.parentId == item.id) {
                    result.push(current);
                }
            });

            deferred.resolve(result);
        });
        return deferred.promise;
    };

    DataService.prototype.sync = function () {
        var self = this;
        return self.$http({method: 'get', url: 'data.json'}).success(function (data, status, headers, config) {
            self.items = data;
        });
    };

    DataService.prototype.search = function (request) {
        var result = [];
        var self = this;
        var req = request.toLowerCase();
        self.items.forEach(function (current) {

            if (current.type == 'group' && current.name.toLowerCase() == req) {
                result.push(current);
            }
            if (current.type == 'contact' &&
                (current.firstName.toLowerCase() == req || current.lastName.toLowerCase() == req)) {
                result.push(current);
            }
        });
        return result;
    };

    DataService.prototype.addItem = function (item) {

        var self = this;
        if (!item.id) {
            item.id = self.nextId++;
            self.items.push(item);
        } else {
            self.items.forEach(function (oldItem, i) {
                if (item.id == oldItem.id) {
                    self.items.splice(i, 1, item);
                }
            });
        }
        this.itemsIndex[item.id] = item;
    };

    DataService.prototype.deleteItem = function (item) {
        var self = this;
        var childrens = self.getChildrens(item);
        childrens.forEach(function (item) {
            self.deleteItem(item);
        });
        delete self.itemsIndex[item.id];
        var index = self.items.indexOf(item);
        self.items.splice(index, 1);
    };

    DataService.prototype.getChildrens = function (item) {
        var result = [];
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].parentId == item.id) {
                result.push(this.items[i]);
            }
        }
        return result;
    };

    DataService.prototype.isHerit = function (herit, parent) {
        var result = false;
        while (herit.parentId) {
            if (herit.id == parent.id) {
                result = true;
            }
            herit = this.itemsIndex[herit.parentId];
        }
        return result;
    };

    angular.module("myApp").service('dataService', DataService);
})();
