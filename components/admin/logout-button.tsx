"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    }
    finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className="rounded-xl border border-[#d6e4e2] bg-white px-4 py-2.5 text-sm font-semibold text-[#315654] transition hover:border-[#078b87] disabled:opacity-50"
    >
      {loading ? "Saindo..." : "Sair"}
    </button>
  );
}