import Image from "next/image";
import { LoginForm } from "@/components/features/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Image 
            src="/logo.svg" 
            alt="Banco Municipal" 
            width={210} 
            height={35}
            priority
          />
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
