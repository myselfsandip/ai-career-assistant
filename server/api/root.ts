import { createTRPCRouter } from "@/server/api/trpc"
import { resumeRouter } from './routers/resume';
export const appRouter = createTRPCRouter({
    resume: resumeRouter
});


// export type definition of API
export type AppRouter = typeof appRouter;