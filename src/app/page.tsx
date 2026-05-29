"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight, CheckCircle2, ShieldCheck, PhoneCall, MapPin, RefreshCw,
  Menu, X, MessageCircle, Send, User, Mail, Building2, Globe, Users,
  DollarSign, Check, Star, Sparkles, ChevronDown, BarChart3, Target,
  Clock, Zap, TrendingUp, Award, Wrench, Key, Bug, Droplets, House, Truck, Thermometer
} from "lucide-react"

// ─── Framer Variants ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

// ─── Data ──────────────────────────────────────────────────────────
const EN = {
  login: "Login",
  signup: "Sign Up",
  nav: { how: "How It Works", pricing: "Pricing", guarantee: "Guarantee" },
  badge: "For Home Service Companies Across The United States",
  heroTitle: "Exclusive qualified homeowner opportunities delivered weekly.",
  heroText: "HomeFlow Leads helps HVAC, plumbing, roofing, pest control, and home service companies receive qualified local customer opportunities without shared lead marketplaces.",
  primaryCta: "Get Started",
  secondaryCta: "View Pricing",
  trust: ["Exclusive customers", "Replacement guarantee", "Weekly delivery"],
  cardLabel: "Simple Offer",
  cardTitle: "Pay only for qualified customers",
  cardItems: ["Inside your service area", "Matched to your service", "Not resold to competitors", "Wrong contacts replaced free"],
  howEyebrow: "PROCESS",
  howTitle: "How It Works",
  steps: [
    { title: "Tell Us Your Service Area", text: "Choose the cities or areas where your company wants to receive customers.", icon: MapPin },
    { title: "Select Your Services", text: "Tell us what services your business provides, such as HVAC, Plumbing, Roofing, Pest Control, or Water Damage Restoration.", icon: Building2 },
    { title: "We Find Qualified Customer Opportunities", text: "We search for potential customers who match your service area and service category.", icon: Users },
    { title: "We Review Every Customer", text: "Before delivery, we check contact information, service match, location match, and interest level.", icon: CheckCircle2 },
    { title: "Weekly Delivery", text: "You receive organized customer opportunities in weekly batches.", icon: Clock },
    { title: "Your Team Makes The Call", text: "Your team contacts the customers directly, gives estimates, schedules appointments, and closes the job.", icon: PhoneCall },
    { title: "Pay Only For Qualified Customers", text: "You only pay for customers who match the agreed criteria and show real interest.", icon: DollarSign },
    { title: "Replacement Guarantee", text: "Any wrong number, unreachable customer, or customer outside the agreed criteria will be replaced for free.", icon: RefreshCw },
  ],
  testimonialsEyebrow: "TESTIMONIALS",
  testimonialsTitle: "Real Feedback From Home Service Companies",
  testimonialsText: "Simple customer opportunities, delivered clearly, with replacement protection when contacts are invalid or outside the agreed criteria.",
  testimonials: [
    {
      name: "Michael Turner",
      role: "Owner, Turner HVAC Services",
      type: "HVAC Company",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
      text: "Before HomeFlow Leads, our team was spending too much time looking for potential customers manually. Now we receive organized qualified customer opportunities every week, and our sales team can focus on calling, quoting, and closing.",
      before: "Searching manually for customers.",
      after: "Weekly qualified customer opportunities delivered.",
    },
    {
      name: "Sarah Mitchell",
      role: "Operations Manager, ClearRoof Pros",
      type: "Roofing Company",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
      text: "The biggest difference for us was clarity. We know what we are paying for, we know which customers are exclusive, and invalid contacts are replaced. It made our lead follow-up process more organized.",
      before: "Unclear shared leads and wasted follow-up time.",
      after: "Exclusive customer opportunities with replacement protection.",
    },
    {
      name: "Daniel Brooks",
      role: "Founder, Brooks Plumbing & Drain",
      type: "Plumbing Company",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      text: "We did not want another shared lead platform. HomeFlow Leads gave us a simpler model: pay per qualified customer, weekly batches, and clear criteria. It helped our team focus on real conversations instead of random data.",
      before: "Random contacts and shared lead platforms.",
      after: "Qualified customers matched to service area and service type.",
    },
  ],
  pricingEyebrow: "PRICING",
  pricingTitle: "Pay Per Qualified Customer",
  pricingText: "No complicated contracts. Start small, test quality, then scale when results make sense.",
  bestChoice: "Best Choice",
  plans: [
    { name: "Starter", desc: "For your first test", price: "$10", total: "$250/mo", items: ["Per qualified customer", "Up to 25/month", "Valid contact included", "Wrong numbers replaced"], featured: false },
    { name: "Growth", desc: "For steady growth", price: "$25", total: "$2,500/mo", items: ["Per exclusive qualified customer", "Up to 100/month", "Weekly delivery", "Not sold to competitors", "Priority support"], featured: true },
    { name: "Premium", desc: "For high intent", price: "$75", total: "$3,000/mo", items: ["Per high-intent customer", "Up to 40/month", "Priority delivery", "Stronger verification", "Dedicated account manager"], featured: false },
  ],
  guaranteeEyebrow: "TRANSPARENCY",
  guaranteeTitle: "Clear rules. No hidden promises.",
  guaranteeText: "We provide qualified customer opportunities. We don't guarantee closed sales — the final result depends on your follow-up speed, offer quality, and sales process.",
  replaceTitle: "Replacement Guarantee",
  replaceText: "Any wrong number, unreachable contact, or customer outside agreed criteria is replaced for free.",
  noClosingTitle: "You don't pay for closed deals",
  noClosingText: "You pay only for qualified, interested customers, not for final sales or revenue outcomes.",
  chat: {
    title: "Quick Qualification",
    subtitle: "We reply as soon as possible",
    message: "Hi! Tell us where your company works and what type of customers you need.",
    name: "Your name",
    phone: "Phone number",
    email: "Email address",
    sms: "Message / service area / type",
    send: "Send Request",
  },
  apply: {
    stepLabel: "Application Step",
    title1: "Apply to Become a HomeFlow Leads Partner",
    title2: "Tell us about your business",
    subtitle2: "This helps us understand your service area, capacity, and whether we can support your growth.",
    title3: "You're all set!",
    thanks: "Thank you for your application!",
    thanksText: "Our team will review your application and reach out if you're a good fit.",
    prev: "Previous",
    next: "Next",
    close: "Close",
  },
  stats: [
    { value: "2M+", label: "Leads Delivered", icon: TrendingUp },
    { value: "500+", label: "Partner Companies", icon: Building2 },
    { value: "40-60%", label: "Contact Rate", icon: Zap },
    { value: "4.9/5", label: "Client Rating", icon: Star },
  ],
  footer: {
    rights: "© 2026 HomeFlow Leads. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
}

// ─── Helpers ──────────────────────────────────────────────────────
const services = [
  { name: "Appliance Repair", icon: Wrench },
  { name: "Electrical", icon: Zap },
  { name: "HVAC", icon: Thermometer },
  { name: "Locksmith", icon: Key },
  { name: "Mold Remediation", icon: Droplets },
  { name: "Pest Control", icon: Bug },
  { name: "Plumbing", icon: Droplets },
  { name: "Roofing", icon: House },
  { name: "Towing", icon: Truck },
  { name: "Water Damage Restoration", icon: Droplets },
  { name: "None of the Above", icon: X },
]

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

// ─── Webhook ──────────────────────────────────────────────────────
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyjQW6pPnmXxRFMegYvDL6y1cEleer-aBcUgVPTwSKyMVBzF-OaaCW2PD96A4NnZ7kDNg/exec"

async function submitForm(data: Record<string, unknown>) {
  return new Promise<void>((resolve) => {
    const iframe = document.createElement("iframe")
    iframe.style.display = "none"
    iframe.name = "hfl-frame-" + Date.now()
    document.body.appendChild(iframe)

    const form = document.createElement("form")
    form.method = "POST"
    form.action = WEBHOOK_URL
    form.target = iframe.name

    const input = document.createElement("input")
    input.type = "hidden"
    input.name = "payload"
    input.value = JSON.stringify(data)
    form.appendChild(input)
    document.body.appendChild(form)

    form.submit()

    setTimeout(() => {
      document.body.removeChild(form)
      document.body.removeChild(iframe)
      resolve()
    }, 3000)
  })
}

// ─── App ──────────────────────────────────────────────────────────
function getChatReply(msg: string, firstName: string): string {
  const q = msg.toLowerCase()
  if (/pric|cost|pay|\$|how much|plan/.test(q)) {
    return `Great question, ${firstName}! We have three plans:\n\n• Starter: $10/lead, up to 25/month\n• Growth: $25/lead, up to 100/month\n• Premium: $75/lead, up to 40 high-intent/month\n\nAll plans include our replacement guarantee. Would you like more details on any plan?`
  }
  if (/how.?it.?work|process|step/.test(q)) {
    return `Here's how HomeFlow Leads works in 3 simple steps:\n\n1️⃣ Tell us your service area and what services you offer\n2️⃣ We find & verify qualified customer opportunities\n3️⃣ You receive them weekly and your team follows up\n\nYou only pay for qualified, interested customers. Simple!`
  }
  if (/servic|offer|what.*do|provid|hvac|plumb|roof|pest|electr/.test(q)) {
    return `We cover a wide range of home services: HVAC, Plumbing, Roofing, Pest Control, Electrical, Appliance Repair, Locksmith, Mold Remediation, Water Damage Restoration, and more. If you offer home services, we can help you find customers!`
  }
  if (/replace|guarant|refund|wrong.*number|bad.*lead/.test(q)) {
    return `Absolutely! We have a Replacement Guarantee. Any wrong number, unreachable customer, or contact outside the agreed criteria will be replaced for free. No questions asked.`
  }
  if (/area|location|city|where|region/.test(q)) {
    return `We operate across the United States. Tell us your target cities or areas and we'll find qualified customer opportunities there. The more specific your areas, the better matches we can find!`
  }
  if (/contact|talk.*human|real.*person|support/.test(q)) {
    return `Want to talk to our team directly? Submit an application and we'll reach out. You can also email us and we'll get back to you as soon as possible!`
  }
  if (/compet|exclusiv|shared|resell/.test(q)) {
    return `Unlike shared lead marketplaces, HomeFlow Leads delivers exclusive opportunities. You won't be competing with other companies for the same customer. Each lead is yours alone.`
  }
  if (/start|begin|sign.?up|apply/.test(q)) {
    return `Ready to start? Click "Get Started" on our homepage or fill out the application form. We'll review your info and get you set up with qualified customer opportunities!`
  }
  if (/hi|hello|hey|morning|evening/.test(q)) {
    return `Hey ${firstName}! 👋 How can I help you today? Feel free to ask about our pricing, how it works, or anything about HomeFlow Leads!`
  }
  if (/thank|thanks|appreciate/.test(q)) {
    return `You're welcome, ${firstName}! I'm always here if you have more questions. Feel free to come back anytime! 😊`
  }
  return `Thanks for reaching out, ${firstName}! I want to make sure I help you properly. You can ask me about:\n\n💰 Pricing & Plans\n⚙️ How It Works\n🔧 Services We Cover\n✅ Replacement Guarantee\n📍 Service Areas\n🚀 Getting Started\n\nWhat would you like to know?`
}

export default function HomeFlowLeadsApp() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<{role:"bot"|"user";text:string}[]>([])
  const [chatInput, setChatInput] = useState("")
  const chatRef = useRef({name:"",phone:"",email:""})
  const [chatStep, setChatStep] = useState(-1) // -1=waiting, 0=lead form, 3=free
  const [leadForm, setLeadForm] = useState({ name:"", phone:"", email:"", plan:"" })
  const [applyOpen, setApplyOpen] = useState(false)
  const [applyStep, setApplyStep] = useState(1)
  const [scrolled, setScrolled] = useState(false)
  const [apply, setApply] = useState({
    firstName: "", lastName: "", company: "", email: "", services: [] as string[],
    phone: "", locatedUS: "", zip: "", employees: "", website: "", budget: "", notes: "", plan: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const t = EN

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const addBotMsg = (text: string) => setChatMessages(m => [...m, {role:"bot",text}])
  const addUserMsg = (text: string) => setChatMessages(m => [...m, {role:"user",text}])

  const handleChatSend = (text: string) => {
    const msg = text.trim()
    if (!msg) return
    addUserMsg(msg)
    setChatInput("")

    const c = chatRef.current
    const reply = getChatReply(msg, c.name.split(" ")[0] || "there")
    setTimeout(() => addBotMsg(reply), 500)
  }

  const handleLeadSubmit = () => {
    const { name, phone, email, plan } = leadForm
    if (!name.trim() || !phone.trim() || !email.trim()) return
    chatRef.current = { name, phone, email }
    submitForm({ type:"chat", name, phone, email, plan, message:"Chat lead captured" })
    setChatStep(3)
    addBotMsg(`Thanks, ${name.split(" ")[0]}! I'm here to answer any questions about HomeFlow Leads. What would you like to know?`)
  }

  const openChat = () => {
    setChatOpen(true)
    if (chatMessages.length === 0) {
      setChatStep(0)
      setLeadForm({ name:"", phone:"", email:"", plan:"" })
    }
  }

  const updateApply = (field: string, value: string) => setApply(a => ({ ...a, [field]: value }))
  const toggleService = (s: string) => setApply(a => ({
    ...a,
    services: a.services.includes(s) ? a.services.filter(x => x !== s) : [...a.services, s],
  }))
  const openApply = () => { setApplyOpen(true); setApplyStep(1); setSubmitError("") }

  const handleApplySubmit = async () => {
    setSubmitting(true)
    setSubmitError("")
    try {
      await submitForm({ type: "application", ...apply })
      setApplyStep(4)
    } catch {
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#FAFBFC] font-sans text-slate-900 antialiased overflow-x-hidden">
      {/* ─── NAV ─────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-8xl items-center justify-between px-5 py-4 md:px-8">
          <Logo />

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            {(["how", "pricing", "guarantee"] as const).map(key => (
              <a key={key} href={`#${key}`} className="relative hover:text-navy transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full">
                {t.nav[key]}
              </a>
            ))}
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl border border-slate-200 p-2.5 md:hidden hover:bg-slate-50 transition-colors">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200 bg-white overflow-hidden md:hidden"
            >
              <div className="grid gap-3 px-5 py-5 text-sm font-bold">
                {(["how", "pricing", "guarantee"] as const).map(key => (
                  <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)} className="py-2 text-slate-700 hover:text-navy transition-colors">{t.nav[key]}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main>
        {/* ─── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-navy/3 to-transparent" />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/5 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-navy/5 blur-[120px]" />

          <div className="relative z-10 mx-auto grid max-w-8xl items-center gap-12 px-5 py-12 md:grid-cols-2 md:px-8 md:py-0">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/8 px-5 py-2 text-sm font-bold text-navy shadow-sm">
                <MapPin size={15} />
                {t.badge}
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-slate-900 md:text-6xl lg:text-7xl">
                {t.heroTitle.split(" ").map((word, i) =>
                  word === "qualified" ? <span key={i} className="text-gold">qualified </span> :
                  word === "weekly." ? <span key={i}>weekly<span className="text-gold">.</span></span> :
                  <span key={i}>{word} </span>
                )}
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg leading-8 text-slate-500">
                {t.heroText}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={openApply} className="group flex items-center justify-center gap-2 rounded-2xl bg-navy px-7 py-4 font-extrabold text-white shadow-xl shadow-navy/20 hover:bg-navy-2 hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                  {t.primaryCta}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <a href="#pricing" className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-4 font-extrabold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all">
                  {t.secondaryCta}
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 grid gap-3 text-sm font-semibold text-slate-600 sm:grid-cols-3">
                {t.trust.map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="text-emerald" size={17} />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={scaleIn}
              className="relative xl:px-8"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/20 to-gold/10 rounded-[2.5rem] blur-3xl xl:scale-110" />
              <div className="relative rounded-[2.5rem] border border-slate-200/80 bg-white p-5 shadow-2xl shadow-slate-200/60 xl:p-6">
                <div className="rounded-[1.8rem] bg-gradient-to-br from-navy via-navy-2 to-navy-light p-7 text-white xl:p-9 xl:rounded-[2rem]">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm font-extrabold text-blue-100/80">{t.cardLabel}</p>
                    <div className="flex items-center gap-1.5 rounded-full bg-white/12 px-3.5 py-1 text-xs font-black text-gold-light">
                      <Sparkles size={12} /> Trusted
                    </div>
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-[-0.03em] md:text-3xl">{t.cardTitle}</h3>
                  <div className="mt-6 grid gap-3">
                    {t.cardItems.map(item => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm hover:bg-white/15 transition-colors">
                        <CheckCircle2 size={19} className="text-emerald-light shrink-0" />
                        <span className="text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <button onClick={openApply} className="w-full group flex items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-3.5 font-extrabold text-navy hover:bg-gold-light transition-all hover:shadow-lg hover:shadow-gold/20">
                      {t.primaryCta} <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <ChevronDown size={22} className="text-slate-400" />
            </motion.div>
          </motion.div>
        </section>

        {/* ─── STATS ────────────────────────────────────────── */}
        <section className="relative py-16 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-navy/3 via-white to-navy/3" />
          <div className="relative z-10 mx-auto max-w-8xl px-5 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
            >
              {t.stats.map(stat => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="group text-center rounded-2xl bg-white border border-slate-200/60 p-6 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy group-hover:bg-navy/10 transition-colors">
                    <stat.icon size={22} />
                  </div>
                  <div className="text-3xl font-black text-slate-900 md:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm font-medium text-slate-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─────────────────────────────────── */}
        <section id="how" className="relative py-20 md:py-28">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-navy/3 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230F2B4B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px"
          }} />
          <div className="relative z-10 mx-auto max-w-8xl px-5 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-sm font-black uppercase tracking-[0.2em] text-navy">{t.howEyebrow}</motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-slate-900 md:text-5xl">{t.howTitle}</motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {t.steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    variants={fadeUp}
                    className="group relative rounded-3xl border border-slate-200 bg-slate-50/50 p-7 hover:border-gold/20 hover:bg-white hover:shadow-xl hover:shadow-gold/5 transition-all duration-500"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white font-black text-lg shadow-lg shadow-navy/20">
                        <Icon size={24} />
                      </div>
                      <div className="absolute top-2 left-16 text-6xl font-black text-slate-200/50 select-none">{i + 1}</div>
                      <h3 className="text-xl font-extrabold tracking-[-0.02em] text-slate-900">{step.title}</h3>
                      <p className="mt-3 font-medium leading-7 text-slate-500">{step.text}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ──────────────────────────────────── */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
          <div className="absolute top-40 left-10 w-80 h-80 rounded-full bg-emerald/5 blur-[120px]" />
          <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-navy/5 blur-[120px]" />
          <div className="relative z-10 mx-auto max-w-8xl px-5 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="text-center"
            >
              <motion.p variants={fadeUp} className="text-sm font-black uppercase tracking-[0.2em] text-navy">{t.testimonialsEyebrow}</motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-slate-900 md:text-5xl">{t.testimonialsTitle}</motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl font-medium text-slate-500">{t.testimonialsText}</motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mt-12 grid gap-6 md:grid-cols-3"
            >
              {t.testimonials.map((review, i) => (
                <motion.div
                  key={review.name}
                  variants={fadeUp}
                  className="group relative rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-500 hover:border-emerald/20 hover:shadow-xl hover:shadow-emerald/5"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative flex items-center gap-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-lg shadow-navy/10 ring-2 ring-white"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <p className="text-base font-black tracking-[-0.02em] text-slate-900 truncate">{review.name}</p>
                      <p className="text-sm font-semibold text-slate-500 truncate">{review.role}</p>
                      <p className="text-xs font-bold text-emerald">{review.type}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} className={cn("w-4 h-4", star <= review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200")} viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  <p className="mt-4 text-sm font-medium leading-7 text-slate-600">"{review.text}"</p>

                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <div className="grid gap-1.5">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-red-50">
                          <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </div>
                        <span className="text-xs font-semibold text-slate-400">{review.before}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-50">
                          <svg className="w-3 h-3 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-xs font-bold text-emerald">{review.after}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── PRICING ──────────────────────────────────────── */}
        <section id="pricing" className="relative py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-navy/3 blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gold/5 blur-[100px]" />
          <div className="relative z-10 mx-auto max-w-8xl px-5 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="text-center"
            >
              <motion.p variants={fadeUp} className="text-sm font-black uppercase tracking-[0.2em] text-navy">{t.pricingEyebrow}</motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-slate-900 md:text-5xl">{t.pricingTitle}</motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl font-medium text-slate-500">{t.pricingText}</motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mt-10 grid gap-6 md:grid-cols-3"
            >
              {t.plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  variants={fadeUp}
                  className={cn(
                    "relative rounded-3xl border bg-white p-7 transition-all duration-500 hover:shadow-2xl",
                    plan.featured
                      ? "border-navy/20 ring-2 ring-gold/20 shadow-xl shadow-gold/5 scale-[1.02] md:scale-105"
                      : "border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-xl"
                  )}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gold px-4 py-1.5 text-xs font-black text-navy shadow-lg">
                      <Sparkles size={13} /> {t.bestChoice}
                    </div>
                  )}
                  <div className="pt-2">
                    <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-slate-900">{plan.name}</h3>
                    <p className="mt-1 font-medium text-slate-400">{plan.desc}</p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-5xl font-black text-navy">{plan.price}</span>
                      <span className="text-sm font-medium text-slate-400">/lead</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-lg font-bold text-gold">{plan.total}</span>
                      <span className="text-xs font-medium text-slate-400">total monthly</span>
                    </div>
                    <ul className="mt-8 grid gap-3 text-sm font-medium text-slate-600">
                      {plan.items.map(item => (
                        <li key={item} className="flex gap-2.5">
                          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={openApply}
                      className={cn(
                        "mt-8 w-full rounded-2xl px-5 py-3.5 font-extrabold text-sm transition-all",
                        plan.featured
                          ? "bg-navy text-white shadow-lg shadow-navy/20 hover:bg-navy-2 hover:shadow-xl hover:-translate-y-0.5"
                          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400"
                      )}
                    >
                      {t.primaryCta}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── GUARANTEE ────────────────────────────────────── */}
        <section id="guarantee" className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-navy" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-navy-2/50 via-navy to-navy" />
          <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] rounded-full bg-gold/5 blur-[150px]" />
          <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-blue-500/5 blur-[150px]" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-white/3 blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px"
          }} />

          <div className="relative z-10 mx-auto grid max-w-8xl gap-10 px-5 md:grid-cols-2 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-sm font-black uppercase tracking-[0.2em] text-gold-light">{t.guaranteeEyebrow}</motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">{t.guaranteeTitle}</motion.h2>
              <motion.p variants={fadeUp} className="mt-5 font-medium leading-8 text-slate-300">{t.guaranteeText}</motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid gap-5"
            >
              <motion.div variants={slideRight} className="group rounded-3xl bg-white/8 border border-white/10 p-6 hover:bg-white/12 transition-all duration-500">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/20 text-emerald-light group-hover:scale-110 transition-transform">
                  <RefreshCw size={22} />
                </div>
                <h3 className="font-black text-white text-lg">{t.replaceTitle}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">{t.replaceText}</p>
              </motion.div>
              <motion.div variants={slideRight} className="group rounded-3xl bg-white/8 border border-white/10 p-6 hover:bg-white/12 transition-all duration-500">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20 text-gold-light group-hover:scale-110 transition-transform">
                  <PhoneCall size={22} />
                </div>
                <h3 className="font-black text-white text-lg">{t.noClosingTitle}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">{t.noClosingText}</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────── */}
        <section className="relative py-20 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-white" />
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gold/5 blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-navy/5 blur-[100px]" />
          <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div variants={scaleIn} className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <Award size={30} />
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl font-extrabold tracking-[-0.04em] text-slate-900 md:text-5xl">
                Ready to grow your home service business?
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl font-medium text-slate-500">
                Join 500+ companies already receiving qualified leads every week.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button onClick={openApply} className="group flex items-center gap-2 rounded-2xl bg-navy px-8 py-4 font-extrabold text-white shadow-xl shadow-navy/20 hover:bg-navy-2 hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                  {t.primaryCta} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <a href="#pricing" className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-extrabold text-slate-700 hover:bg-slate-50 transition-all">
                  {t.secondaryCta}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-4 px-5 md:flex-row md:px-8">
          <Logo />
          <p className="text-sm text-slate-400">{t.footer.rights}</p>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-navy transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-navy transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </footer>

      {/* ─── CHAT BUTTON ────────────────────────────────────── */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-2xl shadow-navy/30 hover:bg-navy-2 transition-colors"
          >
            <MessageCircle size={24} />
            <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── CHAT WIDGET ────────────────────────────────────── */}
      <AnimatePresence>
        {chatOpen && <ChatWidget messages={chatMessages} input={chatInput} onInput={setChatInput} onSend={handleChatSend} onClose={() => setChatOpen(false)} showLeadForm={chatStep === 0} leadForm={leadForm} setLeadForm={setLeadForm} onLeadSubmit={handleLeadSubmit} />}
      </AnimatePresence>

      {/* ─── APPLICATION MODAL ──────────────────────────────── */}
      <AnimatePresence>
        {applyOpen && (
          <ApplicationModal
            t={t}
            step={applyStep}
            setStep={setApplyStep}
            apply={apply}
            updateApply={updateApply}
            toggleService={toggleService}
            onClose={() => setApplyOpen(false)}
            onSubmit={handleApplySubmit}
            submitting={submitting}
            submitError={submitError}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Logo ──────────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white shadow-sm">
        <div className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-emerald ring-2 ring-white" />
        <ShieldCheck size={22} />
      </div>
      <div>
        <p className="text-lg font-black tracking-[-0.03em] text-slate-900">HomeFlow Leads</p>
        <p className="text-[10px] font-semibold text-slate-400 leading-none">United States Home Service Leads</p>
      </div>
    </div>
  )
}

// ─── Chat Widget ───────────────────────────────────────────────────
function ChatWidget({ messages, input, onInput, onSend, onClose, showLeadForm, leadForm, setLeadForm, onLeadSubmit }: {
  messages: {role:"bot"|"user";text:string}[]
  input: string
  onInput: (v:string) => void
  onSend: (v:string) => void
  onClose: () => void
  showLeadForm?: boolean
  leadForm?: { name:string; phone:string; email:string; plan:string }
  setLeadForm?: (v:{name:string;phone:string;email:string;plan:string}) => void
  onLeadSubmit?: () => void
}) {
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }) }, [messages])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(input) }
  }

  const valid = leadForm && leadForm.name.trim() && leadForm.phone.trim() && leadForm.email.trim()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-24 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-400/20 md:right-8"
      style={{ height: "520px" }}
    >
      <div className="flex items-center justify-between bg-navy px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-sm font-black">H</div>
          <div>
            <p className="text-sm font-black">HomeFlow Assistant</p>
            <p className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Online
            </p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-white/10 transition-colors">
          <X size={17} />
        </button>
      </div>

      {showLeadForm ? (
        <div className="flex flex-1 flex-col justify-center px-6 py-6">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
              <MessageCircle size={22} />
            </div>
            <h3 className="text-lg font-black text-slate-900">Let's Get Started</h3>
            <p className="mt-1 text-xs font-semibold text-slate-500">Enter your details to start chatting</p>
          </div>
          <div className="grid gap-3">
            <input value={leadForm?.name||""} onChange={e => setLeadForm?.({ ...leadForm!, name:e.target.value })} placeholder="Your Name *"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-navy/30 focus:bg-white focus:shadow-sm transition-all" />
            <input value={leadForm?.phone||""} onChange={e => setLeadForm?.({ ...leadForm!, phone:e.target.value })} placeholder="Phone Number *"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-navy/30 focus:bg-white focus:shadow-sm transition-all" />
            <input value={leadForm?.email||""} onChange={e => setLeadForm?.({ ...leadForm!, email:e.target.value })} placeholder="Email Address *"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-navy/30 focus:bg-white focus:shadow-sm transition-all" />
            <div>
              <label className="mb-2 block text-xs font-black text-slate-600">Choose a Plan</label>
              <div className="grid grid-cols-3 gap-2">
                {["Starter","Growth","Premium"].map(p => (
                  <button key={p} type="button" onClick={() => setLeadForm?.({ ...leadForm!, plan:p })}
                    className={`rounded-xl border px-3 py-2.5 text-xs font-black transition-all ${
                      leadForm?.plan === p
                        ? "border-navy bg-navy/5 text-navy ring-2 ring-gold/20"
                        : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={onLeadSubmit} disabled={!valid}
              className="mt-2 w-full rounded-2xl bg-navy py-3.5 text-sm font-black text-white shadow-lg shadow-navy/20 hover:bg-navy-2 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Start Chatting
            </button>
          </div>
          <p className="mt-4 text-center text-[10px] font-medium text-slate-400">Your info won't be shared with third parties</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${
                  m.role === "user"
                    ? "bg-navy text-white rounded-br-md"
                    : "bg-slate-100 text-slate-700 rounded-bl-md"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-slate-200 p-3">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 focus-within:border-navy/30 focus-within:bg-white transition-all">
              <input
                value={input}
                onChange={e => onInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              />
              <button onClick={() => onSend(input)} disabled={!input.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-navy text-white hover:bg-navy-2 disabled:opacity-40 transition-all"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}

// ─── Application Modal ─────────────────────────────────────────────
function ApplicationModal({ t, step, setStep, apply, updateApply, toggleService, onClose, onSubmit, submitting, submitError }: {
  t: typeof EN
  step: number
  setStep: (s: number) => void
  apply: Record<string, any>
  updateApply: (f: string, v: string) => void
  toggleService: (s: string) => void
  onClose: () => void
  onSubmit: () => Promise<void>
  submitting: boolean
  submitError: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/20 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200/70 px-6 py-5">
          <div>
            <p className="mb-1.5 text-xs font-black uppercase tracking-[0.15em] text-navy/70">
              {t.apply.stepLabel} {step}/4
            </p>
            <h2 className="text-xl font-black tracking-[-0.03em] text-slate-900 md:text-2xl">
              {step === 1 ? t.apply.title1 : step === 2 ? t.apply.title2 : step === 3 ? "Choose Your Plan" : t.apply.title3}
            </h2>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-0 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            <X size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100">
          <motion.div
            className="h-full bg-navy"
            initial={{ width: "0%" }}
            animate={{ width: `${((step - 1) / 3) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>

        <div className="max-h-[68vh] overflow-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field icon={<User size={16} />} label="First Name*" value={apply.firstName} onChange={v => updateApply("firstName", v)} />
                  <Field icon={<User size={16} />} label="Last Name*" value={apply.lastName} onChange={v => updateApply("lastName", v)} />
                </div>
                <Field icon={<Building2 size={16} />} label="Company Name*" value={apply.company} onChange={v => updateApply("company", v)} />
                <Field icon={<Mail size={16} />} label="Email*" value={apply.email} onChange={v => updateApply("email", v)} />
                <Field icon={<PhoneCall size={16} />} label="Phone Number*" value={apply.phone} onChange={v => updateApply("phone", v)} prefix="🇺🇸 +1" />
                <div>
                  <label className="mb-3 block text-sm font-black text-slate-900">What services does your business provide?*</label>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {services.map(s => {
                      const Icon = s.icon
                      const active = apply.services.includes(s.name)
                      return (
                        <button
                          key={s.name}
                          type="button"
                          onClick={() => toggleService(s.name)}
                          className={cn(
                            "group flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-bold transition-all duration-300",
                            active
                              ? "border-navy bg-navy/5 text-navy shadow-sm"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-sm"
                          )}
                        >
                          <div className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                            active
                              ? "bg-navy text-white"
                              : "bg-white text-slate-400 border border-slate-200 group-hover:border-slate-300"
                          )}>
                            <Icon size={16} />
                          </div>
                          <span className="flex-1">{s.name}</span>
                          {active && (
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                              <Check size={14} className="text-emerald" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4"
              >
                <div className="rounded-2xl bg-gradient-to-r from-navy/5 to-navy/3 border border-navy/10 p-4 text-sm font-semibold leading-6 text-navy shadow-sm">
                  {t.apply.subtitle2}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-black text-slate-900">Are you located in the United States?*</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Yes", "No"].map(item => (
                      <button key={item} onClick={() => updateApply("locatedUS", item)}
                        className={cn(
                          "flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-sm font-black transition-all duration-300 shadow-sm",
                          apply.locatedUS === item ? "border-navy bg-navy/5 text-navy shadow-navy/5" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                        )}
                      >
                        {item === "Yes" && <span className="text-lg">🇺🇸</span>}
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field icon={<MapPin size={16} />} label="Zip Code*" value={apply.zip} onChange={v => updateApply("zip", v)} />
                  <Field icon={<Users size={16} />} label="Number of Employees*" value={apply.employees} onChange={v => updateApply("employees", v)} />
                </div>
                <Field icon={<Globe size={16} />} label="Website URL*" value={apply.website} onChange={v => updateApply("website", v)} />
                <Field icon={<DollarSign size={16} />} label="Monthly Marketing Budget*" value={apply.budget} onChange={v => updateApply("budget", v)} />
                  <div>
                    <label className="mb-2 block text-sm font-black text-slate-900">Anything else you'd like us to know?</label>
                    <textarea value={apply.notes} onChange={e => updateApply("notes", e.target.value)}
                      className="min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium outline-none shadow-sm focus:border-navy/40 focus:shadow-md focus:shadow-navy/5 transition-all duration-300"
                      placeholder="Service area, lead goals, or team capacity..."
                    />
                  </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-6 text-sm font-semibold text-slate-500">Choose the plan that fits your needs. You can always upgrade later.</p>
                <div className="grid gap-4 md:grid-cols-3">
                  {t.plans.map((plan) => {
                    const active = apply.plan === plan.name
                    return (
                      <button
                        key={plan.name}
                        type="button"
                        onClick={() => updateApply("plan", plan.name)}
                        className={cn(
                          "relative rounded-2xl border p-5 text-left transition-all duration-300",
                          active
                            ? "border-navy bg-navy/5 ring-2 ring-gold/30 shadow-lg shadow-navy/10"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                        )}
                      >
                        {plan.featured && (
                          <div className="absolute -top-2.5 right-3 rounded-full bg-gold px-3 py-0.5 text-[10px] font-black text-navy shadow-sm">
                            {t.bestChoice}
                          </div>
                        )}
                        <p className="text-lg font-black text-slate-900">{plan.name}</p>
                        <p className="mt-0.5 text-xs font-medium text-slate-400">{plan.desc}</p>
                        <p className="mt-4 text-3xl font-black text-navy">{plan.price}</p>
                        <p className="mt-0.5 text-xs font-medium text-slate-400">/lead</p>
                        <ul className="mt-4 grid gap-1.5">
                          {plan.items.map((item: string) => (
                            <li key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                              <Check size={12} className="text-emerald shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        {active && (
                          <div className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-navy py-2 text-xs font-black text-white">
                            <Check size={14} /> Selected
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h3 className="text-3xl font-black tracking-[-0.04em] text-slate-900">{t.apply.thanks}</h3>
                <p className="mx-auto mt-4 max-w-md font-medium leading-7 text-slate-500">{t.apply.thanksText}</p>
                <button onClick={onClose} className="mt-8 rounded-2xl bg-navy px-8 py-3.5 font-black text-white hover:bg-navy-2 transition-all">
                  {t.apply.close}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step < 4 && (
          <div className="flex items-center justify-between border-t border-slate-200/70 bg-white px-6 py-4">
            <button onClick={() => setStep(Math.max(1, step - 1))}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              {t.apply.prev}
            </button>
            <div className="flex items-center gap-3">
              {submitError && (
                <span className="text-xs font-bold text-red-500 max-w-[200px] text-right">{submitError}</span>
              )}
              <button
                onClick={step === 3 ? onSubmit : () => setStep(step + 1)}
                disabled={submitting || (step === 1 && (!apply.firstName || !apply.lastName || !apply.company || !apply.email || !apply.phone || apply.services.length === 0)) || (step === 2 && (!apply.locatedUS || !apply.zip || !apply.employees || !apply.website || !apply.budget)) || (step === 3 && !apply.plan)}
                className="flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-black text-white shadow-lg shadow-navy/20 hover:bg-navy-2 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Submitting...
                  </span>
                ) : (
                  <>{step === 3 ? "Submit" : t.apply.next} <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function Field({ icon, label, value, onChange, prefix }: {
  icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; prefix?: string
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-900">{label}</label>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm focus-within:border-navy/40 focus-within:shadow-md focus-within:shadow-navy/5 transition-all duration-300">
        <span className="text-slate-400 shrink-0">{icon}</span>
        {prefix && <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-black text-slate-500 border border-slate-100">{prefix}</span>}
        <input value={value} onChange={e => onChange(e.target.value)} className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400" />
      </div>
    </div>
  )
}
