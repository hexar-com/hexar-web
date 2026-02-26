"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

// ---------------------------------------------------------------------------
// Pre-highlighted code snippets (HTML strings per line).
// Spaces are preserved via `whitespace-pre` on the container span.
// ---------------------------------------------------------------------------
const SNIPPETS = [
  {
    file: "useProducts.ts",
    lang: "TypeScript",
    lines: [
      `<span class="hl-kw">import</span> { useEffect, useState } <span class="hl-kw">from</span> <span class="hl-str">'react'</span>`,
      `<span class="hl-cmt">// Hook con filtrado, caché y estado de carga</span>`,
      ``,
      `<span class="hl-kw">interface</span> <span class="hl-type">Product</span> {`,
      `  id:    <span class="hl-kw">string</span>`,
      `  name:  <span class="hl-kw">string</span>`,
      `  stock: <span class="hl-kw">number</span>`,
      `}`,
      ``,
      `<span class="hl-kw">export function</span> useProducts(filter: <span class="hl-kw">string</span>) {`,
      `  <span class="hl-kw">const</span> [data, setData]       = useState&lt;<span class="hl-type">Product</span>[]&gt;([])`,
      `  <span class="hl-kw">const</span> [loading, setLoading] = useState(<span class="hl-kw">true</span>)`,
      ``,
      `  useEffect(() => {`,
      `    api.products.list({ filter })`,
      `      .then(setData)`,
      `      .finally(() => setLoading(<span class="hl-kw">false</span>))`,
      `  }, [filter])`,
      ``,
      `  <span class="hl-kw">return</span> { data, loading }`,
      `}`,
    ],
  },
  {
    file: "orders.route.ts",
    lang: "Node.js",
    lines: [
      `<span class="hl-cmt">// Endpoint con transacción atómica y eventos</span>`,
      `router.post(<span class="hl-str">'/orders'</span>, auth, <span class="hl-kw">async</span> (req, res) => {`,
      `  <span class="hl-kw">const</span> { items, userId } = req.body`,
      ``,
      `  <span class="hl-kw">const</span> order = <span class="hl-kw">await</span> db.transaction(<span class="hl-kw">async</span> (trx) => {`,
      `    <span class="hl-kw">await</span> validateStock(items, trx)`,
      `    <span class="hl-kw">const</span> total = <span class="hl-kw">await</span> calcTotal(items, trx)`,
      ``,
      `    <span class="hl-kw">return</span> trx(<span class="hl-str">'orders'</span>).insert({`,
      `      userId, total,`,
      `      status: <span class="hl-str">'pending'</span>,`,
      `    })`,
      `  })`,
      ``,
      `  <span class="hl-kw">await</span> queue.publish(<span class="hl-str">'order.created'</span>, order)`,
      `  res.status(<span class="hl-num">201</span>).json({ id: order.id })`,
      `})`,
    ],
  },
  {
    file: "analytics.sql",
    lang: "PostgreSQL",
    lines: [
      `<span class="hl-cmt">-- Retención y lifetime value del cliente</span>`,
      `<span class="hl-kw">CREATE INDEX CONCURRENTLY</span> idx_orders_user`,
      `  <span class="hl-kw">ON</span> orders (user_id, created_at <span class="hl-kw">DESC</span>)`,
      `  <span class="hl-kw">WHERE</span> status = <span class="hl-str">'active'</span>;`,
      ``,
      `<span class="hl-kw">SELECT</span>`,
      `  user_id,`,
      `  <span class="hl-kw">COUNT</span>(*)     <span class="hl-kw">AS</span> total_orders,`,
      `  <span class="hl-kw">SUM</span>(amount)  <span class="hl-kw">AS</span> lifetime_value,`,
      `  <span class="hl-kw">MAX</span>(created_at) <span class="hl-kw">AS</span> last_purchase`,
      `<span class="hl-kw">FROM</span> orders`,
      `<span class="hl-kw">WHERE</span> created_at &gt; <span class="hl-kw">NOW</span>() - <span class="hl-kw">INTERVAL</span> <span class="hl-str">'90 days'</span>`,
      `<span class="hl-kw">GROUP BY</span> user_id`,
      `<span class="hl-kw">HAVING  COUNT</span>(*) &gt; <span class="hl-num">3</span>`,
      `<span class="hl-kw">ORDER BY</span> lifetime_value <span class="hl-kw">DESC</span>;`,
    ],
  },
]

const FEATURES = [
  "TypeScript y clean architecture en todo el stack",
  "Java para negocios críticos, Node.js para APIs ágiles",
  "Go para microservicios de alto rendimiento",
  "APIs RESTful, GraphQL y microservicios desacoplados",
  "CI/CD, Docker y cloud nativo desde el día uno",
  "Bases de datos optimizadas para escala real",
]

type Phase = "typing" | "waiting" | "fading"

export function CodeShowcase() {
  const [idx, setIdx]                 = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)
  const [phase, setPhase]             = useState<Phase>("typing")
  const [opacity, setOpacity]         = useState(1)

  const snippet  = SNIPPETS[idx]
  const total    = snippet.lines.length
  const isTyping = phase === "typing"

  // State-machine driven animation
  useEffect(() => {
    if (phase === "typing") {
      if (visibleLines < total) {
        const t = setTimeout(() => setVisibleLines(l => l + 1), 40)
        return () => clearTimeout(t)
      }
      setPhase("waiting")
    } else if (phase === "waiting") {
      const t = setTimeout(() => { setOpacity(0); setPhase("fading") }, 2800)
      return () => clearTimeout(t)
    } else if (phase === "fading") {
      const t = setTimeout(() => {
        setIdx(i => (i + 1) % SNIPPETS.length)
        setVisibleLines(0)
        setOpacity(1)
        setPhase("typing")
      }, 380)
      return () => clearTimeout(t)
    }
  }, [phase, visibleLines, total])

  const jumpTo = (i: number) => {
    setIdx(i)
    setVisibleLines(0)
    setOpacity(1)
    setPhase("typing")
  }

  return (
    <section className="py-20 bg-primary border-y border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 items-center">

          {/* ── Left: value copy ── */}
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-accent border border-accent/25 rounded-full px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Stack tecnológico
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Código limpio.<br />
              Arquitecturas que escalan.
            </h2>

            <p className="text-white/50 mb-8 leading-relaxed text-pretty">
              Construimos sistemas robustos aplicando las mejores prácticas de la industria.
              Cada decisión técnica está pensada para la mantenibilidad, el rendimiento
              y el crecimiento sostenible de tu producto.
            </p>

            <ul className="space-y-3.5">
              {FEATURES.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-white/65">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: animated code editor ── */}
          <div className="hidden lg:block w-full">
            <div
              className="rounded-xl overflow-hidden border border-white/[0.07] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
              style={{ fontFamily: "var(--font-geist-mono, 'Fira Code', 'Cascadia Code', monospace)" }}
            >
              {/* Window chrome */}
              <div className="bg-[#0D2137] px-4 py-3 flex items-center gap-3 border-b border-white/[0.06]">
                <div className="flex gap-1.5 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
                </div>
                <span className="flex-1 text-center text-xs text-white/35 font-medium tracking-wide">
                  {snippet.file}
                </span>
                <span className="shrink-0 text-[10px] font-bold tracking-widest uppercase text-accent/70 border border-accent/20 rounded px-1.5 py-0.5">
                  {snippet.lang}
                </span>
              </div>

              {/* Code body */}
              <div
                className="bg-[#060F18] py-5 min-h-[340px] overflow-hidden"
                style={{ transition: "opacity 0.35s ease", opacity }}
              >
                {snippet.lines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className="flex items-baseline px-4" style={{ lineHeight: "1.7" }}>
                    {/* Line number */}
                    <span className="select-none w-7 shrink-0 text-right text-[11px] text-[#243340] mr-5 tabular-nums">
                      {i + 1}
                    </span>
                    {/* Code */}
                    <span
                      className="text-[13px] text-[#C4D4DF] whitespace-pre"
                      dangerouslySetInnerHTML={{ __html: line || " " }}
                    />
                    {/* Cursor on the last visible line */}
                    {i === visibleLines - 1 && (
                      <span
                        className={`inline-block w-[2px] h-[13px] ml-px bg-[#4FA3D1] align-middle shrink-0${!isTyping ? " cursor-blink" : ""}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Snippet selector dots */}
            <div className="flex justify-center gap-2 mt-5">
              {SNIPPETS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  title={s.file}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === idx
                      ? "bg-accent w-5"
                      : "bg-white/20 w-1.5 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
