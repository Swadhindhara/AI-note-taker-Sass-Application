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
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader } from 'lucide-react'
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs'
import axios from 'axios'


const UploadPdf = ({ children }) => {

    const [file, setFile] = useState();
    const [open, setOpen] = useState(false);
    const [fileName, setFileName] = useState();
    const [loading, setLoading] = useState(false);
    const {user} = useUser()
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
    const getFileUrl = useMutation(api.fileStorage.getFileUrl);
    const embeddDocument = useAction(api.myAction.ingest)

    const onFileSelect = (e) => {
        setFile(e.target.files[0]);
    }

    const onUpload = async () => {
        setLoading(true);

        try {
            // Step 1: Get a short-lived upload URL
            const postUrl = await generateUploadUrl();

            // Step 2: POST the file to the URL
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file?.type },
                body: file,
            });

            const { storageId } = await result.json();
            const fileId = uuid4();
            const fileUrl = await getFileUrl({ storageId });

            // Step 3: Save the file details
            await addFileEntry({
                fileId,
                storageId,
                fileName: fileName ?? 'Untitled file',
                fileUrl,
                createdBy: user?.primaryEmailAddress?.emailAddress,
            });

            // Fetch and process the PDF content
            const apiRes = await axios.get('/api/pdf-loader?pdfUrl=' + fileUrl);
            await embeddDocument({
                splitText: apiRes.data.result,
                fileId
            });

        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false);
            setOpen(false);  // Close dialog after upload is complete
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className='w-full' asChild>
                    <Button onClick={() => setOpen(true)}>+ Upload PDF File</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload PDF File</DialogTitle>
                        <DialogDescription asChild>
                            <div>
                                <h2 className='mt-5'>Select a file to upload</h2>
                                <div className="flex gap-3 p-3 rounded-md border">
                                    <input type="file" accept='application/pdf' onChange={onFileSelect} />
                                </div>
                                <div className="mt-2">
                                    <label>File Name*</label>
                                    <Input placeholder='File Name' onChange={(e) => setFileName(e.target.value)} />
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
                        <Button onClick={onUpload} className='min-w-[90px]' disabled={loading}>
                            {loading ? <Loader className='animate-spin' /> : 'Upload'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default UploadPdf;
