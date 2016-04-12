/**
 * Created by User on 03.04.2016.
 */
(function () {
    angular.module('myApp').value('viewService', {
        currentView: 'group',
        currentGroup: null,
        group:{},
        contact:{},
        breadCrumbs:[]
    })
})();
