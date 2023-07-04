import { useRouter } from "next/router";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const router = useRouter();
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  useEffect(() => {
    if (!accessToken) {
      // Redirect to login page if token doesn't exist
      router.push("/unauthorized");
    }
  }, []);

  return children;
}

export default ProtectedRoute;
