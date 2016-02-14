/**
 * Created by User on 14.02.2016.
 */
var ori = {id: 1, name: "Ori"};
var roni = {id:2, name: "Roni"};
var udi = {id:3, name: "Udi"};
var beni = {id:4, name: "Beni"};

var pos = listInsertLast(ori);
listInsertLast(roni);
listInsertLast(udi);
listInsertBefore(pos, beni);

var pos = listGetFirst();
while (pos) {


    var data = listGetData(pos);
 console.log(data.id + ": " + data.name);
    pos = listGetNext(pos);
}


var currentPosition=null;
var firstPosition=null;


function Node (data,prev,next){
    this.data=data;
    this.prev=prev;
    this.next=next;
}
function listInsertLast(data){
    var nextPosition=null;
    if (!currentPosition) {
        currentPosition = new Node(data,null,null);
        firstPosition=currentPosition;

    }
    else {

        nextPosition = new Node(data,currentPosition,null);
        currentPosition.next=nextPosition;
        currentPosition=nextPosition;
    }
    return currentPosition;
}
function listGetNext(pos){
    return pos.next;
}
function listGetFirst(){
    return firstPosition;
}
function listGetData(pos){
    return pos.data;
}
function listInsertBefore(pos,data){
    var prevNode = pos.prev;
    var insertedNode = new Node (data,prevNode,pos);
    if (prevNode){
        prevNode.next = insertedNode;
    } else{
        firstPosition = insertedNode;
    }
    pos.prev = insertedNode;

    return insertedNode;
}