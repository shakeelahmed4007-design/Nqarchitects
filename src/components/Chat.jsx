import { useEffect, useRef, useState, useCallback } from 'react'
import { useLanguage } from '../Language.jsx'
import { MessageCircle, Send, Minus, X, ChevronDown } from 'lucide-react'

/* WhatsApp SVG Icon */
function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.504L4 29l7.697-1.807A11.94 11.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3Z" fill="white"/>
      <path d="M22.003 18.917c-.3-.15-1.77-.873-2.044-.972-.274-.1-.473-.15-.672.15-.2.3-.772.972-.946 1.172-.174.2-.348.224-.647.075-.3-.15-1.265-.466-2.41-1.484-.891-.793-1.492-1.773-1.667-2.073-.174-.3-.018-.462.131-.61.134-.134.3-.348.449-.523.15-.174.2-.299.3-.498.1-.2.05-.374-.025-.523-.075-.15-.672-1.62-.921-2.218-.243-.582-.49-.503-.672-.513l-.573-.01c-.2 0-.523.075-.797.374-.274.3-1.046 1.022-1.046 2.491s1.071 2.89 1.22 3.089c.15.2 2.108 3.217 5.108 4.511.713.308 1.27.492 1.704.63.716.228 1.368.196 1.883.119.574-.086 1.77-.724 2.02-1.422.248-.698.248-1.297.173-1.422-.074-.125-.273-.2-.572-.35Z" fill="#25D366"/>
    </svg>
  )
}

/* ─── Knowledge base ─────────────────────────────────────── */
const KB_EN = [
  {
    patterns: /price|cost|budget|rate|fee|kitna|quotation|quote/,
    reply:
      'Pricing depends on the size, materials and scope of your project. We offer a **free initial survey** where we can discuss your requirements and prepare a tailored quote.\n\n📞 Call: 0306-1308197',
  },
  {
    patterns: /where|location|address|lahore|map|dha/,
    reply:
      'We are based at **E180 DHA, Lahore, Pakistan**. You can find the full map in the contact section below. 📍',
  },
  {
    patterns: /phone|number|contact|call|email|whatsapp|reach/,
    reply:
      'You can reach us at:\n\n📞 0306-1308197\n📞 0302-4404233\n\nOr use the contact form on this page — we will get back to you shortly.',
  },
  {
    patterns: /office|workspace|commercial/,
    reply:
      'We design **purposeful workspaces** — office interiors, lighting, layout and finishing tailored to your brand. We can arrange a free survey to get started.',
  },
  {
    patterns: /ceiling|false ceiling|light|lighting/,
    reply:
      'Our **false ceiling and lighting design** services shape the mood and functionality of any room — from warm ambient lighting to architectural ceiling details.',
  },
  {
    patterns: /3d|render|planning|visuali/,
    reply:
      '**3D design and planning** lets you see your space before construction begins. We use it to refine layouts, materials and finishes with you before any work starts.',
  },
  {
    patterns: /paint|finish|colour|color/,
    reply:
      'Our **painting and finishing** service brings the full material and colour palette together for a polished, cohesive result throughout your space.',
  },
  {
    patterns: /salon|beauty|hotel|restaurant|hospit/,
    reply:
      'We work on a range of **commercial interiors** — salons, hospitality spaces and retail. Browse the portfolio section for visual examples of our commercial work.',
  },
  {
    patterns: /survey|free survey|visit|consultation/,
    reply:
      'The **initial survey is completely free**. Contact us to arrange a convenient time and we will visit your space, discuss your goals and outline the next steps.',
  },
  {
    patterns: /time|how long|duration|days|weeks|months/,
    reply:
      'Project timelines depend on scope and complexity. We discuss realistic timelines during the free survey and keep you updated throughout the project.',
  },
  {
    patterns: /renovat|home|house|interior|service|design|transform/,
    reply:
      'Our services include:\n\n🏠 Home renovation\n🎨 Interior design\n🏢 Office redesign\n🖌️ Painting & finishing\n💡 False ceiling & lighting\n📐 3D design & planning\n\nWhich space are you considering?',
  },
]

const KB_ES = [
  {
    patterns: /precio|costo|tarifa|presupuesto|cuánto|cuanto/,
    reply:
      'El precio depende del área, materiales y alcance del proyecto. La **visita inicial es gratuita** — allí preparamos un presupuesto personalizado.\n\n📞 Llama: 0306-1308197',
  },
  {
    patterns: /dónde|donde|ubicaci|direcci|lahore|mapa|dha/,
    reply:
      'Estamos en **E180 DHA, Lahore, Pakistán**. Encuentra el mapa completo en la sección de contacto. 📍',
  },
  {
    patterns: /teléfono|telefono|contacto|whatsapp|llamar|correo/,
    reply:
      'Puedes contactarnos en:\n\n📞 0306-1308197\n📞 0302-4404233\n\nO usa el formulario de contacto y te respondemos pronto.',
  },
  {
    patterns: /oficina|trabajo|comercial|workspace/,
    reply:
      'Diseñamos **espacios de trabajo funcionales** — oficinas, iluminación, distribución y acabados adaptados a tu marca. Solicita una visita gratuita.',
  },
  {
    patterns: /techo|cielorraso|iluminaci|luz/,
    reply:
      'Nuestro servicio de **cielorrasos e iluminación** define el ambiente y la funcionalidad de cada espacio, desde luz cálida hasta detalles arquitectónicos.',
  },
  {
    patterns: /3d|render|plano|visuali|planific/,
    reply:
      'El **diseño 3D** te permite ver el espacio antes de la ejecución. Así afinamos distribución, materiales y acabados contigo antes de comenzar las obras.',
  },
  {
    patterns: /pintura|acabado|color/,
    reply:
      'Nuestro servicio de **pintura y acabados** integra la paleta de materiales y colores para un resultado final pulido y coherente.',
  },
  {
    patterns: /salon|belleza|hotel|restaurante|hospit/,
    reply:
      'Trabajamos en **interiores comerciales** — salones, hostelería y retail. Explora la sección de portafolio para ver ejemplos de nuestro trabajo.',
  },
  {
    patterns: /visita|gratis|gratuita|consulta/,
    reply:
      'La **visita inicial es completamente gratuita**. Contáctanos para acordar un horario y visitamos tu espacio para hablar de objetivos y próximos pasos.',
  },
  {
    patterns: /tiempo|duración|dias|semanas|meses|plazo/,
    reply:
      'Los plazos dependen del alcance del proyecto. Los definimos durante la visita gratuita y te mantenemos informado en todo momento.',
  },
  {
    patterns: /renova|casa|hogar|interior|diseño|servicio/,
    reply:
      'Nuestros servicios incluyen:\n\n🏠 Renovación del hogar\n🎨 Diseño interior\n🏢 Rediseño de oficinas\n🖌️ Pintura y acabados\n💡 Cielorrasos e iluminación\n📐 Diseño 3D y planificación\n\n¿Qué espacio tienes en mente?',
  },
]

const QUICK_EN = ['Services', 'Pricing', 'Location', 'Free survey', 'Contact']
const QUICK_ES = ['Servicios', 'Precios', 'Ubicación', 'Visita gratis', 'Contacto']

function getReply(input, lang) {
  const kb = lang === 'ES' ? KB_ES : KB_EN
  const s = input.toLowerCase()
  const match = kb.find(({ patterns }) => patterns.test(s))
  return match
    ? match.reply
    : lang === 'ES'
    ? 'Podemos ayudarte con servicios, presupuesto, ubicación o reservas. Para mayor detalle llama al 0306-1308197.'
    : 'We can help with services, renovation, office design, pricing, location or booking a survey. For a project-specific answer, call 0306-1308197.'
}

/* Render markdown-lite: **bold**, newlines */
function BotText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <span>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <strong key={i}>{p.slice(2, -2)}</strong>
        ) : (
          p.split('\n').map((line, j, arr) => (
            <span key={`${i}-${j}`}>
              {line}
              {j < arr.length - 1 && <br />}
            </span>
          ))
        )
      )}
    </span>
  )
}

function TypingDots() {
  return (
    <div className="self-start flex items-center gap-1 px-4 py-3 bg-[#ebe7df] text-ink">
      <span className="chat-dot" style={{ animationDelay: '0ms' }} />
      <span className="chat-dot" style={{ animationDelay: '160ms' }} />
      <span className="chat-dot" style={{ animationDelay: '320ms' }} />
    </div>
  )
}

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/* ─── Main component ─────────────────────────────────────── */
export default function Chat() {
  const { t, lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [minimised, setMinimised] = useState(false)
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text:
        lang === 'ES'
          ? '¡Hola! ¿En qué podemos ayudarte? Pregunta sobre nuestros servicios, ubicación, precios o una visita gratuita.'
          : 'Hello! How can we help you? Ask us about our services, location, pricing or booking a free survey.',
      time: timestamp(),
    },
  ])

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  /* Scroll to bottom on new message */
  useEffect(() => {
    if (open && !minimised) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, typing, open, minimised])

  /* Focus input when chat opens */
  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, minimised])

  /* Reset unread when opened */
  useEffect(() => {
    if (open) setUnread(0)
  }, [open])

  const send = useCallback(
    (text) => {
      const message = (text || draft).trim()
      if (!message) return
      setDraft('')

      const userMsg = { role: 'user', text: message, time: timestamp() }
      setMessages((m) => [...m, userMsg])
      setTyping(true)

      const delay = 700 + Math.random() * 600
      setTimeout(() => {
        const reply = getReply(message, lang)
        setTyping(false)
        setMessages((m) => [...m, { role: 'bot', text: reply, time: timestamp() }])
        if (!open) setUnread((n) => n + 1)
      }, delay)
    },
    [draft, lang, open]
  )

  function handleSubmit(e) {
    e.preventDefault()
    send()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const quickReplies = lang === 'ES' ? QUICK_ES : QUICK_EN

  return (
    <>
      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes chatDot {
          0%,80%,100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        .chat-dot {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #5a6b5a;
          animation: chatDot 1.2s ease-in-out infinite;
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-panel {
          animation: chatSlideUp 0.22s ease-out;
        }
        @keyframes chatBounce {
          0%,100% { transform: scale(1); }
          30% { transform: scale(1.18); }
          60% { transform: scale(0.92); }
        }
        .chat-badge-bounce { animation: chatBounce 0.5s ease-out; }
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.55); }
          60% { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
        }
        .wa-pulse { animation: waPulse 2.2s ease-out infinite; }
        .wa-tooltip {
          opacity: 0; pointer-events: none;
          transform: translateX(6px);
          transition: opacity 0.2s, transform 0.2s;
        }
        .wa-btn:hover .wa-tooltip {
          opacity: 1; pointer-events: auto;
          transform: translateX(0);
        }
      `}</style>

      <div className="fixed z-50 bottom-5 right-4 md:bottom-7 md:right-7 flex flex-col items-end gap-3">

        {/* ── Chat panel ── */}
        {open && (
          <div
            className="chat-panel mb-3 flex flex-col bg-[#f9f7f4] shadow-2xl border border-forest/15 overflow-hidden"
            style={{
              width: 'min(360px, calc(100vw - 32px))',
              maxHeight: 'min(540px, calc(100dvh - 120px))',
            }}
            role="region"
            aria-label="NQArchitects live chat"
          >
            {/* Header */}
            <div className="bg-forest text-white px-4 py-3.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                    <MessageCircle size={17} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-forest" />
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">{t('Chat with us')}</p>
                  <p className="text-[11px] text-white/60 leading-tight">{t('We usually reply within a few minutes')}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                <button
                  className="p-2 rounded hover:bg-white/10 transition"
                  onClick={() => setMinimised(!minimised)}
                  aria-label={minimised ? 'Expand' : 'Minimise'}
                >
                  {minimised ? <ChevronDown size={16} /> : <Minus size={16} />}
                </button>
                <button
                  className="p-2 rounded hover:bg-white/10 transition"
                  onClick={() => { setOpen(false); setMinimised(false) }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!minimised && (
              <>
                {/* Messages area */}
                <div
                  className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2"
                  style={{ minHeight: 0 }}
                  aria-live="polite"
                  aria-atomic="false"
                >
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex flex-col gap-0.5 ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`text-sm leading-relaxed max-w-[85%] px-3.5 py-2.5 ${
                          m.role === 'user'
                            ? 'bg-forest text-white rounded-2xl rounded-br-sm'
                            : 'bg-[#ebe7df] text-ink rounded-2xl rounded-bl-sm'
                        }`}
                      >
                        {m.role === 'bot' ? <BotText text={m.text} /> : m.text}
                      </div>
                      <span className="text-[10px] text-ink/35 px-1">{m.time}</span>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {typing && (
                    <div className="flex flex-col items-start gap-0.5">
                      <TypingDots />
                      <span className="text-[10px] text-ink/35 px-1">
                        {lang === 'ES' ? 'Escribiendo…' : 'Typing…'}
                      </span>
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>

                {/* Quick replies */}
                <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-xs border border-forest/30 text-forest px-3 py-1.5 rounded-full hover:bg-forest hover:text-white transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSubmit}
                  className="px-3 pb-3 pt-1 flex gap-2 shrink-0 border-t border-forest/10"
                >
                  <label className="sr-only" htmlFor="chat-input">
                    {lang === 'ES' ? 'Escribe un mensaje' : 'Type a message'}
                  </label>
                  <textarea
                    id="chat-input"
                    ref={inputRef}
                    rows={1}
                    value={draft}
                    onChange={(e) => {
                      setDraft(e.target.value)
                      e.target.style.height = 'auto'
                      e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px'
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={t('Type a message...')}
                    className="flex-1 min-w-0 px-3 py-2 bg-white border border-forest/15 text-sm focus:outline-none focus:border-forest resize-none leading-relaxed"
                    style={{ maxHeight: '80px', overflowY: 'auto' }}
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    aria-label="Send"
                    className="self-end bg-gold text-forest p-2.5 hover:bg-[#c8a24a] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shrink-0"
                  >
                    <Send size={17} />
                  </button>
                </form>

                {/* WhatsApp shortcut */}
                <a
                  href="https://wa.me/923061308197"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 bg-[#25d366] text-white text-xs font-semibold hover:bg-[#1ebe5d] transition shrink-0"
                >
                  <WhatsAppIcon size={15} />
                  {lang === 'ES' ? 'Abrir en WhatsApp' : 'Continue on WhatsApp'}
                </a>
              </>
            )}
          </div>
        )}

        {/* ── WhatsApp floating button ── */}
        <div className="wa-btn relative flex items-center justify-end">
          {/* Tooltip */}
          <span className="wa-tooltip absolute right-full mr-3 whitespace-nowrap bg-[#1a1a1a] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
            {lang === 'ES' ? 'Chat en WhatsApp' : 'WhatsApp us'}
          </span>
          <a
            href="https://wa.me/923061308197"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="wa-pulse w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#1ebe5d] active:scale-95 flex items-center justify-center shadow-xl transition-all duration-200"
          >
            <WhatsAppIcon size={28} />
          </a>
        </div>

        {/* ── Chat toggle button ── */}
        <button
          onClick={() => { setOpen(!open); setMinimised(false) }}
          aria-label={open ? 'Close chat' : 'Open chat'}
          aria-expanded={open}
          className="relative flex items-center gap-2.5 bg-forest text-white shadow-2xl px-5 py-3.5 hover:bg-[#3a3d3a] active:scale-95 transition-all duration-200"
        >
          {open ? <X size={18} /> : <MessageCircle size={18} />}
          <span className="text-sm font-semibold">{t('Chat with us')}</span>

          {/* Unread badge */}
          {unread > 0 && !open && (
            <span className="chat-badge-bounce absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
      </div>
    </>
  )
}
