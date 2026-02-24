import { SignUp } from "@clerk/nextjs";
import Logo from "@/components/Logo";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-16 gap-8">
      <Logo variant="full" size="md" theme="dark" />
      <SignUp forceRedirectUrl="/dashboard" />
    </div>
  );
}
