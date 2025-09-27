"use client"

import {  DownloadCloudIcon, EyeIcon, FileText, Lock, MoreHorizontal, Palette, Share } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

const GenerateResumeHeader = () => {
    const [resumeTitle, setResumeTitle] = useState("Untittled Document");

    return (
        <div className='flex justify-between px-4'>
            <div className='flex gap-2 items-center'>
                <FileText />
                <Input  value={resumeTitle} type='text' onChange={(e) => setResumeTitle(e.target.value)} />
                <Lock />
            </div>
            <div className='flex gap-3'>
                <Button><Palette className='size-4' />Theme</Button>
                <Button><EyeIcon className='size-4' />Preview</Button>
                <Button><DownloadCloudIcon className='size-4' />Download Resume</Button>
                <Button><Share className='size-4' />Share</Button>
                <Button><MoreHorizontal className='size-4' /></Button>
            </div>
        </div> 
    )
}


export default GenerateResumeHeader;