import React from 'react'
import { INITIAL_THEME_COLOR } from '@/constants/colors'
import { Skeleton } from '../ui/skeleton';

function ResumePreview() {

    return (
        <section className='flex-1 text-black '>
            <div className='h-[20px]' style={{ backgroundColor: INITIAL_THEME_COLOR }}></div>
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