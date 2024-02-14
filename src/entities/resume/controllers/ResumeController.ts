import { Response } from "express";

import { CustomRequest } from "../../../utilities/http/HttpUtils";
import { Resume, ResumeModel } from "../../resume/models/ResumeModel";
import { schemasValidation } from "../../../utilities/http/SchemasValidator";
import createResumeSchema from "../schemas/CreateResume";

export async function postResume(
  req: CustomRequest<null, Resume, Resume>,
  res: Response
): Promise<Response<Resume>> {
  const { body, logger } = req;
  logger.info("ResumeController.postResume starts");

  schemasValidation(createResumeSchema, body);
  const { time, correctAnswers, rating, test, presentedAt } = body;

  const insertedTest = await ResumeModel.insertMany([
    { time, correctAnswers, rating, test, presentedAt },
  ]);

  logger.info("ResumeController.postResume finished");
  return res.json(insertedTest);
}

export async function getResumeById(
  req: CustomRequest<Record<string, string>, void, { resumeId: string }>,
  res: Response
): Promise<Response<Resume>> {
  const { query, logger } = req;
  logger.info("ResumeController.getResumeById starts");

  const { resumeId } = query;

  const test = await ResumeModel.findById(resumeId);

  logger.info("ResumeController.getResumeById finished");
  return res.json(test);
}

export async function getAllResumes(
  req: CustomRequest,
  res: Response
): Promise<Response<Resume>> {
  const { logger } = req;
  logger.info("ResumeController.getAllResumes starts");

  const resumes = await ResumeModel.find({});

  logger.info("ResumeController.getAllResumes finished");

  return res.json(resumes);
}
