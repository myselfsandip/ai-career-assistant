import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;  //Public Routes
//Protected Routes
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
    }

    return next({ ctx: { ...ctx, auth: session } }); //giving session data to ctx to access user data in TRPC
})