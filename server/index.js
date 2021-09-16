const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();

const accountSid = process.env.SID;
const messagingSid = process.env.MESSAGING_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.post("/", (req, res) => {
  const { message, user: sender, type, members } = req.body;

  if (type === "message.new") {
    members
      .filter((member) => member.user_id !== sender.id)
      .forEach(({ user }) => {
        if (!user.online) {
          twilioClient.messages
            .create({
              body: `You have a new message from ${message.fullName} - ${message.text}`,
              messagingServiceSid: messagingSid,
              to: user.phoneNumber,
            })
            .then(() => console.log("message sent"))
            .catch((err) => console.log(err));
        }
      });
      return res.status(200).send('Message Sent');
  }
  return res.status(200).send('Not a new message');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
