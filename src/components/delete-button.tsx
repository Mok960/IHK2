"use client";

import { useState } from "react";

export function DeleteButton({
  label,
  pendingLabel = "Lösche …",
  confirmText,
  href,
  className,
}: {
  label: string;
  pendingLabel?: string;
  confirmText: string;
  href: string;
  className?: string;
}) {
  const [pending, setPending] = useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      className={className}
      onClick={() => {
        if (!window.confirm(confirmText)) {
          return;
        }
        setPending(true);
        void fetch(href, { method: "DELETE", credentials: "same-origin" })
          .then(async (response) => {
            const data = (await response.json().catch(() => ({}))) as {
              ok?: boolean;
              next?: string;
              error?: string;
            };
            if (!response.ok || !data.ok) {
              throw new Error(data.error || "Löschen fehlgeschlagen.");
            }
            window.location.href = data.next || "/";
          })
          .catch((error: unknown) => {
            window.alert(error instanceof Error ? error.message : "Löschen fehlgeschlagen.");
            setPending(false);
          });
      }}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
