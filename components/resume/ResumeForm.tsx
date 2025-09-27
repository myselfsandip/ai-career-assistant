import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PersonalInfoForm from './forms/PersonalInfoForm';

const ResumeForm = () => {



    return (
        <div>
            <Card className='w-full max-w-lg'>
                <div className='flex justify-end px-4 py-2 border-b'>
                    <Button>Next</Button>
                </div>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                        Get Started with the personal information
                    </CardDescription>
                </CardHeader>

                <CardContent className='grid p-0 md:grid-cols-2'>
                    <PersonalInfoForm />
                </CardContent>
            </Card>
        </div>
    )
}


export default ResumeForm;