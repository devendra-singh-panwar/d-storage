import React, { useEffect, useState } from 'react'
import ManageAccess from './ManageAccess'
import FileAccess from './FileAccess'
import { Await, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import FilePreview from './FilePreview'
import { Web3Storage } from 'web3.storage'
const Main = ({ account, signer }) => {
    const [myFiles, setMyFiles] = useState([])
    const [files, setFiles] = useState()
    const [isUploading, setProgress] = useState(false)
    const [confirmedFiles, setConfirmedFiles] = useState([])
    const [percent, setPercent] = useState(0)
    const [modal, setModal] = useState()
    const nav = useNavigate()
    const input = useRef()
    const previewFiles = useRef()
    const mySuccesToast = useRef()
    const handleSetFiles = (e) => {
        setFiles(e.target.files)
        const modal = new bootstrap.Modal(previewFiles.current);
        setModal(modal)
        modal.show();
    }
    const upload = async () => {
        setProgress(true);
        const percent = Math.floor(100 / confirmedFiles.length);
        // web3.storage starts from here ipfs
        
        const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlDNDE0NTFDMjc5ZjBBMDYxOTNiMDc5YTcxMkNEMjAzYUE1ZjA1REYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA4MjI0MzI3MzIsIm5hbWUiOiJEYXBwIn0.EvAVqJ042nWSR78UJ-OESamhZfFAGY2zpdj80uNMx5k" });
        for (const file of confirmedFiles) {
            try {
                let cid = await client.put([file.file])
                // let cid = String(Math.random() * 1000)
                const transaction = await signer.uploadFile(cid, file.name, String(file.size), file.type[0], String(new Date().getTime()))
                await transaction.wait().then(() => {
                    // navigate(`/dashboard`)
                    setPercent(perc => perc + percent);
                    getFiles()
                })
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        };
        setConfirmedFiles([])
        setPercent(0)
        setProgress(false);
        const toast = new bootstrap.Toast(mySuccesToast.current)
        toast.show()
    };
    // const [files, setFiles] = useState()
    const getFiles = async () => {
        const files = await signer.getAllFiles()
        console.log(files)
        setMyFiles(files)
    }
    useEffect(() => {
        if (signer) {
            getFiles()
        }
    }, [])
    return (
        <div className='m-3 d-flex flex-column' style={{ gap: '15px' }}>
            <input type="file" ref={input} hidden multiple onChange={(e) => handleSetFiles(e)} />
            <div className='d-flex justify-content-between align-items-center' ><div>
                <small className='text-muted'>Address :-</small>
                <p className='m-0 fw-semibold'>&bull; {account.slice(0, 10)}...</p>
            </div>
                <button className='btn btn-primary' onClick={() => nav(`myFiles/${account}`)} > <span class="badge text-bg-light">{myFiles.length}</span>&nbsp; My Files </button>
            </div>
            <div>
                <div class="card border border-secondary p-3 shadow-sm rounded-4">
                    <div class="card-body p-0  d-flex flex-column align-items-center justify-content-center" style={{ gap: '10px' }} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#0d6efd" class="bi bi-cloud-plus-fill" viewBox="0 0 16 16">
                            <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
                        </svg>
                        <div className='text-center' >
                            <h4 className='m-0 fw-bolder text-primary cursor' style={{ cursor: 'pointer' }} onClick={() => input.current.click()} >
                                Click to Add Files
                            </h4>
                            <small className='text-muted text-center' >Add and upload single or multiple files to Interplantery file system </small>
                        </div>
                        {isUploading &&
                            <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%" }}>
                                <div class="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${percent}%` }}>{percent}%</div>
                            </div>
                        }
                        <div className='d-flex justify-content-center' >
                            <button className='btn btn-primary px-4 fw-semibold' onClick={() => upload()} disabled={files ? false : true} >
                                {isUploading ? <div class="spinner-border spinner-border-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div> : 'Upload'}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center flex-md-row' style={{ gap: '12px' }} >
                <ManageAccess signer={signer} myFiles={myFiles} />
                <FileAccess signer={signer} />
            </div>
            <FilePreview previewFiles={previewFiles} files={files} setConfirmedFiles={setConfirmedFiles} modal={modal} />
            <div ref={mySuccesToast} class="  start-50 translate-middle-x toast align-items-center toast-container border-0 position-fixed bottom-0 start-50 translate-middle-x bg-success text-white my-2" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                        </svg> &nbsp;
                        Successfully uploaded all files
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main