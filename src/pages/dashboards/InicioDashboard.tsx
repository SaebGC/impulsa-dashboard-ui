import React from 'react';
import { Link } from '@tanstack/react-router';
import {
  Rocket,
  Home,
  Trophy,
  Shield,
  Target,
  History,
  Star,
  Bell,
  Megaphone,
  BarChart3,
  Crown,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import trophyImg from '@/assets/trophy-confetti.png';

const navItems = [
  { label: 'Inicio', icon: Home, active: true },
  { label: 'Ranking', icon: Trophy, active: false },
  { label: 'Mi salón', icon: Shield, active: false },
  { label: 'Misiones', icon: Target, active: false },
  { label: 'Historial', icon: History, active: false },
];

const activities = [
  {
    icon: Target,
    ring: 'bg-emerald-100 text-emerald-600',
    title: 'Nueva misión disponible',
    desc: 'Misión: Guardianes del Agua',
    time: 'Hace 15 min',
    emoji: '🌱',
    count: 24,
  },
  {
    icon: Trophy,
    ring: 'bg-amber-100 text-amber-600',
    title: '9-01 completó una misión épica',
    desc: 'Misión: Lectores Imparables',
    time: 'Hace 32 min',
    emoji: '🔥',
    count: 18,
  },
  {
    icon: Megaphone,
    ring: 'bg-indigo-100 text-indigo-600',
    title: 'Nuevo anuncio institucional',
    desc: 'Día del Colegio – Actividades especiales',
    time: 'Hace 1 h',
    emoji: '👍',
    count: 31,
  },
  {
    icon: BarChart3,
    ring: 'bg-sky-100 text-sky-600',
    title: '10-02 subió al tercer lugar',
    desc: '¡Sigan así, lo están haciendo increíble!',
    time: 'Hace 2 h',
    emoji: '👏',
    count: 27,
  },
  {
    icon: Crown,
    ring: 'bg-fuchsia-100 text-fuchsia-600',
    title: 'Un salón descubrió un título secreto',
    desc: '¿Quiénes serán los próximos?',
    time: 'Hace 3 h',
    emoji: '👀',
    count: 15,
  },
];

const quickLinks = [
  {
    icon: Target,
    title: 'Ver misiones',
    desc: 'Descubre lo que pueden lograr.',
    card: 'bg-emerald-50 border-emerald-100',
    iconBox: 'bg-emerald-100 text-emerald-600',
    btn: 'bg-emerald-500 hover:bg-emerald-600',
  },
  {
    icon: Trophy,
    title: 'Ir al ranking',
    desc: 'Mira cómo va la competencia.',
    card: 'bg-amber-50 border-amber-100',
    iconBox: 'bg-amber-100 text-amber-600',
    btn: 'bg-amber-400 hover:bg-amber-500',
  },
  {
    icon: Shield,
    title: 'Mi salón',
    desc: 'Conoce la historia de nuestro salón.',
    card: 'bg-sky-50 border-sky-100',
    iconBox: 'bg-sky-100 text-sky-600',
    btn: 'bg-sky-500 hover:bg-sky-600',
  },
];

const Crest: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`grid place-items-center rounded-full bg-blue-600 text-amber-300 shadow-md ${className}`}
  >
    <Shield className="w-1/2 h-1/2" strokeWidth={2.2} />
  </div>
);

export const InicioDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex">
      {/* ---------- SIDEBAR ---------- */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-blue-900 text-white px-4 py-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-blue-700 grid place-items-center ring-2 ring-amber-300/40">
            <Rocket className="w-5 h-5 text-amber-300" />
          </div>
          <span className="text-xl font-black tracking-wide text-amber-300">IMPULSA</span>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              type="button"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white transition-colors ${
                active ? 'bg-white/15' : 'hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="rounded-2xl bg-purple-700/90 p-4">
            <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
            <p className="mt-2 text-sm font-semibold leading-snug text-white">
              Temporada 3. La Fuerza del Saber
            </p>
            <p className="mt-1 text-xs text-white/70">Termina en 18 días</p>
          </div>

          <div className="flex items-center gap-3 border-t border-white/10 pt-4">
            <Crest className="w-10 h-10 shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">10-02 Los Invencibles</p>
              <p className="flex items-center gap-1 text-xs text-white/70">
                <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                8.450 pts
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ---------- MAIN ---------- */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        <main className="flex-1 px-5 sm:px-8 py-6 space-y-8">
          <header className="flex items-center justify-between gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              ¡Buenos días! 10-02 <span aria-hidden>👏👋</span>
            </h1>
            <div className="flex items-center gap-4">
              <button type="button" className="relative" aria-label="Notificaciones">
                <Bell className="w-6 h-6 text-slate-600" />
                <span className="absolute -top-1.5 -right-1.5 grid h-4.5 w-4.5 min-w-[18px] place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  3
                </span>
              </button>
              <Crest className="w-9 h-9" />
            </div>
          </header>

          {/* Banner */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 px-6 sm:px-10 py-8 text-white">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                ¡10-01 acaba de convertirse en líder de la temporada!
              </h2>
              <p className="mt-2 text-white/80">La competencia se pone cada vez más emocionante.</p>
              <button
                type="button"
                className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-colors hover:bg-blue-400"
              >
                Ver ranking <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <img
              src={trophyImg}
              alt="Trofeo dorado del primer lugar con confeti"
              width={768}
              height={768}
              loading="lazy"
              className="pointer-events-none absolute -right-4 -bottom-6 hidden h-56 w-56 object-contain drop-shadow-2xl sm:block lg:h-64 lg:w-64"
            />
          </section>

          <div className="flex justify-center gap-2 sm:justify-start">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === 0 ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Actividad reciente */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Actividad reciente</h3>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Ver todas <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <ul className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm">
              {activities.map(({ icon: Icon, ring, title, desc, time, emoji, count }) => (
                <li key={title} className="flex items-center gap-4 px-4 py-4">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${ring}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{title}</p>
                    <p className="truncate text-sm text-slate-500">{desc}</p>
                  </div>
                  <span className="hidden shrink-0 text-xs text-slate-400 sm:block">{time}</span>
                  <span className="ml-2 flex shrink-0 items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    <span aria-hidden>{emoji}</span> {count}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Accesos rápidos */}
          <section>
            <h3 className="text-lg font-bold text-slate-900">Accesos rápidos</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickLinks.map(({ icon: Icon, title, desc, card, iconBox, btn }) => (
                <div
                  key={title}
                  className={`flex items-center gap-4 rounded-2xl border p-5 ${card}`}
                >
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${iconBox}`}>
                    <Icon className="w-6 h-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900">{title}</p>
                    <p className="text-sm text-slate-500">{desc}</p>
                  </div>
                  <button
                    type="button"
                    aria-label={title}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-white transition-colors ${btn}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="px-5 sm:px-8 py-6 text-center text-sm text-slate-500">
          Impulsa lo mejor de ti. Impulsa a tu salón. <span aria-hidden>❤️🚀</span>
        </footer>
      </div>
    </div>
  );
};

export default InicioDashboard;
