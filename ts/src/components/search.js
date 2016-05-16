/**
 * Created by User on 17.04.2016.
 */
"use strict";
var appModule_1 = require("../appModule");
var SearchComponent = (function () {
    function SearchComponent($location) {
        this.$location = $location;
    }
    SearchComponent.prototype.search = function () {
        var url = this.$location.path();
        url = url.split('/search')[0];
        this.$location.url(url + '/search/' + this.request);
    };
    return SearchComponent;
}());
appModule_1.appModule.component('search', {
    controller: SearchComponent,
    template: require('components/search.html!text'),
    styles: require('components/search.css!css')
});
//# sourceMappingURL=search.js.map