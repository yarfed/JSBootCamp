var rl = require("readline-sync");
var fs = require("fs");

var nextId = 0;
var root = createGroup("~");
var currentGroup = root;
var Menu = {
    ADD_NEW_CONTACT: 1,
    ADD_NEW_GROUP: 2,
    CHANGE_CURRENT_GROUP: 3,
    PRINT: 4,
    PRINT_ALL: 5,
    FIND: 6,
    DELETE: 7,
    EXIT: 8,
    SAVE: 9,
    READ: 0,
    LOAD_TEST_DATA: 10
};

function printMenu() {
    console.log();
    console.log("1) Add new contact");
    console.log("2) Add new group");
    console.log("3) Change current group");
    console.log("4) Print");
    console.log("5) Print All");
    console.log("6) Find");
    console.log("7) Delete");
    console.log("8) Exit");
    console.log("9) save");
    console.log("0) read");
    console.log("10) load test data");
}

function run() {

    while (true) {
        printMenu();
        var command = rl.question("Contact Book> ");
        handleCommand(command);
    }
}
//why not switch construction?
function handleCommand(line) {
    var command = parseInt(line);

    if (command == Menu.ADD_NEW_CONTACT) {
        addNewContact();
    }
    else if (command == Menu.ADD_NEW_GROUP) {
        addNewGroup();
    }
    else if (command == Menu.CHANGE_CURRENT_GROUP) {
        changeCurrentGroup();
    }
    else if (command == Menu.PRINT) {
        print();
    }
    else if (command == Menu.PRINT_ALL) {
        printAll();
    }
    else if (command == Menu.FIND) {
        find();
    }
    else if (command == Menu.DELETE) {
        deleteItem();
    }
    else if (command == Menu.EXIT) {
        exit();
    }
    else if (command == Menu.SAVE) {
        save();
    }
    else if (command == Menu.READ) {
        read("data.txt");
    }
    else if (command == Menu.LOAD_TEST_DATA) {
        read("testData.txt");
    }
}

function addNewContact() {
    var firstName = readNonEmptyString("First Name: ");
    var lastName = readNonEmptyString("Last Name: ");
    var phoneNumbers = [];
    while (true) {
        var phoneNumber = rl.question("Phone Number (press enter when done): ");
        if (!phoneNumber) {
            break;
        }
        phoneNumbers.push(phoneNumber);
    }

    var contact = createContact(firstName, lastName, phoneNumbers);
    addItem(contact);
}

function addNewGroup() {
    var name = readNonEmptyString("Name: ");
    var group = createGroup(name);
    addItem(group);
}

function changeCurrentGroup() {
    if (currentGroup.parent) {
        console.log("..");
    }
    print();
    var name = readNonEmptyString("Name: ");
    try {
        changeGroup(name);
        print();
    }
    catch (e) {
        console.log(e.message);
    }
}

function changeGroup(name) {

    if (name == "..") {
        if (currentGroup == root) {
            throw new Error("you already in root");
        }
        currentGroup = currentGroup.parent;
    }
    else {
        var subGroup = findGroup(name);
        if (!subGroup) {
            throw new Error("Group with name " + name + " was not found");
        }
        currentGroup = subGroup;
    }
}

function findGroup(name) {
    var items = currentGroup.items;
    for (var i = 0; i < items.length; i++) {
        if (items[i].isGroup && items[i].name == name) {
            return (items[i]);
        }
    }
}

function print() {
    console.log("you in " + currentGroup.name + " group now");
    var items = currentGroup.items;
    for (var i = 0; i < items.length; i++) {
        if (items[i].isGroup) {
            printGroup(items[i]);
        }
        else {
            printContact(items[i]);
        }
    }
}

function printAll() {
    printAllItems(root, "");
}

function printAllItems(group, tab) {
    printGroup(group, tab);
    var items = group.items;
    for (var i = 0; i < items.length; i++) {
        if (items[i].isGroup) {
            printAllItems(items[i], tab + '  ');
        }
        else {
            printContact(items[i], tab + '  ');
        }
    }
}

function find() {
    var name = readNonEmptyString("enter Name: ");
    var foundItems = getItemsByName(root, name);
    for (var i = 0; i < foundItems.length; i++) {
        if (foundItems[i].isGroup) {
            printGroup(foundItems[i]);
        }
        else {
            printContact(foundItems[i]);
        }
    }
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

function deleteItem() {
    var id = readNonEmptyString("enter id please ");
    var deletedItem = getItemById(id);
    if (!deletedItem) {
        console.log("wrong id");
    }
    else {
        delItem(deletedItem);
    }
}

function delItem(item) {
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

function exit() {
    process.exit(0);
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
        type: 'Group',
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

function printGroup(group, tab) {
    tab = (tab === undefined) ? '' : tab;
    console.log(tab + group.name + '(' + group.id + ')');
}

function printContact(contact, tab) {
    tab = (tab === undefined) ? '' : tab;
    console.log(tab + '-' + contact.firstName + ' ' + contact.lastName
        + ' ' + contact.phoneNumbers + '(' + contact.id + ')');
}

function readNonEmptyString(message) {
    while (true) {
        var line = rl.question(message).trim();
        if (line) {
            return line;
        }
    }
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

function restoreFromPlaneArray(planeArray) {
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

function save() {
    fs.writeFileSync("data.txt", JSON.stringify(bookToArray()));
}

function read(fileName) {
    var text = fs.readFileSync(fileName, 'utf8');
    restoreFromPlaneArray(JSON.parse(text));
}

function getRoot() {
    return root;
}

function getCurrentGroup() {
    return currentGroup;
}

module.exports.createContact = createContact;
module.exports.createGroup = createGroup;
module.exports.addItem = addItem;
module.exports.getPlaneArray = getPlaneArray;
module.exports.delItem = delItem;
module.exports.changeGroup = changeGroup;
module.exports.getItemsByName = getItemsByName;
module.exports.getRoot = getRoot;
module.exports.getCurrentGroup = getCurrentGroup;
module.exports.run = run;
