import {appModule} from "../appModule";
class ContactComponent {

    private dataService;
    private $location;
    private $route;
    private contact;

    constructor(dataService, $location, $route) {

        this.dataService = dataService;
        this.$location = $location;
        this.$route = $route;
    }

    addTel() {
        this.contact.phones.push(null);
    };

    removeTel() {
        if (this.contact.phones.length > 1) {
            this.contact.phones.pop();
        }
    }

    submit(e) {
        var self = this;
        self.dataService.addItem(self.contact).then(function () {
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

appModule.component('contact', <any>{
    controller: ContactComponent,
    template: require('components/contact.html!text'),
    styles: require('components/contact.css!css'),
    bindings: {
        contact: '<',
    }

});