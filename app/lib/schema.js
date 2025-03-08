import { z } from "zod";

export const onboardingSchema = z.object({
    industry: z.string({
        required_error: "Please select the industry",
    }),
    subIndustry: z.string({
        required_error: "Please select a specialization",
    }),
    bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
    experience: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(
            z
                .number()
                .min(0, "Experience must be at least 0 years")
                .max(50, "Experience cannot exceed 50 years")
        ),
    skills: z
        .string()
        .transform((val) =>
            val
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
        )
        .optional(),
});