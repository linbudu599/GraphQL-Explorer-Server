import studentTypeDefs, { IStudent } from "../graphql/Student.type";
import { IData } from "../datasource/Student";

const studentResolver = {
  Query: {
    students: (): IStudent[] => [
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

    datas: async (_source, { id }, { dataSources }): Promise<IData[]> => {
      const origin = await dataSources.DataAPI.getAllData();
      return origin.map(({ uid, name, age, gender, stage, favoTech }) => ({
        uid,
        name,
        age,
        gender,
        stage,
        favoTech,
      }));
    },
  },
};

export default studentResolver;
