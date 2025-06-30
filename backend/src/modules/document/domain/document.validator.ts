import * as z from "zod";

const jobDescriptionSchema = z.object({
  jobDescription: z.string(),
});

type TJobDescription = z.infer<typeof jobDescriptionSchema>;

export const jobDescriptionValidator = (payload: unknown): TJobDescription => {
  try {
    const result = jobDescriptionSchema.parse(payload);
    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Validation error: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }
    throw error;
  }
};
