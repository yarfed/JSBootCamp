/**
 * Created by User on 20.04.2016.
 */

import 'router';
import {appModule} from "./appModule";
import {Contact} from "./entities/contact";
import {Group} from "./entities/group";
appModule.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/group/:id', {
            template: '<group group="$resolve.group.data" items="$resolve.items.data"></group>',
            resolve: {
                group: function ($route, dataService, $location) {
                    return dataService.getItem($route.current.params.id)
                        .then(null, function () {
                            $location.url('group/0');
                        });
                },
                items: function ($route, dataService) {
                    return dataService.getChilds($route.current.params.id);
                }
            }
        })
        .when('/group/:id/contact/:contactId', {
            template: '<contact contact="$resolve.contact.data" ></contact>',
            resolve: {
                contact: function ($route, dataService,$location) {
                    return dataService.getItem($route.current.params.contactId)
                        .then(null, function () {
                            $location.url('group/'+$route.current.params.id);
                        });
                },
            }
        })
        .when('/group/:id/contact', {
            template: '<contact contact="$resolve.contact" ></contact>',
            resolve: {
                contact: function ($route, $q) {
                    return $q.when(new Contact($route.current.params.id));
                },
            }
        })
        .when('/group/:id/group', {
            template: '<add-group group="$resolve.group" ></add-group>',
            resolve: {
                group: function ($route, $q) {
                    return $q.when(new Group($route.current.params.id));
                },

            }
        })
        .when("/group/:id/:contact?/:contactId?/search/:request", {
            template: '<group group="$resolve.group" items="$resolve.items.data"></group>',
            resolve: {
                group: function ($route, $q) {
                    var group = new Group($route.current.params.id);
                    group.name = 'results for:' + $route.current.params.request;
                    return $q.when(group);
                },
                items: function ($route, dataService) {
                    return dataService.search($route.current.params.request);
                }
            }
        })
        .otherwise({redirectTo: '/group/0'});
    $locationProvider.html5Mode(true);

});