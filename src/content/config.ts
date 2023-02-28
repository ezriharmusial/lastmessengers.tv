import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		date: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		image: z.string().optional(),
	}),
});

const pages = defineCollection({
    schema: z.object({
        index: z.number(),
        title: z.string(),
        shortTitle: z.string().optional(),
        subtitle: z.string(),
        icon: z.string().optional(),
        image: z.string().optional(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        color: z.string().optional(),
    })
});


const albums = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        image: z.string(),
        imageAlt: z.string().optional(),
        tracklist: z.array(z.string()),
        genres: z.array(z.string()),
        credits: z.string().optional(),
    })
});

const linkcasts = defineCollection({
    schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        image: z.string().optional(),
        imageRatio: z.string().optional(),
        date: z.date().optional(),
        url: z.string().optional(),
        color: z.string().optional(),
    })
});

const artists = defineCollection({
    schema: z.object({
        active: z.boolean().default(true),
        title: z.string(),
        twitter: z.string().optional(),
        instagram: z.string().optional(),
        facebook: z.string().optional(),
        audiomack: z.string().optional(),
        meaning: z.string().optional(),
        image: z.string().optional(),
        name: z.string().optional(),
        sex: z.string().optional(),
        genres: z.array(z.string()).optional(),
        languages: z.array(z.string()).optional(),
        experience: z.string().optional(),
        profession: z.array(z.string()).optional(),
        vocal_type: z.array(z.string()).optional(),
        vocal_skills: z.array(z.string()).optional(),
        performance_setup: z.array(z.string()).optional(),
        vision: z.string().optional(),
        mission: z.string().optional(),
        reason: z.string().optional(),
        wishes: z.string().optional(),
        motivation: z.string().optional(),
        inspiration: z.string().optional(),
        youth_influences: z.string().optional(),
        influential_artists: z.string().optional(),
        purpose: z.string().optional(),
        solution: z.string().optional(),
        success: z.string().optional(),
        discography: z.string().optional(),
        actions: z.string().optional(),
    })
});

export const collections = {pages, blog, linkcasts, artists, albums };
