const express = require("express");
const app = express();
var cors = require("cors");
const e = require("express");
const port = 9000;

app.use(express.json()); //json
app.use(express.raw()); // ?
app.use(express.text()); //text
app.use(express.urlencoded({ extended: true })); //form data or url-encoded
app.use(cors());

// const messages = [{ message: "1" }, { message: "2" }];

const messages = [];

/*const messages = [
 // { message: "Message1", editing: false },
 // { message: "Message2", editing: false },
]; */

app.get("/message", (req, res) => {
  res.json({ msg: "Hello World from api!" });
});

app.post("/message", (req, res) => {
  if (req.body) {
    messages.push({idx:messages.length+1,...req.body});
  }
  res.status(201).json({ msg: "Message created!" });
});

app.get("/message/all", (req, res) => {
  res.json(messages);
});

app.delete("/message/:text", (req, res) => {
  const textToRemove = req.params.text;

  const index = messages.findIndex((o) => o.message === textToRemove);

  console.log(`text: ${textToRemove}, index: ${index}`);

  if (index !== -1) {
    messages.splice(index, 1);
    res.json({ msg: "Message deleted!" });
  } else {
    res.status(404).json({ msg: "Message not found!" });
  }
});

app.put("/message/:idx", (req, res) => {
  const idx = req.params.idx;
  const updatedMessage = req.body.message;
  const messageToModif = messages.find((m) => m.idx == idx);

  console.log(messageToModif);

  if (messageToModif) {
    messageToModif.message = updatedMessage;
    res.json({ msg: "Message updated!" });
  } else {
    res.status(404).json({ msg: "Message not found!" });
  }
});

app.listen(port, () => {
  console.log(`hello-world-api app started on port ${port}`);
});
