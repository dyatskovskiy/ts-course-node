import { IService } from "types/services";
import { Tcp } from "./Tcp";
import { relative } from "path";

export class App implements IService {
  private static instance: App;

  private tcp: IService = new Tcp(); // створили екземпляр класу Tcp

  constructor() {
    if (!App.instance) {
      App.instance = this;
    }

    return App.instance;
  }

  async init() {
    const { tcp } = this;

    console.log("App started.");

    await tcp.init();

    return true;
  }
}
