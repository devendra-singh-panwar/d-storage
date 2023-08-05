import { ethers } from 'ethers'
import React, { useEffect, useRef, useState } from 'react'

const Access = ({ signer, myFiles }) => {
    const [account, setAccount] = useState()
    const [filesToBeApprove, setFiles] = useState([])
    const [isInProgress, setProgress] = useState(false)
    const myModal = useRef()
    const toast = useRef()
    const mySuccesToast = useRef()
    const [myModalInst, setInst] = useState()
    const openModal = () => {
        if (account && ethers.isAddress(account)) {
            const modal = new bootstrap.Modal(myModal.current);
            setInst(modal)
            modal.show();
        }
        else {
            const myToast = new bootstrap.Toast(toast.current)
            myToast.show()
            setTimeout(() => myToast.hide(), 5000)
        }
    }

    const approve = async () => {
        const toast = new bootstrap.Toast(mySuccesToast.current)
        setProgress(true)
        for (const file of filesToBeApprove) {
            if (file.isApproved) {
                const tx = await signer.approveAccess(account, file.id)
                await tx.wait()
            }
        }
        setProgress(false)
        toast.show()
        myModalInst.hide()
    }
    useEffect(() => {
        const files = JSON.parse(JSON.stringify(myFiles)).map(file => {
            return { name: file[1], id: file[0], isApproved: file[file.length - 1].includes(account) ? true : false }
        })
        setFiles(files)
    }, [myFiles])

    return (
        <>
            <div className='w-100'>
                <div className='card rounded-4 p-3  bg-primary text-light d-flex flex-column justify-content-center align-items-center shadow-sm' style={{ gap: '10px' }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
                        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                    </svg>
                    <h6 className='m-0'>Access Management</h6>
                    <small class='text-light text-center' > Give access to your files to another users using their wallet address </small>
                    <div class="input-group">
                        <input type="text" onChange={(e) => setAccount(e.target.value)} value={account} class="form-control" placeholder="User Address" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <button className='btn btn-outline-light' onClick={() => openModal()} > Approve Access </button>
                </div>
            </div>
            <div ref={myModal} class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Approve Access</h1>

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <small className='text-muted' >
                                Approving Access to :-
                            </small>
                            <p>{account?.slice(0, 20)}...</p>
                            <hr />
                            <h6 className='text-center' >Choose Files</h6>
                            {
                                filesToBeApprove.length != 0 ? filesToBeApprove.map((file) => {
                                    return (
                                        <>
                                            <div class="form-check">
                                                <input class="form-check-input" onChange={(e) => file.isApproved = !file.isApproved} type="checkbox"
                                                    defaultChecked={file.isApproved}
                                                    id="flexCheckChecked" />
                                                <label class="form-check-label" for="flexCheckChecked">
                                                    {file.name}
                                                </label>
                                            </div>
                                        </>
                                    )
                                }) : ""
                            }
                        </div>

                        <div class="modal-footer d-flex justify-content-center">
                            <button type="button" onClick={() => approve()} class="btn btn-primary d-flex justify-content-center align-items-center" >
                                {
                                    isInProgress ? <div className='px-3'>
                                        <div class="spinner-border spinner-border-sm" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div> :
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                                            </svg> &nbsp;
                                            Approve
                                        </>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={toast} class="toast align-items-center toast-container border-0 position-fixed bottom-0 start-50 translate-middle-x bg-danger text-white my-2" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        !   Please enter valid wallet address
                    </div>
                </div>
            </div>
            <div ref={mySuccesToast} class="toast align-items-center toast-container border-0 position-fixed bottom-0 start-50 translate-middle-x bg-success text-white my-2" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                        </svg> &nbsp;
                        Successfully approved access
                    </div>
                </div>
            </div>
        </>
    )
}

export default Access