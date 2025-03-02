"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";
interface LayoutProps {
  children: ReactNode;
}

const QuerryProvider: FC<LayoutProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default QuerryProvider;
