/**
 * Created by User on 17.03.2016.
 */
"use strict";
function Group(id, name){
    Item.call(this,id);
    this.name=name;
    this.items=[];
    this.type="group";
}
Group.prototype=Object.create(Item.prototype);
Group.prototype.addItem=function(item){
    this.items.push(item);
    item.parent=this;
};
Group.prototype.findItems=function(searchQuery){
    var result = [];
    if (this.name.toLowerCase().trim() == searchQuery.toLowerCase().trim()) {
        result.push(this);
    }
    var items = this.items;
    for (var i = 0; i < items.length; i++) {
        if (items[i].name) {
            result = result.concat(items[i].findItems(searchQuery));
        }
        else {
            if (items[i].firstName.toLowerCase().trim() == searchQuery.toLowerCase().trim() ||
                items[i].lastName.toLowerCase().trim() == searchQuery.toLowerCase().trim()) {
                result.push(items[i]);
            }
        }
    }
    return result;
};
Group.prototype.getItemById= function (id) {
    var items = this.items;
    if (this.id==id){return this}
    for (var i = 0; i < items.length; i++) {
        if (items[i].name) {
            var result =items[i].getItemById(id);
            if (result) {
                return result;
            }
        }
        else{
        }
    }
};



