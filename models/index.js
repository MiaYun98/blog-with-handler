const User = require("./User");
const Blog  = require("./Blog")

User.hasMany(Blog,{
    onDelete:"CASCADE"
});
Blog.belongsTo(User)

module.exports = {
    User,
    Blog
}