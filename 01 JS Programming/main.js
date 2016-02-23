/**
 * Created by User on 09.02.2016.
 *
 */
var readlineSync = require('readline-sync');
var lastId = 1;
var contacts = [];
var ROOT_GROUP_ID = 0;
var rootGroup = {id: ROOT_GROUP_ID, name: 'root'};
var currentGroup = rootGroup;
var groups = [rootGroup];
var MENU_ADD_CONTACT = '1';
var MENU_ADD_GROUP = '2';
var MENU_CHANGE_CURRENT_GROUP = '3';
var MENU_PRINT_CURRENT_GROUP = '4';
var MENU_PRINT_ALL = '5';
var MENU_FIND = '6';
var MENU_DELETE_ITEM = '7';
var MENU_EXIT = '8';

runPhoneBook();

function runPhoneBook() {
    console.log('hello');
    do {
        printMenu();
        var input= readlineSync.question('enter you choose, please!');
        switch (input) {
            case MENU_ADD_CONTACT:
                var firstName = inputNonEmptyField('enter first name ');
                var lastName = inputNonEmptyField('enter last name ');
                var telephones = inputNonEmptyField('enter telephones separate with "," ').split(',');
                contacts.push(createNewContact(firstName, lastName, telephones));
                printGroup(currentGroup);
                break;

            case MENU_ADD_GROUP:
                do {
                    var groupName = inputNonEmptyField('please enter group name ');
                    if (isDoubleName(groupName)) {
                        console.log('cant be double names in group');
                    }
                }
                while (isDoubleName(groupName));
                groups.push(createNewGroup(groupName));
                printGroup(currentGroup);
                break;

            case MENU_CHANGE_CURRENT_GROUP:
                printGroup(currentGroup);
                input = inputNonEmptyField('please enter group name or .. to upLevel ');
                changeCurrentGroup(input);
                printGroup(currentGroup);
                break;

            case MENU_PRINT_CURRENT_GROUP:
                printGroup(currentGroup);
                break;

            case MENU_PRINT_ALL:
                printChildrens(getGroupById(ROOT_GROUP_ID), "  ");
                console.log('you in '+ currentGroup.name + ' now');
                break;

            case MENU_FIND:
                input = readlineSync.question('please enter string for search');
                var foundContacts = findContacts(input);
                for (var i = 0; i < foundContacts.length; i++) {
                    console.log(contactToString(foundContacts[i]));
                }

                var foundGroups = findGroups(input);
                for (i = 0; i < foundGroups.length; i++) {
                    console.log(foundGroups[i].name + '(' + foundGroups[i].id + ')');
                }
                break;

            case MENU_DELETE_ITEM:
                input = readlineSync.question('please enter item id for delete ');
                if (input==0) {
                    console.log('you cant delete root!!!');
                    break;
                }
                var deletedContact = getContactById(input);
                var deletedGroup = getGroupById(input);

                if (!(deletedContact||deletedGroup)){
                    console.log('wrong ID');
                    break;
                }
                if (deletedContact) {
                    deleteContact(deletedContact);
                    console.log('contact deleted');
                    console.log('you in '+ currentGroup.name + ' now');
                    break;
                }
                if (deletedGroup) {
                    deleteAllChildrens(deletedGroup);
                    console.log('group deleted');
                    console.log('you in '+ currentGroup.name + ' now');
                    break;
                }
                break;
            case MENU_EXIT:
                console.log('by.....');
                return;

            default:
                console.log('wrong input, try again!!!');
                break;
        }
        readlineSync.question('press enter to continue');
    } while (true);
}

function printMenu() {
    console.log('1 -add new person');
    console.log('2 -add new group');
    console.log('3 -change current group');
    console.log('4 -print current group');
    console.log('5 -print all');
    console.log('6 -find');
    console.log('7 -delete item');
    console.log('8 -exit');
}

function inputNonEmptyField(message) {
    do {
        var invalidInput = true;
        var inputString = readlineSync.question(message);
        if (inputString) {
            invalidInput = false;
        }
        else {
            console.log('field cant be empty!');
        }
    } while (invalidInput);
    return inputString.trim();
}

function changeCurrentGroup(name) {
    if (name == '..') {
        if (currentGroup.parentId !== undefined) {
            currentGroup = getGroupById(currentGroup.parentId);
        }
        else {
            console.log('already top level!!!');
        }
        return;
    }
    var subGroups = getSubGroups(currentGroup);
    for (var i = 0; i < subGroups.length; i++) {
        if (subGroups[i].name == name) {
            currentGroup = subGroups[i];
            return;
        }
    }
    console.log('sorry, no matches');
}

function createNewContact(firstName, lastName, telephones) {
    var contact = {};
    contact.id = getNextId();
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.telephones = telephones;
    contact.groupId = currentGroup.id;
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
    console.log('your in  ' + group.name + '  group now');
    var contactsOfGroup = getContactsOfGroup(group);
    var subGroups = getSubGroups(group);
    contactsOfGroup.sort(compareContacts);
    subGroups.sort(compareGroups);
    for (var i = 0; i < contactsOfGroup.length; i++) {
        console.log(contactToString(contactsOfGroup[i]));
    }
    for (var i = 0; i < subGroups.length; i++) {
        console.log(groupToString(subGroups[i]));
    }
}

function getNextId() {
    return lastId++;
}

function printChildrens(group, tab) {
    var contactsOfGroup = getContactsOfGroup(group);
    var subGroups = getSubGroups(group);
    contactsOfGroup.sort(compareContacts);
    subGroups.sort(compareGroups);
    for (var i = 0; i < contactsOfGroup.length; i++) {
        console.log(tab + contactToString(contactsOfGroup[i]));
    }
    for (var i = 0; i < subGroups.length; i++) {
        console.log(tab + groupToString(subGroups[i]));
        printChildrens(subGroups[i], tab + '  ');
    }
}

function compareContacts(a,b){
    return a.firstName.localeCompare(b.firstName);
}

function compareGroups(a,b){
    return a.name.localeCompare(b.name);
}

function findContacts(find) {
    var result = [];
    for (var i = 0; i < contacts.length; i++) {
        if ((contacts[i].firstName.toLocaleLowerCase() == find.toLowerCase()) ||
            (contacts[i].lastName.toLowerCase() == find.toLowerCase())) {
            result.push(contacts[i]);
        }
    }
    return result;
}

function findGroups(find) {
    var result = [];
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].name.toLowerCase() == find.toLowerCase()) {
            result.push(groups[i]);
        }
    }
    return result;
}

function deleteAllChildrens(group) {
    deleteContactsOfGroup(group);
    var subGroups = getSubGroups(group);
    for (var i = 0; i < subGroups.length; i++) {
            deleteAllChildrens(subGroups[i]);
            deleteGroup(subGroups[i]);
    }
    deleteGroup(group);
}

function deleteContactsOfGroup(group){
    getContactsOfGroup(group).forEach(deleteContact);
}

function deleteGroup(group){
    if (group == currentGroup) {
        currentGroup = getGroupById(group.parentId);
    }
    for (var i = 0; i < groups.length; i++) {
        if (groups[i] == group) {
            groups.splice(i, 1);
            return;
        }
    }
}

function deleteContact(contact) {
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i] == contact) {
            contacts.splice(i, 1);
            return;
        }
    }
}

function contactToString(contact) {
    return '(' + contact.id +
        ') first Name: ' + contact.firstName +
        '; last name: ' + contact.lastName +
        '; telephones: ' + contact.telephones + '.';
}

function groupToString(group) {
    return '(' + group.id +
        ') ' + group.name;
}

function getSubGroups(group) {
    var result = [];
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].parentId == group.id) {
            result.push(groups[i]);
        }
    }
    return result;
}

function getContactsOfGroup(group) {
    var result = [];
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].groupId == group.id) {
            result.push(contacts[i]);
        }
    }
    return result;
}

function getContactById(id) {
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id == id) {
            return contacts[i];
        }
    }
}

function getGroupById(id) {
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].id == id) {
            return groups[i];
        }
    }
}

function isDoubleName(name) {
    var subGroups = getSubGroups(currentGroup);
    for (var i = 0; i < subGroups.length; i++) {
        if (subGroups[i].name == name) {
            return true;
        }
    }
    return false;
}