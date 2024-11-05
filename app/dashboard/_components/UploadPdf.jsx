"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader } from 'lucide-react'
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs'


const UploadPdf = ({ children }) => {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [loading, setLoading] = useState(false);
    const {user} = useUser()
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
    const getFileUrl = useMutation(api.fileStorage.getFileUrl);
    const onFileSelect = (e) => {
        setFile(e.target.files[0]);
    }
    const onUpload = async () => {
        setLoading(true)

        // Step 1: Get a short-lived upload URL
        const postUrl = await generateUploadUrl();
        // Step 2: POST the file to the URL
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file?.type },
            body: file,
        });
        const { storageId } = await result.json();
        console.log('storageId', storageId);
        const fileId = uuid4();
        const fileUrl = await getFileUrl({storageId:storageId})
        // step 3: save the file

        const response = await addFileEntry({
            fileId:fileId,
            storageId: storageId,
            fileName: fileName??'Untitled file',
            fileUrl: fileUrl,
            createdBy: user?.primaryEmailAddress?.emailAddress
        })
        console.log(response);
        setLoading(false)
    }


    return (
        <>
            <Dialog>
                <DialogTrigger className='w-full' asChild>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload PDF File</DialogTitle>
                        <DialogDescription asChild>
                            <div className="">
                                <h2 className='mt-5'>Select a file to upload</h2>
                                <div className="flex gap-3 p-3 rounded-md border">
                                    <input type="file" accept='application/pdf' onChange={(e) => onFileSelect(e)} />
                                </div>
                                <div className=" mt-2">
                                    <label>File Name*</label>
                                    <Input placeholder='File Name' onChange={(e) => setFileName(e.target.value)}/>
                                </div>
                                <div className="">

                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button onClick={onUpload} className='min-w-[90px]'>
                            {
                                loading ? <Loader className='animate-spin ' /> : 'upload'
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default UploadPdf