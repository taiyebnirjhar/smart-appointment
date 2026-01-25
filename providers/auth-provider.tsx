"use client";

import { Session as NextAuthSession } from "next-auth";
import { ReactNode, useEffect, useRef } from "react";

import { SessionProvider, signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

function SessionExpiryHandler() {
  const { data: session, status } = useSession();
  const hasShownError = useRef(false);

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.error === "RefreshAccessTokenError" &&
      !hasShownError.current
    ) {
      hasShownError.current = true;
      toast.error("Session expired. Please sign in again.");

      // Sign out and redirect to sign-in page
      signOut({
        callbackUrl: "/sign-in",
        redirect: true,
      });
    }
  }, [session, status]);

  return null;
}

const AuthProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: NextAuthSession | null;
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <SessionExpiryHandler />
        {children}
      </SessionProvider>
    </>
  );
};

export default AuthProvider;
