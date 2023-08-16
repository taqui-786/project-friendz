
import { withAuth } from "next-auth/middleware"


export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const token = req.nextauth
    
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

// }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}