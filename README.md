# Creativeentertainmenttechnology

Build a modern, responsive single-page marketing website (React + Tailwind) with smooth-scroll navigation and working clickable interactions for a company called "Creative Entertainment Technology Co., Ltd." They provide SMS services and subscriptions for social media platforms. Tagline: "Connect. Verify. Grow."



DESIGN

- Dark navy background (#0A1128), electric blue/violet gradient accents (#4F7CFF to #8B5CF6), white text, rounded-2xl cards, soft glow on hover, subtle chat-bubble motifs, Inter font.

- Modern, tech-forward, clean, trustworthy. Fully mobile responsive.



STICKY NAVBAR

Logo "CET" with a chat-bubble icon, links that smooth-scroll to sections (Services, How It Works, Pricing, FAQ, Contact), a "Login" ghost button and a "Get Started" gradient button. Hamburger menu on mobile.



SECTIONS (in order)

1. HERO: Headline "SMS and social subscriptions, delivered in seconds." Subheadline about reliable, fast, self-serve messaging and subscription services. Buttons: "Get Started" (opens signup modal) and "View Pricing" (scrolls to pricing). On the right, a phone mockup with animated chat bubbles appearing one by one (e.g. "Your verification code is 482916", "Subscription activated").

2. TRUST STRIP: four stats with count-up animation: 99.9% Uptime, 10M+ Messages Delivered, 50+ Countries, <2 min Support Response. (Use placeholder values.)

3. SERVICES: two large cards with icons. "SMS Services" (verification codes, bulk messaging, instant delivery, delivery reports). "Social Subscriptions" (plans for popular social platforms, instant activation, flexible plans, 24/7 support). Each has a "Learn more" button that opens a modal with more detail.

4. HOW IT WORKS: three numbered steps with connecting line: 1 Choose a service, 2 Pay securely, 3 Receive instantly.

5. PRICING: three tiers (Starter $9, Pro $29 marked "Most Popular" with glowing border, Business $79) with feature checklists and a monthly/yearly toggle that updates prices (yearly = 20% off). Each button opens the signup modal.

6. DASHBOARD PREVIEW: a stylized mock dashboard UI showing orders, delivery status badges, and a small usage chart, captioned "Order and track everything yourself. No waiting on a sales rep."

7. TESTIMONIALS: three cards with placeholder names and quotes, star ratings.

8. FAQ: accordion with 6 questions (how fast is delivery, payment methods, supported countries, refunds, data privacy, support hours).

9. FINAL CTA BANNER: gradient background, "Ready to get started?" with a button.

10. CONTACT: form (name, email, message) with validation and a success toast on submit, plus company details placeholder.

11. FOOTER: company name, quick links, and clearly visible links to Privacy Policy, Terms of Service, and Compliance, social icons, copyright "© 2026 Creative Entertainment Technology Co., Ltd."



INTERACTIONS

- Signup modal (email + password, no backend needed, shows a success state).

- Fade-in on scroll animations, hover effects on cards and buttons.

- Everything works client-side with mock data. No backend required.



Keep the code clean and in as few components as sensible. Use only lucide-react icons and no external images.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://creativeentertainmenttechnology.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2a9684cf-0e96-408b-8089-a54832ee10a0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
