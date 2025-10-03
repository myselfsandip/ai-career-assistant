import * as z from "zod";

export const personalInfoSchema = z.object({
    fullname: z.string().trim().min(1, { message: 'Fullname is required' }),
    email: z.string().trim().email({ message: 'Invalid email address' }),
    phone: z.string().trim().min(1, { message: 'Phone is required' }),
    address: z.string().trim().min(1, { message: 'Address is required' }),
    jobTitle: z.string().trim().min(1, { message: 'Job title is required' }),
    linkedIn: z.string().trim().url({ message: 'Invalid LinkedIn URL' }).optional(),
    website: z.string().trim().url({ message: 'Invalid website URL' }).optional(),
});

export type personalInfoType = z.infer<typeof personalInfoSchema>;


// Zod schema for resume validation
export const resumeSchema = z.object({
    id: z.string().optional(), // Optional for creation, auto-generated
    userId: z.string().min(1, "User ID is required"),
    title: z.string().min(1, "Title is required").default("Untitled Resume"),

    // Personal Info
    fullname: z.string().nullable().optional(),
    email: z.string().email().nullable().optional(),
    phone: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    zipCode: z.string().nullable().optional(),
    linkedIn: z.string().url().nullable().optional(),
    website: z.string().url().nullable().optional(),

    // Summary
    summary: z.string().nullable().optional(),
    jobTitle: z.string().nullable().optional(),
    yearsExperience: z.number().int().min(0).nullable().optional(),

    // Resume settings
    template: z.string().nullable().default("modern"),
    colorScheme: z.string().nullable().default("blue"),
    fontSize: z.number().int().min(8).max(24).nullable().default(12),
    fontFamily: z.string().nullable().default("Arial"),

    // Sharing
    isPublic: z.boolean().nullable().default(false),
    shareToken: z.string().nullable().optional(),
    shareExpiresAt: z.string().nullable().optional(),

    // Timestamps
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export const createResumeSchema = resumeSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const updateResumeSchema = resumeSchema.partial().omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
});


// TypeScript types
export type ResumeType = z.infer<typeof resumeSchema>;

export type CreateResumeType = Omit<ResumeType, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateResumeType = Partial<Omit<ResumeType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;


