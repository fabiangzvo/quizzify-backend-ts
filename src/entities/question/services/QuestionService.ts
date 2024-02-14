import { insertManyOptions } from "../../option/services/OptionService";
import { Option } from "../../option/models/OptionModel";
import { Question, QuestionModel } from "../models/QuestionModel";

import { getLogger } from "log4js";

const logger = getLogger();

export async function insertManyQuestions(
  questions: Array<Question>
): Promise<Array<Question>> {
  logger.info("QuestionService.InsertManyQuestions starts");

  const response = await questions.reduce(async (accum, question) => {
    const accumulator = await accum;
    const { options, description } = question;

    const optionIds = await insertManyOptions(options as Option[]);

    const [response] = await QuestionModel.insertMany([
      {
        description,
        options: optionIds,
      },
    ]);

    return Promise.resolve([...accumulator, response]);
  }, Promise.resolve([]));

  logger.info("QuestionService.InsertManyQuestions finished");
  return response.map((option) => option._id);
}
