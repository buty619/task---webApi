const app = require('express')();
const Task = require("../model/Task");
var nodemailer = require('nodemailer');

require('dotenv').config()

var transporter = nodemailer.createTransport({
  service: process.env.HOST,
  auth: {
    user: process.env.MAIL,
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

exports.mail = async (req, res) =>
{
  const params = req.body;
  console.log("params", params)
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
      await transporter.sendMail(mailOptions, function (error, info)
      {
        if (error)
        {
          console.log(error);
        } else
        {
          console.log('Email sent: ' + info.response);
          res.json({ status: "OK" });
        }
      })
    }
    catch (e)
    {
      console.log(e)
    }

  }
  catch (e)
  {
    res.status(204).send('fallo la solicitud')
  }
}



