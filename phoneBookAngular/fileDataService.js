/**
 * Created by User on 08.04.2016.
 *
 */
'use strict';
var fs = require('fs-promise');

function getAll() {
    return fs.readFile('data.json', 'utf8');
}

function init(item) {
    item.id = 0;
    return fs.writeJson('data.json', [item])
        .then(function () {
            return fs.readJson('data.json', {encoding: 'utf8'});
        });
}

function save(item) {

    return fs.readJson('data.json', {encoding: 'utf8'}).then(function (data) {
        if (!item.id) {
            item.id = getNextId(data);
            data.push(item);
        } else {
            data.forEach(function (oldItem, i) {
                if (item.id == oldItem.id) {
                    data.splice(i, 1, item);
                }
            });
        }
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
module.exports.init = init;

