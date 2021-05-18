import React from "react"
import {useState, useRef} from "react";
import "./FileUpload.css";
const DEFAULT_MAX_FILE_SIZE = 8388608;

//This component handles file uploads
function FileUpload({
    callback,
    maxFileSize = DEFAULT_MAX_FILE_SIZE,
    ...props
                    })
{
    //State to store files
    const [files,setFiles] = useState([]);
    const fileInputField = useRef(null);
    //State to store errors
    const [error,setError] = useState(null);
    let fileType;
    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const handleNewFileUpload = (e) => {

        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callUpdateFiles(updatedFiles);
        }
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size <= maxFileSize) {
                fileType = file.type.split("/")[0];
                //Validate files
                if(fileType === "image"){

                    if (!props.multiple) {
                        return { file };
                    }
                    files[file.name] = file;
                    setError("");
                }else{
                    setError("Only image files can be uploaded");
                }

            }else{
                setError("Please make sure your file size is less than 10mb");
            }
        }
        return { ...files };
    };

    const convertToArray = (nestedObj) =>
        Object.keys(nestedObj).map((key) => nestedObj[key]);

    const callUpdateFiles = (files) => {
        callback(files);
    };

    const removeFile = (fileName) => {
        delete files[fileName];
        setFiles({ ...files });
        callUpdateFiles({ ...files });
    };

    return (
        <div>
            <div className="file-upload-container">
            <div className="upload-icon"><i className="fas fa-cloud-upload-alt"></i></div>
            <p className="drag-drop-text">Drag and drop to upload your file</p>
                <p className="drag-drop-text">or</p>
            <button type="button" className="upload-file-btn" onClick={handleUploadBtnClick}>
                <span> Browse {props.multiple ? "Images" : "Image"}</span>
            </button>
                <p className="error">{error}</p>

            <input
                className="form-field"
                type="file"
                ref={fileInputField}
                onChange={handleNewFileUpload}
                title=""
                value=""
                {...props}
            />


            <div className="file-icon-container">
                    {Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isImageFile = file.type.split("/")[0] === "image";


                        return (
                            <div key={fileName} className="single-file-icon">
                                <div>
                                    {/*Check if the file is an image*/}
                                    {isImageFile && (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`file preview ${index}`}
                                            className="img-preview"
                                        />
                                    )}
                                    <div>
                                        <span className="file-name">{file.name}</span>
                                        <i className="fas fa-trash-alt remove-file" onClick={()=>removeFile(fileName)} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            </div>
</div>
    )
}
export default FileUpload;