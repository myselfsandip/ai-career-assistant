import GenerateResumeHeader from '@/components/resume/GenerateResumeHeader';
import ResumeForm from '@/components/resume/ResumeForm';
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col gap-6'>
            <GenerateResumeHeader />
            <div className='flex flex-row gap-6'>
                <div className='w-full flex-1'>
                    <ResumeForm />
                </div>
                <div className='w-full flex-1  min-w-0 p-4 rounded-lg min-h-[600px]'>
                    <h3 className='text-lg font-semibold mb-4'>Resume Preview</h3>
                    <div className='bg-white p-4 rounded shadow-sm min-h-[500px]'>
                        Resume PDF content goes here
                    </div>
                </div>
            </div>
        </div>
    )
}


export default page;