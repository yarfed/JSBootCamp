/**
 * Created by User on 21.02.2016.
 */
function createTree(comparator) {
    var tree = {};
    tree.root = null;
    tree.comparator = comparator;
    tree.count = 0;
    return tree;
}

function add(tree, data) {
    if (contains(tree, data)) {
        throw (new Error("item already present"));
    }
    var node = createNode(data);
    if (!tree.root) {
        tree.root = node;
    }
    else {
        var comparator = tree.comparator;
        addNode(tree.root, node, comparator);
    }
    tree.count++;
}

function addNode(root, node, comparator) {

    var compareResult = comparator(node.data, root.data);
    if (compareResult > 0) {
        if (root.right) {
            addNode(root.right, node, comparator);
        }
        else {
            root.right = node;
        }
    }
    else {
        if (root.left) {
            addNode(root.left, node, comparator);
        }
        else {
            root.left = node;
        }
    }
}

function createNode(data) {
    var node =
    {
        data: data,
        left: null,
        right: null
    };
    return node;
}

function contains(tree, data) {
    if (tree.root === null) {
        return false;
    }
    return isDataPresent(tree.root, data);
}

function isDataPresent(root, data) {
    if (root === null) {
        return false;
    }
    return (root.data == data) || (isDataPresent(root.left, data) || (isDataPresent(root.right, data)));
}

function scan(tree, func) {
    if (tree.root) {
        scanNode(tree.root, func);
    }
}

function scanNode(node, func) {
    if (!node) {
        return;
    }
    scanNode(node.left, func);
    func(node.data);
    scanNode(node.right, func);
}

function getCount(tree) {
    return tree.count;
}

function remove(tree, data) {
    var comparator = tree.comparator;
    var leftChild = tree.root.left;
    var rightChild = tree.root.right;
    var compareResult = comparator(data, tree.root.data);
    if (compareResult == 0) {
        getSmallestNode(rightChild).left = leftChild;
        tree.root = rightChild;
        tree.count--;
        return;
    }
    var side = (compareResult > 0) ? "right" : "left";
    removeNodeFromLeftOrRight(data, tree.root, comparator, side);
    tree.count--;
}

function removeNodeFromLeftOrRight(data, parentNode, comparator, side) {
    var currentNode = parentNode[side];
    var compareResult = comparator(data, currentNode.data);
    if (compareResult == 0) {
        parentNode[side] = currentNode.right;
        getSmallestNode(currentNode.right).left = currentNode.left;
        return;
    }
    side = (compareResult > 0) ? "right" : "left";
    removeNodeFromLeftOrRight(data, currentNode, comparator, side);
}

function getSmallestNode(node) {
    while (node.left) {
        node = node.left;
    }
    return node;
}

module.exports.createTree = createTree;
module.exports.add = add;
module.exports.contains = contains;
module.exports.scan = scan;
module.exports.getCount = getCount;
module.exports.remove = remove;