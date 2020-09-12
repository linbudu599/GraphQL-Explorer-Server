import { gql } from "apollo-server-koa";
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
} from "graphql";
import { GraphQLUpload } from "graphql-upload";

export interface IFile {
  filename: string;
  mimetype: string;
  encoding: string;
}

// export default gql`
//   type File {
//     filename: String!
//     mimetype: String!
//     encoding: String!
//   }

//   type Query {
//     # uploads: [File]
//     files: String!
//   }

//   type Mutation {
//     singleUpload(file: ${GraphQLUpload}): File!
//   }
// `;

export const FileType = new GraphQLObjectType({
  name: "File",
  description: "A stored file.",
  fields: () => ({
    // id: {
    //   description: 'Unique ID.',
    //   type: (GraphQLID),
    // },
    path: {
      description: "Where it’s stored in the filesystem.",
      type: GraphQLString,
    },
    filename: {
      description: "Filename, including extension.",
      type: GraphQLString,
    },
    mimetype: {
      description: "MIME type.",
      type: GraphQLString,
    },
  }),
});

const typeDefs = {
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      uploads: {
        description: "All stored files.",
        type: GraphQLList(FileType),
        resolve: () => {
          return {
            filename: "xxx",
          };
        },
      },
    }),
  }),

  mutations: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
      singleUpload: {
        description: "Stores a single file.",
        type: FileType,
        args: {
          file: {
            description: "File to store.",
            type: GraphQLUpload,
          },
        },
        resolve: (parent, { file }, { storeUpload }) => {
          console.log(file);
          return {
            filename: "xxx",
          };
        },
      },
      multipleUpload: {
        description: "Stores multiple files.",
        type: GraphQLList(FileType),
        args: {
          files: {
            description: "Files to store.",
            type: GraphQLList(GraphQLUpload),
          },
        },
        // async resolve(parent, { files }, { storeUpload }) {
        //   // Ensure an error storing one upload doesn’t prevent storing the rest.
        //   const results = await Promise.allSettled(files.map(storeUpload));
        //   return results.reduce((storedFiles, { value, reason }) => {
        //     if (value) storedFiles.push(value);
        //     // Realistically you would do more than just log an error.
        //     else console.error(`Failed to store upload: ${reason}`);
        //     return storedFiles;
        //   }, []);
        // },
      },
    }),
  }),
};

export default new GraphQLSchema(typeDefs);
