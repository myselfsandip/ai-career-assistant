import { pgTable, text, timestamp, boolean, json, integer } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

// Better-auth tables (keep as is)
export const user = pgTable("user", {
    id: text('id').primaryKey().$default(() => nanoid()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export const session = pgTable("session", {
    id: text('id').primaryKey().$default(() => nanoid()),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => new Date())
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
        .$onUpdate(() => new Date())
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
        .$onUpdate(() => new Date())
        .notNull(),
});

export const resumes = pgTable('resumes', {
    id: text('id').primaryKey().$default(() => nanoid()),
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
    title: text('title').notNull().default('Untitled Resume'),

    // Personal Info 
    fullname: text('fullname'),
    email: text('email'),
    phone: text('phone'),
    address: text('address'),
    city: text('city'),
    state: text('state'),
    zipCode: text('zip_code'),
    linkedIn: text('linked_in'),
    website: text('website'),

    // Summary 
    summary: text('summary'),
    jobTitle: text('job_title'),
    yearsExperience: integer('years_experience'),

    // Resume settings
    template: text('template').default('modern'),
    colorScheme: text('color_scheme').default('blue'),
    fontSize: integer('font_size').default(12),
    fontFamily: text('font_family').default('Arial'),

    // Sharing
    isPublic: boolean('is_public').default(false),
    shareToken: text('share_token'), // For public sharing
    shareExpiresAt: timestamp('share_expires_at'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export const workExperiences = pgTable('work_experiences', {
    id: text('id').primaryKey().$default(() => nanoid()),
    resumeId: text('resume_id').references(() => resumes.id, { onDelete: 'cascade' }).notNull(),

    company: text('company').notNull(),
    jobTitle: text('job_title').notNull(),
    location: text('location'),
    startDate: text('start_date').notNull(), // ISO date string
    endDate: text('end_date'), // null if current job
    isCurrent: boolean('is_current').default(false),

    responsibilities: json('responsibilities').$type<string[]>(),
    achievements: json('achievements').$type<string[]>(),

    displayOrder: integer('display_order').default(0), // For sorting
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export const education = pgTable('education', {
    id: text('id').primaryKey().$default(() => nanoid()),
    resumeId: text('resume_id').references(() => resumes.id, { onDelete: 'cascade' }).notNull(),

    institution: text('institution').notNull(),
    degree: text('degree').notNull(),
    major: text('major'),
    location: text('location'),
    graduationDate: text('graduation_date'),
    gpa: text('gpa'),
    honors: text('honors'),
    relevantCourses: json('relevant_courses').$type<string[]>(),

    displayOrder: integer('display_order').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export const skills = pgTable('skills', {
    id: text('id').primaryKey().$default(() => nanoid()),
    resumeId: text('resume_id').references(() => resumes.id, { onDelete: 'cascade' }).notNull(),

    technicalSkills: json('technical_skills').$type<string[]>(),
    softSkills: json('soft_skills').$type<string[]>(),
    languages: json('languages').$type<Array<{
        language: string;
        proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
    }>>(),
    certifications: json('certifications').$type<Array<{
        name: string;
        issuer: string;
        dateObtained: string;
        expirationDate?: string;
    }>>(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export const projects = pgTable('projects', {
    id: text('id').primaryKey().$default(() => nanoid()),
    resumeId: text('resume_id').references(() => resumes.id, { onDelete: 'cascade' }).notNull(),

    name: text('name').notNull(),
    description: text('description'),
    technologies: json('technologies').$type<string[]>(),
    projectUrl: text('project_url'),
    githubUrl: text('github_url'),
    startDate: text('start_date'),
    endDate: text('end_date'),

    displayOrder: integer('display_order').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export const coverLetters = pgTable('cover_letters', {
    id: text('id').primaryKey().$default(() => nanoid()),
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
    resumeId: text('resume_id').references(() => resumes.id).notNull(), // Link to specific resume

    title: text('title').notNull(),
    jobTitle: text('job_title').notNull(),
    company: text('company').notNull(),
    content: text('content').notNull(),
    jobDescription: text('job_description'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export const atsScores = pgTable('ats_scores', {
    id: text('id').primaryKey().$default(() => nanoid()),
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
    resumeId: text('resume_id').references(() => resumes.id, { onDelete: 'cascade' }).notNull(),

    jobDescription: text('job_description').notNull(),
    score: integer('score').notNull(), // 0-100

    feedback: json('feedback').$type<{
        strengths: string[];
        improvements: string[];
        missingKeywords: string[];
        suggestions: string[];
    }>(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
});
