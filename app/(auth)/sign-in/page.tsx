import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center p-4",
        "bg-background bg-cover bg-center bg-no-repeat relative",
        "overflow-x-hidden overflow-y-auto lg:overflow-y-hidden",
      )}
    >
      <div className="space-y-14 w-full h-full flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-8 p-8">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Welcome Back!
                </h1>
                <p className="text-muted-foreground">
                  Log in to your Smart Appointment
                </p>
              </div>
            </div>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
