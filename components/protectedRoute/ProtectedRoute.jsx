import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  useEffect(() => {
    if (!accessToken) {
      // Redirect to login page if token doesn't exist
      router.push("/unauthorized");
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center self-center p-20">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
