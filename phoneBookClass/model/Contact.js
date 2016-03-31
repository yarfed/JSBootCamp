/**
 * Created by User on 27.03.2016.
 */
function Contact(id, firstName, lastName, telephones) {
    Item.call(this, id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.telephones = telephones;
    this.type = "contact";
}