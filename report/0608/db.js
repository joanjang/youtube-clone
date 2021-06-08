import mongoose from "mongoose";
/*
DONT TOUCH THIS FILE <3
WE ARE ALL SHARING THE SAME DB
PLEASE DONT TOUCH THIS FILE
*/
mongoose.connect(
  "mongodb+srv://wetubeadmin:wetube4ever@cluster0.uufes.mongodb.net/wetube?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection:${error}`);

db.once( "open", handleOpen );
db.on( "error", handleError );
