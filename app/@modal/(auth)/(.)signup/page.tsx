

import React from 'react'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import SignUpFormModal from './SignUpFormModal';

export default async function page() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!!session) {
        redirect('/workspace/overview');
    }
    return (
        <SignUpFormModal />
    )
}

