import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './myDropzone.scss';

export default function MyDropzone(props) {
  const onDrop = useCallback(props.handleOnDrop, []);

  // const onDrop = useCallback((acceptedFiles) => {
  //   // Do something with the files
  //   console.log(acceptedFiles);
  // }, []);

  const {
    acceptedFiles, rejectedFiles, getRootProps, getInputProps,
  } = useDropzone({
    onDrop,
    accept: 'image/jpg, image/jpeg, image/png, image/gif, image/bmp, image/tiff',
  });

  // const acceptedFilesItems = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  // const rejectedFilesItems = rejectedFiles.map(file => (
  //   <p>File not supported</p>
  // ));

  return (
    <div className="dropzoneContainer" data-error={props.error}>
      <div {...getRootProps({ className: props.error ? 'dropzone dropzone--error' : 'dropzone' })}>
        <input {...getInputProps()} />
        {props.error ?
          <span>{props.error}</span>
          :
          <span>Upload a Candid</span>
        }
        {/* <em>(Only *.jpeg and *.png images will be accepted)</em> */}
      </div>
      {/* <aside>
        <h4>Accepted files</h4>
        <ul>
          {acceptedFilesItems}
        </ul>
        {rejectedFilesItems}
      </aside> */}
    </div >
  );
}
