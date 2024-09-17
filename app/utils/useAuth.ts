import { jwtVerify } from "jose";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [loginUserEmail, setLoginUserEmail] = useState("");
  
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token: any = localStorage.getItem("token");

      if (!token) {
        router.push("/user/login");
      }

      try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodedJwt: any = await jwtVerify(token, secretKey);
        setLoginUserEmail(decodedJwt.payload.email);
      } catch (error) {
        router.push("/user/login");
      }
    }

    checkToken();
  }, [router])

  return loginUserEmail;
}
