import { z } from "zod";

import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { AgentsInsertSchema } from "../schema";
import { eq } from "drizzle-orm";

export const agentRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));
      // throw new TRPCError({ code: "BAD_REQUEST" });
      return existingAgent;
    }),

  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);
    // throw new TRPCError({ code: "BAD_REQUEST" });
    return data;
  }),
  create: protectedProcedure
    .input(AgentsInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({ ...input, userId: ctx.auth.user.id })
        .returning();
      return createdAgent;
    }),
});
