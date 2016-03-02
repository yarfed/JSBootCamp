/**
 * Created by User on 01.03.2016.
 */
var book = require("../app");
var friends, good, bad, work, school;
var vasya, bibi, libi, usama, obama;

describe("adding items,", function () {
    createItems();
    it("should check that current group is root ", function () {
        expect(book.getCurrentGroup()).toBe(book.getRoot());
    });
    it("should add group in root group ", function () {
        book.addItem(friends);
        book.addItem(work);
        book.addItem(school);
        expect(book.getRoot().items).toContain(friends);
        expect(book.getRoot().items).toContain(work);
    });

    it("should add contact in root group ", function () {
        book.addItem(vasya);
        expect(book.getRoot().items).toContain(vasya);
    });

    it("should be parent == root", function () {
        expect(vasya.parent).toBe(book.getRoot());
        expect(friends.parent).toBe(book.getRoot());
    });
});
describe("change group,", function () {

    it("should check that current group is friends ", function () {
        book.changeGroup("friends");
        expect(book.getCurrentGroup()).toBe(friends);
    });
    it("should trow error no matches with name 'friends' ", function () {
        expect(function () {
            book.changeGroup("friends");
        }).toThrow();
    });
    it("should check that current changed to root afTer '..' input ", function () {
        book.changeGroup("..");
        expect(book.getCurrentGroup()).toBe(book.getRoot());
    });
    it("should trow error you already in root ", function () {
        expect(function () {
            book.changeGroup("..");
        }).toThrow();
    });
});

describe("adding items all level refreshInitialData function", function () {

    it("should check that current group is root after refresh", function () {
        Object.keys(require.cache).forEach(function(key) { delete require.cache[key] });
        book = require('../app');
        createItems();
        addTestItems();
        expect(book.getCurrentGroup()).toBe(book.getRoot());
    });

    it("should check that obama in his place", function () {

        expect(obama.parent).toBe(good);
        expect(obama.parent.parent).toBe(friends);
        expect(good.items).toContain(obama);
    });
});
describe("find items", function () {

    it("should find all items with name 'good'", function () {
       var root=book.getRoot();
        expect(book.getItemsByName(root," good")).toContain(good);
        expect(book.getItemsByName(root,"Good")).toContain(bibi);
        expect(book.getItemsByName(root,"gooD  ")).toContain(libi);
    });

    it("should check that only matches found", function () {
        var root=book.getRoot();
        expect(book.getItemsByName(root,"good").length).toEqual(3);
    });

    it("should check that only matches found", function () {
        var root=book.getRoot();
        expect(book.getItemsByName(root,"").length).toEqual(0);
        expect(book.getItemsByName(root,"goo").length).toEqual(0);
    });
});
describe("reading writing file", function () {


});

function createItems() {
    friends = book.createGroup("friends");
    good = book.createGroup("good");
    bad = book.createGroup("bad");
    work = book.createGroup("work");
    school = book.createGroup("school");
    vasya = book.createContact("vasya", "pupkin", [123,555,911]);
    bibi = book.createContact("bibi", "goOd", [123]);
    libi = book.createContact("good", "libi", [123]);
    usama = book.createContact("usama", "binladen", [123,666]);
    obama = book.createContact("barak", "obama", [777]);
}

function addTestItems() {
    book.addItem(friends);
    book.addItem(work);
    book.addItem(school);
    book.addItem(vasya);
    book.changeGroup("friends");
    book.addItem(bad);
    book.addItem(good);
    book.changeGroup("bad");
    book.addItem(usama);
    book.changeGroup("..");
    book.changeGroup("good");
    book.addItem(obama);
    book.changeGroup("..");
    book.addItem(bibi);
    book.addItem(libi);
    book.changeGroup("..");
}




