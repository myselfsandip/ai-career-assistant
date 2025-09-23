"use client"

import DashboardLayout from '@/components/layouts/DashboardLayout'
import { authClient } from '@/lib/auth-client';
import React from 'react'




export default function page() {

    const { data: session } = authClient.useSession();


    return (
        <DashboardLayout>
            overview
            {
                session ? ' Session exists' : ''
            }
        </DashboardLayout>
    )
}
