import React from 'react'
import { Button } from '@/components/ui/button'
import { Users, Target, Rocket, Award, Heart, Globe } from 'lucide-react'

 const AboutUs = () => {
    return (
        <section id='AboutUs' className='container mx-auto px-6 py-16'>
            {/* Hero Section */}
            <div className='text-center space-y-6 mb-16'>
                <h1 className='text-4xl md:text-6xl font-bold text-gray-900 dark:text-white'>
                    About
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
                        {' '}CareerAssist
                    </span>
                </h1>
                <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
                    Empowering professionals and organizations with AI-driven career solutions
                    that transform how people find jobs and companies discover talent.
                </p>
            </div>

            

            {/* Mission & Vision */}
            <div className='grid md:grid-cols-2 gap-8 mb-20'>
                <div className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg'>
                    <div className='flex items-center space-x-3 mb-4'>
                        <Target className='h-8 w-8 text-blue-600' />
                        <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>Our Mission</h3>
                    </div>
                    <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                        To democratize career success by providing AI-powered tools that help
                        professionals showcase their potential and enable companies to discover
                        the right talent efficiently and fairly.
                    </p>
                </div>
                <div className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg'>
                    <div className='flex items-center space-x-3 mb-4'>
                        <Rocket className='h-8 w-8 text-purple-600' />
                        <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>Our Vision</h3>
                    </div>
                    <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                        A world where career opportunities are accessible to all, where hiring
                        decisions are based on potential rather than bias, and where technology
                        serves as a bridge to professional fulfillment.
                    </p>
                </div>
            </div>

            {/* Core Values */}
            <div className='mb-20'>
                <h2 className='text-3xl font-bold text-center text-gray-900 dark:text-white mb-12'>
                    Our Core Values
                </h2>
                <div className='grid md:grid-cols-3 gap-8'>
                    <div className='text-center space-y-4'>
                        <div className='mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center'>
                            <Heart className='h-8 w-8 text-blue-600' />
                        </div>
                        <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Empathy First</h3>
                        <p className='text-gray-600 dark:text-gray-300'>
                            We understand the challenges of job searching and hiring, building
                            solutions that truly address real pain points.
                        </p>
                    </div>
                    <div className='text-center space-y-4'>
                        <div className='mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center'>
                            <Award className='h-8 w-8 text-green-600' />
                        </div>
                        <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Excellence Driven</h3>
                        <p className='text-gray-600 dark:text-gray-300'>
                            We're committed to delivering the highest quality AI solutions that
                            consistently exceed expectations and drive results.
                        </p>
                    </div>
                    <div className='text-center space-y-4'>
                        <div className='mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center'>
                            <Globe className='h-8 w-8 text-purple-600' />
                        </div>
                        <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Inclusive Impact</h3>
                        <p className='text-gray-600 dark:text-gray-300'>
                            We believe in creating opportunities for everyone, regardless of
                            background, and building technology that promotes fairness.
                        </p>
                    </div>
                </div>
            </div>

           

            <div className='text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white'>
                <h2 className='text-3xl font-bold mb-4'>Ready to Transform Your Career?</h2>
                <p className='text-xl mb-8 opacity-90'>
                    Join thousands of professionals who have already accelerated their career growth with CareerAssist
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                        Start Your Journey
                    </Button>
                    
                    <div className='hidden dark:block'>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900">
                        Contact Our Team
                    </Button>
                    </div>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-black text-black hover:bg-amber-50 hover:text-gray-900 dark:hidden">
                        Contact Our Team
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default AboutUs;
