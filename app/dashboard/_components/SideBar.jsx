import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LayoutIcon, Shield } from 'lucide-react'
import React from 'react'
import UploadPdf from './UploadPdf'

const SideBar = () => {
    return (
        <div className='shadow-md h-screen p-7 relative'>
            <img src={'/logo.svg'} alt="Company logo" />
            <div className="mt-10">
                <UploadPdf>
                    <Button className='w-full'>+ Upload PDF</Button>
                </UploadPdf>
                <div className="flex gap-2 items-center mt-5 p-3 hover:bg-slate-100 rounded-lg cursor-pointer">
                    <LayoutIcon />
                    <h2>Workspace</h2>
                </div>
                <div className="flex gap-2 items-center mt-1 p-3 hover:bg-slate-100 rounded-lg cursor-pointer">
                    <Shield />
                    <h2>Upgrade</h2>
                </div>
                <div className="absolute bottom-24 w-full flex items-center flex-col">
                    <Progress value={33} className='w-[85%]' />
                    <p className='text-md mt-1'>2 out of 5 PDFs uploaded</p>
                    <p className='text-xs text-gray-400 mt-2'>Upgrade to upload more PDFs</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar
