import React, { useContext, useEffect, useState } from 'react';
import FileInput from '../../components/FileStorage/FileEditPanel/FileInput';
import FileList from '../../components/FileStorage/FileList/FileList';
import FileEditPanel from '../../components/FileStorage/FileEditPanel/FileEditPanel';
import { postFile, getFiles, getUserFiles } from '../../api/requests';
import state from '../../../GlobalState/state';

function FileStorage() {
  const [currentFile, setCurrentFile] = useState();
  const [files, setFiles] = useState([]);
  const { currentStorageUser: currentStorageUserId } = useContext(state);
  useEffect(() => {
    const fetchData = async () => {
      let response;

      if (currentStorageUserId) {
        response = await getUserFiles(currentStorageUserId);
      } else {
        response = await getFiles();
      }

      const data = response.data;
      setFiles(data);
    };

    fetchData();
  }, []);

  const sendFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('comment', '');
    const response = await postFile(formData);
    const data = await response.data;

    setFiles(data);
  };

  return (
    <>
      <FileList
        fileList={files}
        setCurrentFile={setCurrentFile}
        currentFile={currentFile}
      />
      <FileInput sendFile={sendFile} />
      { currentFile
        ? (
          <FileEditPanel
            currentFile={currentFile}
            setFiles={setFiles}
            setCurrentFile={setCurrentFile}
          />
        )
        : null }
    </>
  );
}

export default FileStorage;
