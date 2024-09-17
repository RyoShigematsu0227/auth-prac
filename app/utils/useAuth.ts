import { jwtVerify } from "jose";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [loginUserEmail, setLoginUserEmail] = useState("");
  
  const router = useRouter();

  // ※作成、編集、削除などのページにアクセスがあった場合に何よりも先にuseAuth.tsが実行されないといけない。そのためにuseEffectを使用
  useEffect(() => {
    const checkToken = async () => {
      // ① トークンの存在をチェック
      const token: any = localStorage.getItem("token");
      if (!token) {
        router.push("/user/login");
      }

      // ② トークンがあれば、有用性をチェック
      try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        // ③ 有効だったら、jwtVerify()が成功してdecodedJwtにデータが格納される。
        const decodedJwt: any = await jwtVerify(token, secretKey);
        setLoginUserEmail(decodedJwt.payload.email);
      } catch (error) {
        // (②で無効だったらここに来る)
        router.push("/user/login");
      }
    }

    checkToken();
  }, [router])

  return loginUserEmail;
}
