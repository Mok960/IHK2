export function requestOrigin(request: Request) {
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protoHeader = request.headers.get("x-forwarded-proto") ?? "https";
  const proto = protoHeader.split(",")[0]?.trim() || "https";

  if (host) {
    return `${proto}://${host.split(",")[0]?.trim()}`;
  }

  return new URL(request.url).origin;
}

export function redirectTo(request: Request, path: string, status = 303) {
  return Response.redirect(new URL(path, requestOrigin(request)), status);
}
