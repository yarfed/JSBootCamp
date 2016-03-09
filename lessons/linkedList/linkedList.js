/**
 * Created by User on 06.03.2016.
 */
function LinkList() {
    this.firstNode;
    this.currentNode;
}

LinkList.prototype.insertLast = function insertLast(data) {
    var node = new Node(data);

    if (!this.currentNode) {
        this.firstNode = node;
        this.currentNode = this.firstNode;
        return;
    }
    this.currentNode.next = node;
    this.currentNode = node;
};

LinkList.prototype.equals = function equals(otherList, comparator) {
    var thisArray = this.toArray();
    var otherArray = otherList.toArray();
    if (thisArray.length != otherArray.length) {
        return false;
    }
    for (var i = 0; i < thisArray.length; i++) {
        if (!comparator(thisArray[i], otherArray[i])) {
            return false;
        }
    }
    return true;
};

LinkList.prototype.toArray = function toArray() {
    var result = [];
    var nextNode = this.firstNode;
    while (nextNode) {
        result.push(nextNode.data);
        nextNode = nextNode.next;
    }
    return result;
};

function Node(data) {
    this.data = data;
    this.next = null;
}