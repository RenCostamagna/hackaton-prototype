import { LoginForm } from "@/components/features/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-red mb-4">
            <span className="text-h1-bold text-text-inverse">MI</span>
          </div>
          <h1 className="text-h1-bold text-text-primary">Mesa de Inversiones</h1>
          <p className="text-b1-regular text-text-muted mt-2">
            Tu dinero, mejor invertido
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
