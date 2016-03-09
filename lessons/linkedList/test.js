/**
 * Created by User on 06.03.2016.
 */
(function () {
    var list1 = new LinkList();
    for (var i = 0; i < 10; i++) {
        list1.insertLast(i);
    }
    var list2 = new LinkList();
    for (var i = 0; i < 10; i++) {
        list2.insertLast(i);
    }
    var res = list1.equals(list2, function (n1, n2) {
        return n1 == n2;
    });
    console.log(res);
})();
