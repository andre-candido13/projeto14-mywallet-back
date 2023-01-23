import { Router } from "express"
import { getEntrada , saida} from "../controllers/postTransaction.js"
import { entrada} from "../controllers/postTransaction.js"
import validateSchema from "../middlewares/validateSchema.js"
import { entradaSchema } from "../schemas/entradaSchema.js"



const transactionRouter = Router();


transactionRouter.get("/home", getEntrada)

transactionRouter.post("/entrada", validateSchema(entradaSchema), entrada)

transactionRouter.post("/saida", validateSchema(entradaSchema), saida)


export default transactionRouter