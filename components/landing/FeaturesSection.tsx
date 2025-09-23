import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FileText, Settings2, Sparkles, CheckCircle, Mic, Users } from 'lucide-react'
import { ReactNode } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function FeaturesSection() {




    const features = [
        {
            icon: FileText,
            title: "Smart Resume & Letter",
            description:
                "Create ATS-optimized resumes and cover letters effortlessly with AI assistance",
            redirectPath: "/resume",
        },
        {
            icon: CheckCircle,
            title: "Check Your ATS Score",
            description:
                "Upload your resume and get feedback to improve your chances.",
            redirectPath: "/ats-score",
        },
        // {
        //     icon: Mic,
        //     title: "Mock Interviews",
        //     description:
        //         "Get AI-driven interview feedback to enhance your skills.",
        //     redirectPath: "/mock-interviews",
        // },
        {
            icon: Users,
            title: "Shortlist Top Talent",
            description:
                "AI-powered tools for recruiters to filter resumes efficiently.",
            redirectPath: "/hire",
        },
    ]



    return (
        <section id='features' className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Built to cover your needs</h2>
                    <p className="mt-4">Libero sapiente aliquam quibusdam aspernatur, praesentium iusto repellendus.</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">


                    {
                        features.map((item, index) => (
                            <Card key={index} className="group shadow-zinc-950/5">
                                <CardHeader className="pb-3">
                                    <CardDecorator>
                                        <item.icon className='size-6' />
                                    </CardDecorator>

                                    <h3 className="mt-6 font-medium">{item.title}</h3>
                                </CardHeader>

                                <CardContent className='flex flex-col gap-5'>
                                    <p className="text-sm">{item.description}</p>
                                    <Link href={item.redirectPath}>
                                        <Button>
                                            Try Now
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)