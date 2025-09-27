import { useDropzone } from "react-dropzone";

function FileUploader({ onFileSelect }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      onFileSelect(acceptedFiles[0]);
    },
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-6 text-center cursor-pointer bg-white">
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the file here ...</p> : <p>Drag & drop ID file here, or click to select</p>}
    </div>
  );
}

export default FileUploader;
