/**
 * Created by User on 17.04.2016.
 */

import {appModule} from "../appModule";

class SearchComponent {
    private $location;
    private request;

    constructor($location) {
        this.$location = $location;
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