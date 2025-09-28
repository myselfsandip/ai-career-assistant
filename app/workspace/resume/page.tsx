import { caller } from "@/server/trpc/server";

const page = async () => {

    const result = await caller.resume.hello({
        text: 'Sandip Singha'
    })
    return (
        <div>{result?.greeting}</div>
    )
}


export default page;