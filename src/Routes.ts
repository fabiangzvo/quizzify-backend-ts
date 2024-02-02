import { Router } from "express";

import TestsRoutes from "@test/TestsRoutes";

const mainRouter = Router();

mainRouter.get("/", (req, res) => res.send("OK"));

mainRouter.use("/test", TestsRoutes);

export default mainRouter;
