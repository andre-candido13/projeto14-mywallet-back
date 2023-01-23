import { Router } from "express";
import { signIn } from "../controllers/sign-in.js";
import { signUp } from "../controllers/sign-up.js";
import { usuarioSchema2 } from "../schemas/signInSchemas.js";
import { usuarioSchema } from "../schemas/signUpSchemas.js";
import validateSchema from "../middlewares/validateSchema.js"


const router = Router()


router.post("/sign-in", validateSchema(usuarioSchema2), signIn)

router.post("/sign-up", validateSchema(usuarioSchema), signUp)

export default router

