// THIS INIT FILE IS MAINLY CREATED ONLY TO INSERT SAMPLE DATA INSIDE THE DATABASE,
// THAT IS THE ONLY JOB OF THIS FILE.


const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("Connection is successful!");
}).catch((err) => {
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatterbox');
}


let allChats = [
    {
        from: "Neha",
        to: "Priya",
        msg: "Send me the notes",
        created_at: new Date(), //UTC
    },
    {
        from: "Amit",
        to: "Ravi",
        msg: "Can we meet tomorrow?",
        created_at: new Date(), //UTC
    },
    {
        from: "Sophie",
        to: "Liam",
        msg: "Are you attending the meeting?",
        created_at: new Date(), //UTC
    },
    {
        from: "Karan",
        to: "Anjali",
        msg: "Do you have the project file?",
        created_at: new Date(), //UTC
    },
    {
        from: "Max",
        to: "Emma",
        msg: "Did you finish the report?",
        created_at: new Date(), //UTC
    },
    {
        from: "Olivia",
        to: "Ethan",
        msg: "Can you review my draft?",
        created_at: new Date(), //UTC
    },
    {
        from: "James",
        to: "Sophia",
        msg: "When is the deadline for the task?",
        created_at: new Date(), //UTC
    },
    {
        from: "Mia",
        to: "Noah",
        msg: "I need your feedback on the presentation.",
        created_at: new Date(), //UTC
    },
    {
        from: "Lucas",
        to: "Ava",
        msg: "Are we still on for the project meeting?",
        created_at: new Date(), //UTC
    },
    {
        from: "Charlotte",
        to: "Oliver",
        msg: "Could you send me the updated figures?",
        created_at: new Date(), //UTC
    }
];


Chat.insertMany(allChats);