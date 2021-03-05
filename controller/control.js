const app = require('express')();
const Task = require("../model/Task");
var nodemailer = require('nodemailer');

require('dotenv').config()

var transporter = nodemailer.createTransport({
  service: process.env.HOST,
  auth: {
    user: process.env.FROMMAIL,
    pass: process.env.PASS
  }
});

exports.findAll = async (req, res) =>
{
  try
  {
    const listofTask = await Task.find();
    res.json(listofTask);
  } catch (e)
  {
    console.error(e);
  }
}

exports.create = async (req, res) =>
{
  console.log(req.body);
  await Task.create(req.body);
  res.status(204).send({});
}

exports.update = async (req, res, next) =>
{
  const id = req.params.id;
  const task = await Task.findById(id);
  task.title = req.body.title;
  task.done = req.body.done;
  task.updated_at = Date.now();
  try
  {
    await task.save({});
    res.status(204).send({});
  } catch (e)
  {
    return next(e);
  }
}

exports.delete = async (req, res) =>
{
  const id = req.params.id;
  const task = await Task.findById(id);
  try
  {
    task.remove(function (err)
    {
      if (err) return console.error(err);
    });
    res.status(204).send({});
  } catch (e)
  {
    return next(e);
  }
}

exports.mail = async (req, res) => {
  const params = req.body;
  console.log("[LOG] params from frontend.", params);
  try
  {
    try
    {
      var mailOptions = {
        from: process.env.FROMMAIL,
        to: process.env.TOMAIL,
        subject: params.Asunto.value,
        text: "Nombre: " + params.Nombre.value +
          " E-mail remitente: " + params["E-Mail"].value +
          " Texto: " + params.Texto.value
      };
      await transporter.sendMail(mailOptions, 
        (e, info) => {
          if (e)
          {
            console.log("[LOG] error.", e);
            res.status(400).json({ status: "fallo solicitud", error: e });
          } else
          {
            console.log("[LOG] Email sended OK.", info.response);
            res.status(200).json({ status: "OK - Mail Sended" });
          }
        }
      )

    }
    catch (e)
    {
      console.log("[LOG] error.", e);
      res.status(400).json({ status: "fallo solicitud", error: e });
    }

  }
  catch (e)
  {
    console.log("[LOG] error.", e);
    res.status(400).json({ status: "fallo solicitud", error: e });
  }
}



