import studentTypeDefs, { IStudent } from "../graphql/Student.type";
import { IWorkerData } from "../graphql/Student.type";

const studentResolver = {
  Query: {
    students: (parent, args, context, info): IStudent[] => [
      {
        name: "小林",
        classID: "001",
        age: 21,
        isMale: true,
      },
      {
        name: "小郑",
        classID: "001",
        age: 23,
        isMale: false,
      },
    ],

    workers: async (_, __, context): Promise<IWorkerData[]> => {
      const { dataSources } = context;
      const origin = await dataSources.workerAPI.getAllData();
      return origin.map(({ uid, name, age, gender, stage, favoTech }) => ({
        uid,
        name,
        age,
        gender,
        stage,
        favoTech,
      }));
    },

    getWorkerById: async (
      _,
      { uid },
      { dataSources }
    ): Promise<IWorkerData> => {
      const res = await dataSources.workerAPI.getByUid(uid);
      return res;
    },
  },
};

export default studentResolver;
