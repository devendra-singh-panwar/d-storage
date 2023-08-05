import React, { useRef, useState } from 'react'
const FileAccess = ({ signer }) => {
    const fileHash = useRef()
    const toast = useRef()
    const [isInProgress, setProgress] = useState(false)
    const access = () => {
        setProgress(true)
        signer.canAccess(fileHash.current.value).then(res => {
            if (res) {
                signer.getFile(fileHash.current.value).then(file => {
                    console.log("file", file)
                    if (file) {
                        window.open(`https://${file.fileCid}.ipfs.w3s.link/${file.fileName}`)
                    }
                })
                setProgress(false)
            }
            else {
                const myToast = new bootstrap.Toast(toast.current)
                setProgress(false)
                myToast.show()
            }
        })
    }
    return (
        <>

            <div className='w-100'>
                <div className='card rounded-4 p-3  bg-primary text-light d-flex flex-column justify-content-center align-items-center shadow-sm' style={{ gap: '10px' }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-box-arrow-in-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z" />
                        <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                    </svg>
                    <h6 className='m-0'>Access Remote Files</h6>
                    <small class='text-light text-center' > To Access Remote file , user should have proper permissions by the file owner to access the file </small>
                    <div class="input-group">
                        <input ref={fileHash} type="text" class="form-control" placeholder="File Hash" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <button className='btn btn-outline-light' onClick={() => access()} > {isInProgress ? <div className='px-3'>
                        <div class="spinner-border spinner-border-sm" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div> : 'Access file'} </button>
                </div>
            </div>
            <div ref={toast} class="toast align-items-center toast-container border-0 position-fixed bottom-0 start-50 translate-middle-x bg-danger text-white my-2" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        !  You are not authorised to access this file
                    </div>
                </div>
            </div>
        </>
    )
}

export default FileAccess