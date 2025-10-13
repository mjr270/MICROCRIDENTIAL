import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

// Minimal multilingual chatbot widget with canned responses
// Languages supported: en (English), es (Spanish), fr (French), bn (Bengali)

const canned = {
  en: {
    hello: 'Hello! How can I help you today?',
    support: 'I can help with account, uploads, verification, and learning paths. Ask me anything.',
    upload: 'To upload a document, go to the Upload page and follow the instructions. Need step-by-step help?',
    default: "I'm here to help — please rephrase or ask for 'support'",
  },
  es: {
    hello: '¡Hola! ¿En qué puedo ayudarte hoy?',
    support: 'Puedo ayudar con la cuenta, cargas, verificación y rutas de aprendizaje. Pregúntame lo que necesites.',
    upload: 'Para subir un documento, ve a la página de Upload y sigue las instrucciones. ¿Necesitas ayuda paso a paso?',
    default: 'Estoy aquí para ayudar — por favor reformula tu pregunta o pide "soporte"',
  },
  fr: {
    hello: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    support: "Je peux aider pour le compte, les téléchargements, la vérification et les parcours d'apprentissage.",
    upload: "Pour télécharger un document, allez sur la page Upload et suivez les instructions.",
    default: "Je suis là pour vous aider — reformulez votre question ou demandez 'support'",
  },
  bn: {
    hello: 'হ্যালো! আমি কীভাবে সাহায্য করতে পারি?',
    support: 'আমি অ্যাকাউন্ট, আপলোড, যাচাইকরণ এবং লার্নিং পাথ নিয়ে সাহায্য করতে পারি। জিজ্ঞেস করুন।',
    upload: 'ডকুমেন্ট আপলোড করতে Upload পেজে যান এবং নির্দেশনা অনুসরণ করুন। ধাপে ধাপে সাহায্য প্রয়োজন?',
    default: 'আমি সাহায্য করতে প্রস্তুত — অনুগ্রহ করে পুনরায় জিজ্ঞেস করুন বা "support" বলুন',
  }
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  // Prefer app-level language if available
  const langCtx = (() => {
    try {
      return useLanguage();
    } catch (e) {
      return null;
    }
  })();
  const [lang, setLang] = useState(langCtx ? langCtx.lang : 'en');

  useEffect(() => {
    if (langCtx) setLang(langCtx.lang);
  }, [langCtx && langCtx.lang]);
  const [messages, setMessages] = useState([
    { from: 'bot', text: canned['en'].hello }
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    // ensure greeting matches language when changed
    const greet = (canned[lang] && canned[lang].hello) || canned['en'].hello;
    setMessages([{ from: 'bot', text: greet }]);
  }, [lang]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  const sendUser = (text) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { from: 'user', text: t }]);
    // First try the proxy API (if available)
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: t, lang }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.reply) {
          setTimeout(() => setMessages((m) => [...m, { from: 'bot', text: data.reply }]), 400);
        } else {
          // fallback to canned
          fallbackReply(t);
        }
      })
      .catch(() => {
        fallbackReply(t);
      });
  };

  const fallbackReply = (t) => {
    const lower = t.toLowerCase();
    const c = canned[lang] || canned['en'];
    let reply = c.default;
    if (lower.includes('upload') || lower.includes('document')) reply = c.upload;
    else if (lower.includes('help') || lower.includes('support')) reply = c.support;
    setTimeout(() => setMessages((m) => [...m, { from: 'bot', text: reply }]), 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendUser(input);
    setInput('');
  };

  return (
    <div>
      {/* Floating button */}
      <div className="fixed right-6 bottom-6 z-50">
        {open && (
          <div className="w-80 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border">
            <div className="p-3 bg-blue-600 text-white flex items-center justify-between">
              <div className="font-semibold">Help Chat</div>
              <div className="flex items-center gap-2">
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="text-sm rounded px-2 py-1"
                  aria-label="Select language"
                >
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                  <option value="fr">FR</option>
                  <option value="bn">BN</option>
                </select>
                <button onClick={() => setOpen(false)} className="text-white text-sm px-2">Close</button>
              </div>
            </div>

            <div ref={listRef} className="p-3 h-48 overflow-auto space-y-3 bg-gray-50 dark:bg-gray-900">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`${m.from === 'bot' ? 'bg-white dark:bg-gray-800 text-gray-800' : 'bg-blue-600 text-white'} p-2 rounded-lg max-w-[80%]`}>{m.text}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t bg-white dark:bg-gray-800">
              <div className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={lang === 'en' ? 'Type a message...' : 'Message...'} className="flex-1 px-3 py-2 rounded border" />
                <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Send</button>
              </div>
            </form>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center"
          aria-label="Open chat"
        >
          {open ? '✕' : '💬'}
        </button>
      </div>
    </div>
  );
}
