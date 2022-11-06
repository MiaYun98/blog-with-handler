const sequelize = require("../config/connection");
const { User, Blog } = require("../models");

const seed = async ()=> {
    await sequelize.sync({force:true});
    const users = await User.bulkCreate([
        {
            userName:"Kate",
            password:"password"
        },
        {
            userName:"Dave90",
            password:"password1"
        },
        {
            userName:"BootCamp2022",
            password:"password1!"
        }
    ],{
        individualHooks:true
    })
    const blogs = await Blog.bulkCreate([
        {
            title: "Hello nice to meet you",
            content: "This is my first blog!!",
            UserId:1
        },
        {
            title:"I want a nice shoes",
            content:"maybe the mmmm nice as possible",
            UserId:2
        },
    ])
    console.log("seeded!")
    process.exit(0)
}

seed();