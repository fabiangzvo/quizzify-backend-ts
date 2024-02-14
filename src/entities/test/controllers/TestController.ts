import { Response } from "express";

import { CustomRequest } from "../../../utilities/http/HttpUtils";
import { Test, TestModel } from "../../test/models/TestModel";
import { schemasValidation } from "../../../utilities/http/SchemasValidator";
import { insertManyQuestions } from "../../question/services/QuestionService";
import { Question } from "../../question/models/QuestionModel";
import createTestSchema from "../schemas/CreateTest";

export async function postTest(
  req: CustomRequest<null, Test, Test>,
  res: Response
): Promise<Response<Test>> {
  const { body, logger } = req;
  logger.info("TestController.postTest starts");

  schemasValidation(createTestSchema, body);

  const { title, questions, description } = body;

  const insertedQuestions = await insertManyQuestions(questions as Question[]);

  const insertedTest = await TestModel.insertMany([
    { title, description, questions: insertedQuestions },
  ]);

  logger.info("TestController.postTest finished");
  return res.json(insertedTest);
}

export async function getTestById(
  req: CustomRequest<Record<string, string>, void, { testId: string }>,
  res: Response
): Promise<Response<Test>> {
  const { query, logger } = req;
  logger.info("TestController.getTest starts");

  const { testId } = query;

  const test = await TestModel.findById(testId);

  logger.info("TestController.getTest finished");
  return res.json(test);
}

export async function getAllTests(
  req: CustomRequest,
  res: Response
): Promise<Response<Test>> {
  const { query, logger } = req;
  logger.info("TestController.getTest starts");

  const tests = await TestModel.find({});

  const response = tests.map(({ title, questions, description, _id }) => ({
    id: _id,
    title,
    total: questions.length,
    description,
  }));

  logger.info("TestController.getTest finished");

  return res.json(response);
}
