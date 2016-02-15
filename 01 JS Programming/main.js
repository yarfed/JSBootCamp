/**
 * Created by User on 09.02.2016.
 *
 */
var readlineSync = require('readline-sync');
var lastId = 1;
var contacts = [];
var rootGroup = {id: 0, name: "root"};
var currentGroup = rootGroup;
var groups = [rootGroup];
var MENU_ADD_CONTACT = "1";
var MENU_ADD_GROUP = "2";
var MENU_CHANGE_CURRENT_GROUP = "3";
var MENU_PRINT_CURRENT_GROUP = "4";
var MENU_PRINT_ALL = "5";
var MENU_FIND = "6";
var MENU_DELETE_ITEM = "7";
var MENU_EXIT = "8";
groups.push({id: 1, name: "qqqqqq", parentId: 0});
groups.push({id: 2, name: "aaa", parentId: 0});
groups.push({id: 3, name: "hhhhh", parentId: 2});
groups.push({id: 4, name: "qqdddq", parentId: 3});
groups.push({id: 5, name: "qvbfjjfqq", parentId: 2});
contacts.push({id: 6, firstName: 'aaa', lastName: 'vasya1', phone: 12345, groupId: 0});
contacts.push({id: 7, firstName: 'petya2', lastName: 'vasya2', phone: 14445, groupId: 2});
contacts.push({id: 8, firstName: 'petya3', lastName: 'vasya3', phone: 555545, groupId: 2});
lastId = 9;
runPhoneBook();


function runPhoneBook() {
    console.log("hello");
    do {
        printMenu();
        var inputString = readlineSync.question('enter you choose, please!');
        switch (inputString) {
            case MENU_ADD_CONTACT:
                inputString = readlineSync.question('first name, last name, telephones separates with "," ');
                var contact = createContactFromString(inputString);
                contacts.push(contact);
                printGroup(currentGroup);
                break;

            case MENU_ADD_GROUP:
                input = readlineSync.question('please enter group name ');
                addNewGroup(input);
                printGroup(currentGroupId);
                break;

            case MENU_CHANGE_CURRENT_GROUP:
                input = readlineSync.question('please enter group name or .. to upLevel ');
                changeCurrentGroup(input);
                printGroup(currentGroupId);
                break;

            case MENU_PRINT_CURRENT_GROUP:
                printGroup(currentGroupId);
                break;

            case MENU_PRINT_ALL:
                printChildrens(0, "  ");
                break;

            case MENU_FIND:
                inputString = readlineSync.question('please enter string for search');
                var foundContacts = findContacts(inputString);
                for (var i = 0; i < foundContacts.length; i++) {
                    console.log(contactToString(foundContacts[i]));
                }

                var foundGroups = findGroups(inputString);
                for (i = 0; i < foundGroups.length; i++) {
                    console.log(foundGroups[i].name + "(" + foundGroups[i].id + ")");
                }
                break;

            case MENU_DELETE_ITEM:
                inputString = readlineSync.question('please enter item id for delete ');
                if (deleteContact(input)) {
                    console.log("contact deleted");
                    break;
                }
                if (deleteAllChildrens(input)) {
                    console.log("group deleted");
                    break;
                }
                console.log("wrong ID");
                break;

            default:
                console.log("wrong!!!");
                break;
        }
        readlineSync.question('press enter to continue');
    } while (inputString != MENU_EXIT);

    console.log("by.....");
}
function printMenu() {
    console.log("1 -add new person");
    console.log("2 -add new group");
    console.log("3 -change current group");
    console.log("4 -print current group");
    console.log("5 -print all");
    console.log("6 -find");
    console.log("7 -delete item");
    console.log("8 -exit");
}

function createContactFromString(inputString) {
    var args = inputString.split(",");
    var firstName = args[0];
    var lastName = args[1];
    var telephones = [];
    for (var i = 2; i < args.length; i++) {
        telephones.push(args[i]);
    }
    return createNewContact(firstName, lastName, telephones);
}

function addNewGroup(name) {
    groups.push({id: getNextId(), name: name, parentId: currentGroupId});
}

function changeCurrentGroup(name) {
    if (name == "..") {
        if (currentGroup.parentId) {

        }
        return;
    }
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].parentId == currentGroupId && groups[i].name == name) {
            console.log("found!");
            currentGroupId = groups[i].id;
            return;
        }
    }
    console.log("sorry, no matches");
}

function createNewContact(firstName, lastName, telephones) {
    var contact = {};
    contact.id = getNextId();
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.telephones = telephones;
    return contact;
}

function createNewGroup(name) {
    var group = {};
    group.id = getNextId();
    group.name = name;
    group.parentId = currentGroup.id;
    return group;
}

function printGroup(group) {
    console.log("****" + group.name + "******");
    var contactsOfGroup = getContactsByGroupId(group.id);
    var subGroups = getSubgroupsById(group.id);
    for (var i = 0; i < contactsOfGroup.length; i++) {
        console.log(contactToString(contactsOfGroup[i]));
    }
    for (var i = 0; i < subGroups.length; i++) {
        console.log(groupToString(subGroups[i]));
    }
}

function getGroupById(id) {
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].id == id) {
            return groups[i];
        }
    }
}
function getNextId() {
    return lastId++;
}

function printChildrens(id, tab) {
    var childrens = getChildrens(id);
    printContacts(id, tab);
    for (var i = 0; i < childrens.length; i++) {
        console.log(tab + childrens[i].name + "(" + childrens[i].id + ")");
        printChildrens(childrens[i].id, tab + "  ");
    }

}
function findContacts(find) {
    var result = [];
    for (var i = 0; i < contacts.length; i++) {
        if ((contacts[i].firstName == find) || (contacts[i].lastName == find)) {
            result.push(contacts[i]);
        }
    }
    return result;
}
function findGroups(find) {
    var result = [];
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].name == find) {
            result.push(groups[i]);
        }
    }
    return result;
}
function deleteContact(id) {
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id == id) {
            contacts.splice(i, 1);
            return true;
        }
    }
    return false;
}

function deleteAllChildrens(id) {
    for (var j = 0; j < contacts.length; j++) {
        if (contacts[j].groupId == id) {
            contacts.splice(j, 1);
            j--;
        }
    }
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].parentId == id) {
            deleteAllChildrens(groups[i].id);
            groups.splice(i, 1);
            i--;
        }
    }
    for (i = 0; i < groups.length; i++) {
        if (groups[i].id == id) {
            groups.splice(i, 1);
            return true;
        }
    }
    return false;
}
function printContacts(id, tab) {
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].groupId == id) {
            console.log(tab + "-" + contacts[i].firstName + " " +
                contacts[i].lastName + " " +
                contacts[i].phone + "(" + contacts[i].id + ")");
        }
    }
}

function contactToString(contact) {
    return contact.firstName + " " +
        contact.lastName + " " +
        contact.phone + "(" +
        contact.id + ")";
}

function groupToString(group) {
    return group.name + "(" + group.id + ")";
}

function getSubgroupsById(id) {
    var result = [];
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].parentId == id) {
            result.push(groups[i]);
        }
    }
    return result;
}

function getContactsByGroupId(id) {
    var result = [];
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].groupId == id) {
            result.push(contacts[i]);
        }
    }
    return result;
}