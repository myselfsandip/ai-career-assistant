import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { requireAuth } from '@/lib/check-auth';
import { caller } from '@/trpc/server';
import {
    FileUserIcon,
    FileEditIcon,
    CheckCircleIcon,
    TrendingUp,
    Download,
    Eye,
    Plus,
    BarChart3,
    Clock,
    Star,
    Target,
    Zap
} from 'lucide-react';
import Link from 'next/link';

export default async function page() {
    await requireAuth();

    return (
        <div className='px-4 py-2'>
            {/* Welcome Header */}
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
                    Welcome to your AI Career Assistant! 🚀
                </h1>
                <p className='text-gray-600 dark:text-gray-400 text-lg'>
                    Create winning resumes, craft compelling cover letters, and optimize for ATS success
                </p>
            </div>

            {/* Quick Stats */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <Card className='bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 border-0 text-white shadow-lg dark:shadow-blue-900/20'>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-blue-100 dark:text-blue-200 text-sm font-medium'>Generated Resumes</p>
                                <p className='text-2xl font-bold'>8</p>
                                <p className='text-xs text-blue-200 dark:text-blue-300 mt-1'>+3 this week</p>
                            </div>
                            <FileUserIcon className='h-8 w-8 text-blue-200 dark:text-blue-300' />
                        </div>
                    </CardContent>
                </Card>

                <Card className='bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 border-0 text-white shadow-lg dark:shadow-emerald-900/20'>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-emerald-100 dark:text-emerald-200 text-sm font-medium'>Cover Letters</p>
                                <p className='text-2xl font-bold'>12</p>
                                <p className='text-xs text-emerald-200 dark:text-emerald-300 mt-1'>+5 this week</p>
                            </div>
                            <FileEditIcon className='h-8 w-8 text-emerald-200 dark:text-emerald-300' />
                        </div>
                    </CardContent>
                </Card>

                <Card className='bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 border-0 text-white shadow-lg dark:shadow-amber-900/20'>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-amber-100 dark:text-amber-200 text-sm font-medium'>ATS Score</p>
                                <p className='text-2xl font-bold'>92%</p>
                                <p className='text-xs text-amber-200 dark:text-amber-300 mt-1'>Excellent match</p>
                            </div>
                            <CheckCircleIcon className='h-8 w-8 text-amber-200 dark:text-amber-300' />
                        </div>
                    </CardContent>
                </Card>

                <Card className='bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 border-0 text-white shadow-lg dark:shadow-purple-900/20'>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-purple-100 dark:text-purple-200 text-sm font-medium'>Applications</p>
                                <p className='text-2xl font-bold'>24</p>
                                <p className='text-xs text-purple-200 dark:text-purple-300 mt-1'>6 interviews</p>
                            </div>
                            <TrendingUp className='h-8 w-8 text-purple-200 dark:text-purple-300' />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Feature Cards */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
                {/* Generate Resume Card */}
                <Card className='shadow-lg dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 hover:-translate-y-1 group'>
                    <CardHeader className='pb-4'>
                        <div className='flex items-center space-x-3 mb-2'>
                            <div className='p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors'>
                                <FileUserIcon className='h-6 w-6 text-blue-600 dark:text-blue-400' />
                            </div>
                            <div>
                                <CardTitle className='text-xl text-gray-800 dark:text-gray-200'>AI Resume Builder</CardTitle>
                                <CardDescription className='text-gray-600 dark:text-gray-400'>
                                    Create professional, ATS-optimized resumes
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className='pt-0'>
                        <div className='space-y-3'>
                            <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                                <Zap className='h-4 w-4 mr-2 text-yellow-500 dark:text-yellow-400' />
                                AI-powered content suggestions
                            </div>
                            <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                                <Target className='h-4 w-4 mr-2 text-green-500 dark:text-green-400' />
                                Industry-specific templates
                            </div>
                            <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                                <CheckCircleIcon className='h-4 w-4 mr-2 text-blue-500 dark:text-blue-400' />
                                ATS compatibility guaranteed
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='bg-gray-50/50 dark:bg-gray-900/50 mt-4 border-t border-gray-100 dark:border-gray-700'>
                        <CardAction className='w-full'>
                            <Link href="resume/generate">
                                <Button size="lg" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                                    <Plus className="size-4" />
                                    <span>Create New Resume</span>
                                </Button>
                            </Link>
                        </CardAction>
                    </CardFooter>
                </Card>

                {/* Cover Letter Card */}
                <Card className='shadow-lg dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 hover:-translate-y-1 group'>
                    <CardHeader className='pb-4'>
                        <div className='flex items-center space-x-3 mb-2'>
                            <div className='p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors'>
                                <FileEditIcon className='h-6 w-6 text-emerald-600 dark:text-emerald-400' />
                            </div>
                            <div>
                                <CardTitle className='text-xl text-gray-800 dark:text-gray-200'>Smart Cover Letters</CardTitle>
                                <CardDescription className='text-gray-600 dark:text-gray-400'>
                                    Craft compelling, personalized cover letters
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className='pt-0'>
                        <div className='space-y-3'>
                            <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                                <Zap className='h-4 w-4 mr-2 text-yellow-500 dark:text-yellow-400' />
                                Job-specific customization
                            </div>
                            <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                                <Star className='h-4 w-4 mr-2 text-purple-500 dark:text-purple-400' />
                                Professional tone matching
                            </div>
                            <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                                <Clock className='h-4 w-4 mr-2 text-orange-500 dark:text-orange-400' />
                                Generated in seconds
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='bg-gray-50/50 dark:bg-gray-900/50 mt-4 border-t border-gray-100 dark:border-gray-700'>
                        <CardAction className='w-full'>
                            <button className='w-full bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2'>
                                <Plus className='h-4 w-4' />
                                <span>Write Cover Letter</span>
                            </button>
                        </CardAction>
                    </CardFooter>
                </Card>

                {/* ATS Score Checker Card */}
                <Card className='shadow-lg dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 hover:-translate-y-1 group'>
                    <CardHeader className='pb-4'>
                        <div className='flex items-center space-x-3 mb-2'>
                            <div className='p-3 bg-amber-100 dark:bg-amber-900/50 rounded-xl group-hover:bg-amber-200 dark:group-hover:bg-amber-800/50 transition-colors'>
                                <CheckCircleIcon className='h-6 w-6 text-amber-600 dark:text-amber-400' />
                            </div>
                            <div>
                                <CardTitle className='text-xl text-gray-800 dark:text-gray-200'>ATS Score Checker</CardTitle>
                                <CardDescription className='text-gray-600 dark:text-gray-400'>
                                    Optimize for applicant tracking systems
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className='pt-0'>
                        <div className='space-y-3'>
                            <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                                <BarChart3 className='h-4 w-4 mr-2 text-blue-500 dark:text-blue-400' />
                                Real-time scoring
                            </div>
                            <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                                <Target className='h-4 w-4 mr-2 text-green-500 dark:text-green-400' />
                                Keyword optimization
                            </div>
                            <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                                <Zap className='h-4 w-4 mr-2 text-yellow-500 dark:text-yellow-400' />
                                Instant feedback
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='bg-gray-50/50 dark:bg-gray-900/50 mt-4 border-t border-gray-100 dark:border-gray-700'>
                        <CardAction className='w-full'>
                            <button className='w-full bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2'>
                                <CheckCircleIcon className='h-4 w-4' />
                                <span>Check ATS Score</span>
                            </button>
                        </CardAction>
                    </CardFooter>
                </Card>
            </div>

            {/* Recent Documents & Analytics */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Recent Documents */}
                <Card className='shadow-lg dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl text-gray-800 dark:text-gray-200 flex items-center space-x-2'>
                            <Clock className='h-5 w-5' />
                            <span>Recent Documents</span>
                        </CardTitle>
                        <CardDescription className='text-gray-600 dark:text-gray-400'>Your latest resumes and cover letters</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            <div className='flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow border border-blue-100 dark:border-blue-800/30'>
                                <div className='flex items-center space-x-3'>
                                    <FileUserIcon className='h-5 w-5 text-blue-600 dark:text-blue-400' />
                                    <div>
                                        <p className='font-medium text-gray-800 dark:text-gray-200'>Full Stack Developer Resume</p>
                                        <p className='text-sm text-gray-600 dark:text-gray-400'>ATS Score: 94% • 2 hours ago</p>
                                    </div>
                                </div>
                                <div className='flex space-x-2'>
                                    <button className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors'>
                                        <Eye className='h-4 w-4' />
                                    </button>
                                    <button className='text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors'>
                                        <Download className='h-4 w-4' />
                                    </button>
                                </div>
                            </div>

                            <div className='flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow border border-emerald-100 dark:border-emerald-800/30'>
                                <div className='flex items-center space-x-3'>
                                    <FileEditIcon className='h-5 w-5 text-emerald-600 dark:text-emerald-400' />
                                    <div>
                                        <p className='font-medium text-gray-800 dark:text-gray-200'>Tech Startup Cover Letter</p>
                                        <p className='text-sm text-gray-600 dark:text-gray-400'>Customized for React position • 1 day ago</p>
                                    </div>
                                </div>
                                <div className='flex space-x-2'>
                                    <button className='text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors'>
                                        <Eye className='h-4 w-4' />
                                    </button>
                                    <button className='text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors'>
                                        <Download className='h-4 w-4' />
                                    </button>
                                </div>
                            </div>

                            <div className='flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow border border-purple-100 dark:border-purple-800/30'>
                                <div className='flex items-center space-x-3'>
                                    <FileUserIcon className='h-5 w-5 text-purple-600 dark:text-purple-400' />
                                    <div>
                                        <p className='font-medium text-gray-800 dark:text-gray-200'>Senior Developer Resume</p>
                                        <p className='text-sm text-gray-600 dark:text-gray-400'>ATS Score: 89% • 3 days ago</p>
                                    </div>
                                </div>
                                <div className='flex space-x-2'>
                                    <button className='text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors'>
                                        <Eye className='h-4 w-4' />
                                    </button>
                                    <button className='text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors'>
                                        <Download className='h-4 w-4' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700'>
                        <button className='w-full py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors'>
                            View All Documents
                        </button>
                    </CardFooter>
                </Card>

                {/* Performance Analytics */}
                <Card className='shadow-lg dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl text-gray-800 dark:text-gray-200 flex items-center space-x-2'>
                            <BarChart3 className='h-5 w-5' />
                            <span>Application Success</span>
                        </CardTitle>
                        <CardDescription className='text-gray-600 dark:text-gray-400'>Track your job search performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-6'>
                            <div>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-gray-600 dark:text-gray-400'>Average ATS Score</span>
                                    <span className='font-semibold text-blue-600 dark:text-blue-400'>91%</span>
                                </div>
                                <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3'>
                                    <div className='bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 h-3 rounded-full transition-all duration-300' style={{ width: '91%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-gray-600 dark:text-gray-400'>Interview Rate</span>
                                    <span className='font-semibold text-emerald-600 dark:text-emerald-400'>25%</span>
                                </div>
                                <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3'>
                                    <div className='bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700 h-3 rounded-full transition-all duration-300' style={{ width: '25%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-gray-600 dark:text-gray-400'>Response Rate</span>
                                    <span className='font-semibold text-purple-600 dark:text-purple-400'>18%</span>
                                </div>
                                <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3'>
                                    <div className='bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 h-3 rounded-full transition-all duration-300' style={{ width: '18%' }}></div>
                                </div>
                            </div>

                            <div className='bg-gradient-to-r from-yellow-50 to-yellow-100/50 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700/30'>
                                <div className='flex items-center space-x-2 mb-2'>
                                    <Star className='h-4 w-4 text-yellow-600 dark:text-yellow-400' />
                                    <span className='font-medium text-yellow-800 dark:text-yellow-300'>Success Tip</span>
                                </div>
                                <p className='text-sm text-yellow-700 dark:text-yellow-400'>
                                    Your ATS scores are excellent! Focus on tailoring cover letters for better response rates.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700'>
                        <button className='w-full py-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium transition-colors'>
                            View Detailed Analytics
                        </button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
