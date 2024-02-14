import { Router } from "express";

import TestsRoutes from "./entities/test/TestsRoutes";
import ResumeRoutes from "./entities/resume/ResumeRoutes";

const mainRouter = Router();

mainRouter.get("/", (req, res) => res.send("OK"));

mainRouter.use("/test", TestsRoutes);
mainRouter.use("/resume", ResumeRoutes);

export default mainRouter;
