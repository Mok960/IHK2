"use client";

import { getAdminToken } from "@/lib/client-auth";
import { useEffect, useState } from "react";

export function AdminTokenField() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(getAdminToken());
  }, []);

  return <input type="hidden" name="adminToken" value={token} />;
}
