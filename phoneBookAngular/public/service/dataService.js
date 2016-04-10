/**
 * Created by User on 03.04.2016.
 */
(function () {
    "use strict";
    function DataService(viewService, $q, $http, $rootScope) {
        var self = this;
        this.$q = $q;
        this.$http = $http;
        this.viewService = viewService;
        this.$rootScope = $rootScope;
        this.getAll().then(setInitData,
            function () {
                self.init(new Group('root')).then(setInitData,
                    function () {
                        alert('cant read or create file, check permissions on folder');
                    });
            });

        function setInitData(res) {
            self.items = res.data;
            self.itemsIndex = self.getDataIndex(self.items);
            self.viewService.currentGroup = self.itemsIndex[0];
            self.$rootScope.$broadcast('showCurrentGroup');
        }
    }

    DataService.prototype.getDataIndex = function (data) {
        var result = {};
        data.forEach(function (item) {
            result[item.id] = item;
        });
        return result;
    };

    DataService.prototype.getItem = function (id) {

        if (id!=='undefined') {
            return this.itemsIndex[id];
        }
    };

    DataService.prototype.init = function (root) {
        var self = this;
        return self.$http({method: 'post', url: 'api/init', data: root});
    };

    DataService.prototype.getChilds = function (item) {
        var result = [];
        var self = this;
        self.items.forEach(function (current) {
            if (current.parentId == item.id) {
                result.push(current);
            }
        });
        return result;
    };

    DataService.prototype.getAll = function () {
        var self = this;
        return self.$http({method: 'get', url: 'api/items'});
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
            return self.$http({method: 'post', url: 'api/items/', data: item}).then(function (res) {
                var data = res.data;
                self.items.push(data);
                self.itemsIndex[data.id] = data;
            });

        } else {
            return self.$http({method: 'put', url: 'api/items/:' + item.id, data: item}).then(function () {
                self.items.forEach(function (oldItem, i) {
                    if (item.id == oldItem.id) {
                        self.items.splice(i, 1, item);
                    }
                });
                self.itemsIndex[item.id] = item;
            });
        }

    };

    DataService.prototype.deleteItem = function (item) {
        var self = this;
        var childs = self.getChilds(item);
        childs.forEach(function (item) {
            self.deleteItem(item);
        });
        delete self.itemsIndex[item.id];
        var index = self.items.indexOf(item);
        self.items.splice(index, 1);
    };


    angular.module("myApp").service('dataService', DataService);
})();
