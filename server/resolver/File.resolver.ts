import FileSchema, { IFile } from "../graphql/File.type";
import { createWriteStream } from "fs";
import mkdirp from "mkdirp";

const FileResolver = {
  Query: {
    files: () => {
      return "wuwuwu";
    },
  },

  Mutation: {
    singleUpload: async (parent, args) => {
      const { file } = args;
      console.log(file);
      const { createReadStream, mimetype, encoding, filename } = await file;

      const readableStream = createReadStream();
      const writableStream = createWriteStream(
        `../tmp/${Date.now()}-${filename}`
      );

      // TODO: error handling
      // When the upload is fully written, resolve the promise.
      // writeStream.on('finish', resolve);

      // // If there's an error writing the file, remove the partially written file
      // // and reject the promise.
      // writeStream.on('error', (error) => {
      //   unlink(path, () => {
      //     reject(error);
      //   });
      // });

      // // In Node.js <= v13, errors are not automatically propagated between piped
      // // streams. If there is an error receiving the upload, destroy the write
      // // stream with the corresponding error.
      // stream.on('error', (error) => writeStream.destroy(error));

      await readableStream.pipe(writableStream);

      return {
        mimetype,
        filename,
        encoding,
      };
    },
  },
};

export default FileResolver;
