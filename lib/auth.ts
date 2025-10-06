import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { captcha } from "better-auth/plugins";


export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    emailAndPassword: {
        enabled: true
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema
        }
    }),
    advanced: {
        database: {
            generateId: false // i am  using nanoid() in my schema
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                input: false,
            },
        }
    },
    plugins: [
        captcha({
            provider: "cloudflare-turnstile", 
            secretKey: process.env.TURNSTILE_SECRET_KEY!,
        }),
    ],
});