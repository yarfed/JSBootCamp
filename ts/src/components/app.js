"use strict";
require('./menu');
require('./group');
require('./addGroup');
require('./contact');
require('../service/dataService');
require('../appModuleConfig');
var appModule_1 = require("../appModule");
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
appModule_1.appModule.component('app', {
    controller: AppComponent,
    template: require('components/app.html!text'),
    styles: require('components/app.css!css')
});
//# sourceMappingURL=app.js.map