import { gql } from "apollo-server-koa";

export interface IWorkerData {
  uid: number;
  name: string;
  age: number;
  gender: "male" | "female";
  stage: "primary" | "middleware";
  favoTech: string;
}

export interface IStudent {
  classID: string;
  name: string;
  isMale: boolean;
  age: number;
}

const studentTypeDefs = gql`
  type Worker {
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
    workers: [Worker]!
    getWorkerById(uid: Int): Worker
  }
`;

export default studentTypeDefs;
