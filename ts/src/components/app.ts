
import './menu';
import './group';
import './addGroup';
import './contact';
import '../service/dataService';
import '../appModuleConfig';
import {appModule} from "../appModule";

class AppComponent {

    constructor() {

    }
}

appModule.component('app', <any>{
    controller: AppComponent,
    template: require('components/app.html!text'),
    styles: require('components/app.css!css')
});