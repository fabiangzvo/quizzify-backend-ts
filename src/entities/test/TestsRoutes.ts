import { Router } from "express";

import { BaseRequestHandler } from "@utilities/http/HttpUtils";
import {
  postTest,
  getTestById,
  getAllTests,
} from "./controllers/TestController";

const testsRoutes = Router();

testsRoutes.post("/", BaseRequestHandler(postTest));
testsRoutes.get("/", BaseRequestHandler(getAllTests));
testsRoutes.get("/:testId", BaseRequestHandler(getTestById));

export default testsRoutes;
