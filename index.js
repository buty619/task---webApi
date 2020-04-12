const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const controller = require("./controller/control");

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/top_dev', { useNewUrlParser: true });
//mongoose.connect('mongodb+srv://CristianB:cristian1991@cluster0-vjfaj.mongodb.net/taskApi?retryWrites=true', { useNewUrlParser: true });
mongoose.connection.on("error", function (e) { console.error(e); });
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin: 'http://localhost:5000', //ruta desde donde se hacen las peticiones
    credentials: true
}));



app.get("/todo_items", controller.findAll);
app.post("/todo_items", controller.create);
app.post("/mail", controller.mail)
app.patch('/todo_items/:id', controller.update);
app.delete('/todo_items/:id', controller.delete);

//app.listen(3000, () => console.log("Inició en puerto 3000 ..."));
app.listen(PORT, () => console.log("Inició en puerto .." + PORT));