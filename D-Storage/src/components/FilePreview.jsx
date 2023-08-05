import React, { useEffect, useState } from 'react'
const FilePreview = ({ previewFiles, files, setConfirmedFiles, modal }) => {
    const [filesToBePreview, setFiles] = useState([])
    const handleFilePreview = () => {
        if (files) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    setFiles((el) => [...el, { file, src: e.target.result, name: file.name, size: file.size, type: file.type.split("/"), isIncluded: true }])
                };
                reader.readAsDataURL(file);
            });
        }
    }
    function convertBytesToSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
    function handleConfirm() {
        setConfirmedFiles(filesToBePreview)
        modal.hide()
        setFiles([])
    }
    useEffect(() => {
        handleFilePreview()
    }, [files])
    return (
        <div ref={previewFiles}
            class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
        >
            <div class="modal-dialog modal modal-dialog-scrollable  modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Preview Files</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {
                            filesToBePreview.length != 0 ? filesToBePreview.map((file, index) => {
                                return (
                                    <div class="card m-3 bg-primary shadow-sm" key={index} >
                                        
                                        {
                                            file.type[0] == 'image' ? <img src={file.src} class="card-img-top" alt="..." /> : file.type[0] == 'video' ? <video src={file.src} class="card-img-top" controls alt="..." /> : <img src='./doc.jpg' class="card-img-top img-fluid" alt="..." />
                                        }
                                        <div class="card-body bg-transparent text-white">
                                            <h6 class="card-title"> &bull; &nbsp; {file.name}</h6>
                                            <div className='d-flex justify-content-between text-light' >
                                                <small >{convertBytesToSize(file.size)}</small>
                                                <small>{file.type[1].toUpperCase()}</small>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) :
                                <div class="spinner-border spinner-border-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                        }
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button type="button" onClick={() => handleConfirm()} data-bs-dismiss="modal" class="btn btn-primary d-flex justify-content-center align-items-center" > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                        </svg> &nbsp; Confirm</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FilePreview