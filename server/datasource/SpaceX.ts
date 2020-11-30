import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { SPACEX_API } from "../utils/constants";

export interface ICapsules {
  reuse_count: number;
  water_landings: number;
  land_landings: number;
  last_updated: string;
  launches: string[];
  serial: string;
  status: "unknown" | "active" | "destroyed" | "retired";
  type: string;
  id: string;
}

// 实际上是不必要的 因为Apollo的Resolver与TypeGraphQL的不兼容
// 如果要做BFF 直接在TypeGraphQL的Resolver或者FieldResolver中做
export default class WorkerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = SPACEX_API;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", "xxx");
  }

  async getAllRockets(): Promise<ICapsules[]> {
    const res = (await this.get(`/capsules`)).data;
    return res;
  }
}
