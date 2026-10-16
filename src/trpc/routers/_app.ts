import { agentsRouter } from '@/modules/agents/server/procedures';
import { createTRPCRouter } from '../init';
import { meetingsRouter } from '@/modules/meetings/server/procedures';


import { notificationsRouter } from '@/modules/notifications/server/procedures';
import { integrationsRouter } from '@/modules/integrations/server/procedures';
import { billingRouter } from '@/modules/billing/server/procedures';
import { analyticsRouter } from '@/modules/analytics/server/procedures';

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
  notifications: notificationsRouter,
  integrations: integrationsRouter,
  billing: billingRouter,
  analytics: analyticsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;