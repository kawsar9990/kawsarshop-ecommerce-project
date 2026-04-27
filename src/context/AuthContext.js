'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const hasBadParams = ["state", "code", "iss", "scope", "authuser", "prompt"].some(param => 
      url.searchParams.has(param)
  );

  if (hasBadParams) {
    const paramsToRemove = ["state", "iss", "code", "scope", "authuser", "prompt", "session_state"];
    paramsToRemove.forEach(param => url.searchParams.delete(param));
    window.history.replaceState(null, "", url.pathname);
  }
}

 if (status === "loading") return;

 const localData = localStorage.getItem("kawsarshop_auth");
 let localUser = null;
 if (localData) {
   try {
     localUser = JSON.parse(localData);
   } catch (err) {
     localStorage.removeItem("kawsarshop_auth");
   }
 }


if (status === "authenticated" && session?.user) {
if (localUser && localUser.email === session.user.email) {
    setUser(localUser);
  } else {
    const userData = {
      ...session.user,
      id: session.user.id || session.user._id,
      profilePic: session.user.profilePic || session.user.image || ""
    };
    setUser(userData);
    localStorage.setItem("kawsarshop_auth", JSON.stringify(userData));
  }
} else if (localUser) {
  setUser(localUser);
} else {
  setUser(null);
}
setLoading(false);
}, [session, status]);



const login = (userData) => {
  const formattedUser = {
      ...userData,
      profilePic: userData.profilePic || userData.image || ""
};
  setUser(formattedUser);
  localStorage.setItem("kawsarshop_auth", JSON.stringify(formattedUser));
};



const logout = async () => {
  try {
    await signOut({ redirect: false });
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

  return (
    <AuthContext.Provider value={{ login, user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);