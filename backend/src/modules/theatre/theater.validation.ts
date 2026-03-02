import { z } from "zod";

export const TheaterSchema = z.object({
    name: z.string().min(3, "Name is required"),
    location: z.string().min(3, "Location is required"),
    logo: z.string().url("Invalid URL"),
    city: z.string().min(3, "City is required"),
    state: z.string().min(3, "State is required"),
});
export type TheaterInput = z.infer<typeof TheaterSchema>;