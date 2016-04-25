/**
 * Created by User on 17.04.2016.
 */
import './search';
import {appModule} from "../appModule";

class MenuComponent {
    private $location;
    private $route;
    private dataService;

    constructor($location, $route, dataService) {
        this.$location = $location;
        this.$route = $route;
        this.dataService = dataService;
    }

    up() {
        var self = this;
        var id = this.$route.current.params.id;
        var contactId=this.$route.current.params.contactId;
        var request=this.$route.current.params.request;
        console.log(id);
        console.log(contactId);
        console.log(request);
        if (request){

            if (contactId){

                self.$location.url('group/' + id+'/contact/'+contactId);
                return;
            } else{
                self.$location.url('group/' + id);
                return;
            }
        }
        if (contactId){
            self.$location.url('group/' + id);
            return;
        }
        if (id!=0) {
            self.dataService.getItem(id).then(function (res) {
                self.$location.url('group/' + res.data.parentId);
            });
        }
    }
    addContact(){
        var id = this.$route.current.params.id;
        var contactId=this.$route.current.params.contactId;
        if(id&&!contactId){
            this.$location.url('group/' + id+'/contact');
        }
    }
    addGroup(){
        var id = this.$route.current.params.id;
        var contactId=this.$route.current.params.contactId;
        if(id&&!contactId){
            this.$location.url('group/' + id+'/group');
        }
    }
}

appModule.component('menu', <any>{
    controller: MenuComponent,
    template: require('components/menu.html!text'),
    styles: require('components/menu.css!css')
});