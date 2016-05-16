"use strict";
/**
 * Created by User on 21.04.2016.
 */
var appModule_1 = require("../appModule");
var AddGroupComponent = (function () {
    function AddGroupComponent(dataService, $location, $route) {
        this.dataService = dataService;
        this.$location = $location;
        this.$route = $route;
    }
    AddGroupComponent.prototype.submit = function (e) {
        var self = this;
        self.dataService.addItem(self.group).then(function () {
            var id = self.$route.current.params.id;
            self.$location.url('group/' + id);
        });
        e.preventDefault();
    };
    AddGroupComponent.prototype.cancel = function () {
        var id = this.$route.current.params.id;
        this.$location.url('group/' + id);
    };
    return AddGroupComponent;
}());
appModule_1.appModule.component('addGroup', {
    controller: AddGroupComponent,
    template: require('components/addGroup.html!text'),
    styles: require('components/addGroup.css!css'),
    bindings: {
        group: '<',
    }
});
//# sourceMappingURL=addGroup.js.map