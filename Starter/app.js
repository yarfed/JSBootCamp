
var rl = require('readline-sync');
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
    EXIT: 8
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
}

function run() {
    while (true) {
        printMenu();

        var command = rl.question("Contact Book> ");
        handleCommand(command);
    }
}

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
        console.log('..');
    }
    print();
    var name = readNonEmptyString("Name: ");
    try {
        changeGroup(name);
        console.log("you in " + currentGroup + " group now");
    }
    catch (e){
        console.log(e.message);
    }
}

function changeGroup(name){
    if (name == "..") {
        if (currentGroup.parent) {
            currentGroup = currentGroup.parent;
        }
        else {
            throw new Error("you already in root");
        }
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
    printAllItems(root, '');
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
    if (group.name == name) {
        result.push(group);
    }
    var items = group.items;
    for (var i = 0; i < items.length; i++) {
        if (items[i].isGroup) {
            result = result.concat(getItemsByName(items[i], name));
        }
        else {
            if (items[i].firstName == name || items[i].lastName == name) {
                result.push(items[i]);
            }
        }
    }
    return result;
}

function deleteItem() {
    var id = readNonEmptyString("enter id please ");
    var deletedItem = getItemById(root, id);
    if (!deletedItem) {
        console.log('wrong id');
    }
    else {
        delItem(deletedItem);
    }
}

function delItem(item) {
    var parent = item.parent;
    var items = parent.items;
    if (item.isGroup) {
        if (currentGroup == item || getItemById(item, currentGroup.id)) {
            currentGroup = parent;
        }
    }
    for (var i = 0; i < items.length; i++) {
        if (items[i] == group) {
            items.splice(i, 1);
            return;
        }
    }
}

function getItemById(group, id) {
    var items = group.items;
    for (var i = 0; i < items.length; i++) {
        if (items[i].id == id) {
            return items[i];
        }
        if (items[i].isGroup) {
            var result = getItemById(items[i], id);
            if (result) {
                return result;
            }
        }
    }
}

function exit() {
    process.exit(0);
}

function createContact(firstName, lastName, phoneNumbers) {
    var contact = {
        id: generateNextId(),
        firstName: firstName,
        lastName: lastName,
        phoneNumbers: phoneNumbers,
        type: 'Contact'
    };

    return contact;
}

function createGroup(name) {
    var group = {
        id: generateNextId(),
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

function getPlaneArray(item) {
    var planeObj = getPlaneObj(item);
    var result = [];
    result.push(planeObj);
    for (var i = 0; i < planeObj.numberOfChildrens; i++) {
        result = result.concat(getPlaneArray(item.items[i]));
    }
    return result;
}

function getPlaneObj(item) {
    var numberOfChildrens = (item.isGroup) ? item.items.length : 0;
    return {
        numberOfChildrens: numberOfChildrens,
        data: item.toString()
    }
}

run();

module.exports.createContact = createContact;
module.exports.createGroup = createGroup;
module.exports.addItem = addItem;
module.exports.getPlaneArray = getPlaneArray;
module.exports.delItem = delItem;
module.exports.changeGroup = changeGroup;