import FooterSection from '@/components/home/Footer';
import Navbar from '@/components/home/Navbar';
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