import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware"
import { NextRequest } from "next/server"

/**  */
export default withAuth(
  async function middleware(request: NextRequest) {
    console.log(request)
  },
  {
    isReturnToCurrentPage: true, // depois de fazer login, redireciona o usuário pra página onde estava antes
  }
)

/** */
export const config = {
  matcher: [
    /*
     * Corresponde a todos os caminhos de solicitação, exceto aqueles que começam com::
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - auth
     * - favicon.ico (favicon file)
     * - robots.txt
     * - images
     * - login
     * - homepage (represented with $ after beginning /)
     */
    "/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login|$).*)",
  ],
}
