/**
 * Created by User on 17.03.2016.
 */
"use strict";
function PhoneBook(owner) {
    this.owner = owner;
    this.nextId = 1;
    this.root = new Group(0, "root");
    this.restoreFromLocal();
}

PhoneBook.prototype.deleteItem = function (item) {
    if (item.id == 0) {
        return
    }
    var parent = item.parent;
    var items = parent.items;
    for (var i = 0; i < items.length; i++) {
        if (items[i] == item) {
            items.splice(i, 1);
            return;
        }
    }
};

PhoneBook.prototype.saveToLocal = function () {
    var self = this;
    var dataArray = bookToArray();
    var dataString = JSON.stringify(dataArray);
    localStorage.setItem(this.owner, dataString);

    function bookToArray() {
        var result = getPlaneArray(self.root);
        result.push({nextId: self.nextId});
        return result;
    }

    function getPlaneArray(item) {
        var planeObj = getPlaneObj(item);
        var result = [];
        result.push(planeObj);
        for (var i = 0; i < planeObj.childCount; i++) {
            result = result.concat(getPlaneArray(item.items[i]));
        }
        return result;
    }

    function getPlaneObj(item) {
        var obj = {};
        if (item.type == "group") {
            obj.childCount = item.items.length;
            obj.name = item.name;
            obj.isGroup = true;
        }
        else {
            obj.childCount = 0;
            obj.firstName = item.firstName;
            obj.lastName = item.lastName;
            obj.telephones = item.telephones;
        }
        obj.id = item.id;
        return obj;
    }
};

PhoneBook.prototype.restoreFromLocal = function () {
    var self = this;
    var dataString = localStorage.getItem(this.owner);
    if (!dataString) {
        return;
    }
    var dataArray = JSON.parse(dataString);
    restoreFromArray(dataArray);

    function restoreFromArray(planeArray) {
        var nextIndex = 0;
        self.root = restoreNextItem();
        self.nextId = +planeArray[++nextIndex].nextId;
        function restoreNextItem() {
            var planeItem = planeArray[nextIndex];
            if (!planeItem.isGroup) {
                return new Contact(planeItem.id, planeItem.firstName, planeItem.lastName, planeItem.telephones);
            }
            var group = new Group(planeItem.id, planeItem.name);
            for (var i = 0; i < planeItem.childCount; i++) {
                nextIndex++;
                var item = restoreNextItem();
                item.parent = group;
                group.items.push(item);
            }
            return group;
        }
    }
};