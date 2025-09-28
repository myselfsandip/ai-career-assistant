'use client';
import { useState } from 'react';
import { useTRPC } from '@/server/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';

export default function page() {
    const [text, setText] = useState('');

    const trpc = useTRPC();

    const greetingQuery = useQuery(trpc.resume.hello.queryOptions({ text: text }))

    return (
        <form>
            <Input className='w-auto' onChange={(e) => setText(e.target.value)} />
            {greetingQuery && <p>{greetingQuery.data?.greeting}</p>}
        </form>
    );
}
