/**
 * Created by User on 17.03.2016.
 */
"use strict";
function PhoneBookView(phoneBook, place) {
    this.phoneBook = phoneBook;
    this.place = place;
    this.currentItem = phoneBook.root;
    place.find(".addGroupMenu").on("click", this.addGroupClick.bind(this));
    place.find(".addContactMenu").on("click", this.addContactClick.bind(this));
    place.find(".upMenu").on("click", this.upClick.bind(this));
    place.find(".searchForm").on("submit", this.search.bind(this));
    this.groupTemplate = place.find(".groupTemplate").html();
    this.contactTemplate = place.find(".contactTemplate").html();
    this.addContactFormTemplate = place.find(".addContactFormTemplate").html();
    this.addGroupFormTemplate = place.find(".addGroupFormTemplate").html();
    this.addTelephoneFieldTemplate = place.find(".telephoneField")[0].outerHTML;
    this.showCurrentItem();
}

PhoneBookView.prototype.search = function (e) {
    e.preventDefault();
    var searchRequest = (place.find(".searchInput").val()).trim();
    if (searchRequest) {
        var searchResult = new SearchResult(searchRequest);
        if (this.currentItem.type == "search") {
            searchResult.parent = this.currentItem.parent;
        } else {
            searchResult.parent = this.currentItem;
        }

        this.currentItem = searchResult;
        this.showCurrentItem();
    }
};

PhoneBookView.prototype.addGroupClick = function () {
    if (this.currentItem.type == "group") {
        this.setView(this.addGroupFormTemplate);
        this.place.find(".form").on("submit", this.addGroup.bind(this));
        this.place.find(".form .cancel").on("click", this.showCurrentItem.bind(this));
    }
};

PhoneBookView.prototype.addGroup = function (e) {
    e.preventDefault();
    var name = this.place.find(".name").val();
    var group = new Group(this.phoneBook.nextId++, name);
    this.currentItem.addItem(group);
    this.phoneBook.saveToLocal();
    this.showCurrentItem();
};

PhoneBookView.prototype.addContactClick = function () {
    if (this.currentItem.type == "group") {
        this.setView(this.addContactFormTemplate);
        this.place.find(".form").on("submit", this.addContact.bind(this));
        this.place.find(".form .cancel").on("click", this.showCurrentItem.bind(this));
        this.place.find(".addTelephone").on("click", this.addTelephoneField.bind(this));
    }
};

PhoneBookView.prototype.addContact = function (e) {
    e.preventDefault();
    var firstName = this.place.find(".firstName").val();
    var lastName = this.place.find(".lastName").val();
    var fields = this.place.find(".fields");
    var telephones = [];
    fields.find(".telephone").each(function () {
        telephones.push($(this).val());
    });
    var contact = new Contact(this.phoneBook.nextId++, firstName, lastName, telephones);
    this.currentItem.addItem(contact);
    this.phoneBook.saveToLocal();
    this.showCurrentItem();
};

PhoneBookView.prototype.addTelephoneField = function () {
    $(this.addTelephoneFieldTemplate).insertBefore(this.place.find(".addTelephone"));
};

PhoneBookView.prototype.upClick = function () {
    var parent = this.currentItem.parent;
    if (parent) {
        this.changeCurrentItem(parent);
    }
};

PhoneBookView.prototype.setView = function (content) {
    this.place.find(".content").html(content);
};

PhoneBookView.prototype.showCurrentItem = function () {
    var currentItem = this.currentItem;
    var self = this;
    var currentView = $("<div/>");
    if (this.currentItem.type == "search") {
        this.currentItem.items = this.phoneBook.root.findItems(this.currentItem.request);
    }

    if (this.currentItem.type == "contact") {
        appendOneContactView();
    } else {
        var items = currentItem.items;
        $("<H2/>", {
            text: currentItem.name
        }).appendTo(currentView);
        appendGroupListView();
        appendContactListView();
    }

    this.setView(currentView);

    function appendGroupListView() {
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == "group") {
                var row = $(self.groupTemplate);
                row.find(".name").text(items[i].name).click(self.changeCurrentItem.bind(self, items[i]));
                row.find("button").click(self.showDeleteConfirm.bind(self, items[i]));
                currentView.append(row);
            }
        }
    }

    function appendContactListView() {
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == "contact") {
                var row = $(self.contactTemplate);
                row.find(".firstName").text(items[i].firstName).click(self.changeCurrentItem.bind(self, items[i]));
                row.find(".lastName").text(items[i].lastName);
                row.find(".telephone").text(items[i].telephones);
                row.find("button").click(self.showDeleteConfirm.bind(self, items[i]));
                currentView.append(row);
            }
        }
    }

    function appendOneContactView() {
        var contactForm = $(self.addContactFormTemplate);
        console.log(self.addContactFormTemplate);
        contactForm.find("input").attr("disabled", "disabled");
        contactForm.find("button").attr("hidden", "true");
        contactForm.find(".firstName").val(currentItem.firstName);
        contactForm.find(".lastName").val(currentItem.lastName);
        contactForm.find(".telephone").val(currentItem.telephones);
        currentView.append(contactForm);
    }
};

PhoneBookView.prototype.showDeleteConfirm = function (item) {
    var self = this;
    self.place.find(".overlay").fadeIn(400,
        function () {
            self.place.find(".modal_form")
                .css("display", "block")
                .animate({opacity: 1, top: '50%'}, 200);
            self.place.find(".modal_form .ok").focus();
        });
    self.place.find(".modal_form button").on("click", self.deleteConfirmClick.bind(self, item));
};

PhoneBookView.prototype.deleteConfirmClick = function (item, e) {
    var self = this;
    self.place.find(".modal_form button").off("click");
    self.place.find(".modal_form").animate({opacity: 0, top: "45%"}, 200,
        function () {
            $(this).css("display", "none");
            self.place.find(".overlay").fadeOut(400);
            if ($(e.target).hasClass("ok")) {
                self.phoneBook.deleteItem(item);
                self.phoneBook.saveToLocal();
                self.showCurrentItem();
            }
        }
    );
};

PhoneBookView.prototype.changeCurrentItem = function (item) {
    this.currentItem = item;
    this.showCurrentItem();
};