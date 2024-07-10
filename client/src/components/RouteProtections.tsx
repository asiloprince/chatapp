import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

interface RouteProtectionProps {
  children: ReactNode;
}
export function NonLoggedInPage({ children: Component }: RouteProtectionProps) {
  // If auth, send to /auth
  // If not auth, render

  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/auth`,
          { withCredentials: true }
        );

        const result = res.data;
        if (result.isAuth) {
          navigate("/");
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAuthState();
  }, [navigate]);

  if (isAuth === null) {
    return <Loader text={"Authenticating..."} />;
  }

  if (isAuth === false) {
    return <>{Component}</>;
  }
}

export function LoggedInPageProtection({
  children: Component,
}: RouteProtectionProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/auth`,
          { withCredentials: true }
        );

        const result = res.data;
        if (!result.isAuth) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setIsAuth(true);
        }
      } catch (err) {
        navigate("/login");
      }
    };

    checkAuthState();
  }, [navigate]);

  if (isAuth === null) {
    return <Loader text={"Authenticating..."} />;
  }

  if (isAuth === true) {
    return <>{Component}</>;
  }
}
