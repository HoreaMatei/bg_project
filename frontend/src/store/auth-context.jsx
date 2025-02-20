import { createContext, use, useEffect, useState } from "react";

const backendPORT = "http://localhost:3000";

const AuthContext = createContext({
  token: null,
  signup: (email, password) => {},
  login: (email, password) => {},
  logut: () => {},
});

export function useAuthContext() {
  const authCtx = use(AuthContext);

  if (!authCtx) {
    throw new Error("UseAuthContext must be used within an AuthProvider");
  }

  return authCtx;
}

function saveToken(token) {
  localStorage.setItem("token", token);
  localStorage.setItem(
    "tokenExp",
    new Date(Date.now() + 60 * 60 * 1000).toISOString()
  );
}

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedTokenExp = localStorage.getItem("tokenExp");

    if (
      storedToken &&
      storedTokenExp &&
      new Date(storedTokenExp) > new Date()
    ) {
      setToken(storedToken); // Restore token
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExp");
    }
  }, []);

  async function signup(email, password) {
    const response = await fetch(`http://localhost:3000/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(
        resData.message || "Creating user failed, check credentials"
      );
    }

    setToken(resData.token);
    saveToken(resData.token);
  }

  async function login(email, password) {
    const response = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Logging in failed.");
    }

    setToken(resData.token);
    saveToken(resData.token);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExp");
  }

  const contextValue = {
    token,
    signup,
    login,
    logout,
  };

  return <AuthContext value={contextValue}>{children}</AuthContext>;
}
