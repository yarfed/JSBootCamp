"use strict";
/**
 * Created by User on 20.04.2016.
 */
/**
 * Created by User on 03.04.2016.
 */
var appModule_1 = require("../appModule");
var DataService = (function () {
    function DataService($http) {
        this.$http = $http;
    }
    DataService.prototype.getItem = function (id) {
        return this.$http({ method: 'get', url: 'api/items/' + id });
    };
    ;
    DataService.prototype.getChilds = function (id) {
        return this.$http({ method: 'get', url: 'api/items/' + id + '/items' });
    };
    ;
    DataService.prototype.getAll = function () {
        return this.$http({ method: 'get', url: 'api/items' });
    };
    ;
    DataService.prototype.search = function (request) {
        return this.$http({ method: 'get', url: 'api/search/' + request });
    };
    ;
    DataService.prototype.addItem = function (item) {
        return this.$http({ method: 'post', url: 'api/items/', data: item });
    };
    ;
    DataService.prototype.deleteItem = function (item) {
        return this.$http({ method: 'delete', url: 'api/items/' + item.id });
    };
    ;
    return DataService;
}());
appModule_1.appModule.service('dataService', DataService);
//# sourceMappingURL=dataService.js.map