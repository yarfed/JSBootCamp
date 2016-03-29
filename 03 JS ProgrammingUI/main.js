/**
 * Created by User on 03.03.2016.
 */
"use strict";
var book = init();
loadDataFromLocalStorage();
printTree();
printCurrentGroupContacts();

document.getElementById("tree").addEventListener("click", treeClick);
document.getElementById("menu").addEventListener("click", menuClick);
document.querySelector("#addGroupPanel form").addEventListener("submit", addGroup);
document.querySelector("#addContactPanel form").addEventListener("submit", addContact);
document.querySelector("#search form").addEventListener("submit", find);
document.querySelector("#showContactsPanel tbody").addEventListener("click", tableClick);
document.querySelector("#addContactFormAddTel button").addEventListener("click", addTelField);

function printTree() {
    var target = document.getElementById("tree");
    target.innerHTML = "";
    var rootNode = document.createElement("li");
    rootNode.innerHTML = "<span id='0'>~</span>";
    var source = book.getRoot();
    printSubgroups(rootNode, source);
    target.appendChild(rootNode);
    document.getElementById(book.getCurrentGroup().id).classList.add("selected");
}

function printSubgroups(parentElement, group) {
    var ul = document.createElement("ul");
    var items = group.items;
    for (var i = 0; i < items.length; i++) {
        var li = document.createElement("li");
        if (items[i].isGroup) {
            li.classList.add("group");
            li.innerHTML = "<span id='" + items[i].id + "'>" + items[i].name + "</span>";
            if (items[i].items.length > 0) {
                printSubgroups(li, items[i]);
            }
            ul.appendChild(li);
        }
    }
    parentElement.appendChild(ul);
}

function printCurrentGroupContacts() {
    var target = document.querySelector("#showContactsPanel tbody");
    target.innerHTML = "";
    var group = book.getCurrentGroup();
    document.getElementById("currentGroup").innerHTML = group.name;
    var items = group.items;
    createContactsTable(target, items);
}

function find(e) {
    setVisiblePanel("searchResultsPanel");
    var target = document.querySelector("#searchResultsPanel tbody");
    target.innerHTML = "";
    var searchPhrase = document.querySelector("#search input").value;
    var items = book.findItems(searchPhrase);
    target.appendChild(createRow({id: "Contacts:", name: "", isGroup: true}));
    createContactsTable(target, items);
    target.appendChild(createRow({id: "Groups:", name: "", isGroup: true}));
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.isGroup) {
            var row = createRow(item);
            target.appendChild(row);
        }
    }
    e.preventDefault();
}

function createContactsTable(target, items) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (!item.isGroup) {
            var row = createRow(item);
            target.appendChild(row);
        }
    }
}

function createRow(item) {
    var row = document.createElement("tr");
    var id = "r" + item.id;
    if (!item.isGroup) {
        row.innerHTML = "<td>" + item.id + "</td><td>" + item.firstName + "</td><td>" + item.lastName + "</td><td>" +
            item.phoneNumbers.join() + "</td><td><a href='#' id='" + id + "'>delete</a></td>";
    }
    else {
        row.innerHTML = "<td>" + item.id + "</td><td>" + item.name +
            "</td><td></td><td></td><td><a href='#' id='" + id + "'>delete</a></td>";
    }
    return row;
}

function treeClick(e) {
    setVisiblePanel("showContactsPanel");
    if (e.target.id) {
        document.getElementById(book.getCurrentGroup().id).classList.remove("selected");
        book.changeGroup(e.target.id);
        saveDataToLocalStorage();
        if (e.target.id != 0) {
            document.getElementById(book.getCurrentGroup().id).classList.add("selected");
        }
        printCurrentGroupContacts();
    }
}

function tableClick(e) {
    var id = e.target.id;
    if (id) {
        id = id.replace("r", "");
        book.deleteItemById(id);
        printCurrentGroupContacts();
        saveDataToLocalStorage();
    }
}

function menuClick(e) {
    var id = e.target.id;
    if (id == "deleteGroupMenu") {
        book.deleteItemById(book.getCurrentGroup().id);
        printTree();
        printCurrentGroupContacts();
        saveDataToLocalStorage();
        return;
    }
    if (id == "addContactMenu") {
        deleteTelFields();
        document.querySelector("#addContactPanel form").reset();
        setVisiblePanel("addContactPanel");
    }
    if (id == "addGroupMenu") {
        document.querySelector("#addGroupPanel form").reset();
        setVisiblePanel("addGroupPanel");
    }
    if (id == "showContactsMenu") {
        setVisiblePanel("showContactsPanel");
    }
}

function addGroup(e) {
    var name = document.getElementById("addGroupFormName");
    var group = book.createGroup(name.value);
    book.addItem(group);
    saveDataToLocalStorage();
    printTree();
    setVisiblePanel("showContactsPanel");
    e.preventDefault();
}

function addContact(e) {
    var firstName = document.getElementById("addContactFormFirstName");
    var lastName = document.getElementById("addContactFormLastName");
    var tels = document.querySelectorAll("#addContactPanel .tel");
    var telephones = [];
    for (var i = 0; i < tels.length; i++) {
        var tel = tels[i].value;
        if (tel && tel != "") {
            telephones.push(tel);
        }
    }
    var contact = book.createContact(firstName.value, lastName.value, telephones);
    book.addItem(contact);
    saveDataToLocalStorage();
    printCurrentGroupContacts();
    setVisiblePanel("showContactsPanel");
    e.preventDefault();
}

function addTelField() {
    var telFields = document.querySelectorAll("#addContactPanel .tel");
    var n = telFields.length;
    var newTelField = document.createElement("li");
    newTelField.innerHTML = "<label for='addContactFormTel" + n + "'>Tel " + n
        + "</label><input type='tel' class='tel' id='addContactFormTel" + n
        + "' pattern='\+?[0-9\-\s]*'>";
    var parentElement = document.querySelector("#addContactPanel ul");
    var addTelButton = document.querySelector("#addContactFormAddTel");
    parentElement.insertBefore(newTelField, addTelButton)
}

function deleteTelFields() {
    var telFields = document.querySelectorAll("#addContactPanel .tel");
    var parentElement = document.querySelector("#addContactPanel ul");
    for (var i = 1; i < telFields.length; i++) {
        parentElement.removeChild(telFields[i].parentNode);
    }
}

function setVisiblePanel(id) {
    var panels = document.querySelectorAll("#panels .panel");
    for (var i = 0; i < panels.length; i++) {
        panels[i].classList.add("hidden");
    }
    document.getElementById(id).classList.remove("hidden");
}

function loadDataFromLocalStorage() {
    var dataString = localStorage.getItem("myBook");
    if (!dataString) {
        setTestData();
        return;
    }
    var dataArray = JSON.parse(dataString);
    book.restoreFromArray(dataArray);
}

function saveDataToLocalStorage() {
    var dataArray = book.bookToArray();
    var dataString = JSON.stringify(dataArray);
    localStorage.setItem("myBook", dataString);
}

function setTestData() {
    var friends = book.createGroup("friends");
    var good = book.createGroup("good");
    var bad = book.createGroup("bad");
    var work = book.createGroup("work");
    var school = book.createGroup("school");
    var vasya = book.createContact("vasya", "pupkin", [123, 555, 911]);
    var bibi = book.createContact("bibi", "goOd", [123]);
    var libi = book.createContact("good", "libi", [123]);
    var usama = book.createContact("usama", "binladen", [123, 666]);
    var obama = book.createContact("barak", "obama", [777]);
    book.addItem(friends);
    book.addItem(work);
    book.addItem(school);
    book.addItem(vasya);
    book.changeGroup(1);
    book.addItem(bad);
    book.addItem(good);
    book.changeGroup(3);
    book.addItem(usama);
    book.changeGroup(1);
    book.changeGroup(2);
    book.addItem(obama);
    book.changeGroup(1);
    book.addItem(bibi);
    book.addItem(libi);
    book.changeGroup(0);
}

