"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { AuthRepositoryImpl } from '../../../data/repositories/auth.repository.impl';
import { SubscriptionRepositoryImpl } from '../../../data/repositories/subscription.repository.impl';
import { BillingRepositoryImpl } from '../../../data/repositories/billing.repository.impl';
import { LoginUseCase, RegisterUseCase, GetCurrentUserUseCase, LogoutUseCase } from '../../../domain/usecases/auth.usecases';
import { GetSubscriptionStatusUseCase, UpdatePlanUseCase, CancelSubscriptionUseCase } from '../../../domain/usecases/subscription.usecases';
import { GetInvoicesUseCase } from '../../../domain/usecases/billing.usecases';

interface DIContainer {
  loginUseCase: LoginUseCase;
  registerUseCase: RegisterUseCase;
  getCurrentUserUseCase: GetCurrentUserUseCase;
  logoutUseCase: LogoutUseCase;
  getSubscriptionStatusUseCase: GetSubscriptionStatusUseCase;
  updatePlanUseCase: UpdatePlanUseCase;
  cancelSubscriptionUseCase: CancelSubscriptionUseCase;
  getInvoicesUseCase: GetInvoicesUseCase;
}

const DIContext = createContext<DIContainer | null>(null);

export const DIProvider = ({ children }: { children: ReactNode }) => {
  // Instantiate Repositories
  const authRepository = new AuthRepositoryImpl();
  const subscriptionRepository = new SubscriptionRepositoryImpl();
  const billingRepository = new BillingRepositoryImpl();

  // Instantiate UseCases
  const container: DIContainer = {
    loginUseCase: new LoginUseCase(authRepository),
    registerUseCase: new RegisterUseCase(authRepository),
    getCurrentUserUseCase: new GetCurrentUserUseCase(authRepository),
    logoutUseCase: new LogoutUseCase(authRepository),
    getSubscriptionStatusUseCase: new GetSubscriptionStatusUseCase(subscriptionRepository),
    updatePlanUseCase: new UpdatePlanUseCase(subscriptionRepository),
    cancelSubscriptionUseCase: new CancelSubscriptionUseCase(subscriptionRepository),
    getInvoicesUseCase: new GetInvoicesUseCase(billingRepository),
  };

  return <DIContext.Provider value={container}>{children}</DIContext.Provider>;
};

export const useDI = () => {
  const context = useContext(DIContext);
  if (!context) {
    throw new Error('useDI must be used within a DIProvider');
  }
  return context;
};

