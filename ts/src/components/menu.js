"use strict";
/**
 * Created by User on 17.04.2016.
 */
require('./search');
var appModule_1 = require("../appModule");
var MenuComponent = (function () {
    function MenuComponent($location, $route, dataService) {
        this.$location = $location;
        this.$route = $route;
        this.dataService = dataService;
    }
    MenuComponent.prototype.up = function () {
        var self = this;
        var id = this.$route.current.params.id;
        var contactId = this.$route.current.params.contactId;
        var request = this.$route.current.params.request;
        if (request) {
            if (contactId) {
                self.$location.url('group/' + id + '/contact/' + contactId);
                return;
            }
            else {
                self.$location.url('group/' + id);
                return;
            }
        }
        if (contactId) {
            self.$location.url('group/' + id);
            return;
        }
        if (id != 0) {
            self.dataService.getItem(id).then(function (res) {
                self.$location.url('group/' + res.data.parentId);
            });
        }
    };
    MenuComponent.prototype.addContact = function () {
        var id = this.$route.current.params.id;
        var contactId = this.$route.current.params.contactId;
        if (id && !contactId) {
            this.$location.url('group/' + id + '/contact');
        }
    };
    MenuComponent.prototype.addGroup = function () {
        var id = this.$route.current.params.id;
        var contactId = this.$route.current.params.contactId;
        if (id && !contactId) {
            this.$location.url('group/' + id + '/group');
        }
    };
    return MenuComponent;
}());
appModule_1.appModule.component('menu', {
    controller: MenuComponent,
    template: require('components/menu.html!text'),
    styles: require('components/menu.css!css')
});
//# sourceMappingURL=menu.js.map