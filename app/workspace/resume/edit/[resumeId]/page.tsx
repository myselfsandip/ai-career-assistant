import GenerateResumeHeader from '@/components/resume/GenerateResumeHeader';
import ResumeForm from '@/components/resume/ResumeForm';
import ResumePreview from '@/components/resume/ResumePreview';
import { ResumeInfoProvider } from '@/context/resume-info-provider';
import { requireAuth } from '@/lib/check-auth';
import React from 'react'

const page = async ({ params, }: { params: Promise<{ resumeId: string }> }) => {

    const { resumeId } = await params;
    await requireAuth();
    return (
        <div className='flex flex-col gap-6'>
            <GenerateResumeHeader />
            <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-6'>
                <div className='w-full pt-3'>
                    <ResumeForm />
                </div>
                <div className='w-full min-w-0 px-4 rounded-lg min-h-[600px]'>
                    <h3 className='text-lg font-semibold mb-4'>Resume Preview</h3>
                    <ResumeInfoProvider resumeId={resumeId} >
                        <ResumePreview />
                    </ResumeInfoProvider>
                </div>
            </div>
        </div >
    )
}


export default page; 