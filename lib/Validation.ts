import * as z from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(10),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
});

export const AnswerValidation = z.object({
  answer: z.string().min(10),
});

export const ProfileValidation = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  bio: z.union([z.string().min(5).max(50), z.literal("")]),
  portfolioWebsite: z.union([z.string().url(), z.literal("")]),
  location: z.union([z.string().min(5).max(50), z.literal("")]),
});
