import useSWR from 'swr';
import { useDI } from '../providers/DIProvider';

export const useSubscriptionQuery = () => {
    const { getSubscriptionStatusUseCase } = useDI();
    return useSWR('subscription', () => getSubscriptionStatusUseCase.execute());
};

export const useInvoicesQuery = () => {
    const { getInvoicesUseCase } = useDI();
    return useSWR('invoices', () => getInvoicesUseCase.execute());
};

export const useSubscriptionActions = () => {
    const { updatePlanUseCase, cancelSubscriptionUseCase } = useDI();
    const { mutate } = useSWR('subscription');

    const updatePlan = async (planId: string) => {
        await updatePlanUseCase.execute(planId);
        mutate();
    };

    const cancelSubscription = async () => {
        await cancelSubscriptionUseCase.execute();
        mutate();
    };

    return { updatePlan, cancelSubscription };
};

