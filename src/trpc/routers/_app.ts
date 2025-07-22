import { agentRouter } from "@/modules/agents/server/procedures";
import { meetingsRouter } from "@/modules/meetings/server/procedure";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  agents: agentRouter,
  meetings: meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
