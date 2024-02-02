import { Router } from "express";

import TestsRoutes from "@test/TestsRoutes";
import ResumeRoutes from "@resume/ResumeRoutes";

const mainRouter = Router();

mainRouter.get("/", (req, res) => res.send("OK"));

mainRouter.use("/test", TestsRoutes);
mainRouter.use("/resume", ResumeRoutes);

export default mainRouter;
