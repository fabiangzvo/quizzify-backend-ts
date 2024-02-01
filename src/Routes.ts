import { Router } from "express";

const mainRouter = Router();

mainRouter.get("/", (req, res) => res.send("OK"));

export default mainRouter;
