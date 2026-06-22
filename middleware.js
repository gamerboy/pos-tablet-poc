import { next } from "@vercel/functions";

const REALM = "POS Tablet POC";

function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
    },
  });
}

function getCredentials(request) {
  const authorization = request.headers.get("authorization");

  if (!authorization || !authorization.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = atob(authorization.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

export default function middleware(request) {
  const expectedUsername = process.env.BASIC_AUTH_USER;
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return new Response("Basic auth is not configured", {
      status: 500,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const credentials = getCredentials(request);

  if (
    credentials?.username === expectedUsername &&
    credentials.password === expectedPassword
  ) {
    return next();
  }

  return unauthorized();
}

export const config = {
  matcher: "/(.*)",
};
