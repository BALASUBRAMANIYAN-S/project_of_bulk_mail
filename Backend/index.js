const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { promises } = require("nodemailer/lib/xoauth2");
const mongoose = require("mongoose")
const credential = mongoose.model("credential", {}, "bulkmail")
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://bala:123@bulkmail.coyrlxh.mongodb.net/passkey?retryWrites=true&w=majority&appName=Bulkmail").then(function () {
 console.log("connected to the DB")
})
  .catch(function () {
    console.log("failed to connect")
  })

app.post("/sendmail", async function (req, res) {
  const msg = req.body.msg;
  const emailList = req.body.emailList;

  try {
    // 1️⃣ Get credential from DB
    const data = await credential.find();
    const cred = data[0].toJSON();

    // 2️⃣ Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: cred.user,
        pass: cred.pass, 
      },
    });

    // 3️⃣ Send mails one by one
    for (let i = 0; i < emailList.length; i++) {
      await transporter.sendMail({
        from: cred.user,
        to: emailList[i],
        subject: "Message from Bala",
        text: msg,
      });
      console.log("Email sent to: " + emailList[i]);
    }

    res.send(true);
  } catch (error) {
    console.error(error);
    res.send(false);
  }
});




app.listen(5000, function () {
  console.log("Beady bala....");
});
