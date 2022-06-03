import { createContext, useReducer, useEffect } from "react";
import { apiFetch } from "../utils/api";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload, "mon payload");
      return {
        ...state,
        user: action.payload.user,
        admin: action.payload.user.local.role,
      };
    case "AUTH_IS_READY":
      return {
        user: action.payload,
        admin: action.payload ? action.payload.local.role : false,
        authIsReady: true,
      };
    case "LOGOUT":
      return { ...state, user: null, admin: false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    admin: false,
  });

  useEffect(async () => {
    const res = await apiFetch("/auth/me");

    dispatch({ type: "AUTH_IS_READY", payload: res.user });
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
