/**
 * Created by User on 20.04.2016.
 */
import {appModule} from "../appModule";

class GroupComponent {

    private dataService;
    private $location;
    private $route;

    constructor(dataService, $location, $route) {
        this.dataService = dataService;
        this.$location = $location;
        this.$route = $route;
    }

    showContact(contact) {
        this.$location.url('group/'+contact.parentId+'/contact/'+contact.id);
    };

    showGroup(group) {
        this.$location.url('group/' + group.id)
    };

    deleteItem(item) {
        var self = this;
        if ( window.confirm('Sure?') ) {
            this.dataService.deleteItem(item).then(function () {
                self.$route.reload();
            });
        }
    };

}

appModule.component('group', <any>{
    controller: GroupComponent,
    template: require('components/group.html!text'),
    styles: require('components/group.css!css'),
    bindings: {
        group: '<',
        items: '<'
    }

});