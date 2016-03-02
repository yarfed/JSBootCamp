/**
 * Created by User on 28.02.2016.
 */
var serviceLocator = require("./serviceLocator");
var logger = require("./logger");

serviceLocator.register('logger', logger);
if (serviceLocator.resolve('logger') == logger) {
    console.log('can read good');
}
else {
    console.log('cant read bad!!!');
}
try {
    serviceLocator.register('logger', logger);
    console.log('dabbling bad!!!');
}
catch (e) {
    console.log('no dabbling good');
}

