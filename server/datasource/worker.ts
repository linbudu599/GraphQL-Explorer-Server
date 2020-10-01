import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { IWorkerData } from "../graphql/Student.type";
import { DATA_SOURCE_URL } from "../utils/constants";

export default class WorkerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = DATA_SOURCE_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", "xxx");
  }

  async getAllData(): Promise<IWorkerData[]> {
    const res = (await this.get(`/`)).data;
    return res;
  }

  async getByUid(uid: number): Promise<IWorkerData> {
    const res = await this.get(`/query?uid=${uid}`);
    return res;
  }
}
