function init() {
    var nextId = 0;
    var root = createGroup("~");
    var currentGroup = root;

    function changeGroup(id) {
        currentGroup = getItemById(id);
    }

    function findItems(name) {
       return getItemsByName(root,name);
    }

    function getItemsByName(group, name) {
        var result = [];
        if (group.name.toLowerCase().trim() == name.toLowerCase().trim()) {
            result.push(group);
        }
        var items = group.items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].isGroup) {
                result = result.concat(getItemsByName(items[i], name));
            }
            else {
                if (items[i].firstName.toLowerCase().trim() == name.toLowerCase().trim() ||
                    items[i].lastName.toLowerCase().trim() == name.toLowerCase().trim()) {
                    result.push(items[i]);
                }
            }
        }
        return result;
    }

    function deleteItemById(id) {
        var item=getItemById(id);
        if (item==root){return}
        var parent = item.parent;
        var items = parent.items;
        if (item.isGroup) {
            if (currentGroup == item || findItemInGroupById(item, currentGroup.id)) {
                currentGroup = parent;
            }
        }
        for (var i = 0; i < items.length; i++) {
            if (items[i] == item) {
                items.splice(i, 1);
                return;
            }
        }
    }

    function getItemById(id) {
        if (id == 0) return root;
        return findItemInGroupById(root, id);
    }

    function findItemInGroupById(group, id) {
        var items = group.items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                return items[i];
            }
            if (items[i].isGroup) {
                var result = findItemInGroupById(items[i], id);
                if (result) {
                    return result;
                }
            }
        }
    }

    function createContact(firstName, lastName, phoneNumbers, id) {
        if (id === undefined) {
            id = generateNextId();
        }
        var contact = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            phoneNumbers: phoneNumbers,
            type: 'Contact'
        };
        return contact;
    }

    function createGroup(name, id) {
        if (id === undefined) {
            id = generateNextId();
        }
        var group = {
            id: id,
            name: name,
            items: [],
            isGroup: true
        };
        return group;
    }

    function addItem(item) {
        if (item.parent) {
            throw Error("Item with id " + item.id + " was already added to group: " + item.parent.name);
        }
        currentGroup.items.push(item);
        item.parent = currentGroup;
    }

    function generateNextId() {
        return nextId++;
    }

    function bookToArray() {
        var result = getPlaneArray(root);
        result.push({currentGroupId: currentGroup.id});
        result.push({nextId: nextId});
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
        if (item.isGroup) {
            obj.childCount = item.items.length;
            obj.name = item.name;
            obj.isGroup = true;
        }
        else {
            obj.childCount = 0;
            obj.firstName = item.firstName;
            obj.lastName = item.lastName;
            obj.phoneNumbers = item.phoneNumbers.join();
        }
        obj.id = item.id;
        return obj;
    }

    function restoreFromArray(planeArray) {
        var nextIndex = 0;
        root = restoreNextItem();
        currentGroup = getItemById(planeArray[++nextIndex].currentGroupId);
        nextId = +planeArray[++nextIndex].nextId;

        function restoreNextItem() {
            var planeItem = planeArray[nextIndex];
            if (!planeItem.isGroup) {
                return createContact(planeItem.firstName, planeItem.lastName, planeItem.phoneNumbers.split(","), planeItem.id);
            }
            var group = createGroup(planeItem.name, planeItem.id);
            for (var i = 0; i < planeItem.childCount; i++) {
                nextIndex++;
                var item = restoreNextItem();
                item.parent = group;
                group.items.push(item);
            }
            return group;
        }
    }

    function getRoot() {
        return root;
    }

    function getCurrentGroup() {
        return currentGroup;
    }

    return {
        createContact: createContact,
        createGroup: createGroup,
        addItem: addItem,
        deleteItemById: deleteItemById,
        changeGroup: changeGroup,
        findItems:findItems,
        getRoot: getRoot,
        getCurrentGroup: getCurrentGroup,
        bookToArray:bookToArray,
        restoreFromArray:restoreFromArray,
    }
}
