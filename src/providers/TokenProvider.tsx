"use client";

import { fromUnixTime, isAfter } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { signOut, useSession } from "next-auth/react";
import { FC, PropsWithChildren, useEffect } from "react";

const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  // const { accessToken, clearAuth } = useAuthStore();
  const session = useSession();

  useEffect(() => {
    const checkTokenValidity = () => {
      const accessToken = session.data?.user.accessToken;
      if (accessToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          const tokenExpiry = fromUnixTime(decodedToken.exp!);

          if (isAfter(new Date(), tokenExpiry)) {
            signOut();
          }
        } catch (error) {
          signOut();
        }
      }
    };
    const interval = setInterval(checkTokenValidity, 15000); // 15 second

    return () => clearInterval(interval);
  }, []);
  return <>{children}</>;
};
export default TokenProvider;
