import { Router } from "express";

import { BaseRequestHandler } from "@utilities/http/HttpUtils";
import { signUp, signIn } from "./controllers/UserController";

const testsRoutes = Router();

testsRoutes.post("/sign-up", BaseRequestHandler(signUp));
testsRoutes.post("/sign-in", BaseRequestHandler(signIn));

export default testsRoutes;
