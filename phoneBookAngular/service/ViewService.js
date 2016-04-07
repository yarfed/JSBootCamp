/**
 * Created by User on 03.04.2016.
 */
(function () {
    angular.module("myApp").value('viewService', {
        currentView: "group",
        currentItem: null,
        group:{},
        contact:{},
        breadCrumbs:[]
    })
})();
