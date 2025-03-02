import LoginGoogleBtn from "@/components/button/LoginGoogleBtn";
import LoginButton from "@/components/button/LoginGoogleBtn";
import { FaUserFriends } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";

async function page() {
  const session = await getAuthSession();
  return (
    <>
      <div className="min-h-screen grid lg:grid-cols-2 relative">
        {/* Hero Section */}
        <div className="relative hidden lg:flex items-center justify-center bg-[#99c0f4] p-12">
          <div className="relative">
            <h2 className="font-bold text-7xl text-white   signin_text_shadow">
              Join an <br /> Exciting Social <br /> Experience.
            </h2>
          </div>
        </div>
        {/* middle section */}
      
          <div className="absolute top-0 left-0 bottom-0 right-0 hidden lg:flex items-center justify-center h-fit w-fit m-auto">
            <div className="bg-white rounded-full border-2 p-4 flex items-center justify-center animate-shake">
              <FaUserFriends className="text-4xl text-primary" />
            </div>
          </div>
        

        {/* Auth Section */}
        <div className="flex items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Sign in to your account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <LoginGoogleBtn />
              <p className="text-sm text-center text-muted-foreground">
                More sign-in options will be available soon
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default page;
