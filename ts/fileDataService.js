/**
 * Created by User on 08.04.2016.
 *
 */
'use strict';
var fs = require('fs-promise');

function getAll() {
    return fs.readFile('data.json', 'utf8');
}

function getById(id) {

    return fs.readJson('data.json', {encoding: 'utf8'}).then(function (data) {
        var result;
        data.forEach(function (item) {
            if (item.id == id) {
                result= item;
            }
        });
     if (!result) {
         throw new Error ('not found');
     }
        return result;
    });
}

function getChilds(id) {
    return fs.readJson('data.json', {encoding: 'utf8'}).then(function (data) {
        var result=[];
        data.forEach(function (item) {
            if (item.parentId == id) {
                result.push (item);
            }
        });
        return result;
    });
}

function search(req) {
    return fs.readJson('data.json', {encoding: 'utf8'}).then(function (data) {
        var result=[];
        data.forEach(function (current) {
            if (current.type == 'group' && current.name.toLowerCase() == req) {
                result.push(current);
            }
            if (current.type == 'contact' &&
                (current.firstName.toLowerCase() == req || current.lastName.toLowerCase() == req)) {
                result.push(current);
            }
        });
        return result;
    });
}

function save(item) {

    return fs.readJson('data.json', {encoding: 'utf8'}).then(function (data) {
        if (!item.id) {
            item.id = getNextId(data);

        } else {
            data.forEach(function (oldItem, i) {
                if (item.id == oldItem.id) {
                    data.splice(i, 1);
                }
            });
        }
        data.push(item);
        return fs.writeJson('data.json', data).then(function () {
            return item;
        });
    });
}

function del(id) {

    return fs.readJson('data.json', {encoding: 'utf8'}).then(function (data) {
        delFromArray(id, data);
        return fs.writeJson('data.json', data).then(function () {
            return data;
        });
    });
}

function delFromArray(id, items) {
    markToDelete(id, items);
    for (var i = 0; i < items.length; i++) {
        if (items[i].id == id) {
            items[i].deleted = true;
        }
    }
    for (var i = 0; i < items.length; i++) {
        if (items[i].deleted) {
            items.splice(i, 1);
            i--;
        }
    }
}

function markToDelete(id, items) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].parentId == id) {
            markToDelete(items[i].id, items);
            items[i].deleted = true;
        }
    }
}

function getNextId(data) {
    var id = 0;
    for (var i = 0; i < data.length; i++) {
        id = Math.max(id, data[i].id);
    }
    return ++id;
}

module.exports.getAll = getAll;
module.exports.del = del;
module.exports.save = save;
module.exports.getById = getById;
module.exports.getChilds = getChilds;
module.exports.search = search;