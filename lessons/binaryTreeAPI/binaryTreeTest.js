/**
 * Created by User on 21.02.2016.
 */
var treeAPI = require("./binaryTreeAPI");
var comparator = function (a,b){
    return a-b;
};

var printer = function (data){
    console.log(data);
};

var tree = treeAPI.createTree(comparator);
treeAPI.add(tree, 10);
treeAPI.add(tree,5);
treeAPI.add(tree, 11);
treeAPI.add(tree, 55);
treeAPI.add(tree, 12);
treeAPI.add(tree,3);
treeAPI.scan(tree,printer);
console.log(treeAPI.getCount(tree));
console.log(treeAPI.contains(tree,12));
console.log(treeAPI.contains(tree,13));
treeAPI.remove(tree,11);
treeAPI.scan(tree,printer);
treeAPI.remove(tree,10);
treeAPI.scan(tree,printer);
console.log(treeAPI.getCount(tree));
treeAPI.add(tree, 8);
treeAPI.add(tree, 4);
treeAPI.scan(tree,printer);
console.log(treeAPI.getCount(tree));

