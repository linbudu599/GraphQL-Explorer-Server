import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

export interface IData {
  uid: number;
  name: string;
  age: number;
  gender: "male" | "female";
  stage: "primary" | "middleware";
  favoTech: string;
}

export default class OldAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://api.linbudu.top/data";
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", "xxx");
  }

  async getAllData(): Promise<IData[]> {
    const res = ((await this.get(`/`)) as any).data;
    return res;
  }
}
