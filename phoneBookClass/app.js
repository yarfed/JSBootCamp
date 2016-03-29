"use strict";
var phoneBook = new PhoneBook("vasya");
var place = $("#phoneBook");
var phoneBookView;
place.load("./templates/phoneBook.html", function () {
    place.find(".owner").html("this phoneBook of " + phoneBook.owner);
    phoneBookView = new PhoneBookView(phoneBook, place);
});
