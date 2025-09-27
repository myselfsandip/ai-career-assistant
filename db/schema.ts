import { pgTable, text, timestamp, boolean, json, integer } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const user = pgTable("user", {
    id: text('id').primaryKey().$default(() => nanoid()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const session = pgTable("session", {
    id: text('id').primaryKey().$default(() => nanoid()),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
    id: text('id').primaryKey().$default(() => nanoid()),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const verification = pgTable("verification", {
    id: text('id').primaryKey().$default(() => nanoid()),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const profiles = pgTable("profiles", {
    id: text('id').primaryKey().$default(() => nanoid()),
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
    personalInfo: json('personal_info').$type<{
        fullName: string;
        email: string;
        phone: string;
        address: string;
        jobTitle: string;
        linkedIn?: string;
        website?: string;
    }>(),
    summary: text('summary'),
    workExperience: json('work_experience').$type<Array<{
        company: string;
        position: string;
        startDate: string;
        endDate?: string;
        description: string[];
        current: boolean;
    }>>(),
    education: json('education').$type<Array<{
        institution: string;
        degree: string;
        field: string;
        startDate: string;
        endDate: string;
        gpa?: string;
    }>>(),
    skills: json('skills').$type<{
        technical: string[];
        soft: string[];
        languages: string[];
    }>(),
    projects: json('projects').$type<Array<{
        name: string;
        description: string;
        technologies: string[];
        link?: string;
    }>>(),
    certifications: json('certifications').$type<Array<{
        name: string;
        issuer: string;
        date: string;
        expiryDate?: string;
    }>>(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});

export const resumes = pgTable('resumes', {
    id: text('id').primaryKey().$default(() => nanoid()),
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
    profileId: text('profile_id').references(() => profiles.id).notNull(),
    title: text('title').notNull(),
    content: json('content'),
    template: text('template').default('modern'),
    isPublic: boolean('is_public').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const coverLetters = pgTable('cover_letters', {
    id: text('id').primaryKey().$default(() => nanoid()),
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
    profileId: text('profile_id').references(() => profiles.id).notNull(),
    jobTitle: text('job_title').notNull(),
    company: text('company').notNull(),
    content: text('content').notNull(),
    jobDescription: text('job_description'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

export const atsScores = pgTable('atsScores', {
    id: text('id').primaryKey().$default(() => nanoid()),
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
    resumeId: text('resume_id').references(() => resumes.id).notNull(),
    jobDescription: text('job_description').notNull(),
    score: integer('score').notNull(),
    feedback: json('feedback').$type<{
        strengths: string[];
        improvements: string[];
        missingKeywords: string[];
        suggestions: string[];
    }>(),
    createdAt: timestamp('created_at').defaultNow(),
});