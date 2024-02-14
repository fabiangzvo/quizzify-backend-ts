import { Router } from "express";

import { BaseRequestHandler } from "../../utilities/http/HttpUtils";
import {
  postResume,
  getResumeById,
  getAllResumes,
} from "./controllers/ResumeController";

const resumeRoutes = Router();

resumeRoutes.post("/", BaseRequestHandler(postResume));
resumeRoutes.get("/", BaseRequestHandler(getAllResumes));
resumeRoutes.get("/:resumeId", BaseRequestHandler(getResumeById));

export default resumeRoutes;
