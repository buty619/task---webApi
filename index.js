const express = require("express");
const mongoose = require("mongoose");
const app = express();
const controller = require("./controller/control");


mongoose.connect('mongodb+srv://CristianB:cristian1991@cluster0-vjfaj.mongodb.net/taskApi?retryWrites=true', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });
app.use(express.json());
app.use(express.urlencoded());



app.get("/todo_items",controller.findAll);
app.post("/todo_items", controller.create);
app.patch('/todo_items/:id', controller.update);
app.delete('/todo_items/:id', controller.delete);

app.listen(3000, () => console.log("Inició en puerto 3000 ..."));