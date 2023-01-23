import db from "../config/db.js"
import dayjs from "dayjs"



let hora = dayjs().format("DD/MM")



export const entrada = async (req, res) => {

    const { tipo, valor, descricao } = req.body

    const { authorization } = req.headers

    const token = authorization?.replace("Bearer", "")

    try {

        if (!token) return res.status(422).send("Por favor, informe o token!")


        const checkUser = await db.collection("sessoes").findOne({ token })

        if (!checkUser) return res.status(401).send("Você não possui autorização")


        const usuario = await db.collection("sessoes").insertOne({
            idUser: checkUser._id,
            valor: valor,
            tipo: "entrada",
            descricao: descricao,
            dia: hora,
        })

        res.status(201).send("Entrada cadastrada")

    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }

}

export const saida = async (req, res) => {
    const { tipo, valor, descricao } = req.body

    const { authorization } = req.headers

    const token = authorization?.replace("Bearer ", '')

    try {

        if (!token) return res.status(422).send("Por favor, informe o token!")


        const checkUser = await db.collection("sessoes").findOne({ token })

        if (!checkUser) return res.status(401).send("Você não tem autorização para cadastrar uma nova saída")

        await db.collection("carteira").insertOne({
            idUser: checkUser._id,
            valor: valor,
            tipo: "saida",
            descricao: descricao,
            dia: hora,
        })

        res.status(201).send("Saída cadastrada")

    } catch (error) {
        res.sendStatus(500)
        console.log(error)

    }
}


export const getEntrada = async (req, res) => {
    const { authorization } = req.headers

    const token = authorization?.replace("Bearer ", '')

    try {

        if (!token) return res.status(422).send("Informe o token!")



        const checkUser = await db.collection("sessoes").findOne({ token })

        if (!checkUser) return res.status(401).send("Você não tem autorização para esse tipo de acesso")

        const carteira = await db.collection("carteira").find({ idUser: checkUser._id }).toArray()

        if (!carteira) return res.sendStatus(401)

        return res.send(carteira)


    } catch (err) {
        res.sendStatus(500)
        console.log(err.message)

    }
}