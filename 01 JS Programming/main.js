/**
 * Created by User on 09.02.2016.
 */
var readlineSync = require('readline-sync');
var lastId= 1,
    contacts =[],
    rootGroup={id:0,name:"root"},
    currentGroupId= 0,
    groups =[rootGroup];
groups.push({id:1,name:"qqqqqq",parentId:0});
groups.push({id:2,name:"aaa",parentId:0});
groups.push({id:3,name:"hhhhh",parentId:2});
groups.push({id:4,name:"qqdddq",parentId:3});
groups.push({id:5,name:"qvbfjjfqq",parentId:2});
contacts.push({id:6,firstName:'aaa',lastName:'vasya1',phone:12345,groupId:0});
contacts.push({id:7,firstName:'petya2',lastName:'vasya2',phone:14445,groupId:2});
contacts.push({id:8,firstName:'petya3',lastName:'vasya3',phone:555545,groupId:2});
lastId=9;
run();
function run(){
    console.log("hello");
    do {
        printMenu();
        var s = readlineSync.question('choose, please!');
        var input;
        switch(s) {
            case '1':
                input = readlineSync.question('first name, last name, telephone with "," ');
                var args=input.split(",");
                addNewPerson(args[0],args[1],args[2]);
                printGroup(currentGroupId);
                break;

            case '2':
                 input = readlineSync.question('please enter group name ');
                 addNewGroup(input);
                 printGroup(currentGroupId);
                 break;
            case '3':
                input = readlineSync.question('please enter group name or .. to upLevel ');
                changeCurrentGroup(input);
                printGroup(currentGroupId);
                break;
            case '4':

                printGroup(currentGroupId);
                break;
            case '5':
                printChildrens(0,"  ");
                break;
            case '6':
                input = readlineSync.question('please enter string for search');
                var forPrint=[];
                forPrint=findContacts(input);
                console.log(forPrint.length);
                for (var i=0;i<forPrint.length;i++){
                    console.log( forPrint[i].firstName  +" "+
                        forPrint[i].lastName  +" "+
                        forPrint[i].phone + "(" + forPrint[i].id + ")");
                }
                forPrint=findGroups(input);
                for ( i=0;i<forPrint.length;i++){
                    console.log( forPrint[i].name  +"("+ forPrint[i].id + ")");
                }
                break;
            case '7':
                input = readlineSync.question('please enter item id for delete ');
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
    } while (s!=8);

    console.log("by.....");
}
function printMenu(){
    console.log("1 -add new person");
    console.log("2 -add new group");
    console.log("3 -change current group");
    console.log("4 -print current group");
    console.log("5 -print all");
    console.log("6 -find");
    console.log("7 -delete item");
    console.log("8 -exit");
}
function addNewGroup(name){
    groups.push({id:getNextId(),name:name,parentId:currentGroupId});
}
function addNewPerson(firstName,lastName,phone){
    contacts.push({id:getNextId(),firstName:firstName,lastName:lastName,phone:phone,groupId:currentGroupId});

}
function changeCurrentGroup(name){
    if (name==".." && currentGroupId!="0"){
        currentGroupId=getGroup(currentGroupId).parentId;
        printGroup(currentGroupId);
        return;
    }
    for (var i=0;i<groups.length;i++) {
        if (groups[i].parentId == currentGroupId && groups[i].name == name) {
            console.log("found!");
            currentGroupId = groups[i].id;
            return;
        }
    }
    console.log("sorry, no matches");

}
function printGroup(id){
    console.log("****"+getGroup(id).name+"******");
    printContacts(id,"");
    for (var i=0;i<groups.length;i++) {
        if (groups[i].parentId == id) {
            console.log(groups[i].name + "(" + groups[i].id + ")");
        }
    }
}
function getGroup(id){
    for (var i=0;i<groups.length;i++) {
        if (groups[i].id == id) {
            return groups[i];
        }
    }
}
function getNextId(){
    return lastId++;
}

function printChildrens(id,tab){
    var childrens= getChildrens(id);
    printContacts(id,tab);
    for (var i=0;i<childrens.length;i++){
        console.log(tab+childrens[i].name + "("+childrens[i].id+")");
        printChildrens(childrens[i].id, tab+"  ");
    }

}
function findContacts(find){
    var result=[];
    for (var i=0;i<contacts.length;i++){
        if ((contacts[i].firstName==find)||(contacts[i].lastName==find)) {
            result.push(contacts[i]);
        }
    }
    return result;
}
function findGroups(find){
    var result=[];
    for (var i=0;i<groups.length;i++){
        if (groups[i].name==find) {
            result.push(groups[i]);
        }
    }
    return result;
}
function deleteContact(id){
    for (var i=0;i<contacts.length;i++){
        if (contacts[i].id==id) {
            contacts.splice(i,1);
            return true;
        }
    }
    return false;
}

function deleteAllChildrens(id){
    for (var j=0;j<contacts.length;j++) {
        if (contacts[j].groupId==id) {
            contacts.splice(j,1);
            j--;
        }
    }
    for (var i=0;i<groups.length;i++){
        if (groups[i].parentId==id) {
            deleteAllChildrens(groups[i].id);
            groups.splice(i,1);
            i--;
        }
    }
    for ( i=0;i<groups.length;i++){
        if (groups[i].id==id) {
            groups.splice(i,1);
            return true;
        }
    }
    return false;
}
function printContacts(id,tab){
    for (var i=0;i<contacts.length;i++){
        if (contacts[i].groupId==id) {
            console.log(tab + "-"  + contacts[i].firstName  +" "+
                contacts[i].lastName  +" "+
                contacts[i].phone + "(" + contacts[i].id + ")");
        }
    }
}
function getChildrens(id){
    var result=[];
    for (var i=0;i<groups.length;i++){
        if (groups[i].parentId==id) {
            result.push(groups[i]);
        }
    }
    return result;
}