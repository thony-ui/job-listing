"use client";

import { UserProvider } from "@/contexts/user-context";

export default function UserWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
