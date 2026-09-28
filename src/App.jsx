import { useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight, Facebook } from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Chat from './components/Chat'
import { WhyUs, Pricing, FAQ } from './components/Planning'
import { useLanguage } from './Language.jsx'
import { services, image } from './data/content'
import { useRouter } from './Router.jsx'

/* ─── Page transition wrapper ─────────────────────────── */
function PageView({ children, id }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.animate(
      [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 280, easing: 'ease-out', fill: 'forwards' }
    )
  }, [id])
  return <div ref={ref}>{children}</div>
}

/* ─── Footer (shared) ──────────────────────────────────── */
function Footer() {
  const { t } = useLanguage()
  const { navigate } = useRouter()
  return (
    <footer className="bg-[#171918] text-white">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" className="w-12 h-12 rounded-full object-contain bg-white" alt="" />
            <span className="font-semibold tracking-[.15em] uppercase">NQArchitects</span>
          </div>
          <p className="mt-6 text-white/60 max-w-sm leading-7">
            {t('Architecture and interiors shaped with intention in Lahore, Pakistan.')}
          </p>
        </div>
        <div>
          <h3 className="text-[#e4cda1] text-xs uppercase tracking-[.2em] mb-5">{t('Explore')}</h3>
          <div className="flex flex-col gap-3 text-sm text-white/70">
            {[['Home','home'],['Services','services'],['Portfolio','portfolio'],['Pricing','pricing'],['FAQ','faq'],['About','about'],['Contact','contact']].map(([label,id]) => (
              <button key={id} onClick={() => navigate(id)} className="text-left hover:text-white transition">
                {t(label)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[#e4cda1] text-xs uppercase tracking-[.2em] mb-5">{t('Find us')}</h3>
          <p className="text-sm text-white/70 leading-7">E180 DHA, Lahore, Pakistan</p>
          <a className="block mt-3 text-sm hover:text-gold" href="tel:+923061308197">0306-1308197</a>
          <a className="block mt-1 text-sm hover:text-gold" href="tel:+923024404233">0302-4404233</a>
          <div className="flex gap-4 mt-6">
            <a aria-label="Facebook" href="https://www.facebook.com/profile.php?id=61578356570776" target="_blank" rel="noreferrer" className="hover:text-gold">
              <Facebook size={20} />
            </a>
            <a aria-label="Instagram" href="https://www.instagram.com/nqarchitects/" target="_blank" rel="noreferrer" className="hover:text-gold text-sm font-medium">IG</a>
          </div>
        </div>
      </div>
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-6 border-t border-white/15 text-xs text-white/45 flex flex-wrap gap-3 justify-between">
        <span>© {new Date().getFullYear()} NQArchitects. All rights reserved.</span>
        <span>Lahore, Pakistan</span>
      </div>
    </footer>
  )
}

/* ─── Individual page views ────────────────────────────── */
function HomePage() {
  const { t } = useLanguage()
  const { navigate } = useRouter()
  return (
    <>
      <Hero />

      {/* About */}
      <section id="about" className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10 grid lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-20 items-center">
          <div>
            <p className="eyebrow">{t('The studio')} <span>/ 01</span></p>
            <h2 className="section-title mt-4">{t('Design is how a space')} <em>{t('makes you feel.')}</em></h2>
          </div>
          <div className="lg:pl-12 lg:border-l border-forest/20">
            <p className="text-xl md:text-2xl leading-relaxed text-forest font-display">
              {t('At NQArchitects, every project begins with a simple question: how should this place live?')}
            </p>
            <p className="mt-6 text-ink/65 leading-8">
              {t('Based in DHA Lahore, we shape residences and commercial spaces through architecture, interior design, renovation and considered finishing. Each detail serves the bigger picture: a space that feels entirely yours.')}
            </p>
            <button onClick={() => navigate('services')} className="mt-7 inline-flex gap-3 items-center text-sm font-semibold uppercase tracking-widest border-b border-gold pb-2 hover:text-gold">
              {t('Our approach')} <ArrowDownRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* Art of living */}
      <section className="bg-forest text-white grid lg:grid-cols-2">
        <div className="min-h-[360px] lg:min-h-[600px] relative">
          <img src={image('121419')} alt="Warm wood executive office interior" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="px-7 sm:px-14 xl:px-24 py-16 lg:py-24 flex flex-col justify-center">
          <p className="text-gold uppercase text-xs tracking-[.22em]">{t('Our perspective')}</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight mt-7">{t('The art of living')} <em className="text-[#dec79b]">{t('beautifully.')}</em></h2>
          <p className="text-white/70 leading-8 mt-7 max-w-md">{t('A space should work effortlessly and leave a lasting impression. We bring planning, materials, light and detail into one considered vision.')}</p>
          <button onClick={() => navigate('portfolio')} className="mt-9 inline-flex items-center gap-3 font-semibold text-sm text-[#e8d1a2] hover:text-white">
            {t('See our work')} <ArrowUpRight size={17} />
          </button>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-paper py-20 md:py-28">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12">
            <div>
              <p className="eyebrow">{t('What we do')} <span>/ 02</span></p>
              <h2 className="section-title mt-4">{t('From first idea')} <em>{t('to final detail.')}</em></h2>
            </div>
            <p className="max-w-xs text-ink/65 leading-relaxed">{t('One vision, thoughtfully realised across the spaces that matter to you.')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-forest/15">
            {services.map(s => (
              <button key={s.number} onClick={() => navigate('contact')} className="group p-7 md:p-9 min-h-64 border-r border-b border-forest/15 hover:bg-[#eee9df] transition flex flex-col justify-between text-left">
                <div className="flex justify-between items-start">
                  <span className="text-gold text-sm font-semibold">{s.number}</span>
                  <ArrowUpRight size={19} className="text-forest group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-forest">{t(s.name)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{t(s.text)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-forest text-white py-20 md:py-28">
        <div className="max-w-[1500px] px-5 md:px-10 mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <div>
            <p className="text-gold uppercase tracking-[.2em] text-xs">{t('Client experiences')} / 06</p>
            <h2 className="font-display text-4xl md:text-6xl leading-tight mt-5">{t('Great spaces begin')} <em className="text-[#e4cda1]">{t('with listening.')}</em></h2>
            <p className="text-white/70 leading-8 mt-7 max-w-lg">{t('Your priorities shape the brief, from the first survey through the final finishing decisions. Ask us how your space could work better for you.')}</p>
            <button onClick={() => navigate('contact')} className="inline-flex items-center gap-3 mt-9 text-[#e4cda1] border-b border-[#e4cda1] pb-2 text-sm font-semibold">
              {t('Tell us your vision')} <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="bg-white/5 border border-white/15 p-8 md:p-12">
            <span className="font-display text-6xl text-gold leading-none">"</span>
            <p className="font-display text-2xl md:text-3xl leading-relaxed mt-2">{t('Every considered detail starts with understanding the people who will use the space.')}</p>
            <p className="mt-9 text-sm text-white/55">{t('NQArchitects design philosophy')}</p>
          </div>
        </div>
      </section>
    </>
  )
}

function ServicesPage() {
  const { t } = useLanguage()
  const { navigate } = useRouter()
  return (
    <>
      <section className="bg-paper py-20 md:py-28 min-h-[70vh]">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12">
            <div>
              <p className="eyebrow">{t('What we do')} <span>/ 02</span></p>
              <h2 className="section-title mt-4">{t('From first idea')} <em>{t('to final detail.')}</em></h2>
            </div>
            <p className="max-w-xs text-ink/65 leading-relaxed">{t('One vision, thoughtfully realised across the spaces that matter to you.')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-forest/15">
            {services.map(s => (
              <button key={s.number} onClick={() => navigate('contact')} className="group p-7 md:p-9 min-h-64 border-r border-b border-forest/15 hover:bg-[#eee9df] transition flex flex-col justify-between text-left">
                <div className="flex justify-between items-start">
                  <span className="text-gold text-sm font-semibold">{s.number}</span>
                  <ArrowUpRight size={19} className="text-forest group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-forest">{t(s.name)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{t(s.text)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <WhyUs />
    </>
  )
}

function PortfolioPage() {
  return <Gallery />
}

function PricingPage() {
  return <Pricing />
}

function FaqPage() {
  return <FAQ />
}

function AboutPage() {
  const { t } = useLanguage()
  const { navigate } = useRouter()
  return (
    <>
      <section className="bg-paper py-20 md:py-28 min-h-[60vh]">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10 grid lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-20 items-center">
          <div>
            <p className="eyebrow">{t('The studio')} <span>/ 01</span></p>
            <h2 className="section-title mt-4">{t('Design is how a space')} <em>{t('makes you feel.')}</em></h2>
          </div>
          <div className="lg:pl-12 lg:border-l border-forest/20">
            <p className="text-xl md:text-2xl leading-relaxed text-forest font-display">
              {t('At NQArchitects, every project begins with a simple question: how should this place live?')}
            </p>
            <p className="mt-6 text-ink/65 leading-8">
              {t('Based in DHA Lahore, we shape residences and commercial spaces through architecture, interior design, renovation and considered finishing. Each detail serves the bigger picture: a space that feels entirely yours.')}
            </p>
            <button onClick={() => navigate('contact')} className="mt-7 inline-flex gap-3 items-center text-sm font-semibold uppercase tracking-widest border-b border-gold pb-2 hover:text-gold">
              {t('Our approach')} <ArrowDownRight size={17} />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-forest text-white grid lg:grid-cols-2">
        <div className="min-h-[360px] lg:min-h-[500px] relative">
          <img src={image('121419')} alt="Studio interior" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="px-7 sm:px-14 xl:px-24 py-16 lg:py-24 flex flex-col justify-center">
          <p className="text-gold uppercase text-xs tracking-[.22em]">{t('Our perspective')}</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight mt-7">{t('The art of living')} <em className="text-[#dec79b]">{t('beautifully.')}</em></h2>
          <p className="text-white/70 leading-8 mt-7 max-w-md">{t('A space should work effortlessly and leave a lasting impression. We bring planning, materials, light and detail into one considered vision.')}</p>
        </div>
      </section>
    </>
  )
}

/* ─── Main App ─────────────────────────────────────────── */
function AppInner() {
  const { page } = useRouter()

  const pageMap = {
    home:      <HomePage />,
    services:  <ServicesPage />,
    portfolio: <PortfolioPage />,
    pricing:   <PricingPage />,
    faq:       <FaqPage />,
    about:     <AboutPage />,
    contact:   <Contact />,
  }

  return (
    <>
      <Header />
      <main>
        <PageView id={page}>
          {pageMap[page] ?? <HomePage />}
        </PageView>
      </main>
      <Footer />
      <Chat />
    </>
  )
}

export default function App() {
  return <AppInner />
}
