import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, GraduationCap, Loader2, Sparkles, Star, Zap } from "lucide-react";
import { toast } from "sonner";
import logoImpulsa from "../assets/logo-impulsa.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — IMPULSA" },
      {
        name: "description",
        content:
          "Accede a IMPULSA con tu correo institucional y compite por puntos de temporada y liga con tu salón.",
      },
      { property: "og:title", content: "Iniciar sesión — IMPULSA" },
      {
        property: "og:description",
        content: "Plataforma educativa gamificada para colegios: misiones, ranking y retos por salón.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

const ROLES = [
  { value: "Estudiante", hint: "Misiones y evidencias" },
  { value: "Director de Grupo", hint: "Gestión del salón" },
  { value: "Docente", hint: "Validación de misiones" },
  { value: "Administrador", hint: "Configuración global" },
] as const;

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<string>("Estudiante");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("userRole", role);
      toast.success(`Sesión iniciada como ${role}`, {
        description: email ? `Bienvenido, ${email}` : "Modo demo de vista previa de rol",
      });

      switch (role) {
        case "Estudiante":
          navigate({ to: "/dashboard/estudiante" as any });
          break;
        case "Director de Grupo":
          navigate({ to: "/dashboard/director" as any });
          break;
        case "Docente":
          navigate({ to: "/dashboard/docente" as any });
          break;
        case "Administrador":
          navigate({ to: "/dashboard/admin" as any });
          break;
        default:
          navigate({ to: "/dashboard/estudiante" as any });
          break;
      }
    }, 600);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950/80 to-slate-950 px-4 py-10 overflow-hidden">
      {/* Background Ambient Glowing Lights & Floating Stars */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Decorative Star Particles in Background */}
      <div className="pointer-events-none absolute inset-0">
        <Star className="absolute top-12 left-16 h-3 w-3 text-indigo-300/40 animate-pulse" />
        <Sparkles className="absolute top-24 right-20 h-4 w-4 text-purple-300/50 animate-pulse" />
        <Star className="absolute bottom-20 left-1/4 h-3.5 w-3.5 text-amber-300/40 animate-ping" />
        <Sparkles className="absolute bottom-32 right-16 h-5 w-5 text-indigo-400/40 animate-pulse" />
        <Star className="absolute top-1/2 right-10 h-3 w-3 text-cyan-300/30 animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Branding */}
        <div className="mb-6 text-center">
          <div className="relative mx-auto mb-3 flex items-center justify-center">
            <img
              src={logoImpulsa}
              alt="IMPULSA Logo"
              className="h-28 sm:h-32 w-auto max-w-[240px] object-contain drop-shadow-[0_10px_25px_rgba(99,102,241,0.4)] transition-transform duration-300 hover:scale-105"
            />
          </div>
          <p className="mt-1 text-xs sm:text-sm text-indigo-200/70">
            Ingresa con tu cuenta escolar para continuar la temporada
          </p>
        </div>

        {/* Outer Glow Wrapper for Form Box */}
        <div className="relative group">
          {/* Animated Glow Border Effect */}
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 opacity-40 blur-md transition duration-500 group-hover:opacity-75 animate-pulse" />

          {/* Floating Corner Sparkles on Form Box */}
          <div className="pointer-events-none absolute -top-3 -left-3 z-20 flex items-center justify-center rounded-full bg-indigo-950 p-1.5 border border-indigo-400/50 shadow-md">
            <Sparkles className="h-4 w-4 text-amber-300 animate-spin-slow" />
          </div>
          <div className="pointer-events-none absolute -bottom-3 -right-3 z-20 flex items-center justify-center rounded-full bg-indigo-950 p-1.5 border border-purple-400/50 shadow-md">
            <Star className="h-4 w-4 text-indigo-300 animate-pulse" />
          </div>

          {/* Main Form Box */}
          <div className="relative rounded-3xl border border-indigo-500/30 bg-slate-900/85 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="correo_institucional" className="text-slate-200 text-xs font-semibold flex items-center gap-1.5">
                  Correo institucional
                  <Sparkles className="h-3 w-3 text-indigo-400 opacity-70" />
                </Label>
                <div className="relative">
                  <Input
                    id="correo_institucional"
                    name="correo_institucional"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="nombre.apellido@colegio.edu.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-slate-700/80 bg-slate-950/70 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-400 focus-visible:border-indigo-400/80 transition-all rounded-xl shadow-inner"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-200 text-xs font-semibold flex items-center gap-1.5">
                    Contraseña
                    <Star className="h-3 w-3 text-amber-400/70" />
                  </Label>
                  <button
                    type="button"
                    onClick={() => toast("Contacta al administrador de tu colegio para restablecerla")}
                    className="text-xs font-medium text-indigo-300 hover:text-indigo-200 hover:underline transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-slate-700/80 bg-slate-950/70 text-slate-100 pr-11 placeholder:text-slate-500 focus-visible:ring-indigo-400 focus-visible:border-indigo-400/80 transition-all rounded-xl shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Role Selection Group */}
              <fieldset className="space-y-3 rounded-2xl border border-indigo-500/20 bg-slate-950/50 p-4 relative overflow-hidden">
                <legend className="px-2 text-[11px] font-bold uppercase tracking-wider text-indigo-300/90 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-300" />
                  Vista previa de rol (demo)
                </legend>
                <RadioGroup value={role} onValueChange={setRole} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {ROLES.map((r) => (
                    <label
                      key={r.value}
                      htmlFor={`role-${r.value}`}
                      className={`flex cursor-pointer items-start gap-2 rounded-xl border p-3 transition-all duration-200 ${
                        role === r.value
                          ? "border-indigo-400/80 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 shadow-md shadow-indigo-500/10"
                          : "border-slate-800/80 hover:border-slate-600 bg-slate-900/40"
                      }`}
                    >
                      <RadioGroupItem
                        id={`role-${r.value}`}
                        value={r.value}
                        className="mt-0.5 border-slate-500 text-indigo-400 focus:ring-indigo-400"
                      />
                      <span>
                        <span className="block text-xs font-bold text-slate-100">{r.value}</span>
                        <span className="block text-[11px] text-slate-400">{r.hint}</span>
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              </fieldset>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all duration-300"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4 text-amber-300 animate-pulse" />
                )}
                Iniciar Sesión
              </Button>
            </form>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <span>IMPULSA</span> · <span>Competencia por salón</span> · <span className="text-amber-400/80 font-medium flex items-center gap-0.5"><Star className="h-3 w-3 inline" /> Puntos de Temporada y Liga</span>
        </p>
      </div>
    </main>
  );
}