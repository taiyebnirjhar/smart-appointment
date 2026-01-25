import { login_credential } from "@/constant/credential-id";
import { signIn as nextAuthSignIn } from "next-auth/react";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const result = await nextAuthSignIn(login_credential, {
    email: email,
    password: password,
    redirect: false,
  });
  // console.log(result);
  return result;
};
