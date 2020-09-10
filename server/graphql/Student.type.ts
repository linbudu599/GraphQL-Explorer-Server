import { gql } from "apollo-server-koa";

export default gql`
  type Data {
    uid: Int
    name: String
    age: Int
    gender: String
    stage: String
    favoTech: String
  }

  type Student {
    classID: String
    name: String
    isMale: Boolean
    age: Int
  }

  type Query {
    students: [Student]!
    datas: [Data]!
  }
`;

export interface IStudent {
  classID: string;
  name: string;
  isMale: boolean;
  age: number;
}
