const User = require("./User");
const Blog  = require("./Blog");
const Comment = require("./Comment")
const { BelongsTo } = require("sequelize");

User.hasMany(Blog,{
    onDelete:"CASCADE"
});
Blog.belongsTo(User)

Blog.hasMany(Comment, {
    onDelete:"CASCADE"
})

Comment.belongsTo(Blog)

module.exports = {
    User,
    Blog,
    Comment
}