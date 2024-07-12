"use client";
import { useEffect, useState } from "react";
import { getTokenFromUrl } from "@/utils/auth";
import LoginPage from "@/components/login";
import ListPage from "@/components/list";

export default function Home() {
  const savedToken = localStorage.getItem("token");
  const [token, setToken] = useState<string | (string | null)[]>("");

  useEffect(() => {
    if (savedToken) {
      setToken(savedToken);
    } else {
      const hash = getTokenFromUrl();
      window.location.hash = "";
      const _token = hash.access_token;

      if (_token && typeof _token === "string") {
        localStorage.setItem("token", _token);
        setToken(_token);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !savedToken && !token ? (
    <LoginPage />
  ) : (
    <ListPage token={savedToken ?? token} setToken={setToken} />
  );
}
