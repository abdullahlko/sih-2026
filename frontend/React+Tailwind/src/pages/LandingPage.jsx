import { useState } from 'react'
import {
  ArrowRight, BarChart3, BotMessageSquare, ChevronDown, CirclePlay,
  Globe2, Heart, Landmark, Languages, Menu, MessageCircle, ShieldCheck,
  Sparkles, Stethoscope, UsersRound, X
} from 'lucide-react'

/* ─── data ─── */
const roleCards = [
  {
    icon: UsersRound,
    title: 'For Citizens',
    text: 'Share your experience, get support, access resources and stay informed in a safe and respectful space.',
    action: 'Enter Citizen Portal',
    href: '#citizen',
    tone: 'blue',
    imgUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
  },
  {
    icon: Stethoscope,
    title: 'For Counselors',
    text: 'Review cases, get AI-driven insights, prioritise alerts and coordinate timely, trauma-informed support.',
    action: 'Open Counselor Workspace',
    href: '#counselor',
    tone: 'green',
    imgUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    icon: BarChart3,
    title: 'For Administrators',
    text: 'Monitor trends, analyse data, track regional alerts and drive impactful policies.',
    action: 'View Command Centre',
    href: '#admin',
    tone: 'orange',
    imgUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
  },
]

const workflow = [
  [MessageCircle, 'Citizen\nCheck-in', '(Text / Voice)'],
  [BotMessageSquare, 'Distress\nAssessment', '( AI Analysis )'],
  [Stethoscope, 'Counselor\nTriage', '(Human Review)'],
  [ShieldCheck, 'Intervention\n& Support', '(Coordinated Action)'],
  [Landmark, 'Administrative\nOversight', '(Monitor & Improve)'],
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

/* ─── tiny logo ─── */
function LotusMark() {
  return (
    <span className="relative grid size-11 place-items-center shrink-0" aria-hidden="true">
      <span className="absolute size-6 rotate-45 rounded-tl-[100%] rounded-br-[100%] bg-violet-700" />
      <span className="absolute size-6 -rotate-45 rounded-tr-[100%] rounded-bl-[100%] bg-indigo-500" />
      <span className="absolute h-8 w-3.5 rounded-t-full bg-gradient-to-t from-violet-700 to-fuchsia-400" />
    </span>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbfbff] font-sans text-[#07164e]">

      {/* ════════════ NAVBAR ════════════ */}
      <header className="sticky top-0 z-50 border-b border-violet-100 bg-white/92 shadow-[0_4px_20px_rgba(77,69,188,.06)] backdrop-blur-lg">
        <nav className="mx-auto flex h-[62px] max-w-[1400px] items-center justify-between gap-4 px-5 lg:px-8">

          {/* logo */}
          <a href="#top" className="flex shrink-0 items-center gap-1.5">
            <LotusMark />
            <span>
              <span className="block text-[22px] font-extrabold leading-5 tracking-tight">
                Samvedna <b className="text-violet-600">AI</b>
              </span>
              <span className="mt-0.5 block text-[9.5px] font-medium tracking-[.12em] text-[#455491]">
                Support · Dignity · Justice
              </span>
            </span>
          </a>

          {/* desktop nav links */}
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

          {/* right side */}
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden items-center gap-1.5 text-[12px] font-semibold text-[#364478] xl:flex cursor-pointer">
              <Globe2 size={16} /> English <ChevronDown size={12} />
            </span>
            <a
              href="#citizen"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-700 to-violet-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-violet-300/50 transition hover:shadow-violet-400/60"
            >
              Get Support <ArrowRight size={16} />
            </a>
            {/* mobile hamburger */}
            <button
              className="grid size-10 place-items-center rounded-xl text-violet-700 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* mobile nav drawer */}
        {mobileOpen && (
          <div className="border-t border-violet-100 bg-white px-6 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-[14px] font-medium ${l.active ? 'font-bold text-violet-700' : 'text-[#364478]'}`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="top">

        {/* ════════════ HERO ════════════ */}
        <section className="relative isolate overflow-hidden bg-[linear-gradient(110deg,#f8fbff_4%,#fff9f8_55%,#fff4e9_100%)]">
          {/* decorative radial blobs */}
          <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[70%] bg-[radial-gradient(ellipse_at_65%_18%,rgba(207,193,255,.75),transparent_30%),radial-gradient(ellipse_at_85%_65%,rgba(255,215,151,.7),transparent_28%)]" />

          <div className="mx-auto grid min-h-[460px] max-w-[1400px] items-end px-6 pt-8 lg:grid-cols-[44%_56%] lg:px-8">
            {/* LEFT – copy */}
            <div className="relative z-10 pb-8 lg:pb-10">
              {/* MoSJE badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-3.5 py-2 text-[11px] font-bold text-[#1e3058] shadow-sm">
                <Landmark size={15} className="text-slate-600" />
                An Initiative by MoSJE, Government of India
              </div>

              {/* heading */}
              <h1 className="mt-6 text-[40px] font-extrabold leading-[1.02] tracking-[-.04em] sm:text-[52px] xl:text-[60px]">
                Stronger Support<br />
                <span className="bg-gradient-to-r from-indigo-700 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                  for a Fairer Tomorrow
                </span>
              </h1>

              <p className="mt-4 max-w-[540px] text-[15px] leading-[1.55] text-[#3a507f]">
                Samvedna AI is an empathetic, role-based support and case-triage
                platform for SC/ST atrocity survivors — designed to help surface
                distress signals, coordinate counselor response and enable
                administrative oversight.
              </p>

              {/* CTA buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#citizen"
                  className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-700 to-violet-600 px-7 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-violet-300/60 transition hover:shadow-xl hover:shadow-violet-400/50"
                >
                  Get Support Now <ArrowRight size={18} />
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-violet-400 bg-white/80 px-6 py-3.5 text-[14px] font-semibold text-violet-700 transition hover:bg-violet-50"
                >
                  <CirclePlay size={20} className="fill-violet-600 text-white" /> Explore the Platform
                </a>
              </div>

              {/* trust badges */}
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

            {/* RIGHT – hero visual */}
            <div className="relative h-[340px] lg:h-[460px]">
              {/* LISTEN SUPPORT EMPOWER JUSTICE */}
              <div className="absolute left-[18%] top-6 hidden flex-col gap-2.5 text-[11px] tracking-[.42em] text-[#2c3e70] lg:flex" style={{ fontFamily: 'Georgia, serif' }}>
                <span className="font-semibold">LISTEN</span>
                <span className="font-semibold">SUPPORT</span>
                <span className="font-semibold">EMPOWER</span>
                <span className="font-semibold">JUSTICE</span>
                <i className="mt-1 h-px w-8 bg-violet-500" />
              </div>

              {/* floating decorative text */}
              <div className="absolute right-[2%] top-[10%] z-10 hidden max-w-[150px] -rotate-[7deg] xl:block" style={{ fontFamily: 'Georgia, serif' }}>
                <p className="text-[16px] italic leading-[1.35] text-[#2e3462]">
                  Equal Rights<br />Stronger Communities<br />A Kinder India
                </p>
                <hr className="my-3 w-8 border-violet-500" />
                <p className="mt-5 translate-x-[20%] text-[14px] italic leading-[1.4] text-[#3c4072]">
                  "A more inclusive<br />and compassionate<br />India is possible."
                </p>
              </div>

              {/* hero image */}
              <div className="absolute inset-x-[2%] bottom-0 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[rgba(8,18,50,.35)] to-transparent" />
                <img
                  src="/images/landing/hero.png"
                  alt="Samvedna AI – advocate standing before the Indian Parliament"
                  className="h-[420px] w-full object-cover object-[63%_47%]"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent 2%, black 14%, black 92%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 2%, black 14%, black 92%, transparent)',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════ ROLE CARDS ════════════ */}
        <section className="mx-auto grid max-w-[1400px] gap-4 px-6 py-4 md:grid-cols-3 lg:px-8">
          {roleCards.map(({ icon: Icon, title, text, action, href, tone, imgUrl }) => (
            <article
              key={title}
              id={title.includes('Citizens') ? 'citizens' : title.includes('Counselors') ? 'counselors' : 'administrators'}
              className={`group relative min-h-[175px] overflow-hidden rounded-2xl border border-white/80 p-6 shadow-[0_8px_28px_rgba(69,83,160,.08)] transition hover:shadow-lg ${toneBg[tone]}`}
            >
              {/* content */}
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

              {/* background image */}
              <div
                className="absolute inset-y-0 right-0 w-[46%] opacity-40 transition group-hover:opacity-50"
                style={{
                  backgroundImage: `linear-gradient(to right, ${tone === 'blue' ? 'rgba(238,245,255,.95)' : tone === 'green' ? 'rgba(237,252,247,.95)' : 'rgba(255,245,237,.95)'}, transparent 40%), url('${imgUrl}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </article>
          ))}
        </section>

        {/* ════════════ HOW IT WORKS ════════════ */}
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

              {/* workflow steps */}
              <div className="grid items-center gap-2 sm:grid-cols-5">
                {workflow.map(([Icon, title, sub], i) => (
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

        {/* ════════════ FEATURES / IMPACT BAR ════════════ */}
        <section id="features" className="mt-2 border-y border-violet-100 bg-white">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-5 px-6 py-5 md:grid-cols-4 lg:px-8">
            {[
              [ShieldCheck, 'Safer Communities', 'Through Timely Support', 'text-violet-600'],
              [Sparkles, 'Data-Driven Insights', 'For Informed Action', 'text-violet-600'],
              [Globe2, 'Multi-Lingual & Accessible', 'Across Regions', 'text-violet-600'],
              [Heart, 'A More Inclusive India', 'Built on Dignity and Justice', 'text-rose-500'],
            ].map(([Icon, title, copy, color], i) => (
              <div
                key={title}
                className={`flex items-center justify-center gap-3.5 ${
                  i < 3 ? 'md:border-r md:border-violet-100' : ''
                }`}
              >
                <Icon className={color} size={28} />
                <div>
                  <h3 className="text-[14px] font-extrabold leading-tight">{title}</h3>
                  <p className="text-[11px] text-[#4a5b93]">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ════════════ FOOTER ════════════ */}
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
            "Justice is not a privilege. It is a right."
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
