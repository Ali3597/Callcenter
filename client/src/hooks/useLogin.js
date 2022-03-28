import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { apiFetch } from "../utils/api";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    const data = {
      email,
      password,
    };

    try {
      const user = await apiFetch("/auth/login", {
        method: "POST",
        body: data,
      });
      dispatch({ type: "LOGIN", payload: user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
};
