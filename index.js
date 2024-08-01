const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js")
const methodOverride  = require("method-override")

app.use(methodOverride("_method"));
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public"))) // THE MEANING OF THIS SENTENCE IS THAT "app.use(express.static"  is that use static files such as CSS, and then join path of directory name public , i.e public folder.
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


main().then(() => {
    console.log("Connection is successful!");
}).catch((err) => {
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatterbox');
}

// HOME PAGE
app.get("/chats", async (req,res) => {
    let chats = await Chat.find();
    res.render("index.ejs" ,{chats});
})

// TO POST A NEW CHAT
app.get("/chats/new",(req,res) => {
    res.render("new.ejs");
})

// POST REQUEST, TO TAKE THE INFORMATION ENTERED BY THE USER.
app.post("/chats",(req,res) => {
    let {from,msg,to} = req.body;
    let newChat = new Chat ({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date(),
    });
    newChat.save().then((res) => {
        console.log("chat was saved");
    }).catch((err) => {
        console.log(err);
    })
    res.redirect("/chats");
});

//EDIT ROUTE
app.get("/chats/:id/edit",async (req,res) => {
    let {id} = req.params;
    let chat  = await Chat.findById(id);
    res.render("edit.ejs", {chat});
})

//UPDATE ROUTE
app.put("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let {msg :newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id , {msg:newMsg}, {runValidators :true,new :true});
    console.log(updatedChat);
    res.redirect("/chats");
});

//DELETE ROUTE 
app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.get("/", (req,res) => {
    res.send("Root is working!");
})

app.listen(8080 , () => {
    console.log("Server is listening on port 8080");
})

