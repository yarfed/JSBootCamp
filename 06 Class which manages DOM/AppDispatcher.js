/**
 * Created by User on 20.03.2016.
 */
var AppDispatcher = (function() {

    function AppDispatcher() {
        this.events={"REVERS_ORDER":[]};
    }
    AppDispatcher.prototype.on=function(eventName,subscriber){
        //
    }
    return AppDispatcher;
})();

