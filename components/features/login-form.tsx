"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simular login (mock)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Validación mock
    if (email && password) {
      router.push("/dashboard");
    } else {
      setError("Por favor, completá todos los campos");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />

      <Input
        label="Contraseña"
        type="password"
        placeholder="Tu contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
      />

      {error && (
        <p className="text-b2-regular text-danger text-center">{error}</p>
      )}

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={isLoading}
        className="mt-4"
      >
        {isLoading ? "Ingresando..." : "Ingresar"}
      </Button>

      <p className="text-b2-regular text-text-muted text-center mt-4">
        ¿Olvidaste tu contraseña?{" "}
        <button type="button" className="text-tertiary-line text-primary">
          Recuperar
        </button>
      </p>
    </form>
  );
}
