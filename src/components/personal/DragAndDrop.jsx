import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import "./styles/modalRegistroPersonal.css";

const DragAndDrop = ({ setAvatar, avatar, selected }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    noKeyboard: true,
    onDrop,
  });

  return (
    <div {...getRootProps()} className="drag">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Coloca la imagen aqui...</p>
      ) : selected?.foto || avatar?.preview ? (
        <img src={avatar?.preview || selected?.foto} alt="" />
      ) : (
        <p>Arrastra la imagen aqui, o has click para seleccionar la imagen.</p>
      )}
    </div>
  );
};

export default DragAndDrop;
