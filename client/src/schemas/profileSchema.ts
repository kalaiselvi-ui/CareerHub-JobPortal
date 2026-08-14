import { z } from "zod";

export const editProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(val),
      "Invalid phone number format",
    ),
  location: z.string().optional(),
  bio: z.string().max(300, "Bio must be under 300 characters").optional(),
});

export type EditProfileSchemaType = z.infer<typeof editProfileSchema>;
