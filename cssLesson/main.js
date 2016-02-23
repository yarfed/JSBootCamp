/**
 * Created by User on 23.02.2016.
 */

function addSelectedClass(id) {
    var classes = document.getElementsByClassName('simpsons');
    for (var i = 0; i < classes.length; i++) {
        classes[i].classList.remove('selected');
    }
    var element = document.getElementById(id);
    element.classList.add('selected');
}