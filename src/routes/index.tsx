import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  CreditCard,
  Globe2,
  Instagram,
  Layers3,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  MessageSquareText,
  Play,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { displayedPrice, plans } from "@/lib/pricing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Creative Entertainment Technology Co., Ltd. — Connect. Verify. Grow." },
      { name: "description", content: "Reliable, fast SMS verification and self-serve social subscriptions. Connect. Verify. Grow with Creative Entertainment Technology Co., Ltd." },
      { property: "og:title", content: "Creative Entertainment Technology Co., Ltd. — Connect. Verify. Grow." },
      { property: "og:description", content: "Reliable SMS services and social subscriptions, delivered in seconds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const signupSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(255, "Email must be 255 characters or fewer."),
  password: z.string().min(8, "Use at least 8 characters.").max(128, "Password must be 128 characters or fewer."),
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address.").max(255, "Email must be 255 characters or fewer."),
  message: z.string().trim().min(1, "Please add a message.").max(1500, "Message must be 1,500 characters or fewer."),
});

const navLinks = [
  ["Services", "services"],
  ["How it works", "how-it-works"],
  ["Pricing", "pricing"],
  ["FAQ", "faq"],
  ["Contact", "contact"],
] as const;

const questions = [
  ["How quickly are messages delivered?", "Verification messages are routed for fast delivery. Actual delivery times vary by destination, carrier, and network conditions."],
  ["Which payment methods can I use?", "Available payment options are shown securely during checkout. Contact our team if you need help choosing a payment method."],
  ["Which countries are supported?", "Availability depends on the service and local carrier coverage. Check the destination options in your account before placing an order."],
  ["Can I request a refund?", "If an order doesn't go as expected, contact our support team with its details so we can review it under the applicable service terms."],
  ["How is my data protected?", "Account and order information is handled to provide the service. Contact us for current privacy and compliance documentation."],
  ["When can I reach support?", "Our team is available around the clock for support requests. Share your order details and we'll help you find the next step."],
] as const;

const detailsCopy: Record<string, string> = {
  "SMS Services": "Send verification codes and transactional messages with flexible delivery options. Monitor the status of each order from a clear, self-serve workspace.",
  "Social Subscriptions": "Choose a plan for a supported social platform and activate it from one convenient place. Browse available subscription options before checkout.",
};

const planNames = ["Starter", "Pro", "Business"] as const;
const testimonials = [
  { quote: "The straightforward flow made it easy for our small team to get verification messages moving.", name: "Alex Morgan", role: "Operations lead", initials: "AM" },
  { quote: "We can see what's happening with our orders without waiting for someone to get back to us.", name: "Jordan Lee", role: "Product manager", initials: "JL" },
  { quote: "A clean way to manage subscriptions and keep everything organized in one place.", name: "Casey Patel", role: "Growth specialist", initials: "CP" },
];

type SignupMode = "signup" | "login";
type PolicyName = "Privacy Policy" | "Terms of Service" | "Compliance";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [signupMode, setSignupMode] = useState<SignupMode | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [serviceDetail, setServiceDetail] = useState<string | null>(null);
  const [policy, setPolicy] = useState<PolicyName | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function openSignup(mode: SignupMode = "signup") {
    setSignupSuccess(false);
    setSignupMode(mode);
    setMenuOpen(false);
  }

  function goTo(id: string) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="site-container nav-inner">
          <a className="brand" href="#top" aria-label="CET home" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark"><MessageCircle aria-hidden="true" /><span>C</span></span>
            <span className="brand-wordmark">CET<span className="brand-caption">CONNECTIVITY, MADE SIMPLE</span></span>
          </a>
          <nav className={`desktop-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
            {navLinks.map(([label, id]) => <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); goTo(id); }}>{label}</a>)}
          </nav>
          <div className="nav-actions">
            <Button variant="ghost" className="login-link" onClick={() => openSignup("login")}>Login</Button>
            <Button className="button-gradient nav-cta" onClick={() => openSignup()}>Get started <ArrowRight aria-hidden="true" /></Button>
          </div>
          <Button variant="ghost" size="icon" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
          {navLinks.map(([label, id]) => <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); goTo(id); }}>{label}<ArrowRight aria-hidden="true" /></a>)}
          <Button variant="outline" onClick={() => openSignup("login")}>Login</Button>
          <Button className="button-gradient" onClick={() => openSignup()}>Get started <ArrowRight aria-hidden="true" /></Button>
        </nav>}
      </header>

      <section className="hero-section section-anchor" id="top">
        <div className="hero-backdrop" aria-hidden="true"><span className="hero-grid" /><span className="hero-orbit hero-orbit-one" /><span className="hero-orbit hero-orbit-two" /></div>
        <div className="site-container hero-layout">
          <div className="hero-copy" data-reveal>
            <div className="eyebrow"><span className="live-dot" /> SIMPLE TOOLS. INSTANT MOMENTUM.</div>
            <h1>SMS and social subscriptions,<br className="desktop-break" /> delivered <span className="gradient-text">in seconds.</span></h1>
            <p className="hero-description">Reliable, fast, self-serve messaging and subscription services—so you can focus on what comes next.</p>
            <div className="hero-actions">
              <Button className="button-gradient button-large" onClick={() => openSignup()}>Get started <ArrowRight aria-hidden="true" /></Button>
              <Button variant="ghost" className="button-watch" onClick={() => goTo("pricing")}><span className="play-icon"><Play aria-hidden="true" /></span> View pricing</Button>
            </div>
            <div className="hero-proof"><div className="proof-avatar-row"><span>CT</span><span>OP</span><span>SM</span></div><span>Built for teams that keep moving</span><span className="proof-divider" /><span className="proof-rating"><Sparkles aria-hidden="true" /> Always-on service</span></div>
          </div>
          <div className="hero-visual" data-reveal aria-label="Illustration of instant SMS delivery">
            <div className="visual-label visual-label-top"><span className="pulse-dot" /> LIVE DELIVERY</div>
            <div className="phone-orbit orbit-a" aria-hidden="true" /><div className="phone-orbit orbit-b" aria-hidden="true" />
            <div className="floating-chip chip-delivery"><span className="chip-icon"><CheckCircle2 aria-hidden="true" /></span><span><strong>Message delivered</strong><small>Just now · 0.4 seconds</small></span></div>
            <div className="phone-frame">
              <div className="phone-notch" />
              <div className="phone-status"><span>9:41</span><span className="phone-status-icons"><span>● ● ●</span><span>▰</span></span></div>
              <div className="message-header"><span className="message-back">‹</span><span className="message-avatar"><MessageSquareText aria-hidden="true" /></span><span><strong>CET Verify</strong><small><span className="live-dot" /> Verified sender</small></span><span className="message-more">···</span></div>
              <div className="message-screen">
                <span className="message-day">TODAY</span>
                <div className="chat-bubble chat-bubble-first">Your verification code is <strong>482916</strong>. It expires in 10 minutes.<span>9:41 AM <BadgeCheck aria-hidden="true" /></span></div>
                <div className="chat-bubble chat-bubble-second">Subscription activated. You’re all set!<span>9:41 AM <BadgeCheck aria-hidden="true" /></span></div>
                <div className="message-encryption"><LockKeyhole aria-hidden="true" /> Secure, instant delivery</div>
              </div>
              <div className="phone-compose"><span>Message</span><span className="compose-icon"><ArrowUpRight aria-hidden="true" /></span></div>
            </div>
            <div className="floating-chip chip-secure"><span className="secure-shield"><ShieldCheck aria-hidden="true" /></span><span><strong>Secure by design</strong><small>Every step, protected</small></span></div>
            <div className="visual-label visual-label-bottom"><span>01 / 03</span><span className="visual-progress"><i /></span><span>MESSAGING THAT MOVES</span></div>
          </div>
        </div>
        <a className="hero-scroll" href="#services" onClick={(event) => { event.preventDefault(); goTo("services"); }}>EXPLORE CET <ArrowDownRight aria-hidden="true" /></a>
      </section>

      <section className="trust-section" aria-label="Service statistics">
        <div className="site-container trust-grid" data-reveal>
          <p className="trust-intro">A platform built<br />for every next step.</p>
          <Stat value={99.9} suffix="%" label="Uptime" decimals={1} />
          <Stat value={10} suffix="M+" label="Messages delivered" />
          <Stat value={50} suffix="+" label="Countries reached" />
          <Stat value={2} prefix="<" suffix=" min" label="Support response" />
        </div>
      </section>

      <section className="content-section services-section section-anchor" id="services">
        <div className="site-container">
          <SectionHeading kicker="WHAT WE MAKE POSSIBLE" title={<>The tools to <span className="gradient-text">connect faster.</span></>} description="One simple place for the messages and memberships that help your business grow." />
          <div className="services-grid">
            <ServiceCard title="SMS Services" category="MESSAGING · VERIFICATION" icon={<MessageSquareText aria-hidden="true" />} accent="blue" description="Get the right message to the right person, right when it matters." items={["Verification codes, on demand", "Bulk and transactional messaging", "Fast, reliable delivery", "Clear delivery reports"]} onLearn={() => setServiceDetail("SMS Services")} />
            <ServiceCard title="Social Subscriptions" category="SUBSCRIPTIONS · MEMBERSHIPS" icon={<Layers3 aria-hidden="true" />} accent="violet" description="Manage social subscriptions through a single, straightforward flow." items={["Plans for popular social platforms", "Instant plan activation", "Flexible subscription options", "Support whenever you need it"]} onLearn={() => setServiceDetail("Social Subscriptions")} />
          </div>
        </div>
      </section>

      <section className="content-section process-section section-anchor" id="how-it-works">
        <div className="site-container process-layout">
          <div className="process-intro" data-reveal><p className="eyebrow">THREE STEPS. ZERO GUESSWORK.</p><h2>Simple from the <span className="gradient-text">first click.</span></h2><p>Get what you need without waiting around or sorting through complicated setup.</p><Button variant="ghost" className="text-link" onClick={() => goTo("pricing")}>Find your plan <ArrowRight aria-hidden="true" /></Button></div>
          <div className="steps-list" data-reveal>
            <Step number="01" icon={<Smartphone aria-hidden="true" />} title="Choose a service" description="Pick your messaging or subscription plan." />
            <Step number="02" icon={<CreditCard aria-hidden="true" />} title="Pay securely" description="Check out with your preferred available method." />
            <Step number="03" icon={<Zap aria-hidden="true" />} title="Receive instantly" description="Track your order from your personal dashboard." last />
          </div>
        </div>
      </section>

      <section className="content-section pricing-section section-anchor" id="pricing">
        <div className="site-container">
          <div className="pricing-heading" data-reveal><SectionHeading kicker="SIMPLE, FLEXIBLE PRICING" title={<>A plan that fits <span className="gradient-text">your pace.</span></>} description="Start small, scale when you’re ready. Change your plan as your needs grow." /><div className="billing-switch" role="group" aria-label="Billing frequency"><Button variant={yearly ? "ghost" : "secondary"} aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</Button><Button variant={yearly ? "secondary" : "ghost"} aria-pressed={yearly} onClick={() => setYearly(true)}>Yearly <span className="save-pill">SAVE 20%</span></Button></div></div>
          <div className="pricing-grid">
            {plans.map((plan, index) => <article className={`plan-card${index === 1 ? " plan-featured" : ""}`} key={plan.name} data-reveal>
              {index === 1 && <span className="popular-label"><Sparkles aria-hidden="true" /> MOST POPULAR</span>}
              <p className="plan-overline">{plan.name === "Starter" ? "FOR YOUR FIRST STEPS" : plan.name === "Pro" ? "FOR THE PACE-SETTERS" : "FOR THE BIG PICTURE"}</p>
              <h3>{plan.name}</h3><p className="plan-description">{plan.name === "Starter" ? "Everything you need to get going." : plan.name === "Pro" ? "More capacity. More momentum." : "Room to grow without limits."}</p>
              <p className="plan-price"><span className="currency">$</span>{displayedPrice(plan.monthly, yearly)}<span className="per-month"> / month</span></p>
              {yearly && <p className="billing-note">Billed annually</p>}
              <Button className={index === 1 ? "button-gradient plan-button" : "plan-button"} variant={index === 1 ? "default" : "outline"} onClick={() => openSignup()}>Get started <ArrowRight aria-hidden="true" /></Button>
              <span className="plan-divider" />
              <p className="feature-title">WHAT’S INCLUDED</p>
              <ul className="feature-list">{plan.features.map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul>
            </article>)}
          </div>
          <p className="pricing-footnote" data-reveal><ShieldCheck aria-hidden="true" /> Secure checkout · Clear, upfront pricing · Change plans anytime</p>
        </div>
      </section>

      <section className="content-section dashboard-section">
        <div className="site-container dashboard-layout">
          <div className="dashboard-copy" data-reveal><p className="eyebrow">YOUR WORKSPACE, YOUR WAY</p><h2>Everything in view.<br /><span className="gradient-text">Nothing in the way.</span></h2><p>See your orders, track deliveries, and understand usage without leaving your dashboard.</p><ul className="dashboard-perks"><li><CheckCircle2 aria-hidden="true" /> Clear order history</li><li><CheckCircle2 aria-hidden="true" /> Live status at a glance</li><li><CheckCircle2 aria-hidden="true" /> Simple usage insights</li></ul><Button variant="ghost" className="text-link" onClick={() => openSignup()}>Make it yours <ArrowRight aria-hidden="true" /></Button></div>
          <div className="dashboard-visual" data-reveal>
            <div className="dash-topbar"><span className="dash-logo"><span className="dash-logo-icon"><MessageCircle aria-hidden="true" /></span> cet<span className="dash-plan">PRO ACCOUNT</span></span><span className="dash-account"><span>AM</span> Alex Morgan <ChevronDown aria-hidden="true" /></span></div>
            <div className="dash-main"><aside className="dash-sidebar"><span className="dash-nav-active"><BarChart3 aria-hidden="true" /> Overview</span><span><MessageSquareText aria-hidden="true" /> Messages</span><span><Layers3 aria-hidden="true" /> Subscriptions</span><span><CreditCard aria-hidden="true" /> Billing</span><div className="dash-sidebar-label">WORKSPACE</div><span><CircleHelp aria-hidden="true" /> Help center</span></aside>
              <div className="dash-content"><div className="dash-greeting"><div><p>MONDAY, OCTOBER 12</p><h3>Good morning, Alex <span>✦</span></h3></div><Button className="button-gradient dash-order" onClick={() => openSignup()}><span>+</span> New order</Button></div>
                <div className="dash-stat-cards"><div><span>MESSAGES SENT</span><strong>2,486</strong><small><ArrowUpRight aria-hidden="true" /> 12.8% this month</small></div><div><span>ACTIVE ORDERS</span><strong>08</strong><small className="dash-neutral"><Clock3 aria-hidden="true" /> 2 processing</small></div><div><span>SUCCESS RATE</span><strong>99.2%</strong><small><CheckCircle2 aria-hidden="true" /> Looking good</small></div></div>
                <div className="dash-bottom-grid"><div className="usage-panel"><div className="panel-heading"><div><h4>Message activity</h4><p>Your usage over time</p></div><span>THIS WEEK <ChevronDown aria-hidden="true" /></span></div><div className="usage-chart"><div className="chart-y-labels"><span>800</span><span>600</span><span>400</span><span>200</span></div><div className="chart-bars">{[30,48,39,66,47,76,59,88,55,70,45,82,63,93].map((height, i) => <span className={`usage-bar usage-bar-${i % 4}`} style={{ "--bar-height": `${height}%` } as React.CSSProperties} key={i} />)}</div></div><div className="chart-x-labels"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div></div>
                  <div className="orders-panel"><div className="panel-heading"><div><h4>Recent orders</h4><p>Your latest activity</p></div><span>ALL <ArrowUpRight aria-hidden="true" /></span></div><div className="order-row"><span className="order-glyph glyph-sms"><MessageSquareText aria-hidden="true" /></span><span><strong>SMS Verification</strong><small>ORD-2486 · 2 min ago</small></span><em className="status-complete">Complete</em></div><div className="order-row"><span className="order-glyph glyph-social"><Layers3 aria-hidden="true" /></span><span><strong>Social subscription</strong><small>ORD-2485 · 18 min ago</small></span><em className="status-active">Active</em></div><div className="order-row"><span className="order-glyph glyph-sms"><MessageSquareText aria-hidden="true" /></span><span><strong>SMS Verification</strong><small>ORD-2484 · 41 min ago</small></span><em className="status-complete">Complete</em></div></div></div>
              </div>
            </div>
            <div className="dash-bottomline"><span><span className="live-dot" /> ALL SYSTEMS OPERATIONAL</span><span>LAST UPDATED JUST NOW</span></div>
          </div>
        </div>
        <div className="site-container"><p className="dashboard-caption" data-reveal>Order and track everything yourself. <span>No waiting on a sales rep.</span></p></div>
      </section>

      <section className="content-section testimonials-section">
        <div className="site-container"><SectionHeading kicker="GOOD TO GROW TOGETHER" title={<>Made for real <span className="gradient-text">forward motion.</span></>} description="Thoughtful tools. Clear workflows. More room to focus on the work ahead." /><div className="testimonials-grid">{testimonials.map((item) => <article className="quote-card" key={item.initials} data-reveal><div className="quote-top"><span className="quote-mark">“</span><span className="star-row" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map((n) => <Sparkles key={n} aria-hidden="true" />)}</span></div><p className="quote-text">{item.quote}</p><div className="quote-person"><span className="quote-avatar">{item.initials}</span><span><strong>{item.name}</strong><small>{item.role}</small></span><BadgeCheck aria-hidden="true" className="quote-verified" /></div></article>)}</div></div>
      </section>

      <section className="content-section faq-section section-anchor" id="faq"><div className="site-container faq-layout"><div className="faq-intro" data-reveal><p className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</p><h2>Good questions.<br /><span className="gradient-text">Clear answers.</span></h2><p>Still curious? Send our team a note and we’ll help point you in the right direction.</p><Button variant="outline" onClick={() => goTo("contact")}>Talk to us <ArrowRight aria-hidden="true" /></Button></div><Accordion type="single" collapsible className="faq-list" data-reveal>{questions.map(([question, answer], index) => <AccordionItem className="faq-item" key={question} value={`question-${index}`}><AccordionTrigger className="faq-trigger"><span className="faq-index">0{index + 1}</span>{question}</AccordionTrigger><AccordionContent className="faq-answer">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>

      <section className="cta-section"><div className="site-container"><div className="cta-banner" data-reveal><div className="cta-glow" aria-hidden="true" /><div className="cta-decoration cta-bubble-one" aria-hidden="true"><MessageCircle /></div><div className="cta-decoration cta-bubble-two" aria-hidden="true"><MessageSquareText /></div><div className="cta-content"><p className="eyebrow">YOUR NEXT STEP STARTS HERE</p><h2>Ready to get started?</h2><p>Less waiting. More doing. Let’s move things forward.</p><Button className="button-light" onClick={() => openSignup()}>Create your account <ArrowRight aria-hidden="true" /></Button></div><span className="cta-number" aria-hidden="true">CET / 01</span></div></div></section>

      <section className="content-section contact-section section-anchor" id="contact"><div className="site-container contact-layout"><div className="contact-copy" data-reveal><p className="eyebrow">LET’S START A CONVERSATION</p><h2>We’re here when<br />you <span className="gradient-text">need us.</span></h2><p>Have a question about our services? Send our team a note and we’ll be happy to help.</p><div className="contact-details"><span className="contact-detail-icon"><Mail aria-hidden="true" /></span><span><small>EMAIL US</small><strong>hello@yourcompany.com</strong></span><ArrowUpRight aria-hidden="true" /></div><div className="contact-details"><span className="contact-detail-icon"><Globe2 aria-hidden="true" /></span><span><small>OUR COMPANY</small><strong>Creative Entertainment Technology Co., Ltd.</strong></span><ArrowUpRight aria-hidden="true" /></div><div className="contact-availability"><span className="live-dot" /> HERE TO HELP, AROUND THE CLOCK</div></div>
          <ContactForm />
        </div></section>

      <footer className="site-footer"><div className="site-container"><div className="footer-main"><div className="footer-brand-block"><a className="brand" href="#top" onClick={(event) => { event.preventDefault(); goTo("top"); }}><span className="brand-mark"><MessageCircle aria-hidden="true" /><span>C</span></span><span className="brand-wordmark">CET<span className="brand-caption">CONNECTIVITY, MADE SIMPLE</span></span></a><p>Connect. Verify. Grow.<br />Tools that keep your business moving.</p></div><div className="footer-column"><span className="footer-label">EXPLORE</span>{navLinks.map(([label, id]) => <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); goTo(id); }}>{label}</a>)}</div><div className="footer-column"><span className="footer-label">OUR POLICIES</span>{(["Privacy Policy", "Terms of Service", "Compliance"] as const).map((name) => <button className="footer-policy" key={name} onClick={() => setPolicy(name)}>{name}<ArrowUpRight aria-hidden="true" /></button>)}</div><div className="footer-social"><span className="footer-label">STAY CONNECTED</span><p>Follow along for the latest.</p><div className="social-icons"><a href="#contact" onClick={(event) => { event.preventDefault(); goTo("contact"); }} aria-label="LinkedIn — contact CET for social links"><span>in</span></a><a href="#contact" onClick={(event) => { event.preventDefault(); goTo("contact"); }} aria-label="Instagram — contact CET for social links"><Instagram aria-hidden="true" /></a><a href="#contact" onClick={(event) => { event.preventDefault(); goTo("contact"); }} aria-label="X — contact CET for social links"><X aria-hidden="true" /></a></div></div></div><div className="footer-bottom"><span>© 2026 Creative Entertainment Technology Co., Ltd.</span><span>MADE TO MOVE YOU FORWARD <span className="footer-heart">✦</span></span></div></div></footer>

      <Dialog open={signupMode !== null} onOpenChange={(open) => { if (!open) setSignupMode(null); }}><DialogContent className="modal-panel"><DialogHeader className="modal-heading"><span className="modal-icon"><MessageCircle aria-hidden="true" /></span><DialogTitle>{signupSuccess ? (signupMode === "login" ? "You’re all set" : "You’re on your way") : signupMode === "login" ? "Welcome back" : "Your next step starts here"}</DialogTitle><DialogDescription>{signupSuccess ? (signupMode === "login" ? "Your demo sign-in was successful. This preview doesn’t create or access a real account." : "Thanks for trying CET. This demo doesn’t create an account or store your details.") : signupMode === "login" ? "Sign in to your CET account." : "Create a free account to explore our services."}</DialogDescription></DialogHeader>
        {signupSuccess ? <div className="modal-success"><CheckCircle2 aria-hidden="true" /><Button className="button-gradient" onClick={() => setSignupMode(null)}>Done <ArrowRight aria-hidden="true" /></Button></div> : <SignupForm mode={signupMode ?? "signup"} onSuccess={() => setSignupSuccess(true)} />}
        <p className="modal-footnote"><LockKeyhole aria-hidden="true" /> Your information stays private.</p>
      </DialogContent></Dialog>

      <Dialog open={serviceDetail !== null} onOpenChange={(open) => { if (!open) setServiceDetail(null); }}><DialogContent className="modal-panel"><DialogHeader className="modal-heading"><span className="modal-icon">{serviceDetail === "SMS Services" ? <MessageSquareText aria-hidden="true" /> : <Layers3 aria-hidden="true" />}</span><DialogTitle>{serviceDetail}</DialogTitle><DialogDescription>{serviceDetail ? detailsCopy[serviceDetail] : ""}</DialogDescription></DialogHeader><ul className="detail-modal-list"><li><CheckCircle2 aria-hidden="true" /> Simple self-serve setup</li><li><CheckCircle2 aria-hidden="true" /> Clear order and delivery status</li><li><CheckCircle2 aria-hidden="true" /> Help whenever you need it</li></ul><Button className="button-gradient" onClick={() => { setServiceDetail(null); openSignup(); }}>Explore plans <ArrowRight aria-hidden="true" /></Button></DialogContent></Dialog>

      <Dialog open={policy !== null} onOpenChange={(open) => { if (!open) setPolicy(null); }}><DialogContent className="modal-panel"><DialogHeader className="modal-heading"><span className="modal-icon"><ShieldCheck aria-hidden="true" /></span><DialogTitle>{policy}</DialogTitle><DialogDescription>Current {policy?.toLowerCase()} documentation for Creative Entertainment Technology Co., Ltd. is available from our team.</DialogDescription></DialogHeader><div className="policy-placeholder"><p>We're preparing the official documentation for this service. Please contact our team for the current policy details before using the service.</p><p><strong>Company:</strong> Creative Entertainment Technology Co., Ltd.</p><p><strong>Contact:</strong> hello@yourcompany.com</p></div><Button variant="outline" onClick={() => { setPolicy(null); goTo("contact"); }}>Contact our team <ArrowRight aria-hidden="true" /></Button></DialogContent></Dialog>
    </main>
  );
}

function SectionHeading({ kicker, title, description }: { kicker: string; title: React.ReactNode; description: string }) {
  return <div className="section-heading" data-reveal><p className="eyebrow">{kicker}</p><h2>{title}</h2><p>{description}</p></div>;
}

function Stat({ value, suffix, label, prefix = "", decimals = 0 }: { value: number; suffix: string; label: string; prefix?: string; decimals?: number }) {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const element = document.getElementById(`stat-${label.replaceAll(" ", "-")}`);
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setStarted(true);
      const start = performance.now();
      const duration = 1500;
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setCurrent(value * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [label, value]);
  return <div className="trust-stat" id={`stat-${label.replaceAll(" ", "-")}`}><strong>{prefix}{started ? current.toFixed(decimals) : (0).toFixed(decimals)}{suffix}</strong><span>{label}</span></div>;
}

function ServiceCard({ title, category, icon, accent, description, items, onLearn }: { title: string; category: string; icon: React.ReactNode; accent: "blue" | "violet"; description: string; items: string[]; onLearn: () => void }) {
  return <article className={`service-card service-card-${accent}`} data-reveal><div className="service-card-top"><span className="service-icon">{icon}</span><span className="service-category">{category}</span><ArrowUpRight className="service-arrow" aria-hidden="true" /></div><h3>{title}</h3><p className="service-description">{description}</p><ul className="service-features">{items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul><Button variant="ghost" className="text-link service-link" onClick={onLearn}>Learn more <ArrowRight aria-hidden="true" /></Button><span className="service-index" aria-hidden="true">/ 0{accent === "blue" ? "1" : "2"}</span></article>;
}

function Step({ number, icon, title, description, last = false }: { number: string; icon: React.ReactNode; title: string; description: string; last?: boolean }) {
  return <div className={`step-row${last ? " step-last" : ""}`}><div className="step-marker"><span>{number}</span><span className="step-icon">{icon}</span></div><div className="step-copy"><h3>{title}</h3><p>{description}</p></div></div>;
}

function SignupForm({ mode, onSuccess }: { mode: SignupMode; onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = signupSchema.safeParse({ email, password });
    if (!result.success) { setError(result.error.issues[0]?.message ?? "Check your details and try again."); return; }
    setError("");
    onSuccess();
  }
  return <form className="contact-form modal-form" onSubmit={handleSubmit} noValidate><label htmlFor="signup-email">Email address</label><Input id="signup-email" type="email" autoComplete="email" maxLength={255} placeholder="you@example.com" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} required /><label htmlFor="signup-password">Password</label><Input id="signup-password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} maxLength={128} placeholder="At least 8 characters" value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} required />{error && <p className="field-error" role="alert">{error}</p>}<Button type="submit" className="button-gradient form-submit">{mode === "login" ? "Sign in" : "Create account"} <ArrowRight aria-hidden="true" /></Button></form>;
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = contactSchema.safeParse({ name, email, message });
    if (!result.success) { setError(result.error.issues[0]?.message ?? "Check your details and try again."); return; }
    setError("");
    setSubmitted(true);
    setName(""); setEmail(""); setMessage("");
    toast.success("Message received", { description: "Thanks for reaching out. This demo form doesn't send or store messages." });
  }
  if (submitted) return <div className="contact-form contact-success" data-reveal><span><CheckCircle2 aria-hidden="true" /></span><p className="eyebrow">MESSAGE READY</p><h3>Thanks for reaching out.</h3><p>This preview doesn't send or store messages. Your message was validated successfully.</p><Button variant="outline" onClick={() => setSubmitted(false)}>Send another message <ArrowRight aria-hidden="true" /></Button></div>;
  return <form className="contact-form" onSubmit={handleSubmit} noValidate data-reveal><div className="form-heading"><h3>Send us a message</h3><p>Tell us how we can help. We’ll take it from there.</p></div><div className="form-field"><label htmlFor="contact-name">Your name</label><Input id="contact-name" autoComplete="name" maxLength={100} placeholder="How should we address you?" value={name} onChange={(event) => { setName(event.target.value); setError(""); }} required /></div><div className="form-field"><label htmlFor="contact-email">Email address</label><Input id="contact-email" type="email" autoComplete="email" maxLength={255} placeholder="you@company.com" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} required /></div><div className="form-field"><label htmlFor="contact-message">Your message</label><Textarea id="contact-message" rows={4} maxLength={1500} placeholder="What would you like to know?" value={message} onChange={(event) => { setMessage(event.target.value); setError(""); }} required /><span className="character-count">{message.length} / 1,500</span></div>{error && <p className="field-error" role="alert">{error}</p>}<Button type="submit" className="button-gradient form-submit">Send message <Send aria-hidden="true" /></Button><p className="form-privacy"><LockKeyhole aria-hidden="true" /> We’ll only use your details to respond.</p></form>;
}