import FooterSection from '@/components/landing/Footer';
import Navbar from '@/components/landing/Navbar';
import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <Navbar />
            {children}
            <FooterSection />
        </div>
    )
}



export default layout;