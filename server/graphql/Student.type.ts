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
  interface IWorker {
    uid: Int
    name: String
    age: Int
    gender: String
    stage: String
    favoTech: String
  }

  type Worker implements IWorker {
    uid: Int
    name: String
    age: Int
    gender: String
    stage: String
    favoTech: String
  }

  # FIXME: should be defined inside request payload but outside operation
  # fragment workerFields on Worker {
  #   uid: Int
  #   name: String
  #   age: Int
  #   gender: String
  # }

  type Student {
    classID: String
    name: String
    isMale: Boolean
    age: Int
  }

  type React {
    hooks: String!
  }

  type Vue {
    compositionAPI: String!
  }

  union VariousType = React | Vue

  type Query {
    students: [Student]!
    workers: [Worker]!
    getWorkerById(uid: Int): Worker
    variousReturnType(deps: Int): VariousType
  }

  enum Gender {
    FEMALE
    MALE
  }

  # just validate if server side can receive this input-object-type
  input CreateWorkerParams {
    name: String!
    age: Int!
    gender: Gender
  }

  interface MutationRes {
    code: Int!
    success: Boolean!
    msg: String!
  }

  type CreationRes implements MutationRes {
    code: Int!
    success: Boolean!
    msg: String!
    name: String!
    age: Int!
  }

  type Mutation {
    createWorker(info: CreateWorkerParams!): CreationRes
  }
`;

export default studentTypeDefs;
