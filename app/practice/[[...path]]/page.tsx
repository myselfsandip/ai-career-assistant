import React from 'react'

 const page = async ({ params }: { params: Promise<{ path?: string[] }> }) => {
    const { path } = await params;
    return (
        <div>Path: 
            {
                path?.join("/")
            }
        </div>
    )
}

export default page;
