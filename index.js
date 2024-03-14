const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const port = 9000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const messages = [];

app.get("/message", (req, res) => {
  res.json({ info: "Hello World Sandeep!", status: 200, firstName: "sandeep" });
});

app.post("/message", (req, res) => {
  if (req.body) {
    messages.push(req.body);
  }
  res.status(201).json({ message: "Message created!" });
});

app.get("/message/all", (req, res) => {
  res.json(messages);
});

app.delete("/message/:param", (req, res) => {
  const elementToDelete = req.params.param;
  const index = messages.findIndex((element) =>{
   return element.message === elementToDelete;
    })
  if (!elementToDelete || elementToDelete === "") {
    return res
      .status(400)
      .json({ message: "Missing or empty element parameter." });
  }
  if(index !== -1) {
    messages.splice(index,1);
    return res.json({ message: `Deleted element ${elementToDelete} from the array.`,});
  } else {
    return res
      .status(404)
      .json({ message: `Element ${elementToDelete} not found` });
  }
  console.log(req.params);
 /*  if (req.params) {
     messages.remove(req.params);
   } */
   res.status(200).json({ message: "Message deleted!" });
});

app.listen(port, () => {
  console.log(`hello-world-api app listening on port ${port}`);
});
