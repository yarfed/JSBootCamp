/**
 * Created by User on 21.04.2016.
 */
import {appModule} from "../appModule";
class AddGroupComponent {

    private dataService;
    private $location;
    private $route;
    private group;

    constructor(dataService, $location, $route) {

        this.dataService = dataService;
        this.$location = $location;
        this.$route = $route;
    }

    submit(e) {
        var self = this;
        self.dataService.addItem(self.group).then(function () {
            var id = self.$route.current.params.id;
            self.$location.url('group/' + id);
        });
        e.preventDefault();
    }
    cancel(){
        var id = this.$route.current.params.id;
        this.$location.url('group/' + id);
    }
}

appModule.component('addGroup', <any>{
    controller: AddGroupComponent,
    template: require('components/addGroup.html!text'),
    styles: require('components/addGroup.css!css'),
    bindings: {
        group: '<',
    }
});