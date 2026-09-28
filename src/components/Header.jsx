import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useLanguage } from '../Language.jsx'
import { useRouter } from '../Router.jsx'

const links = [
  ['Home',      'home'],
  ['Services',  'services'],
  ['Portfolio', 'portfolio'],
  ['Pricing',   'pricing'],
  ['FAQ',       'faq'],
  ['About',     'about'],
  ['Contact',   'contact'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const { page, navigate } = useRouter()

  function go(id) {
    navigate(id)
    setOpen(false)
  }

  return (
    <div className="sticky top-0 z-40 shadow-sm">
      {/* Top bar */}
      <div className="bg-forest text-white">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10 flex min-h-10 items-center justify-between gap-3 text-[11px] sm:text-xs font-semibold tracking-[.08em] uppercase">
          <span>
            {t('25% off interior renovation')}
            <span className="hidden sm:inline text-white/50 mx-2">/</span>
            <span className="hidden sm:inline text-white/70">{t('A limited offer')}</span>
          </span>
          <div className="flex items-center gap-4">
            <a className="hidden sm:inline hover:text-gold" href="tel:+923061308197">0306-1308197</a>
            <button onClick={() => go('contact')} className="text-[#ead1a0] hover:text-white">
              {t('Book now')} <ArrowUpRight size={13} className="inline" />
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav aria-label="Main navigation" className="bg-paper/95 backdrop-blur-xl border-b border-forest/10">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10 h-[74px] flex justify-between items-center gap-6">

          {/* Logo */}
          <button onClick={() => go('home')} className="flex items-center gap-3 shrink-0">
            <img src="/assets/logo.png" alt="NQArchitects logo" className="w-12 h-12 object-contain" />
            <span className="font-semibold tracking-[.14em] uppercase text-forest text-sm">NQArchitects</span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map(([label, id]) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`
                  relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-sm
                  ${page === id
                    ? 'text-forest font-semibold'
                    : 'text-ink/60 hover:text-forest'
                  }
                `}
              >
                {t(label)}
                {/* Active underline */}
                {page === id && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gold rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3 ml-auto lg:ml-0">
            {/* Language toggle */}
            <div className="flex border border-forest/20 text-xs font-bold" aria-label="Language">
              <button
                onClick={() => setLang('ES')}
                aria-pressed={lang === 'ES'}
                className={`px-2.5 py-2 ${lang === 'ES' ? 'bg-forest text-white' : 'text-forest'}`}
              >ES</button>
              <button
                onClick={() => setLang('EN')}
                aria-pressed={lang === 'EN'}
                className={`px-2.5 py-2 ${lang === 'EN' ? 'bg-forest text-white' : 'text-forest'}`}
              >EN</button>
            </div>

            <button
              onClick={() => go('contact')}
              className="hidden lg:inline-flex items-center gap-2 bg-forest px-5 py-3 text-white text-sm hover:bg-[#393b39] transition"
            >
              {t('Free survey')} <ArrowUpRight size={16} />
            </button>

            <button
              type="button"
              className="lg:hidden p-2"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t bg-paper px-5 pb-6 pt-3 flex flex-col gap-1">
            {links.map(([label, id]) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`py-3 border-b border-forest/10 text-left w-full transition ${
                  page === id ? 'text-forest font-semibold' : 'text-ink/70'
                }`}
              >
                {t(label)}
              </button>
            ))}
            <button
              onClick={() => go('contact')}
              className="mt-3 bg-forest text-white px-4 py-3 text-center"
            >
              {t('Free survey')}
            </button>
          </div>
        )}
      </nav>
    </div>
  )
}
