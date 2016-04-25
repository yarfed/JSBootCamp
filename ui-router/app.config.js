/**
 * Created by User on 13.04.2016.
 */
(function () {
    'use strict';
    angular.module('myApp').config(function ($stateProvider, colorServiceProvider) {
        $stateProvider
            .state('root', {
                url: "",
                abstract: true,
                templateUrl: "./templates/root-template.html",
                controller: 'myController as ctrl'
            })
            .state('root.main', {
                url: "",
                views: {
                    "header": {templateUrl: "./templates/header-template.html"},
                    "content": {templateUrl: "./templates/content-template.html"}
                }
            });

        colorServiceProvider.setColor('blue');
    });
})();