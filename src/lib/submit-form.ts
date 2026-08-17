export async function submitForm(url: string, formData: FormData, method = "POST") {
  const response = await fetch(url, {
    method,
    body: formData,
    credentials: "same-origin",
  });

  const data = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    next?: string;
    error?: string;
  };

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Speichern fehlgeschlagen.");
  }

  window.location.href = data.next || "/";
}
