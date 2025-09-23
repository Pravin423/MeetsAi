import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  MIN_PAGE_SIZE,
  MAX_PAGE_SIZE,
  DEFAULT_PAGE_SIZE,
} from "@/constants";

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input,ctx }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`5`,
        })
        .from(agents)
        .where(and(eq(agents.id, input.id),
        eq(agents.userid,ctx.auth.user.id),

      ));
      if(!existingAgent){
        throw new TRPCError ({code:"NOT_FOUND", message:"Agent not found"})
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      // throw new TRPCError({ code: "BAD_REQUEST" })

      return existingAgent;
    }),

  getMany: protectedProcedure
    .input(
      z
        .object({
          page: z.number().default(DEFAULT_PAGE),
          pageSize: z
            .number()
            .min(MIN_PAGE_SIZE)
            .max(MAX_PAGE_SIZE)
            .default(DEFAULT_PAGE_SIZE),
          search: z.string().nullish(),
        })
        .default({}) // ✅ allows empty input safely
    )
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input;

      const data = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`5`,
        })
        .from(agents)
        .where(
          and(
            eq(agents.userid, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db
        .select({ count: count() })
        .from(agents)
        .where(
          and(
            eq(agents.userid, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        );

      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userid: ctx.auth.user.id,
        })
        .returning();

      return createdAgent;
    }),
});
