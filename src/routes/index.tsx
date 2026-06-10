import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import seloAsset from "@/assets/selo-garantia.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Partituras Brasil — Quiz | 70+ Partituras + Brindes" },
      { name: "description", content: "Responda 4 perguntas e receba o pacote ideal com 70+ partituras dos seus estilos e instrumento favoritos. Apenas R$34,90." },
      { property: "og:title", content: "Partituras Brasil — 70+ Partituras + Brindes" },
      { property: "og:description", content: "Quiz personalizado para músicos. 70+ partituras + brindes por R$34,90 com garantia de 7 dias." },
    ],
  }),
  component: QuizPage,
});

/* ---------------- Data ---------------- */

const LEVELS = [
  { id: "iniciante", label: "Iniciante", desc: "Estou começando agora" },
  { id: "intermediario", label: "Intermediário", desc: "Já toco há algum tempo" },
  { id: "avancado", label: "Avançado", desc: "Toco com fluência" },
  { id: "profissional", label: "Profissional", desc: "Vivo da música" },
];

const GOALS = [
  { id: "hobby", label: "Tocar por hobby", emoji: "🎵" },
  { id: "igreja", label: "Tocar na igreja", emoji: "⛪" },
  { id: "banda", label: "Tocar em banda/grupo", emoji: "🎸" },
  { id: "renda", label: "Gerar renda tocando", emoji: "💰" },
  { id: "estudo", label: "Estudar e evoluir", emoji: "📚" },
  { id: "social", label: "Postar nas redes sociais", emoji: "📱" },
];

const STYLES = [
  { id: "sertanejo", label: "Sertanejo", emoji: "🤠" },
  { id: "gospel", label: "Gospel / Louvor", emoji: "✝️" },
  { id: "mpb", label: "MPB", emoji: "🎶" },
  { id: "pagode", label: "Pagode / Samba", emoji: "🥁" },
  { id: "forro", label: "Forró", emoji: "🪗" },
  { id: "rock", label: "Rock Nacional", emoji: "🎸" },
  { id: "funk", label: "Funk / Pop", emoji: "🎤" },
  { id: "bossa", label: "Bossa Nova", emoji: "🌊" },
  { id: "classica", label: "Clássica", emoji: "🎻" },
];

const INSTRUMENTS = [
  { id: "violao", label: "Violão", emoji: "🎸" },
  { id: "guitarra", label: "Guitarra", emoji: "🎸" },
  { id: "piano", label: "Piano", emoji: "🎹" },
  { id: "teclado", label: "Teclado", emoji: "🎹" },
  { id: "baixo", label: "Baixo", emoji: "🎸" },
  { id: "bateria", label: "Bateria", emoji: "🥁" },
  { id: "cavaco", label: "Cavaquinho", emoji: "🪕" },
  { id: "violino", label: "Violino", emoji: "🎻" },
  { id: "viola", label: "Viola Caipira", emoji: "🪕" },
  { id: "saxofone", label: "Saxofone", emoji: "🎷" },
  { id: "trompete", label: "Trompete", emoji: "🎺" },
  { id: "trombone", label: "Trombone", emoji: "🎺" },
  { id: "flauta", label: "Flauta", emoji: "🪈" },
  { id: "clarinete", label: "Clarinete", emoji: "🎶" },
  { id: "ukulele", label: "Ukulele", emoji: "🎸" },
  { id: "acordeon", label: "Acordeon", emoji: "🪗" },
  { id: "voz", label: "Voz / Canto", emoji: "🎤" },
  { id: "percussao", label: "Percussão", emoji: "🥁" },
];

const SONGS: Record<string, string[]> = {
  sertanejo: [
    "Evidências - Chitãozinho & Xororó", "Ai Se Eu Te Pego - Michel Teló", "Fico Assim Sem Você - Adriana Calcanhotto",
    "Anjo - Zé Neto & Cristiano", "Notificação Preferida - Zé Neto & Cristiano", "Largado às Traças - Zé Neto & Cristiano",
    "Cheia de Manias - Raça Negra (versão sertaneja)", "Cuida Bem Dela - Henrique & Juliano", "Mais Que Amor - Henrique & Juliano",
    "Não Vou Mais Beber - Bruno & Marrone", "Borboletas - Victor & Léo", "Fico Com Você - Jorge & Mateus",
    "Sogrão Caprichou - Fernando & Sorocaba", "Atrasadinha - Felipe Araújo", "Dois Tristes - Marília Mendonça",
    "Eu Sei de Cor - Marília Mendonça", "Infiel - Marília Mendonça", "Bebida na Ferida - Henrique & Juliano",
  ],
  gospel: [
    "Lugar Secreto - Gabriela Rocha", "Oceanos - Ana Nóbrega", "Em Teus Braços - Laura Souguellis",
    "Yeshua - Gabriela Rocha", "Deus do Impossível - Mariana Valadão", "Tua Graça Me Basta - Davi Sacer",
    "Casa do Pai - Aline Barros", "Ressuscita-me - Aline Barros", "Galileu - Fernandinho",
    "Pai Nosso - Soraya Moraes", "Rendido Estou - Aline Barros", "Águas Purificadoras - Diante do Trono",
    "Tu És Santo - Diante do Trono", "Manancial - Quem Me Vê Cantando", "Príncipe da Paz - Gabriela Rocha",
  ],
  mpb: [
    "Garota de Ipanema - Tom Jobim", "Águas de Março - Tom Jobim", "Trem-Bala - Ana Vilela",
    "Pais e Filhos - Legião Urbana", "Detalhes - Roberto Carlos", "Como Nossos Pais - Elis Regina",
    "O Que Será - Chico Buarque", "Construção - Chico Buarque", "Cajuína - Caetano Veloso",
    "Sozinho - Caetano Veloso", "Carolina - Seu Jorge", "Tive Razão - Seu Jorge",
    "Velha Infância - Tribalistas", "Já Sei Namorar - Tribalistas",
  ],
  pagode: [
    "Deixa Acontecer - Grupo Revelação", "Tá Escrito - Grupo Revelação", "Camisa 10 - Grupo Revelação",
    "Cheia de Manias - Raça Negra", "É Tarde Demais - Raça Negra", "Doce Paixão - Raça Negra",
    "Sorri Sou Rei - Natiruts", "Você Pra Mim - Exaltasamba", "Tá Vendo Aquela Lua - Exaltasamba",
    "Não Quero Dinheiro - Tim Maia", "Aquarela do Brasil - Ari Barroso", "Mais Uma Vez - Péricles",
    "Coração Vagabundo - Sorriso Maroto", "Assim Você Mata o Papai - Pixote",
  ],
  forro: [
    "Asa Branca - Luiz Gonzaga", "Esperando na Janela - Gilberto Gil", "Anunciação - Alceu Valença",
    "A Vida do Viajante - Luiz Gonzaga", "Eu Só Quero Um Xodó - Dominguinhos", "Last Forró - Falamansa",
    "Xote dos Milagres - Falamansa", "Sina - Falamansa", "Galope - Mastruz com Leite",
    "Dirubando Meu Coração - Eliane", "Frevo Mulher - Zé Ramalho", "Olha Pro Céu - Luiz Gonzaga",
  ],
  rock: [
    "Tempo Perdido - Legião Urbana", "Eduardo e Mônica - Legião Urbana", "Faroeste Caboclo - Legião Urbana",
    "Será - Legião Urbana", "Pro Dia Nascer Feliz - Cazuza", "Codinome Beija-Flor - Cazuza",
    "Exagerado - Cazuza", "Lanterna dos Afogados - Os Paralamas", "Alagados - Os Paralamas",
    "Brasil - Cazuza", "Fora da Lei - Cazuza", "Garota Nacional - Skank", "Pacato Cidadão - Skank",
    "Tudo Que Vai - Capital Inicial", "Vento Ventania - Biquíni Cavadão",
  ],
  funk: [
    "Envolvimento - Anitta", "Show das Poderosas - Anitta", "Vai Malandra - Anitta",
    "Tudo Ok - Thiaguinho MT", "Bum Bum Tam Tam - MC Fioti", "Cerol na Mão - Bonde do Tigrão",
    "Olha a Explosão - MC Kevinho", "Joga Bunda - Aviões do Forró", "Surubinha de Leve - MC Pedrinho",
    "Atenção - Pedro Sampaio", "Dançarina - Pedro Sampaio", "Malvada - Zé Felipe",
  ],
  bossa: [
    "Garota de Ipanema - Tom Jobim & Vinicius", "Chega de Saudade - João Gilberto", "Desafinado - João Gilberto",
    "Wave - Tom Jobim", "Corcovado - Tom Jobim", "Águas de Março - Tom Jobim",
    "Insensatez - Tom Jobim", "Samba de Uma Nota Só - Tom Jobim", "Eu Sei Que Vou Te Amar - Tom Jobim",
    "Berimbau - Vinicius de Moraes", "Manhã de Carnaval - Luiz Bonfá", "O Barquinho - Roberto Menescal",
  ],
  classica: [
    "Für Elise - Beethoven", "Canon em Ré - Pachelbel", "Ave Maria - Schubert",
    "Marcha Turca - Mozart", "Sonata ao Luar - Beethoven", "Prelúdio em Dó - Bach",
    "Bourrée - Bach", "As Quatro Estações: Primavera - Vivaldi", "Bachianas Brasileiras Nº 5 - Villa-Lobos",
    "Trenzinho do Caipira - Villa-Lobos", "Choros Nº 1 - Villa-Lobos", "Tristesse - Chopin",
    "Noturno Op.9 Nº2 - Chopin",
  ],
};

const TESTIMONIALS = [
  { name: "Lucas M.", role: "Violonista", text: "Comprei pensando que era mais uma promessa. Em 3 dias já estava tocando as músicas que sempre quis. As partituras vêm super organizadas.", stars: 5 },
  { name: "Ana Beatriz", role: "Tecladista de igreja", text: "Achei pelo preço que seria fraco. Me surpreendi: tem partitura de praticamente todos os louvores que toco. Vale cada centavo!", stars: 5 },
  { name: "Rodrigo S.", role: "Saxofonista", text: "Os brindes sozinhos já valem o valor. Material profissional e fácil de ler, recomendo pra qualquer músico que quer evoluir.", stars: 5 },
  { name: "Camila P.", role: "Pianista iniciante", text: "Sou iniciante e estava com medo. As partituras vêm com cifras junto, isso me ajudou muito. Hoje toco minhas músicas favoritas.", stars: 5 },
];

/* ---------------- Component ---------------- */

type State = {
  level: string | null;
  goals: string[];
  styles: string[];
  instrument: string | null;
};

function QuizPage() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<State>({ level: null, goals: [], styles: [], instrument: null });

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const selectedSongs = useMemo(() => {
    const arr: string[] = [];
    state.styles.forEach((s) => SONGS[s]?.forEach((song) => arr.push(`${song}`)));
    return arr;
  }, [state.styles]);

  const canAdvance =
    (step === 0 && state.level) ||
    (step === 1 && state.goals.length > 0) ||
    (step === 2 && state.styles.length > 0) ||
    (step === 3 && state.instrument) ||
    step === 4;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  // Auto-advance helper for single-select steps
  const autoNext = () => {
    window.setTimeout(() => next(), 250);
  };

  return (
    <main className="min-h-screen px-4 py-8 md:py-12">
      <div ref={topRef} className="mx-auto max-w-2xl scroll-mt-4">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Quiz personalizado • Leva 1 minuto
          </div>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            <span className="text-gradient-gold">Partituras Brasil</span>
          </h1>
          <p className="mt-2 text-xs font-medium text-muted-foreground">
            📄 Partituras + 🎧 Playback inclusos
          </p>
        </header>

        {/* Progress */}
        {step < totalSteps - 1 && (
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-xs text-muted-foreground">
              <span>Etapa {step + 1} de {totalSteps - 1}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full gradient-gold transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
          {step === 0 && (
            <StepWrap title="Qual seu nível como músico?" subtitle="Vamos personalizar tudo pra você.">
              <div className="grid gap-3">
                {LEVELS.map((l) => (
                  <OptionCard
                    key={l.id}
                    selected={state.level === l.id}
                    onClick={() => { setState({ ...state, level: l.id }); autoNext(); }}
                  >
                    <div>
                      <div className="font-semibold">{l.label}</div>
                      <div className="text-sm text-muted-foreground">{l.desc}</div>
                    </div>
                  </OptionCard>
                ))}
              </div>
            </StepWrap>
          )}


          {step === 1 && (
            <StepWrap title="O que te move na música?" subtitle="Pode escolher mais de uma opção.">
              <div className="grid grid-cols-2 gap-3">
                {GOALS.map((g) => (
                  <OptionCard
                    key={g.id}
                    selected={state.goals.includes(g.id)}
                    onClick={() => {
                      const has = state.goals.includes(g.id);
                      setState({ ...state, goals: has ? state.goals.filter((x) => x !== g.id) : [...state.goals, g.id] });
                    }}
                  >
                    <div className="text-2xl">{g.emoji}</div>
                    <div className="mt-1 text-sm font-medium">{g.label}</div>
                  </OptionCard>
                ))}
              </div>
            </StepWrap>
          )}

          {step === 2 && (
            <StepWrap title="Quais estilos você toca?" subtitle="Selecione um ou mais estilos.">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {STYLES.map((s) => (
                  <OptionCard
                    key={s.id}
                    selected={state.styles.includes(s.id)}
                    onClick={() => {
                      const has = state.styles.includes(s.id);
                      setState({ ...state, styles: has ? state.styles.filter((x) => x !== s.id) : [...state.styles, s.id] });
                    }}
                  >
                    <div className="text-2xl">{s.emoji}</div>
                    <div className="mt-1 text-sm font-medium">{s.label}</div>
                  </OptionCard>
                ))}
              </div>
            </StepWrap>
          )}

          {step === 3 && (
            <StepWrap title="Qual instrumento você toca?" subtitle="Escolha o seu principal.">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {INSTRUMENTS.map((i) => (
                  <OptionCard
                    key={i.id}
                    selected={state.instrument === i.id}
                    onClick={() => { setState({ ...state, instrument: i.id }); autoNext(); }}
                  >
                    <div className="text-2xl">{i.emoji}</div>
                    <div className="mt-1 text-sm font-medium">{i.label}</div>
                  </OptionCard>
                ))}
              </div>
            </StepWrap>
          )}

          {step === 4 && (
            <FinalStep state={state} songs={selectedSongs} />
          )}

          {/* Nav — only on multi-select steps (1 & 2). Single-select steps avançam sozinhos. */}
          {(step === 1 || step === 2) && (
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={back}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                ← Voltar
              </button>
              <button
                onClick={next}
                disabled={!canAdvance}
                className="flex-1 rounded-lg gradient-gold px-6 py-3 text-sm font-bold text-gold-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                Continuar →
              </button>
            </div>
          )}
          {step === 3 && (
            <button onClick={back} className="mt-4 block w-full text-center text-xs text-muted-foreground hover:text-foreground">← Voltar</button>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          🔒 Suas respostas são privadas • +12.000 músicos atendidos
        </p>
      </div>
    </main>
  );
}

/* ---------------- Sub-components ---------------- */

function StepWrap({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function OptionCard({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative rounded-xl border-2 p-4 text-left transition-all ${
        selected
          ? "border-primary bg-primary/10 shadow-glow"
          : "border-border bg-surface hover:border-primary/40 hover:bg-surface/70"
      }`}
    >
      {children}
      {selected && (
        <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full gradient-gold text-[10px] font-bold text-gold-foreground">
          ✓
        </div>
      )}
    </button>
  );
}

function FinalStep({ state, songs }: { state: State; songs: string[] }) {
  const styleLabels = state.styles.map((id) => STYLES.find((s) => s.id === id)?.label).filter(Boolean);
  const goalLabels = state.goals.map((id) => GOALS.find((g) => g.id === id)?.label).filter(Boolean);
  const instrument = INSTRUMENTS.find((i) => i.id === state.instrument)?.label;
  const level = LEVELS.find((l) => l.id === state.level)?.label;

  return (
    <div>
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
          ✨ Pacote personalizado pronto
        </div>
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">
          Seu kit ideal de partituras
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Com base nas suas respostas, montamos esse pacote pra você.
        </p>
      </div>

      {/* Summary */}
      <div className="mt-6 grid gap-3 rounded-xl border border-border bg-surface/60 p-4 text-sm">
        <SummaryRow label="Nível" value={level || "—"} />
        <SummaryRow label="Objetivos" value={goalLabels.join(", ") || "—"} />
        <SummaryRow label="Estilos" value={styleLabels.join(", ") || "—"} />
        <SummaryRow label="Instrumento" value={instrument || "—"} />
      </div>

      {/* Songs box */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">🎵 Algumas músicas do seu pacote</h3>
          <span className="text-xs text-muted-foreground">{songs.length > 0 ? `${songs.length}+ músicas` : "selecione estilos"}</span>
        </div>
        <div className="scrollbar-custom h-56 overflow-y-auto rounded-xl border border-border bg-background/60 p-1">
          {songs.length === 0 ? (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
              Volte e selecione pelo menos um estilo para ver as músicas.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {songs.map((s, i) => (
                <li key={i} className="flex items-center gap-3 px-3 py-2.5 text-sm">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/15 text-[11px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span className="truncate">{s}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          + outras 70 partituras adicionais selecionadas pro seu perfil
        </p>
      </div>

      {/* Offer */}
      <div className="mt-6 overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-b from-primary/10 to-transparent p-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">Oferta especial</div>
        <div className="mt-2 flex items-baseline justify-center gap-1">
          <span className="text-sm text-muted-foreground line-through">R$ 97</span>
        </div>
        <div className="mt-1 flex items-baseline justify-center gap-1">
          <span className="text-sm font-semibold text-foreground">R$</span>
          <span className="text-5xl font-extrabold text-gradient-gold">34,90</span>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">à vista ou em 3x no cartão</div>

        <ul className="mx-auto mt-5 max-w-sm space-y-2 text-left text-sm">
          <Bullet>+70 partituras dos estilos que você toca</Bullet>
          <Bullet>Adaptadas para {instrument || "seu instrumento"}</Bullet>
          <Bullet>Cifras + partitura no mesmo arquivo</Bullet>
          <Bullet>🎁 Brindes exclusivos (cifras simplificadas, e-book de teoria, áudios)</Bullet>
          <Bullet>Acesso imediato após o pagamento</Bullet>
        </ul>

        <a
          href="#pagamento"
          onClick={(e) => { e.preventDefault(); alert("Redirecionando para o pagamento..."); }}
          className="mt-6 block w-full rounded-xl gradient-gold px-6 py-4 text-base font-bold text-gold-foreground shadow-glow transition-transform hover:scale-[1.02]"
        >
          QUERO MINHAS PARTITURAS →
        </a>
        <p className="mt-3 text-[11px] text-muted-foreground">
          🔒 Pagamento 100% seguro • Pix, cartão ou boleto
        </p>
      </div>

      {/* Guarantee */}
      <div className="mt-6 flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-4">
        <img src={seloAsset.url} alt="Garantia de 7 dias" className="size-20 shrink-0" />
        <div>
          <div className="font-bold">Garantia incondicional de 7 dias</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Se não gostar por qualquer motivo, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-8">
        <h3 className="text-center text-lg font-bold">O que dizem os músicos</h3>
        <div className="mt-4 grid gap-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface/60 p-4">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <p className="mt-2 text-sm text-foreground/90">"{t.text}"</p>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{t.name}</span> • {t.role}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <a
        href="#pagamento"
        onClick={(e) => { e.preventDefault(); alert("Redirecionando para o pagamento..."); }}
        className="mt-8 block w-full rounded-xl gradient-gold px-6 py-4 text-center text-base font-bold text-gold-foreground shadow-glow transition-transform hover:scale-[1.02]"
      >
        GARANTIR MEU PACOTE POR R$34,90
      </a>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 text-primary">✓</span>
      <span>{children}</span>
    </li>
  );
}
