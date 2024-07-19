import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  UseAfter,
} from "routing-controllers";

import { validate } from "class-validator";

import { ApiError } from "helpers/ApiError";
import { ApiResponse } from "helpers/ApiResponse";

import { IPerson } from "./Person.types";

import { CreatePerson } from "./CreatePerson.dto";

import { HTTPResponseLogger } from "app/middlewares/HTTPResponseLogger";

const storeData: IPerson[] = [];

@JsonController("/person")
export default class Person {
  @Get()
  @UseAfter(HTTPResponseLogger)
  async getAll() {
    return new ApiResponse(true, storeData);
  }

  @Get("/:id")
  async getOne(@Param("id") id: number): Promise<ApiResponse<IPerson | {}>> {
    const person = storeData.find((item) => item.id === id);

    if (!person) {
      throw new ApiError(404, {
        code: "PERSON_NOT_FOUND",
        message: `Person with id ${id} not found`,
      });
    }

    return new ApiResponse(true, person);
  }

  @Post()
  async setPerson(@Body() body: CreatePerson) {
    const errors = await validate(body);

    if (errors.length > 0) {
      throw new ApiError(400, {
        code: "PERSON_VALIDATION_ERROR",
        message: "Validation failed",
        errors,
      });
    }

    const id = storeData.length;

    storeData.push({ ...body, id });

    return new ApiResponse(true, "Person successfully created");
  }
}
