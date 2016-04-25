/**
 * Created by User on 17.04.2016.
 */

import {appModule} from "../appModule";

class SearchComponent {
    private $location;
    private $route;
    private dataService;
    private request;

    constructor($location, $route, dataService) {
        this.$location = $location;
        this.$route = $route;
        this.dataService = dataService;
    }

    search() {
        var url = this.$location.path();
        url = url.split('/search')[0];
        this.$location.url(url + '/search/' + this.request);
    }
}

appModule.component('search', <any>{
    controller: SearchComponent,
    template: require('components/search.html!text'),
    styles: require('components/search.css!css')
});