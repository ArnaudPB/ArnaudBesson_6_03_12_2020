var User = require('./user');

var user = {
    name = "Admin User",
    email = "admin@gmail.com",
    password = "admin",
    role = "admin"
}
var user = {
    name = "spectator user",
    email = "spectator@gmail.com",
    password = "spectator",
    role = "spectator"
}

user.create(user, function(e) {
    if (e) {
        throw e;
    }
});