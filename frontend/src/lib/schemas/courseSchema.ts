import { z } from "zod";

// Nested lesson schema
const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  content: z.string().optional(),
  duration: z.number().min(0).optional(),
});

// Main course schema
export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  tags: z.array(z.string()).optional(),
  thumbnail: z.string().url().optional(),
  lessons: z.array(lessonSchema).optional(),
});

export type courseSchameType = z.infer<typeof courseSchema>;
export type lessonSchameType = z.infer<typeof lessonSchema>;
