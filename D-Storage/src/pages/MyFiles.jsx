import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
const MyFiles = ({ signer }) => {
    const [myFiles, setMyFiles] = useState([])
    const mySuccesToast = useRef()
    const getFiles = async () => {
        const files = await signer?.getAllFiles()
        setMyFiles(files)
    }
    useEffect(() => {
        // if (signer) {
        getFiles()
        // }
    }, [signer])
    function convertBytesToSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
    return (
        <div>
            <Navbar />
            <h4 className='m-2 fw-bold text-center' >
                My Files
            </h4>
            <div className='d-flex flex-wrap justify-content-center' >
                {
                    myFiles?.length != 0 ? myFiles?.map((file, index) => {
                        return (
                            <div class="card m-3 bg-primary shadow-sm" key={index} style={{ width: "280px" }} >
                                {
                                    file?.fileType == 'image' ? <img src="/png.png" class="card-img-top" alt="..." /> : file?.type == 'video' ? <img src="/mp4.png" class="card-img-top" controls alt="..." /> : <img src='/doc.jpg' class="card-img-top img-fluid" alt="..." />
                                }
                                <div class="card-body bg-transparent text-white">
                                    <h6 class="card-title">  {file.fileName}</h6>
                                    <div className='d-flex justify-content-between text-light' >
                                        <small >{convertBytesToSize(file.fileSize)}</small>
                                    </div>
                                    <small className='text-light fw-light'>{file.approvals.length == 0 ? `Only ,` : ''} You {file.approvals.length != 0 ? `and ${file.approvals.length} more` : ''} have access to this file  </small>
                                    <div className='d-flex justify-content-between align-items-center' >
                                        <small>{file.fileCid.slice(0, 20)}</small>
                                        <button className='btn m-0 p-0' onClick={() => {
                                            navigator.clipboard.writeText(file.fileCid)
                                            new bootstrap.Toast(mySuccesToast.current).show()
                                        }}  > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-clipboard" viewBox="0 0 16 16">
                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                            </svg> </button>

                                    </div>
                                </div>
                                <div className='card-footer' >
                                    <button className='btn btn-light w-100' onClick={() => window.open(`https://${file.fileCid}.ipfs.w3s.link/${file.fileName}`)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-up-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z" />
                                        <path fill-rule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z" />
                                    </svg> Visit  </button>
                                </div>
                            </div>
                        )
                    }) :
                        <div class="spinner-border spinner-border my-5" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                }
            </div>
            <div ref={mySuccesToast} class="toast align-items-center toast-container border-0 position-fixed bottom-0 bg-success text-white my-2" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                        </svg> &nbsp;
                        File hash copied
                    </div>
                </div>
            </div>
        </div>
        // <p>{id}</p>
    )
}

export default MyFiles