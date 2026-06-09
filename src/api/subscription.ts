import { client } from '.';
import { SubscriptionPlan } from '../types';

export default {
    getSubscription: async () => client.get('/subscription'),
    subscribe: async (plan: SubscriptionPlan) => client.post('/subscription', { plan }),
    cancelRenewal: async () => client.patch('/subscription/cancel-renewal'),
    getStatus: async () => client.get('/subscription/status'),
}
