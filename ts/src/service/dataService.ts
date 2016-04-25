/**
 * Created by User on 20.04.2016.
 */
/**
 * Created by User on 03.04.2016.
 */
import {appModule} from "../appModule";

class DataService {
    private $http;

    constructor($http) {
        this.$http = $http;

    }

    getItem(id) {
        return this.$http({method: 'get', url: 'api/items/' + id});
    };

    getChilds(id) {
        return this.$http({method: 'get', url: 'api/items/' + id + '/items'});
    };

    getAll() {
        return this.$http({method: 'get', url: 'api/items'});
    };

    search(request) {
        return this.$http({method: 'get', url: 'api/search/' + request});
    };

    addItem(item) {
        return this.$http({method: 'post', url: 'api/items/', data: item});
    };

    deleteItem(item) {
        return this.$http({method: 'delete', url: 'api/items/' + item.id});
    };

}

appModule.service('dataService', DataService);