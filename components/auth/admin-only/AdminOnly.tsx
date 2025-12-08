import { useAuth } from "@/hooks";
import { ReactNode } from "react";

interface AdminOnlyProps {
  /** Conteúdo a ser mostrado apenas para admin */
  children: ReactNode;
  /** Mensagem quando não é admin */
  fallback?: ReactNode;
}

export function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
