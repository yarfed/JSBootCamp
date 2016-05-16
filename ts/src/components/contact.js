"use strict";
var appModule_1 = require("../appModule");
var ContactComponent = (function () {
    function ContactComponent(dataService, $location, $route) {
        this.dataService = dataService;
        this.$location = $location;
        this.$route = $route;
    }
    ContactComponent.prototype.addTel = function () {
        this.contact.phones.push(null);
    };
    ;
    ContactComponent.prototype.removeTel = function () {
        if (this.contact.phones.length > 1) {
            this.contact.phones.pop();
        }
    };
    ContactComponent.prototype.submit = function (e) {
        var self = this;
        self.dataService.addItem(self.contact).then(function () {
            var id = self.$route.current.params.id;
            self.$location.url('group/' + id);
        });
        e.preventDefault();
    };
    ContactComponent.prototype.cancel = function () {
        var id = this.$route.current.params.id;
        this.$location.url('group/' + id);
    };
    return ContactComponent;
}());
appModule_1.appModule.component('contact', {
    controller: ContactComponent,
    template: require('components/contact.html!text'),
    styles: require('components/contact.css!css'),
    bindings: {
        contact: '<',
    }
});
//# sourceMappingURL=contact.js.map