import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import File from './File/File';
import './FileList.css';

function FileList({ fileList, currentFile, setCurrentFile }) {
  const [users, setUsers] = useState();
  useEffect(() => {
    const userList = [];

    fileList.forEach((element) => {
      userList.push(element.user__username);
    });

    const set = new Set(userList);
    const uniqUserList = Array.from(set);

    setUsers(uniqUserList);
  }, [fileList]);

  return (
    users && users.length > 1
      ? users.map((user) => (
        <div key={user}>
          <h3 className="file-list-title">{user}</h3>
          <div className="file-list-container">
            {fileList.map(
              (file) => (file.user__username === user
                ? (
                  <File
                    key={file.id}
                    id={file.id}
                    name={file.native_file_name}
                    comment={file.comment}
                    size={file.size}
                    upload={file.upload_date}
                    download={file.last_download_date}
                    currentFile={currentFile}
                    setCurrentFile={setCurrentFile}
                  />
                )
                : null),
            ) }
          </div>
        </div>
      ))
      : (
        <div className="file-list-container">
          { fileList.map(
            (file) => (
              <File
                key={file.id}
                id={file.id}
                name={file.native_file_name}
                comment={file.comment}
                size={file.size}
                upload={file.upload_date}
                download={file.last_download_date}
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
              />
            ),
          )}
        </div>
      )
  );
}

FileList.propTypes = {
  fileList: PropTypes.instanceOf(Array).isRequired,
  currentFile: PropTypes.instanceOf(Object),
  setCurrentFile: PropTypes.func.isRequired,
};

FileList.defaultProps = {
  currentFile: undefined,
};

export default FileList;
