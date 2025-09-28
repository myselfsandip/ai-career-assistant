import { personalInfoSchema } from "@/lib/validations/resume";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { resumes } from "@/server/db/schema";
import { z } from "zod";

export const resumeRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query((opts) => {
            return { greeting: `hello ${opts.input.text}` };
        }),
    create: protectedProcedure
        .input(personalInfoSchema)
        .mutation(async ({ input, ctx }) => {
            const { fullname, email, phone, address, jobTitle, linkedIn, website } = input;
            const { auth } = ctx;
            const [createdResume] = await db.insert(resumes).values({ userId: auth.user.id, fullname, email, phone, address, jobTitle, linkedIn, website }).returning();
            return createdResume;
        })
})