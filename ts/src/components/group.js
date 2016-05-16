"use strict";
/**
 * Created by User on 20.04.2016.
 */
var appModule_1 = require("../appModule");
var GroupComponent = (function () {
    function GroupComponent(dataService, $location, $route) {
        this.dataService = dataService;
        this.$location = $location;
        this.$route = $route;
    }
    GroupComponent.prototype.showContact = function (contact) {
        this.$location.url('group/' + contact.parentId + '/contact/' + contact.id);
    };
    ;
    GroupComponent.prototype.showGroup = function (group) {
        this.$location.url('group/' + group.id);
    };
    ;
    GroupComponent.prototype.deleteItem = function (item) {
        var self = this;
        if (window.confirm('Sure?')) {
            this.dataService.deleteItem(item).then(function () {
                self.$route.reload();
            });
        }
    };
    ;
    return GroupComponent;
}());
appModule_1.appModule.component('group', {
    controller: GroupComponent,
    template: require('components/group.html!text'),
    styles: require('components/group.css!css'),
    bindings: {
        group: '<',
        items: '<'
    }
});
//# sourceMappingURL=group.js.map