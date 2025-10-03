import { personalInfoSchema, ResumeType } from "@/lib/validations/resume";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { resumes } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

export const resumeRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query((opts) => {
            return { greeting: `hello ${opts.input.text}` };
        }),
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const userId: string = ctx.auth.user.id;
        return await db.select().from(resumes).where(eq(resumes.userId, userId)).orderBy(desc(resumes.createdAt));
    }),
    getOne: protectedProcedure.input(z.object({ resumeId: z.string().min(1, { message: 'Resume ID is required' }) })).query(async ({ input, ctx }) => {
        const userId: string = ctx.auth.user.id;
        const [data] = await db.select().from(resumes).where(and(eq(resumes.id, input.resumeId), eq(resumes.userId, userId)));
        if (!data) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Resume not found" });
        }
        return {
            ...data,
        };
    }),
    create: protectedProcedure.mutation(async ({ ctx }) => {
        const userId = ctx.auth.user.id;
        const [createdResume] = await db.insert(resumes).values({ userId: userId }).returning({ resumeId: resumes.id });
        return createdResume;
    }),
    addPersonalInfo: protectedProcedure
        .input(personalInfoSchema)
        .mutation(async ({ input, ctx }) => {
            const { fullname, email, phone, address, jobTitle, linkedIn, website } = input;
            const { auth } = ctx;
            const [updatedResume] = await db.update(resumes).set({ userId: auth.user.id, fullname, email, phone, address, jobTitle, linkedIn, website }).returning();
            return updatedResume;
        })
})