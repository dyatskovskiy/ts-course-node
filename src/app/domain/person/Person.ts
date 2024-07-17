import { Body, Get, JsonController, Param, Post } from "routing-controllers";

import { IPerson } from "./Person.types";

const storeData: IPerson[] = [];

@JsonController("/person")
export default class Person {
  @Get()
  async getAll() {
    return storeData;
  }

  @Get("/:id")
  async getOne(@Param("id") id: number): Promise<IPerson | {}> {
    const person = storeData.find((item) => item.id === id);
    return person || {};
  }

  @Post()
  async setPerson(@Body() body: IPerson) {
    storeData.push(body);

    return true;
  }
}
