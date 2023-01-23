import db from "../config/db.js"
import bcrypt from "bcrypt"



  export const signUp = async (req, res) => {

    const { nome , email, password} = req.body


    //const { error } = usuarioSchema.validate({ nome, email, password, confirmPassword })

    //if (error) {
      //const errorMessages = error.details.map(err => err.message)
      //return res.status(422).send(errorMessages)}

    const passwordHashed = bcrypt.hashSync(password, 10)

    try {
      await db.collection("usuarios").insertOne({nome, email, password: passwordHashed})
      res.status(201).send("Usuario cadastrado!")  


    } catch (err) {
      res.status(500).send(err.message)

    }

  }