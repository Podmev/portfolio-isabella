import { handleI18n } from "@/middleware/i18n";

export function middleware(request) {
  return handleI18n(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
