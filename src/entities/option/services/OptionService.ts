import { Types } from "mongoose";

import { OptionModel, Option } from "../models/OptionModel";
import { getLogger } from "log4js";

const logger = getLogger();

export async function insertManyOptions(
  options: Array<Option>
): Promise<Array<Types.ObjectId>> {
  logger.info("OptionService.InsertManyOptions starts");
  const response = await OptionModel.insertMany(options);

  logger.info("OptionService.InsertManyOptions finished");
  return response.map((option) => option._id);
}
