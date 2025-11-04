import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import { uploadImage } from "./imageUpload";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  // Image upload router
  upload: router({
    image: adminProcedure
      .input(
        z.object({
          fileBase64: z.string(),
          folder: z.enum(["services", "projects", "team"]),
        })
      )
      .mutation(async ({ input }) => {
        // Convert base64 to buffer
        const fileBuffer = Buffer.from(input.fileBase64, "base64");

        // Upload and convert to WebP
        const result = await uploadImage(fileBuffer, input.folder);

        return result;
      }),
  }),

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Services routes
  services: router({
    list: publicProcedure.query(async () => {
      return await db.getActiveServices();
    }),
    listAll: adminProcedure.query(async () => {
      return await db.getAllServices();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getServiceById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        description: z.string(),
        flower: z.string(),
        flowerMeaning: z.string(),
        targetAudience: z.string(),
        duration: z.string(),
        price: z.string(),
        details: z.string().optional(),
        imageUrl: z.string().optional(),
        displayOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        return await db.createService(input);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        flower: z.string().optional(),
        flowerMeaning: z.string().optional(),
        targetAudience: z.string().optional(),
        duration: z.string().optional(),
        price: z.string().optional(),
        details: z.string().optional(),
        imageUrl: z.string().optional(),
        displayOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateService(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteService(input.id);
        return { success: true };
      }),
  }),

  // Projects routes
  projects: router({
    list: publicProcedure.query(async () => {
      return await db.getActiveProjects();
    }),
    listAll: adminProcedure.query(async () => {
      return await db.getAllProjects();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getProjectById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        location: z.string(),
        description: z.string(),
        imageUrl: z.string().optional(),
        date: z.date().optional(),
        displayOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        return await db.createProject(input);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        location: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        date: z.date().optional(),
        displayOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateProject(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteProject(input.id);
        return { success: true };
      }),
  }),

  // Team Members routes
  team: router({
    list: publicProcedure.query(async () => {
      return await db.getActiveTeamMembers();
    }),
    listAll: adminProcedure.query(async () => {
      return await db.getAllTeamMembers();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getTeamMemberById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        role: z.string(),
        bio: z.string().optional(),
        imageUrl: z.string().optional(),
        displayOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        return await db.createTeamMember(input);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        role: z.string().optional(),
        bio: z.string().optional(),
        imageUrl: z.string().optional(),
        displayOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateTeamMember(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteTeamMember(input.id);
        return { success: true };
      }),
  }),

  // Contact Messages routes
  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        subject: z.string().optional(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.createContactMessage(input);
        return { success: true };
      }),
    listAll: adminProcedure.query(async () => {
      return await db.getAllContactMessages();
    }),
    markAsRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.markMessageAsRead(input.id);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteContactMessage(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
