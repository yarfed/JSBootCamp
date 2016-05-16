"use strict";
/**
 * Created by User on 21.04.2016.
 */
var Contact = (function () {
    function Contact(parentId) {
        this.parentId = parentId;
        this.type = 'contact';
        this.phones = [null];
    }
    return Contact;
}());
exports.Contact = Contact;
//# sourceMappingURL=contact.js.map