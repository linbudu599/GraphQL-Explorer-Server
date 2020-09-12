import React from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

export const UploadFile = () => {
  const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION);
  const apolloClient = useApolloClient();

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => validity.valid && uploadFileMutation({ variables: { file } });

  return (
    <input
      type="file"
      required
      onChange={(e) => {
        // @ts-ignore
        onChange(e);
      }}
    />
  );
};

export default UploadFile;
