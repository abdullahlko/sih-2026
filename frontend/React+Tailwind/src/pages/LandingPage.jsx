import { useState } from 'react'
import AuthModal from '../components/auth/AuthModal'
import {
  ArrowRight, BarChart3, BotMessageSquare, ChevronDown,
  Globe2, Heart, Landmark, Menu, MessageCircle, ShieldCheck,
  Sparkles, Stethoscope, UsersRound, X
} from 'lucide-react'

/* ─────────────────────────── DATA ─────────────────────────── */

const roleCards = [
  {
    icon: UsersRound,
    title: 'For Citizens',
    text: 'Share your experience, get support, access resources and stay informed in a safe and respectful space.',
    action: 'Enter Citizen Portal',
    href: '#citizen',
    tone: 'blue',
    imgUrl: '/images/landing/citizen.png',
  },
  {
    icon: Stethoscope,
    title: 'For Counselors',
    text: 'Review cases, get AI-driven insights, prioritise alerts and coordinate timely, trauma-informed support.',
    action: 'Open Counselor Workspace',
    href: '#counselor',
    tone: 'green',
    imgUrl: '/images/landing/counsellor.png',
  },
  {
    icon: BarChart3,
    title: 'For Administrators',
    text: 'Monitor trends, analyse data, track regional alerts and drive impactful policies.',
    action: 'View Command Centre',
    href: '#admin',
    tone: 'orange',
    imgUrl: '/images/landing/administrator.png',
  },
]

const workflow = [
  { Icon: MessageCircle, title: 'Citizen\nCheck-in', sub: '(Text / Voice)' },
  { Icon: BotMessageSquare, title: 'Distress\nAssessment', sub: '( AI Analysis )' },
  { Icon: Stethoscope, title: 'Counselor\nTriage', sub: '(Human Review)' },
  { Icon: ShieldCheck, title: 'Intervention\n& Support', sub: '(Coordinated Action)' },
  { Icon: Landmark, title: 'Administrative\nOversight', sub: '(Monitor & Improve)' },
]

const navLinks = [
  { label: 'Home', href: '#top', active: true },
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'For Citizens', href: '#citizen' },
  { label: 'For Counselors', href: '#counselor' },
  { label: 'For Administrators', href: '#admin' },
  { label: 'Resources', href: '#resources' },
]

const impactItems = [
  { Icon: ShieldCheck, title: 'Safer Communities', sub: 'Through Timely Support', color: 'text-violet-600' },
  { Icon: Sparkles, title: 'Data-Driven Insights', sub: 'For Informed Action', color: 'text-violet-600' },
  { Icon: Globe2, title: 'Multi-Lingual & Accessible', sub: 'Across Regions', color: 'text-violet-600' },
  { Icon: Heart, title: 'A More Inclusive India', sub: 'Built on Dignity and Justice', color: 'text-rose-500' },
]

/* tone styling maps */
const toneBg = {
  blue: 'bg-gradient-to-br from-[#eef5ff] via-[#f7fbff] to-[#e6edff]',
  green: 'bg-gradient-to-br from-[#edfcf7] via-[#f7fffc] to-[#e3f8ef]',
  orange: 'bg-gradient-to-br from-[#fff5ed] via-[#fffaf6] to-[#fff0e5]',
}
const toneIcon = {
  blue: 'text-[#244cff] bg-[#dfe9ff]',
  green: 'text-[#049a67] bg-[#d9f6e9]',
  orange: 'text-[#fb7618] bg-[#ffeadb]',
}
const toneLink = {
  blue: 'text-[#244cff]',
  green: 'text-[#049a67]',
  orange: 'text-[#fb7618]',
}
const toneFade = {
  blue: 'rgba(238,245,255,.95)',
  green: 'rgba(237,252,247,.95)',
  orange: 'rgba(255,245,237,.95)',
}

/* ─────────────────────────── LOGO ─────────────────────────── */

function LogoMark() {
  return (
    <img
      src="/favicon.png"
      alt="Samvedna AI Logo"
      className="size-11 object-contain shrink-0"
    />
  )
}

/* ═══════════════════════════════════════════════════════════════
   LANDING PAGE — "Stronger Support for a Fairer Tomorrow"
   This is the NEW entry landing page (image 2).
   Navigation links (#citizen, #counselor, #admin) redirect
   to the existing app (image 1) via hash routing in App.jsx.
   ═══════════════════════════════════════════════════════════════ */

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authRole, setAuthRole] = useState('citizen')

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbfbff] font-sans text-[#07164e]">

      {/* Auth Modal for Sign In & Register */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialRole={authRole}
      />

      {/* ═══════════════════ NAVBAR ═══════════════════ */}
      <header className="sticky top-0 z-50 border-b border-violet-100 bg-white/92 shadow-[0_4px_20px_rgba(77,69,188,.06)] backdrop-blur-lg">
        <nav className="mx-auto flex h-[62px] max-w-[1400px] items-center justify-between gap-4 px-5 lg:px-8">

          {/* Logo */}
          <a href="#top" className="flex shrink-0 items-center gap-2">
            <LogoMark />
            <span>
              <span className="block text-[22px] font-extrabold leading-5 tracking-tight">
                Samvedna <b className="text-violet-600">AI</b>
              </span>
              <span className="mt-0.5 block text-[9.5px] font-medium tracking-[.12em] text-[#455491]">
                Support · Dignity · Justice
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden h-full items-center gap-6 text-[12.5px] font-medium text-[#293060] lg:flex">
            {navLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                className={`grid h-full place-items-center transition-colors hover:text-violet-700 ${
                  l.active ? 'border-b-2 border-violet-600 font-bold text-violet-700' : ''
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden cursor-pointer items-center gap-1.5 text-[12px] font-semibold text-[#364478] xl:flex">
              <Globe2 size={16} /> English <ChevronDown size={12} />
            </span>
            <button
              type="button"
              onClick={() => {
                setAuthRole('citizen')
                setIsAuthOpen(true)
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-700 to-violet-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-violet-300/50 transition hover:shadow-violet-400/60 cursor-pointer"
            >
              Sign In
            </button>
            <button
              className="grid size-10 place-items-center rounded-xl text-violet-700 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="border-t border-violet-100 bg-white px-6 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium ${l.active ? 'font-bold text-violet-700' : 'text-[#364478]'}`}
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  setIsAuthOpen(true)
                }}
                className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-700 to-violet-600 text-white text-xs font-bold shadow-md shadow-violet-300/40"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="top">

        {/* ═══════════════════ HERO ═══════════════════ */}
        <section className="relative isolate overflow-hidden">
          {/* Full-width hero background image with subtle brightness reduction (-6%) */}
          <div className="absolute inset-0 -z-20">
            <img
              src="/images/landing/hero.png"
              alt="Samvedna AI – advocate standing before the Indian Parliament"
              className="h-full w-full object-cover object-[center_top] brightness-[0.94] contrast-[1.01]"
            />
          </div>

          {/* Soft ambient overlay */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-10 bg-gradient-to-t from-[#fbfbff]/60 to-transparent" />

          <div className="mx-auto min-h-[460px] max-w-[1400px] px-6 pt-8 pb-12 lg:min-h-[520px] lg:px-8">

            {/* LEFT — copy (sits on top of image with gradient overlay behind) */}
            <div className="relative z-10 max-w-[560px]">
              {/* MoSJE badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/90 px-3.5 py-2 text-[11px] font-bold text-[#1e3058] shadow-sm backdrop-blur-sm">
                <Landmark size={15} className="text-slate-600" />
                An Initiative by MoSJE, Government of India
              </div>

              {/* Heading */}
              <h1 className="mt-6 text-[40px] font-extrabold leading-[1.02] tracking-[-.04em] sm:text-[52px] xl:text-[60px]">
                Stronger Support<br />
                <span className="bg-gradient-to-r from-indigo-700 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                  for a Fairer Tomorrow
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-[500px] text-[15px] leading-[1.55] text-[#3a507f]">
                Samvedna AI is an empathetic, role-based support and case-triage
                platform for SC/ST atrocity survivors — designed to help surface
                distress signals, coordinate counselor response and enable
                administrative oversight.
              </p>

              {/* CTA button */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#citizen"
                  className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-700 to-violet-600 px-7 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-violet-300/60 transition hover:shadow-xl hover:shadow-violet-400/50"
                >
                  Get Support Now <ArrowRight size={18} />
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-[12px] font-medium text-[#1e3058]">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-violet-600" /> Confidential &amp; Secure
                </span>
                <span className="flex items-center gap-2">
                  <Globe2 size={17} className="text-violet-600" /> Multi-Lingual Support
                </span>
                <span className="flex items-center gap-2">
                  <UsersRound size={18} className="text-violet-600" /> Human-Centered AI
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ ROLE CARDS ═══════════════════ */}
        <section className="mx-auto grid max-w-[1400px] gap-4 px-6 py-4 md:grid-cols-3 lg:px-8">
          {roleCards.map(({ icon: Icon, title, text, action, href, tone, imgUrl }) => (
            <article
              key={title}
              className={`group relative min-h-[175px] overflow-hidden rounded-2xl border border-white/80 p-6 shadow-[0_8px_28px_rgba(69,83,160,.08)] transition hover:shadow-lg ${toneBg[tone]}`}
            >
              <div className="relative z-10 max-w-[62%]">
                <div className="flex items-center gap-3">
                  <div className={`grid size-12 shrink-0 place-items-center rounded-xl ${toneIcon[tone]}`}>
                    <Icon size={24} />
                  </div>
                  <h2 className="text-[17px] font-extrabold leading-tight">{title}</h2>
                </div>
                <p className="mt-3 text-[12.5px] leading-[1.5] text-[#3c507a]">{text}</p>
                <a
                  href={href}
                  className={`mt-4 inline-flex items-center gap-2 text-[12.5px] font-bold transition hover:gap-3 ${toneLink[tone]}`}
                >
                  {action} <ArrowRight size={15} />
                </a>
              </div>

              {/* Local card image */}
              <div className="absolute inset-y-0 right-0 w-[54%] overflow-hidden pointer-events-none">
                <img
                  src={imgUrl}
                  alt={title}
                  className="h-full w-full object-cover object-right opacity-90 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
            </article>
          ))}
        </section>

        {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
        <section id="how" className="mx-auto max-w-[1400px] px-6 pt-2 pb-3 lg:px-8">
          <div className="rounded-2xl border border-violet-100 bg-white px-6 py-6 shadow-[0_6px_24px_rgba(63,65,150,.06)] lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

              {/* left label */}
              <div>
                <p className="text-[11px] font-bold tracking-[.16em] text-[#3b4c82]">
                  <i className="mr-3 inline-block h-0.5 w-5 bg-violet-600 align-middle" />
                  HOW SAMVEDNA AI WORKS
                </p>
                <h2 className="mt-3 text-[30px] font-extrabold leading-[.92] tracking-tight">
                  From a<br />
                  <span className="text-violet-600">Voice to Action</span>
                </h2>
                <p className="mt-3 max-w-[240px] text-[12.5px] leading-[1.5] text-[#4a5e8e]">
                  A seamless flow from citizen check-in to administrative oversight.
                </p>
              </div>

              {/* 5 workflow steps */}
              <div className="grid items-center gap-2 sm:grid-cols-5">
                {workflow.map(({ Icon, title, sub }, i) => (
                  <div key={title} className="relative text-center">
                    <div className="mx-auto grid size-[52px] place-items-center rounded-full bg-gradient-to-br from-violet-100 to-white text-violet-600 shadow-sm ring-1 ring-violet-100/60">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-2.5 whitespace-pre-line text-[11px] font-extrabold leading-[1.15]">
                      {i + 1}. {title}
                    </h3>
                    <p className="mt-1 text-[10px] text-[#3c5088]">{sub}</p>
                    {i < 4 && (
                      <ArrowRight
                        className="absolute -right-2.5 top-[18px] hidden text-violet-400 sm:block"
                        size={16}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ FEATURES / IMPACT BAR ═══════════════════ */}
        <section id="features" className="mt-2 border-y border-violet-100 bg-white">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-5 px-6 py-5 md:grid-cols-4 lg:px-8">
            {impactItems.map(({ Icon, title, sub, color }, i) => (
              <div
                key={title}
                className={`flex items-center justify-center gap-3.5 ${
                  i < 3 ? 'md:border-r md:border-violet-100' : ''
                }`}
              >
                <Icon className={color} size={28} />
                <div>
                  <h3 className="text-[14px] font-extrabold leading-tight">{title}</h3>
                  <p className="text-[11px] text-[#4a5b93]">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer id="resources" className="bg-gradient-to-r from-[#f3f5ff] to-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-6 py-6 text-center md:flex-row md:text-left lg:px-8">
          {/* Ministry */}
          <div className="flex items-center gap-3">
            <Landmark size={40} className="shrink-0 text-slate-700" />
            <span className="text-[12px] font-bold leading-[1.3]">
              Ministry of Social Justice<br />and Empowerment<br />
              <b className="font-medium text-[#4d5a95]">Government of India</b>
            </span>
          </div>

          {/* Quote */}
          <p className="text-[19px] italic text-[#41467b]" style={{ fontFamily: 'Georgia, serif' }}>
            &ldquo;Justice is not a privilege. It is a right.&rdquo;
          </p>

          {/* Viksit Bharat */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">🇮🇳</span>
            <b className="text-[13px] leading-[1.3]">
              Viksit Bharat<br />Swasth Manas
            </b>
            <span className="ml-2 border-l border-violet-200 pl-3 text-[11px] leading-[1.4] text-[#4c5a93]">
              For People<br />For Support<br />For a Brighter Tomorrow
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
