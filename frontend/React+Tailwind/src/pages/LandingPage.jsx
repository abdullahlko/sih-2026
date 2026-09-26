import { useState, useRef, useEffect } from 'react'
import AuthModal from '../components/auth/AuthModal'
import { useSimulation, LANGUAGES } from '../context/SimulationContext'
import {
  ArrowRight, BarChart3, BotMessageSquare, CheckCircle2, ChevronDown,
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
  { label: 'How It Works', href: '#how' },
  { label: 'Features', href: '#features' },
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

/* ─────────────────────────── TRANSLATIONS ─────────────────────────── */
const T = {
  en: {
    tagline: 'Support · Dignity · Justice',
    navHome: 'Home', navAbout: 'About', navHow: 'How It Works', navFeatures: 'Features',
    signIn: 'Sign In',
    selectLang: 'Select Language',
    heroHeading1: 'Stronger Support',
    heroHeading2: 'for a Fairer',
    heroHeading3: 'Tomorrow',
    heroDesc: 'Samvedna AI is an empathetic, role-based support and case-triage platform for SC/ST atrocity survivors - designed to help surface distress signals, coordinate counselor response and enable administrative oversight.',
    badge1: 'Confidential & Secure', badge2: 'Multi-Lingual Support', badge3: 'Human-Centered AI',
    card1Title: 'For Citizens', card1Text: 'Share your experience, get support, access resources and stay informed in a safe and respectful space.', card1Action: 'Enter Citizen Portal',
    card2Title: 'For Counselors', card2Text: 'Review cases, get AI-driven insights, prioritise alerts and coordinate timely, trauma-informed support.', card2Action: 'Open Counselor Workspace',
    card3Title: 'For Administrators', card3Text: 'Monitor trends, analyse data, track regional alerts and drive impactful policies.', card3Action: 'View Command Centre',
    howLabel: 'HOW SAMVEDNA AI WORKS', howTitle1: 'From a', howTitle2: 'Voice to Action', howSub: 'A seamless flow from citizen check-in to administrative oversight.',
    impact1: 'Safer Communities', impact1s: 'Through Timely Support',
    impact2: 'Data-Driven Insights', impact2s: 'For Informed Action',
    impact3: 'Multi-Lingual & Accessible', impact3s: 'Across Regions',
    impact4: 'A More Inclusive India', impact4s: 'Built on Dignity and Justice',
    footerQuote: '"Justice is not a privilege. It is a right."',
    forPeople: 'For People', forSupport: 'For Support', forBrighter: 'For a Brighter Tomorrow',
  },
  hinglish: {
    tagline: 'Support · Dignity · Justice',
    navHome: 'Home', navAbout: 'Hamare Baare Mein', navHow: 'Kaise Kaam Karta Hai', navFeatures: 'Features',
    signIn: 'Sign In',
    selectLang: 'Bhasha Chunein',
    heroHeading1: 'Mazboot Support',
    heroHeading2: 'Ek Behtar',
    heroHeading3: 'Kal Ke Liye',
    heroDesc: 'Samvedna AI ek empathetic, role-based support aur case-triage platform hai SC/ST atrocity survivors ke liye — distress signals surface karne, counselor response coordinate karne aur administrative oversight enable karne ke liye design kiya gaya hai.',
    badge1: 'Confidential & Secure', badge2: 'Multi-Bhasha Support', badge3: 'Human-Centered AI',
    card1Title: 'Citizens Ke Liye', card1Text: 'Apna anubhav share karein, support paaein, resources access karein aur ek safe jagah mein informed rahein.', card1Action: 'Citizen Portal Enter Karein',
    card2Title: 'Counselors Ke Liye', card2Text: 'Cases review karein, AI insights paaein, alerts prioritise karein aur timely trauma-informed support coordinate karein.', card2Action: 'Counselor Workspace Kholein',
    card3Title: 'Administrators Ke Liye', card3Text: 'Trends monitor karein, data analyse karein, regional alerts track karein aur impactful policies drive karein.', card3Action: 'Command Centre Dekhein',
    howLabel: 'SAMVEDNA AI KAISE KAAM KARTA HAI', howTitle1: 'Ek', howTitle2: 'Awaaz Se Action Tak', howSub: 'Citizen check-in se administrative oversight tak ek seamless flow.',
    impact1: 'Surakshit Communities', impact1s: 'Samay Par Support Se',
    impact2: 'Data-Driven Insights', impact2s: 'Informed Action Ke Liye',
    impact3: 'Multi-Bhasha & Accessible', impact3s: 'Poore Desh Mein',
    impact4: 'Ek Aur Inclusive India', impact4s: 'Dignity Aur Justice Par Aadharit',
    footerQuote: '"Nyay ek privilege nahin hai. Yeh ek adhikar hai."',
    forPeople: 'Logo Ke Liye', forSupport: 'Support Ke Liye', forBrighter: 'Ek Ujjwal Kal Ke Liye',
  },
  hi: {
    tagline: 'सहयोग · गरिमा · न्याय',
    navHome: 'होम', navAbout: 'हमारे बारे में', navHow: 'यह कैसे काम करता है', navFeatures: 'विशेषताएं',
    signIn: 'साइन इन',
    selectLang: 'भाषा चुनें',
    heroHeading1: 'मजबूत समर्थन',
    heroHeading2: 'एक बेहतर',
    heroHeading3: 'कल के लिए',
    heroDesc: 'संवेदना AI एक सहानुभूतिपूर्ण, भूमिका-आधारित समर्थन और केस-ट्रायज प्लेटफॉर्म है - SC/ST अत्याचार पीड़ितों के लिए डिज़ाइन किया गया है।',
    badge1: 'गोपनीय और सुरक्षित', badge2: 'बहुभाषी समर्थन', badge3: 'मानव-केंद्रित AI',
    card1Title: 'नागरिकों के लिए', card1Text: 'अपना अनुभव साझा करें, समर्थन प्राप्त करें, संसाधनों तक पहुंचें और एक सुरक्षित स्थान में सूचित रहें।', card1Action: 'नागरिक पोर्टल खोलें',
    card2Title: 'परामर्शदाताओं के लिए', card2Text: 'केस की समीक्षा करें, AI अंतर्दृष्टि प्राप्त करें, अलर्ट प्राथमिकता दें और समय पर आघात-सूचित समर्थन समन्वित करें।', card2Action: 'परामर्शदाता कार्यक्षेत्र खोलें',
    card3Title: 'प्रशासकों के लिए', card3Text: 'रुझानों की निगरानी करें, डेटा का विश्लेषण करें, क्षेत्रीय अलर्ट ट्रैक करें और प्रभावशाली नीतियां बनाएं।', card3Action: 'कमांड सेंटर देखें',
    howLabel: 'संवेदना AI कैसे काम करता है', howTitle1: 'एक', howTitle2: 'आवाज़ से क्रिया तक', howSub: 'नागरिक चेक-इन से प्रशासनिक निगरानी तक एक सहज प्रवाह।',
    impact1: 'सुरक्षित समुदाय', impact1s: 'समय पर समर्थन से',
    impact2: 'डेटा-संचालित अंतर्दृष्टि', impact2s: 'सूचित कार्रवाई के लिए',
    impact3: 'बहुभाषी और सुलभ', impact3s: 'पूरे क्षेत्र में',
    impact4: 'एक अधिक समावेशी भारत', impact4s: 'गरिमा और न्याय पर आधारित',
    footerQuote: '"न्याय कोई विशेषाधिकार नहीं है। यह एक अधिकार है।"',
    forPeople: 'लोगों के लिए', forSupport: 'समर्थन के लिए', forBrighter: 'एक उज्जवल कल के लिए',
  },
  ta: {
    tagline: 'ஆதரவு · கண்ணியம் · நீதி',
    navHome: 'முகப்பு', navAbout: 'எங்களைப் பற்றி', navHow: 'எப்படி செயல்படுகிறது', navFeatures: 'அம்சங்கள்',
    signIn: 'உள்நுழை',
    selectLang: 'மொழி தேர்ந்தெடு',
    heroHeading1: 'வலுவான ஆதரவு',
    heroHeading2: 'ஒரு நியாயமான',
    heroHeading3: 'நாளைக்காக',
    heroDesc: 'சம்வேதனா AI என்பது SC/ST அட்டூழியம் பாதிக்கப்பட்டவர்களுக்கான உணர்வுபூர்வமான, பங்கு அடிப்படையிலான ஆதரவு மற்றும் கேஸ்-ட்ரியாஜ் தளம்.',
    badge1: 'இரகசியமான & பாதுகாப்பான', badge2: 'பன்மொழி ஆதரவு', badge3: 'மனித-மையப்படுத்திய AI',
    card1Title: 'குடிமக்களுக்கு', card1Text: 'உங்கள் அனுபவத்தை பகிர்ந்து, ஆதரவு பெறுங்கள், வளங்களை அணுகுங்கள்.', card1Action: 'குடிமக்கள் போர்டல் திறக்கவும்',
    card2Title: 'ஆலோசகர்களுக்கு', card2Text: 'வழக்குகளை மதிப்பாய்வு செய்யுங்கள், AI நுண்ணறிவு பெறுங்கள், விழிப்பூட்டல்களுக்கு முன்னுரிமை அளியுங்கள்.', card2Action: 'ஆலோசகர் பணியிடம் திறக்கவும்',
    card3Title: 'நிர்வாகிகளுக்கு', card3Text: 'போக்குகளை கண்காணியுங்கள், தரவை பகுப்பாய்வு செய்யுங்கள், பிராந்திய விழிப்பூட்டல்களை கண்காணியுங்கள்.', card3Action: 'கட்டளை மையம் காண்க',
    howLabel: 'சம்வேதனா AI எப்படி செயல்படுகிறது', howTitle1: 'ஒரு', howTitle2: 'குரலிலிருந்து செயலுக்கு', howSub: 'குடிமக்கள் பதிவிலிருந்து நிர்வாக மேற்பார்வை வரை.',
    impact1: 'பாதுகாப்பான சமூகங்கள்', impact1s: 'சரியான நேர ஆதரவின் மூலம்',
    impact2: 'தரவு-இயக்கப்பட்ட நுண்ணறிவு', impact2s: 'தகவலறிந்த நடவடிக்கைக்கு',
    impact3: 'பன்மொழி & அணுகக்கூடியது', impact3s: 'பல பிராந்தியங்களில்',
    impact4: 'மேலும் உள்ளடங்கிய இந்தியா', impact4s: 'கண்ணியம் மற்றும் நீதியில் கட்டப்பட்டது',
    footerQuote: '"நீதி ஒரு சலுகை அல்ல. இது ஒரு உரிமை."',
    forPeople: 'மக்களுக்கு', forSupport: 'ஆதரவுக்கு', forBrighter: 'ஒரு பிரகாசமான நாளைக்கு',
  },
  mr: {
    tagline: 'आधार · प्रतिष्ठा · न्याय',
    navHome: 'मुखपृष्ठ', navAbout: 'आमच्याबद्दल', navHow: 'हे कसे कार्य करते', navFeatures: 'वैशिष्ट्ये',
    signIn: 'साइन इन',
    selectLang: 'भाषा निवडा',
    heroHeading1: 'मजबूत आधार',
    heroHeading2: 'एक न्यायी',
    heroHeading3: 'उद्यासाठी',
    heroDesc: 'संवेदना AI हे SC/ST अत्याचार पीडितांसाठी एक सहानुभूतीपूर्ण, भूमिका-आधारित समर्थन आणि केस-ट्रायज प्लॅटफॉर्म आहे.',
    badge1: 'गोपनीय आणि सुरक्षित', badge2: 'बहुभाषी समर्थन', badge3: 'मानव-केंद्रित AI',
    card1Title: 'नागरिकांसाठी', card1Text: 'आपला अनुभव सामायिक करा, समर्थन मिळवा, संसाधनांपर्यंत पोहोचा आणि सुरक्षित जागेत माहितगार राहा.', card1Action: 'नागरिक पोर्टल उघडा',
    card2Title: 'समुपदेशकांसाठी', card2Text: 'प्रकरणांचे पुनरावलोकन करा, AI अंतर्दृष्टी मिळवा, सतर्कतांना प्राधान्य द्या आणि वेळेवर आघात-माहितीपूर्ण समर्थन समन्वित करा.', card2Action: 'समुपदेशक कार्यक्षेत्र उघडा',
    card3Title: 'प्रशासकांसाठी', card3Text: 'ट्रेंड निरीक्षण करा, डेटाचे विश्लेषण करा, प्रादेशिक सतर्कता ट्रॅक करा आणि प्रभावशाली धोरणे तयार करा.', card3Action: 'कमांड सेंटर पहा',
    howLabel: 'संवेदना AI कसे कार्य करते', howTitle1: 'एका', howTitle2: 'आवाजापासून कृतीपर्यंत', howSub: 'नागरिक चेक-इन पासून प्रशासकीय देखरेखीपर्यंत एक अखंड प्रवाह.',
    impact1: 'सुरक्षित समुदाय', impact1s: 'वेळेवर समर्थनाद्वारे',
    impact2: 'डेटा-चालित अंतर्दृष्टी', impact2s: 'माहितीपूर्ण कृतीसाठी',
    impact3: 'बहुभाषी आणि सुलभ', impact3s: 'सर्व प्रदेशांमध्ये',
    impact4: 'अधिक सर्वसमावेशक भारत', impact4s: 'प्रतिष्ठा आणि न्यायावर आधारित',
    footerQuote: '"न्याय हा विशेषाधिकार नाही. तो एक हक्क आहे."',
    forPeople: 'लोकांसाठी', forSupport: 'समर्थनासाठी', forBrighter: 'उज्ज्वल उद्यासाठी',
  },
}

/* ═══════════════════════════════════════════════════════════════
   LANDING PAGE — "Stronger Support for a Fairer Tomorrow"
   This is the NEW entry landing page (image 2).
   Navigation links (#citizen, #counselor, #admin) redirect
   to the existing app (image 1) via hash routing in App.jsx.
   ═══════════════════════════════════════════════════════════════ */

export default function LandingPage() {
  const { language, setLanguage } = useSimulation()
  const t = T[language] || T.en
  const currentLang = LANGUAGES.find(l => l.id === language) || LANGUAGES[0]

  const [mobileOpen, setMobileOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authRole, setAuthRole] = useState('citizen')
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setIsLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinks = [
    { label: t.navHome, href: '#top', active: true },
    { label: t.navHow, href: '#how' },
    { label: t.navFeatures, href: '#features' },
  ]

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
        <nav className="mx-auto flex h-15.5 max-w-350 items-center justify-between gap-4 px-5 lg:px-8">

          {/* Logo */}
          <a href="#top" className="flex shrink-0 items-center gap-2">
            <LogoMark />
            <span>
              <span className="block text-[22px] font-extrabold leading-5 tracking-tight">
                Samvedna <b className="text-violet-600">AI</b>
              </span>
              <span className="mt-0.5 block text-[9.5px] font-medium tracking-[.12em] text-[#455491]">
                {t.tagline}
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden h-full items-center gap-6 text-[12.5px] font-medium text-[#293060] lg:flex">
            {navLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                className={`grid h-full place-items-center transition-colors hover:text-violet-700 ${l.active ? 'border-b-2 border-violet-600 font-bold text-violet-700' : ''
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right: Language Selector + Sign In */}
          <div className="flex shrink-0 items-center gap-3">

            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="hidden xl:flex items-center gap-1.5 text-[12px] font-semibold text-[#364478] cursor-pointer hover:text-violet-700 transition-colors"
              >
                <Globe2 size={16} />
                {currentLang.label}
                <ChevronDown size={12} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className="absolute right-0 mt-3 w-52 rounded-2xl bg-white border border-violet-100 shadow-xl py-2 z-50">
                  <div className="px-3.5 py-1.5 mb-1 border-b border-violet-100 text-[10px] font-bold uppercase tracking-wider text-violet-500">
                    {t.selectLang}
                  </div>
                  {LANGUAGES.map(item => (
                    <button
                      key={item.id}
                      onClick={() => { setLanguage(item.id); setIsLangOpen(false) }}
                      className={`w-full text-left px-3.5 py-2 text-[12.5px] flex items-center justify-between hover:bg-violet-50 transition-colors cursor-pointer ${language === item.id ? 'text-violet-700 font-bold bg-violet-50' : 'text-slate-700'
                      }`}
                    >
                      <span>{item.label}</span>
                      {language === item.id && <CheckCircle2 size={15} className="text-violet-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => { setAuthRole('citizen'); setIsAuthOpen(true) }}
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo-700 to-violet-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-violet-300/50 transition hover:shadow-violet-400/60 cursor-pointer"
            >
              {t.signIn}
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
              {/* Mobile language picker */}
              <div className="pt-1 border-t border-violet-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-violet-500 mb-2">{t.selectLang}</p>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setLanguage(item.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${language === item.id
                      }`}
                    >
                      {item.shortLabel}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setMobileOpen(false); setIsAuthOpen(true) }}
                className="mt-2 w-full py-2.5 rounded-xl bg-linear-to-r from-indigo-700 to-violet-600 text-white text-xs font-bold shadow-md shadow-violet-300/40"
              >
                {t.signIn}
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
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-white/30 via-white/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-10 bg-linear-to-t from-[#fbfbff]/60 to-transparent" />

          <div className="mx-auto min-h-115 max-w-350 px-6 pt-8 pb-12 lg:min-h-130 lg:px-8">

            {/* LEFT — copy (sits on top of image with gradient overlay behind) */}
            <div className="relative z-10 max-w-140">

              {/* Heading */}
              <h1 className="mt-2 text-[36px] sm:text-[46px] xl:text-[52px] font-extrabold leading-[1.3] tracking-tight">
                {t.heroHeading1}<br />
                <span className="bg-linear-to-r from-indigo-700 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                  {t.heroHeading2}<br />
                  {t.heroHeading3}
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-125text-[15px] leading-[1.55] text-[#3a507f]">
                {t.heroDesc}
              </p>

              {/* Trust badges */}
              <div className="mt-20 flex flex-wrap gap-x-7 gap-y-2 text-[12px] font-medium text-[#1e3058]">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-violet-600" /> {t.badge1}
                </span>
                <span className="flex items-center gap-2">
                  <Globe2 size={17} className="text-violet-600" /> {t.badge2}
                </span>
                <span className="flex items-center gap-2">
                  <UsersRound size={18} className="text-violet-600" /> {t.badge3}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ ROLE CARDS ═══════════════════ */}
        <section className="mx-auto grid max-w-350 gap-4 px-6 py-4 md:grid-cols-3 lg:px-8">
          {[
            {
              icon: UsersRound,
              title: t.card1Title,
              text: t.card1Text,
              action: t.card1Action,
              href: '#citizen',
              tone: 'blue',
              imgUrl: '/images/landing/citizen.png',
            },
            {
              icon: Stethoscope,
              title: t.card2Title,
              text: t.card2Text,
              action: t.card2Action,
              href: '#counselor',
              tone: 'green',
              imgUrl: '/images/landing/counsellor.png',
            },
            {
              icon: BarChart3,
              title: t.card3Title,
              text: t.card3Text,
              action: t.card3Action,
              href: '#admin',
              tone: 'orange',
              imgUrl: '/images/landing/administrator.png',
            },
          ].map(({ icon: Icon, title, text: cardText, action, href, tone, imgUrl }) => (
            <article
              key={title}
              className={`group relative min-h-43.75 overflow-hidden rounded-2xl border border-white/80 p-6 shadow-[0_8px_28px_rgba(69,83,160,.08)] transition hover:shadow-lg ${toneBg[tone]}`}
            >
              <div className="relative z-10 w-[44%] overflow-hidden">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`grid size-10 shrink-0 place-items-center rounded-xl ${toneIcon[tone]}`}>
                    <Icon size={20} />
                  </div>
                  <h2 className="text-[15px] font-extrabold leading-tight wrap-break-word">{title}</h2>
                </div>
                <p className="mt-3 text-[12.5px] leading-normal text-[#3c507a]">{cardText}</p>
                <a
                  href={href}
                  className={`mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold ${toneLink[tone]}`}
                >
                  <span>{action}</span> <ArrowRight size={14} className="shrink-0" />
                </a>
              </div>

              {/* Local card image */}
              <div className="absolute inset-y-0 right-0 w-[52%] overflow-hidden pointer-events-none">
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
        <section id="how" className="mx-auto max-w-350 px-6 pt-2 pb-3 lg:px-8">
          <div className="rounded-2xl border border-violet-100 bg-white px-6 py-6 shadow-[0_6px_24px_rgba(63,65,150,.06)] lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

              {/* left label */}
              <div>
                <p className="text-[11px] font-bold tracking-[.16em] text-[#3b4c82]">
                  <i className="mr-3 inline-block h-0.5 w-5 bg-violet-600 align-middle" />
                  {t.howLabel}
                </p>
                <h2 className="mt-3 text-[30px] font-extrabold leading-[.92] tracking-tight">
                  {t.howTitle1}<br />
                  <span className="text-violet-600">{t.howTitle2}</span>
                </h2>
                <p className="mt-3 max-w-60 text-[12.5px] leading-normal text-[#4a5e8e]">
                  {t.howSub}
                </p>
              </div>

              {/* 5 workflow steps */}
              <div className="grid items-center gap-2 sm:grid-cols-5">
                {workflow.map(({ Icon, title, sub }, i) => (
                  <div key={title} className="relative text-center">
                    <div className="mx-auto grid size-13 place-items-center rounded-full bg-linear-to-br from-violet-100 to-white text-violet-600 shadow-sm ring-1 ring-violet-100/60">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-2.5 whitespace-pre-line text-[11px] font-extrabold leading-[1.15]">
                      {i + 1}. {title}
                    </h3>
                    <p className="mt-1 text-[10px] text-[#3c5088]">{sub}</p>
                    {i < 4 && (
                      <ArrowRight
                        className="absolute -right-2.5 top-4.5 hidden text-violet-400 sm:block"
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
          <div className="mx-auto grid max-w-350 grid-cols-2 gap-y-5 px-6 py-5 md:grid-cols-4 lg:px-8">
            {[
              { Icon: ShieldCheck, title: t.impact1, sub: t.impact1s, color: 'text-violet-600' },
              { Icon: Sparkles, title: t.impact2, sub: t.impact2s, color: 'text-violet-600' },
              { Icon: Globe2, title: t.impact3, sub: t.impact3s, color: 'text-violet-600' },
              { Icon: Heart, title: t.impact4, sub: t.impact4s, color: 'text-rose-500' },
            ].map(({ Icon, title, sub, color }, i) => (
              <div
                key={title}
                className={`flex items-center justify-center gap-3.5 ${i < 3 ? 'md:border-r md:border-violet-100' : ''
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
      <footer id="resources" className="bg-linear-to-r from-[#f3f5ff] to-white">
        <div className="mx-auto flex max-w-350 flex-col items-center justify-between gap-6 px-6 py-6 text-center md:flex-row md:text-left lg:px-8">
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
            {t.footerQuote}
          </p>

          <span className="ml-2 border-l border-violet-200 pl-3 text-[11px] leading-[1.4] text-[#4c5a93]">
            {t.forPeople}<br />{t.forSupport}<br />{t.forBrighter}
          </span>

        </div>
      </footer>
    </div>
  )
}
