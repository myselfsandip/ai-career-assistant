import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import superjson from 'superjson';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    transformer: superjson,
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
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User session not found. Please log in." });
    }
    return next({ ctx: { ...ctx, auth: session } }); //giving session data to ctx to access user data in TRPC
});

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
    const role = ctx.auth.user.role;
    if (role !== 'admin') {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have permission to access this resource",
        });
    }
    return next();
})