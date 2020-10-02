import studentTypeDefs, { IStudent } from "../graphql/Student.type";
import { IWorkerData } from "../graphql/Student.type";

// TODO: Strict Type Defs

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

    variousReturnType: async (): Promise<any> => {
      return Math.floor(Math.random() * 100) % 2 === 0
        ? {
            hooks: "React Hooks",
          }
        : {
            compositionAPI: "Vue3 Composition API",
          };
    },
  },

  Mutation: {
    createWorker: async (_, { info }, __): Promise<Object> => {
      // Validated!
      console.log(info);
      return {
        code: 100,
        success: true,
        msg: "Gotcha!",
        ...info,
      };
    },
  },

  VariousType: {
    __resolveType(obj, context, info) {
      // should return determined object type [name] here!!
      return obj?.hooks ? "React" : "Vue";
    },
  },
};

export default studentResolver;
