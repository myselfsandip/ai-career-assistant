import React from 'react'
import { SpinningText } from '../ui/spinning-text'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText, CheckCircle, Users, Zap, Target, Rocket } from 'lucide-react'

const CallToAction = () => {
    return (
        <div className='container mt-16 mb-16'>
            {/* Hero Section with Spinning Text */}
            <div className='text-center space-y-12'>
                {/* Main Headline */}
                <div className='space-y-8'>
                    <h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white'>
                        Transform Your
                        <span className='block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
                            Career Today
                        </span>
                    </h1>

                    {/* Supporting Description */}
                    <p className='text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto'>
                        Join thousands of successful professionals who are building, scaling, and
                        transforming their careers with our AI-powered platform.
                    </p>

                    {/* CTA Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                        <Button size="lg" className="text-lg px-8 py-4">
                            Get Started Today
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                            Watch Demo
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className='pt-8'>
                        <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
                            Trusted by 10,000+ professionals worldwide
                        </p>
                        <div className='flex justify-center space-x-8 opacity-60 text-lg font-semibold'>
                            <div>TechCorp</div>
                            <div>StartupCo</div>
                            <div>InnovateLab</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spinning Text Section - Separated and Contained */}
            <div className='flex justify-center my-20 py-12'>
                <div className='relative h-32 flex items-center justify-center'>
                    <SpinningText
                        reverse
                        className="text-2xl md:text-3xl text-gray-500 dark:text-gray-400"
                        duration={12}
                        radius={10}
                    >
                        build careers • ace interviews • land jobs • grow skills •
                    </SpinningText>
                </div>
            </div>

            

            
        </div>
    )
}


export default CallToAction;