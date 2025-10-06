"use client"

import { INITIAL_THEME_COLOR } from '@/constants/colors'
import { Skeleton } from '../ui/skeleton';
import { useResumeContext } from '@/context/resume-info-provider';

function ResumePreview() {

    const { resumeInfo, isLoading } = useResumeContext();

    return (
        <section id='resume-preview-id' className='bg-white shadow-sm min-h-[500px] flex flex-col gap-6'>
            <div className='w-full h-4' style={{ backgroundColor: INITIAL_THEME_COLOR }}></div>
            <div className='w-full min-h-14'>
                <h2 className="font-bold text-xl text-center"
                    style={{
                        color: INITIAL_THEME_COLOR,
                    }}>
                    {resumeInfo?.fullname ?? ''}
                </h2>
            </div>
        </section>
    )
}

export default ResumePreview;


const SkeletonLoader = () => {
    return (
        <div className="w-full min-h-14">
            <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
            <Skeleton className="h-6 w-1/4 mx-auto mb-2" />
            <Skeleton className="h-6 w-1/3 mx-auto mb-2" />
            <div className="flex justify-between pt-3">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-[1.5] w-full my-2" />
        </div>
    );
};