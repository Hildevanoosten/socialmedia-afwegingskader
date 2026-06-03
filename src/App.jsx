import { useState } from "react";
 
// ─── Design Tokens ────────────────────────────────────────────────────────────
const T = {
  bg:        "#f5f0fb",       // soft lavender-white
  bgAlt:     "#ede7f6",       // slightly deeper lavender
  bgCard:    "#ffffff",
  blush:     "#e8d5f5",       // pastel purple
  blushDark: "#d4b8eb",
  rose:      "#8b5cf6",       // purple accent
  roseDark:  "#6d28d9",
  roseBg:    "#f3ebfd",
  roseBorder:"#c4a0e8",
  sand:      "#e0d4f0",
  sandDark:  "#c8b8e0",
  text:      "#1e1630",
  textMid:   "#5b4d7a",
  textLight: "#9585b8",
  border:    "#ddd0f0",
  borderDark:"#c8b8e0",
  white:     "#ffffff",
  // Secondary accent: mint
  mint:      "#6ee7b7",
  mintBg:    "#ecfdf5",
  mintBorder:"#a7f3d0",
  mintText:  "#065f46",
  // Warning: amber
  amber:     "#f59e0b",
  amberBg:   "#fffbeb",
  amberBorder:"#fde68a",
  amberText: "#78350f",
  // Danger: rose-red
  danger:    "#f87171",
  dangerBg:  "#fff1f2",
  dangerBorder:"#fecdd3",
  dangerText:"#881337",
};
 
// ─── Data ─────────────────────────────────────────────────────────────────────
const CRITERIA = [
  {
    id: "bereik", nr: "01", title: "Nabijheid en bereik", short: "Bereik",
    definition: "Dit criterium beoordeelt in hoeverre een platform inwoners bereikt die momenteel onvoldoende worden bereikt via bestaande gemeentelijke communicatiekanalen.",
    waarom: "Gemeenten willen alle inwoners kunnen bereiken. Een platform dat een unieke of ondervertegenwoordigde doelgroep bedient, levert een strategische meerwaarde.",
    scores: {
      1: "Bereikt vrijwel geen relevante doelgroep.",
      2: "Beperkt aanvullend bereik ten opzichte van bestaande kanalen.",
      3: "Gemiddeld bereik, overlapping met bestaande doelgroepen.",
      4: "Groot aanvullend bereik dat bestaande kanalen versterkt.",
      5: "Bereikt een unieke of moeilijk bereikbare doelgroep (bijv. jongeren).",
    },
    voorbeelden: [
      { naam: "Snapchat", score: 5 }, { naam: "WhatsApp Kanaal", score: 5 },
      { naam: "Instagram", score: 5 }, { naam: "Facebook", score: 4 }, { naam: "X (Twitter)", score: 3 },
    ],
    aandachtspunten: [
      "Let op het verschil tussen platform-populariteit en daadwerkelijk bereik van de specifieke doelgroep.",
      "Overweeg demografische data bij de beoordeling.",
    ],
  },
  {
    id: "opdracht", nr: "02", title: "Publieke opdracht en functionaliteit", short: "Functionaliteit",
    definition: "In welke mate ondersteunt het platform de publieke taak van de gemeente? Denk aan informeren, activeren, participeren en dienstverlening.",
    waarom: "Een platform dat niet bijdraagt aan gemeentelijke communicatiedoelen is geen efficiënte inzet van publieke middelen.",
    scores: {
      1: "Draagt nauwelijks bij aan gemeentelijke doelen.",
      2: "Ondersteunt één gemeentelijke communicatiefunctie beperkt.",
      3: "Gemiddelde ondersteuning van gemeentelijke taken.",
      4: "Goed bruikbaar voor informeren én activeren.",
      5: "Ondersteunt informeren, activeren én participeren breed.",
    },
    voorbeelden: [],
    aandachtspunten: [
      "Toets of het platform ook interactie en tweerichtingsverkeer mogelijk maakt.",
      "Overweeg of het platform aansluit bij bestaande digitale dienstverlening.",
    ],
  },
  {
    id: "juridisch", nr: "03", title: "Wettelijke en bestuurlijke kaders", short: "Juridisch",
    definition: "Past het platform binnen de wettelijke verantwoordelijkheden van de gemeente? Denk aan AVG, transparantie, archivering en toegankelijkheid.",
    waarom: "Als overheid heeft de gemeente een bijzondere verantwoordelijkheid ten aanzien van persoonsgegevens, archivering en toegankelijkheid.",
    scores: {
      1: "Grote juridische risico's; niet conform AVG of andere wetgeving.",
      2: "Juridische risico's aanwezig; aanpassingen vereist.",
      3: "Beperkte risico's; mitigeerbaar met aanvullende maatregelen.",
      4: "Grotendeels compliant; kleine aandachtspunten.",
      5: "Sterke aansluiting op wettelijke vereisten.",
    },
    voorbeelden: [],
    aandachtspunten: [
      "Let op internationale datadoorgifte (bijv. naar de VS) onder de AVG.",
      "Controleer of de Archiefwet van toepassing is en hoe berichten worden gearchiveerd.",
    ],
  },
  {
    id: "soevereiniteit", nr: "04", title: "Digitale soevereiniteit", short: "Soevereiniteit",
    definition: "In welke mate blijft de gemeente onafhankelijk van commerciële technologiebedrijven en behoudt zij controle over data, content en algoritmen?",
    waarom: "Afhankelijkheid van commerciële platforms brengt risico's: algoritmische veranderingen, data-exploitatie en verlies van publiek bereik.",
    scores: {
      1: "Volledige afhankelijkheid van commercieel platform, geen eigen controle.",
      2: "Grote afhankelijkheid; data en algoritmen volledig extern.",
      3: "Gedeelde controle; enige eigen invloed mogelijk.",
      4: "Beperkte afhankelijkheid; gemeente heeft substantiële controle.",
      5: "Volledige controle; open source of eigenaarschap van data.",
    },
    voorbeelden: [
      { naam: "WhatsApp", score: 2 }, { naam: "Instagram", score: 2 },
      { naam: "Facebook", score: 2 }, { naam: "Snapchat", score: 2 }, { naam: "Mastodon", score: 5 },
    ],
    aandachtspunten: [
      "Overweeg exit-strategieën bij sterke platformafhankelijkheid.",
      "Open source-alternatieven verdienen een hogere weging bij gevoelige communicatie.",
    ],
  },
  {
    id: "ethisch", nr: "05", title: "Maatschappelijke en ethische aspecten", short: "Ethisch",
    definition: "Welke maatschappelijke gevolgen en risico's brengt het platform met zich mee? Denk aan privacy, inclusiviteit, desinformatie en online veiligheid.",
    waarom: "Als publieke instantie heeft de gemeente een voorbeeldfunctie. Platforms met hoge risico's op desinformatie of privacyschending zijn in strijd met publieke waarden.",
    scores: {
      1: "Grote maatschappelijke risico's; hoge kans op desinformatie, uitsluiting of privacyschending.",
      2: "Aanzienlijke risico's; beperkte moderatiemogelijkheden.",
      3: "Gemiddelde risico's; mitigeerbaar met beleid.",
      4: "Beperkte risico's; goede moderatie-opties aanwezig.",
      5: "Nauwelijks risico's; platform bevordert inclusiviteit en veiligheid.",
    },
    voorbeelden: [],
    aandachtspunten: [
      "Overweeg de kwetsbare doelgroepen die actief zijn op het platform.",
      "Hoe gaat het platform om met haatspraak, desinformatie en misbruik?",
    ],
  },
  {
    id: "capaciteit", nr: "06", title: "Impact op afdeling Communicatie", short: "Capaciteit",
    definition: "Hoeveel capaciteit vraagt het platform van de afdeling Communicatie? Denk aan dagelijks beheer, moderatie en specialistische kennis.",
    waarom: "Publieke middelen voor communicatie zijn beperkt. Een platform met hoge beheerslast vraagt een expliciete afweging ten opzichte van de meerwaarde.",
    scores: {
      1: "Zeer arbeidsintensief: dagelijks beheer, intensieve moderatie en specialistische kennis vereist.",
      2: "Arbeidsintensief: regelmatig beheer en moderatie noodzakelijk.",
      3: "Gemiddelde belasting: wekelijks beheer mogelijk.",
      4: "Beperkte belasting: content deels herbruikbaar, weinig moderatie.",
      5: "Zeer beperkte belasting: minimale moderatie, content herbruikbaar.",
    },
    voorbeelden: [],
    aandachtspunten: [
      "Bereken de FTE-impact bij volledige inzet.",
      "Overweeg of kennisoverdracht intern of extern belegd moet worden.",
    ],
  },
];
 
const VERGELIJK_PLATFORMEN = [
  { naam: "WhatsApp Kanaal", scores: { bereik: 5, opdracht: 4, juridisch: 3, soevereiniteit: 2, ethisch: 3, capaciteit: 4 } },
  { naam: "Snapchat",        scores: { bereik: 5, opdracht: 3, juridisch: 3, soevereiniteit: 2, ethisch: 3, capaciteit: 3 } },
  { naam: "Instagram",       scores: { bereik: 5, opdracht: 4, juridisch: 3, soevereiniteit: 2, ethisch: 3, capaciteit: 3 } },
  { naam: "Facebook",        scores: { bereik: 4, opdracht: 4, juridisch: 3, soevereiniteit: 2, ethisch: 3, capaciteit: 3 } },
  { naam: "X (Twitter)",     scores: { bereik: 3, opdracht: 3, juridisch: 2, soevereiniteit: 2, ethisch: 2, capaciteit: 2 } },
];
 
// ─── Helpers ──────────────────────────────────────────────────────────────────
function getTotaal(scores) {
  return Object.values(scores).reduce((s, v) => s + (v || 0), 0);
}
 
function getAdvies(totaal) {
  if (totaal >= 24) return { label: "Actief inzetten",         kleur: "groen",  dot: T.mint,   bg: T.mintBg,   border: T.mintBorder,   textCol: T.mintText };
  if (totaal >= 18) return { label: "Voorwaardelijk inzetten", kleur: "geel",   dot: T.amber,  bg: T.amberBg,  border: T.amberBorder,  textCol: T.amberText };
  if (totaal >= 12) return { label: "Pilot of experiment",     kleur: "oranje", dot: T.rose,   bg: T.roseBg,   border: T.roseBorder,   textCol: T.roseDark };
  return             { label: "Niet inzetten",                 kleur: "rood",   dot: T.danger, bg: T.dangerBg, border: T.dangerBorder, textCol: T.dangerText };
}
 
function beleidsadvies(naam, scores, totaal) {
  const sterke = CRITERIA.filter((c) => (scores[c.id] || 0) >= 4);
  const zwakke  = CRITERIA.filter((c) => (scores[c.id] || 0) <= 2);
  let t = `Op basis van de Multi Criteria Analyse scoort ${naam} ${totaal} van de maximaal 30 punten. `;
  if      (totaal >= 24) t += `Dat is een sterke score — het platform kan worden ingezet als structureel communicatiekanaal.`;
  else if (totaal >= 18) t += `Een gemiddelde score. Inzet is mogelijk onder specifieke voorwaarden. Het is verstandig de aandachtspunten aan te pakken voordat het platform breed wordt ingezet.`;
  else if (totaal >= 12) t += `De score geeft reden tot terughoudendheid. Je kunt overwegen het platform in te zetten als onderdeel van een beperkte pilot, waarbij je risico's nauwgezet monitort.`;
  else                   t += `De score geeft geen aanleiding tot inzet. De risico's en beperkingen wegen zwaarder dan de potentiële voordelen.`;
  if (sterke.length > 0) t += ` Sterke punten: ${sterke.map((c) => c.title).join(", ")}.`;
  if (zwakke.length  > 0) t += ` Aandacht nodig voor: ${zwakke.map((c) => c.title).join(", ")}.`;
  return t;
}
 
function watNuStappen(adv, naam, scores) {
  const zwakke  = CRITERIA.filter((c) => (scores[c.id] || 0) <= 2);
  const middelm = CRITERIA.filter((c) => (scores[c.id] || 0) === 3);
 
  if (adv.kleur === "groen") return [
    { icon: "✅", title: "Neem een formeel besluit", body: `Leg de keuze om ${naam} actief in te zetten vast in het communicatiebeleid of een collegebesluit, met verwijzing naar deze MCA als onderbouwing.` },
    { icon: "📋", title: "Stel een implementatieplan op", body: "Definieer doelstellingen, tone-of-voice, publicatiefrequentie en verantwoordelijkheden. Plan een evaluatiemoment na zes maanden." },
    { icon: "⚙️", title: "Organiseer de capaciteit", body: "Zorg voor voldoende capaciteit binnen de afdeling Communicatie. Wijs een accounthouder aan die het platform beheert en monitort." },
    { icon: "📊", title: "Stel meetdoelen in", body: "Bepaal KPI's (bereik, interactie, doelgroepbereik) en evalueer het platform jaarlijks opnieuw via dit afwegingskader." },
  ];
 
  if (adv.kleur === "geel") return [
    { icon: "🔍", title: "Pak de aandachtspunten aan", body: zwakke.length > 0 ? `De lage scores op ${zwakke.map(c=>c.title).join(" en ")} vragen om gerichte maatregelen voordat het platform breed wordt ingezet.` : "Bekijk welke criteria onder de verwachting scoren en onderzoek of dit te verbeteren is." },
    { icon: "🧪", title: "Start met een afgebakende inzet", body: `Zet ${naam} eerst in voor één specifiek doel of doelgroep. Evalueer na drie maanden of bredere inzet verantwoord is.` },
    { icon: "📝", title: "Stel voorwaarden vast", body: "Formuleer heldere randvoorwaarden: welk type content, welke doelgroep, welke frequentie." },
    { icon: "🔄", title: "Plan een hertoetsing", body: "Hertoets het platform na zes maanden of zodra relevante omstandigheden (wet- of regelgeving, platformbeleid) wijzigen." },
  ];
 
  if (adv.kleur === "oranje") return [
    { icon: "⚠️", title: "Wees transparant over de risico's", body: `De score van ${naam} geeft reden tot terughoudendheid. Bespreek de bevindingen met management en leg vast waarom eventuele inzet een bewuste keuze is.` },
    { icon: "🧪", title: "Overweeg een kleinschalige pilot", body: "Als inzet toch gewenst is: beperk het tot een afgebakende pilot — één campagne, één doelgroep, vaste einddatum. Evalueer streng." },
    { icon: "🔍", title: "Onderzoek alternatieven", body: middelm.length > 0 ? `Zijn er andere platforms die dezelfde doelen bereiken maar beter scoren op ${middelm.slice(0,2).map(c=>c.title).join(" en ")}?` : "Verken of andere platforms beter aansluiten bij de gemeentelijke doelstellingen." },
    { icon: "📅", title: "Hertoets over een jaar", body: "Platforms veranderen. Plan een hertoetsing in over 12 maanden — de situatie kan dan anders zijn." },
  ];
 
  return [
    { icon: "🚫", title: "Adviseer negatief en documenteer", body: `De score van ${naam} rechtvaardigt geen inzet. Leg dit schriftelijk vast — inclusief de MCA-uitkomst — zodat het traceerbaar is.` },
    { icon: "💬", title: "Communiceer de beslissing", body: "Informeer betrokkenen (management, bestuur, collega's) over het negatieve advies en de onderbouwing ervan." },
    { icon: "🔄", title: "Houd de vinger aan de pols", body: "Platforms kunnen hun beleid, veiligheidsmaatregelen of eigenaarschap wijzigen. Hertoets het platform op verzoek of bij significante externe veranderingen." },
    { icon: "🔍", title: "Zoek naar alternatieven", body: "Welk platform voldoet wél aan de criteria voor de communicatiedoelen die aan dit platform ten grondslag lagen?" },
  ];
}
 
// ─── Radar Chart ─────────────────────────────────────────────────────────────
function RadarChart({ scores, size = 240 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.36;
  const n = CRITERIA.length;
  const angles = CRITERIA.map((_, i) => (2 * Math.PI * i) / n - Math.PI / 2);
  const pt = (score, i) => {
    const f = (score || 0) / 5;
    return [cx + r * f * Math.cos(angles[i]), cy + r * f * Math.sin(angles[i])];
  };
  const grid = (f) => angles.map((a) => [cx + r * f * Math.cos(a), cy + r * f * Math.sin(a)]);
  const poly = (pts) => pts.map((p) => p.join(",")).join(" ");
  const dataPoints = CRITERIA.map((c, i) => pt(scores[c.id] || 0, i));
 
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", margin: "0 auto" }}>
      {[1,2,3,4,5].map(l => <polygon key={l} points={poly(grid(l/5))} fill={l===5?"#f3ebfd":"none"} stroke={T.blushDark} strokeWidth="1" />)}
      {angles.map((a,i) => <line key={i} x1={cx} y1={cy} x2={cx+r*Math.cos(a)} y2={cy+r*Math.sin(a)} stroke={T.blushDark} strokeWidth="1" />)}
      <polygon points={poly(dataPoints)} fill="rgba(139,92,246,0.13)" stroke={T.rose} strokeWidth="2" />
      {dataPoints.map((p,i) => <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={T.rose} />)}
      {CRITERIA.map((c,i) => {
        const lx = cx + (r+22)*Math.cos(angles[i]);
        const ly = cy + (r+22)*Math.sin(angles[i]);
        const anchor = Math.cos(angles[i]) < -0.1 ? "end" : Math.cos(angles[i]) > 0.1 ? "start" : "middle";
        return <text key={i} x={lx} y={ly+4} textAnchor={anchor} fontSize="10" fill={T.textMid} fontFamily="Georgia, serif">{c.short}</text>;
      })}
    </svg>
  );
}
 
// ─── Score Bar ────────────────────────────────────────────────────────────────
function ScoreBar({ score }) {
  const col = score <= 2 ? T.danger : score <= 3 ? T.rose : T.mint;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 5, background: T.blush, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${(score/5)*100}%`, height: "100%", background: col, borderRadius: 3, transition: "width 0.4s ease" }} />
      </div>
      <span style={{ fontWeight: 700, fontSize: 13, color: col, minWidth: 28, textAlign: "right" }}>{score}/5</span>
    </div>
  );
}
 
// ─── Score Selector ───────────────────────────────────────────────────────────
function ScoreSelector({ value, onChange }) {
  const [hov, setHov] = useState(0);
  const labels = { 1: "Onvoldoende", 2: "Matig", 3: "Voldoende", 4: "Goed", 5: "Uitstekend" };
  return (
    <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
      {[1,2,3,4,5].map(n => {
        const active = n <= (hov || value);
        return (
          <button key={n} onClick={() => onChange(n)}
            onMouseEnter={() => setHov(n)} onMouseLeave={() => setHov(0)}
            title={labels[n]}
            style={{
              width: 38, height: 38, border: `2px solid ${active ? T.rose : T.sandDark}`,
              background: active ? T.rose : T.white, color: active ? T.white : T.textLight,
              fontWeight: 700, fontSize: 15, cursor: "pointer", borderRadius: 2,
              fontFamily: "Georgia, serif", transition: "all 0.12s",
            }}
          >{n}</button>
        );
      })}
      {(hov || value) > 0 && (
        <span style={{ fontSize: 12, color: T.textLight, fontStyle: "italic", marginLeft: 4 }}>{labels[hov || value]}</span>
      )}
    </div>
  );
}
 
// ─── Collapsible ─────────────────────────────────────────────────────────────
function Collapsible({ title, children, defaultOpen = false, accent }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: `1px solid ${T.border}`, borderRadius: 2, overflow: "hidden", marginBottom: 3 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 18px", background: open ? T.roseBg : T.bgCard,
        border: "none", cursor: "pointer", textAlign: "left",
        borderLeft: `3px solid ${accent || T.sandDark}`,
      }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: T.text, fontFamily: "Georgia, serif" }}>{title}</span>
        <span style={{ color: T.textLight, fontSize: 16, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", display: "inline-block" }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: "16px 18px 18px", background: T.bgCard, borderLeft: `3px solid ${accent || T.sandDark}`, borderTop: `1px solid ${T.border}` }}>
          {children}
        </div>
      )}
    </div>
  );
}
 
// ─── Advies Card ─────────────────────────────────────────────────────────────
function AdviesCard({ totaal }) {
  const adv = getAdvies(totaal);
  return (
    <div style={{ background: adv.bg, border: `1px solid ${adv.border}`, borderRadius: 2, padding: "18px 22px", textAlign: "center" }}>
      <div style={{ width: 14, height: 14, borderRadius: "50%", background: adv.dot, margin: "0 auto 10px" }} />
      <div style={{ fontWeight: 800, fontSize: 18, color: adv.textCol, fontFamily: "Georgia, serif", letterSpacing: "-0.3px" }}>{adv.label}</div>
      <div style={{ fontSize: 12, color: T.textLight, marginTop: 6, fontStyle: "italic" }}>{totaal} van 30 punten</div>
    </div>
  );
}
 
// ─── Page Header ─────────────────────────────────────────────────────────────
function PageHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 800, color: T.text, fontFamily: "Georgia, serif", letterSpacing: "-0.5px" }}>{title}</h1>
      {sub && <p style={{ margin: 0, color: T.textMid, fontSize: 14, lineHeight: 1.7 }}>{sub}</p>}
      <div style={{ width: 36, height: 2, background: T.rose, marginTop: 14 }} />
    </div>
  );
}
 
// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: T.blush, borderRadius: 2, padding: "40px 36px 36px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 180, background: "linear-gradient(to left, rgba(232,213,245,0.8), transparent)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 560 }}>
          <div style={{ fontSize: 11, color: T.rose, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, fontWeight: 700 }}>
            Afwegingskader Social Media — Gemeente Nijmegen
          </div>
          <h1 style={{ margin: "0 0 16px", fontSize: 30, fontWeight: 900, color: T.text, fontFamily: "Georgia, serif", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
            Verantwoord social media<br />gebruik voor gemeenten
          </h1>
          <p style={{ margin: "0 0 28px", fontSize: 15, color: T.textMid, lineHeight: 1.75 }}>
            Een praktisch instrument voor communicatieprofessionals bij gemeenten om sociale mediaplatformen te beoordelen op publieke waarden, bereik en uitvoerbaarheid.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "Start beoordeling", page: "beoordelen", primary: true },
              { label: "Bekijk vergelijking", page: "vergelijk" },
              { label: "Lees het rapport", page: "rapport" },
            ].map(btn => (
              <button key={btn.page} onClick={() => setPage(btn.page)} style={{
                padding: "11px 22px",
                background: btn.primary ? T.rose : "transparent",
                color: btn.primary ? T.white : T.rose,
                border: `2px solid ${T.rose}`,
                fontWeight: 700, fontSize: 13, cursor: "pointer", borderRadius: 2,
                fontFamily: "inherit", letterSpacing: 0.3,
                transition: "all 0.12s",
              }}>{btn.label}</button>
            ))}
          </div>
        </div>
      </div>
 
      {/* Info strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: T.border, marginBottom: 24 }}>
        {[
          { n: "6", label: "Beoordelings-criteria" },
          { n: "30", label: "Max. punten-totaal" },
          { n: "MCA", label: "Multi Criteria Analyse" },
          { n: "4", label: "Advies-categorieën" },
        ].map(s => (
          <div key={s.label} style={{ background: T.bgCard, padding: "18px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: T.rose, fontFamily: "Georgia, serif" }}>{s.n}</div>
            <div style={{ fontSize: 11, color: T.textMid, marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
 
      {/* What this tool does — center-aligned text */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.border, marginBottom: 24 }}>
        {[
          { title: "Voor wie?", body: "Communicatieprofessionals bij gemeenten die een onderbouwde en ethisch verantwoorde keuze willen maken bij de inzet van sociale mediaplatformen." },
          { title: "Waarom?", body: "Bereik alleen is niet meer genoeg. Privacy, desinformatie, digitale soevereiniteit en capaciteitsimpact zijn even belangrijk als het aantal volgers." },
          { title: "Hoe werkt het?", body: "Vul per criterium een score in (1–5). De tool berekent een totaalscore en genereert automatisch een advies én een 'Wat nu?'-stappenplan." },
          { title: "Wat levert het op?", body: "Een traceerbaar en uitlegbaar advies — onderbouwd met de MCA-methode — dat je kunt delen met management, bestuur of collega's." },
        ].map(c => (
          <div key={c.title} style={{ background: T.bgCard, padding: "20px 18px", textAlign: "center", borderLeft: `3px solid transparent`, cursor: "default" }}
            onMouseEnter={e => e.currentTarget.style.borderLeftColor = T.rose}
            onMouseLeave={e => e.currentTarget.style.borderLeftColor = "transparent"}
          >
            <div style={{ fontWeight: 700, fontSize: 14, color: T.text, fontFamily: "Georgia, serif", marginBottom: 8 }}>{c.title}</div>
            <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.7 }}>{c.body}</div>
          </div>
        ))}
      </div>
 
      {/* CTA */}
      <div style={{ background: T.roseBg, border: `1px solid ${T.roseBorder}`, borderLeft: `4px solid ${T.rose}`, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: T.text, fontFamily: "Georgia, serif" }}>Klaar om een platform te beoordelen?</div>
          <div style={{ fontSize: 13, color: T.textMid, marginTop: 4 }}>Het invullen van alle zes criteria duurt gemiddeld 5–10 minuten.</div>
        </div>
        <button onClick={() => setPage("beoordelen")} style={{ padding: "11px 24px", background: T.rose, color: T.white, border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", borderRadius: 2, fontFamily: "inherit" }}>
          Start beoordeling →
        </button>
      </div>
    </div>
  );
}
 
// ─── BEOORDELEN ───────────────────────────────────────────────────────────────
function BeoordelenPage() {
  const [naam, setNaam] = useState("");
  const [gemeente, setGemeente] = useState("");
  const [scores, setScores] = useState({});
  const [open, setOpen] = useState(null);
  const [step, setStep] = useState("invullen");
 
  const filled = Object.keys(scores).length;
  const totaal  = getTotaal(scores);
  const adv     = getAdvies(totaal);
 
  const handleReset = () => { setNaam(""); setGemeente(""); setScores({}); setStep("invullen"); setOpen(null); };
 
  if (step === "resultaat" || step === "watnow") {
    const sterke = CRITERIA.filter(c => (scores[c.id] || 0) >= 4);
    const zwakke  = CRITERIA.filter(c => (scores[c.id] || 0) <= 2);
    const stappen = watNuStappen(adv, naam, scores);
 
    return (
      <div>
        <div style={{ background: T.blush, padding: "22px 26px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11, color: T.rose, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 6 }}>
              Beoordelingsresultaat {gemeente ? `— ${gemeente}` : ""}
            </div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: T.text, fontFamily: "Georgia, serif" }}>{naam}</h1>
            <div style={{ fontSize: 12, color: T.textLight, marginTop: 4, fontStyle: "italic" }}>{new Date().toLocaleDateString("nl-NL")}</div>
          </div>
          <button onClick={handleReset} style={{ padding: "9px 18px", background: T.white, border: `1px solid ${T.border}`, color: T.textMid, fontWeight: 600, fontSize: 13, cursor: "pointer", borderRadius: 2, fontFamily: "inherit" }}>
            ↩ Nieuwe beoordeling
          </button>
        </div>
 
        <div style={{ display: "flex", gap: 1, background: T.border, marginBottom: 20 }}>
          {[
            { id: "resultaat", label: "Uitkomst & scores" },
            { id: "watnow",    label: "Wat nu? →" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setStep(tab.id)} style={{
              flex: 1, padding: "13px 0", background: step === tab.id ? T.bgCard : T.bgAlt,
              border: "none", fontWeight: step === tab.id ? 700 : 400,
              color: step === tab.id ? T.rose : T.textMid,
              fontSize: 14, cursor: "pointer", fontFamily: "Georgia, serif",
              borderBottom: step === tab.id ? `3px solid ${T.rose}` : `3px solid transparent`,
              transition: "all 0.12s",
            }}>{tab.label}</button>
          ))}
        </div>
 
        {step === "resultaat" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <AdviesCard totaal={totaal} />
                <div style={{ border: `1px solid ${T.border}`, padding: "16px 18px", background: T.bgCard }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.rose, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Beleidsadvies</div>
                  <p style={{ margin: 0, fontSize: 13, color: T.textMid, lineHeight: 1.85, fontStyle: "italic" }}>{beleidsadvies(naam, scores, totaal)}</p>
                </div>
              </div>
              <div style={{ border: `1px solid ${T.border}`, padding: 16, background: T.bgCard, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <RadarChart scores={scores} size={200} />
              </div>
            </div>
 
            <div style={{ display: "grid", gridTemplateColumns: sterke.length && zwakke.length ? "1fr 1fr" : "1fr", gap: 12, marginBottom: 16 }}>
              {sterke.length > 0 && (
                <div style={{ background: T.mintBg, border: `1px solid ${T.mintBorder}`, padding: "14px 16px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.mintText, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Sterke punten</div>
                  {sterke.map(c => (
                    <div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: T.text }}>{c.title}</span>
                      <span style={{ fontWeight: 900, color: T.mintText, fontSize: 17 }}>{scores[c.id]}</span>
                    </div>
                  ))}
                </div>
              )}
              {zwakke.length > 0 && (
                <div style={{ background: T.roseBg, border: `1px solid ${T.roseBorder}`, padding: "14px 16px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.roseDark, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Aandachtspunten</div>
                  {zwakke.map(c => (
                    <div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: T.text }}>{c.title}</span>
                      <span style={{ fontWeight: 900, color: T.rose, fontSize: 17 }}>{scores[c.id]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
 
            <div style={{ border: `1px solid ${T.border}`, padding: "18px 20px", background: T.bgCard, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.text, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 16 }}>Scoreverdeling per criterium</div>
              {CRITERIA.map(c => (
                <div key={c.id} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: T.rose, minWidth: 24 }}>{c.nr}</span>
                    <span style={{ fontSize: 13, color: T.text }}>{c.title}</span>
                  </div>
                  <ScoreBar score={scores[c.id] || 0} />
                </div>
              ))}
            </div>
 
            <div onClick={() => setStep("watnow")} style={{
              background: T.roseBg, border: `1px solid ${T.roseBorder}`, borderLeft: `4px solid ${T.rose}`,
              padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: T.text, fontFamily: "Georgia, serif" }}>Wat nu? →</div>
                <div style={{ fontSize: 13, color: T.textMid, marginTop: 4 }}>Bekijk concrete vervolgstappen op basis van dit advies.</div>
              </div>
              <span style={{ fontSize: 22, color: T.rose }}>→</span>
            </div>
          </>
        )}
 
        {step === "watnow" && (
          <>
            <div style={{ background: adv.bg, border: `1px solid ${adv.border}`, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: adv.dot, flexShrink: 0 }} />
              <div>
                <span style={{ fontWeight: 800, color: adv.textCol, fontFamily: "Georgia, serif", fontSize: 15 }}>{adv.label}</span>
                <span style={{ color: T.textMid, fontSize: 13, marginLeft: 10 }}>{naam} — {totaal}/30 punten</span>
              </div>
            </div>
 
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.text, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 16 }}>Aanbevolen vervolgstappen</div>
              {stappen.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16, background: T.bgCard, border: `1px solid ${T.border}`, borderLeft: `4px solid ${T.rose}`, padding: "16px 18px" }}>
                  <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: T.text, fontFamily: "Georgia, serif", marginBottom: 6 }}>{i+1}. {s.title}</div>
                    <p style={{ margin: 0, fontSize: 13, color: T.textMid, lineHeight: 1.8 }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
 
            <div style={{ background: T.bgAlt, border: `1px solid ${T.border}`, padding: "16px 20px", marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.rose, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Algemene tips</div>
              {[
                "Betrek altijd de jurist of privacy-officer bij de definitieve beslissing over inzet van een platform.",
                "Documenteer de uitkomst van deze MCA en bewaar deze bij het dossier van het communicatiebeleid.",
                "Herhaal deze beoordeling jaarlijks of direct na een significante wijziging in platformbeleid of wetgeving.",
                "Gebruik de Kennisbank voor diepgaandere uitleg per criterium.",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ color: T.rose, fontWeight: 700, fontSize: 13, flexShrink: 0, marginTop: 1 }}>—</span>
                  <span style={{ fontSize: 13, color: T.textMid, lineHeight: 1.7 }}>{tip}</span>
                </div>
              ))}
            </div>
 
            <div onClick={() => setStep("resultaat")} style={{ textAlign: "center", padding: "12px", color: T.rose, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              ← Terug naar uitkomst & scores
            </div>
          </>
        )}
      </div>
    );
  }
 
  return (
    <div>
      <PageHeader title="Platform beoordelen" sub="Vul de zes criteria in voor een onderbouwde, ethisch verantwoorde platformafweging." />
 
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        <div style={{ border: `1px solid ${T.border}`, padding: "16px 18px", background: T.bgCard }}>
          <label style={{ display: "block", fontWeight: 600, fontSize: 12, color: T.text, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Naam platform *</label>
          <input value={naam} onChange={e => setNaam(e.target.value)} placeholder="Bijv. TikTok, LinkedIn…"
            style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.sandDark}`, fontSize: 14, color: T.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: T.bg, borderRadius: 0 }} />
        </div>
        <div style={{ border: `1px solid ${T.border}`, padding: "16px 18px", background: T.bgCard }}>
          <label style={{ display: "block", fontWeight: 600, fontSize: 12, color: T.text, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Gemeente (optioneel)</label>
          <input value={gemeente} onChange={e => setGemeente(e.target.value)} placeholder="Bijv. Gemeente Nijmegen"
            style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.sandDark}`, fontSize: 14, color: T.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: T.bg, borderRadius: 0 }} />
        </div>
      </div>
 
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 13, color: T.textLight, fontStyle: "italic" }}>{filled} van 6 criteria ingevuld</div>
        <div style={{ fontSize: 16, fontWeight: 900, color: T.rose, fontFamily: "Georgia, serif" }}>{totaal}/30</div>
      </div>
      <div style={{ height: 3, background: T.blush, marginBottom: 18, overflow: "hidden", borderRadius: 2 }}>
        <div style={{ width: `${(filled/6)*100}%`, height: "100%", background: T.rose, transition: "width 0.3s ease" }} />
      </div>
 
      {CRITERIA.map(c => (
        <div key={c.id} style={{
          border: `1px solid ${open === c.id ? T.roseBorder : T.border}`,
          marginBottom: 4,
          borderLeft: `4px solid ${scores[c.id] ? T.rose : T.sandDark}`,
          background: T.bgCard,
        }}>
          <div onClick={() => setOpen(open === c.id ? null : c.id)}
            style={{ padding: "14px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open === c.id ? T.roseBg : T.bgCard }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: T.rose, minWidth: 28, fontFamily: "Georgia, serif" }}>{c.nr}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: T.text }}>{c.title}</div>
                {scores[c.id] && <div style={{ fontSize: 11, color: T.textLight, marginTop: 2, fontStyle: "italic" }}>Score: {scores[c.id]}/5</div>}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {scores[c.id] && (
                <span style={{
                  width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 12,
                  background: scores[c.id] >= 4 ? T.mintBg : scores[c.id] <= 2 ? T.dangerBg : T.amberBg,
                  color: scores[c.id] >= 4 ? T.mintText : scores[c.id] <= 2 ? T.dangerText : T.amberText,
                }}>{scores[c.id]}</span>
              )}
              <span style={{ color: T.sandDark, fontSize: 14 }}>{open === c.id ? "▲" : "▾"}</span>
            </div>
          </div>
 
          {open === c.id && (
            <div style={{ padding: "16px 18px 18px 50px", borderTop: `1px solid ${T.border}` }}>
              <div style={{ background: T.bgAlt, padding: "11px 14px", marginBottom: 14, borderLeft: `2px solid ${T.rose}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.rose, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Definitie</div>
                <p style={{ margin: 0, fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>{c.definition}</p>
              </div>
 
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.text, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Scorebeschrijvingen</div>
                {[1,2,3,4,5].map(n => (
                  <div key={n} style={{ display: "flex", gap: 10, marginBottom: 6, alignItems: "flex-start" }}>
                    <span style={{
                      width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      fontWeight: 800, fontSize: 11,
                      background: n >= 4 ? T.mintBg : n <= 2 ? T.dangerBg : T.amberBg,
                      color: n >= 4 ? T.mintText : n <= 2 ? T.dangerText : T.amberText,
                    }}>{n}</span>
                    <span style={{ fontSize: 13, color: T.textMid, lineHeight: 1.5 }}>{c.scores[n]}</span>
                  </div>
                ))}
              </div>
 
              <div style={{ marginBottom: c.voorbeelden.length > 0 ? 14 : 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.text, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Kies een score</div>
                <ScoreSelector value={scores[c.id] || 0} onChange={v => setScores({...scores, [c.id]: v})} />
              </div>
 
              {c.voorbeelden.length > 0 && (
                <div style={{ background: "#f0f4ff", borderLeft: `2px solid #a5b4fc`, padding: "10px 14px", marginTop: 4 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#3730a3", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Referentiescores</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {c.voorbeelden.map(v => (
                      <span key={v.naam} style={{ fontSize: 12, background: T.white, border: `1px solid #c7d2fe`, padding: "3px 10px", color: T.text }}>
                        {v.naam}: <strong>{v.score}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
 
      <div style={{ marginTop: 20 }}>
        <button onClick={() => { if (naam.trim() && filled === 6) setStep("resultaat"); }}
          disabled={!naam.trim() || filled < 6}
          style={{
            padding: "13px 30px",
            background: (!naam.trim() || filled < 6) ? T.sandDark : T.rose,
            color: T.white, border: "none", fontWeight: 800, fontSize: 14, cursor: (!naam.trim() || filled < 6) ? "not-allowed" : "pointer",
            borderRadius: 2, fontFamily: "inherit", letterSpacing: 0.3,
          }}>
          {filled < 6 ? `Nog ${6-filled} ${6-filled===1?"criterium":"criteria"} invullen` : "Bekijk beoordeling →"}
        </button>
      </div>
    </div>
  );
}
 
// ─── VERGELIJK ────────────────────────────────────────────────────────────────
function VergelijkPage() {
  const [selected, setSelected] = useState(null);
  const sorted = [...VERGELIJK_PLATFORMEN].sort((a,b) => getTotaal(b.scores) - getTotaal(a.scores));
 
  return (
    <div>
      <PageHeader title="Vergelijk platformen" sub="Indicatief overzicht op basis van een referentiebeoordeling. Scores zijn ter illustratie — doe een eigen beoordeling voor jouw specifieke gemeente." />
 
      <div style={{ background: "#f0f4ff", border: "1px solid #c7d2fe", borderLeft: `3px solid #a5b4fc`, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#3730a3" }}>
        <strong>Toelichting:</strong> De onderstaande scores zijn indicatief en gebaseerd op een generieke referentiebeoordeling. Gemeentelijke context, beleid en omstandigheden kunnen afwijkende scores rechtvaardigen. Gebruik de beoordelingstool voor een maatwerkbeoordeling.
      </div>
 
      <div style={{ border: `1px solid ${T.border}`, overflow: "hidden", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: T.rose }}>
              <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: T.white, letterSpacing: 0.5, fontFamily: "Georgia, serif" }}>Platform</th>
              {CRITERIA.map(c => <th key={c.id} style={{ padding: "12px 8px", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.85)", textAlign: "center", textTransform: "uppercase", letterSpacing: 0.5 }}>{c.short}</th>)}
              <th style={{ padding: "12px 16px", fontSize: 12, fontWeight: 700, color: T.white, textAlign: "center" }}>Totaal</th>
              <th style={{ padding: "12px 16px", fontSize: 12, fontWeight: 700, color: T.white, textAlign: "center" }}>Advies</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p,i) => {
              const t = getTotaal(p.scores);
              const adv = getAdvies(t);
              const isSel = selected?.naam === p.naam;
              return (
                <tr key={p.naam} onClick={() => setSelected(isSel ? null : p)}
                  style={{ background: isSel ? T.roseBg : i%2===0 ? T.bgCard : T.bg, cursor: "pointer", borderBottom: `1px solid ${T.border}` }}>
                  <td style={{ padding: "12px 16px", fontWeight: 700, fontSize: 14, color: T.text, borderLeft: isSel ? `3px solid ${T.rose}` : "3px solid transparent" }}>{p.naam}</td>
                  {CRITERIA.map(c => {
                    const s = p.scores[c.id];
                    return (
                      <td key={c.id} style={{ padding: "12px 8px", textAlign: "center" }}>
                        <span style={{
                          display: "inline-flex", width: 24, height: 24, alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12,
                          background: s >= 4 ? T.mintBg : s <= 2 ? T.dangerBg : T.amberBg,
                          color: s >= 4 ? T.mintText : s <= 2 ? T.dangerText : T.amberText,
                        }}>{s}</span>
                      </td>
                    );
                  })}
                  <td style={{ padding: "12px 16px", textAlign: "center", fontWeight: 900, fontSize: 20, color: adv.dot, fontFamily: "Georgia, serif" }}>{t}</td>
                  <td style={{ padding: "12px 12px", textAlign: "center" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "4px 9px", background: adv.bg, color: adv.textCol, border: `1px solid ${adv.border}`, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{adv.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
 
      {selected ? (
        <div style={{ border: `1px solid ${T.roseBorder}`, borderLeft: `4px solid ${T.rose}` }}>
          <div style={{ background: T.roseBg, padding: "13px 18px", borderBottom: `1px solid ${T.roseBorder}` }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: T.text, fontFamily: "Georgia, serif" }}>Detail: {selected.naam}</h2>
          </div>
          <div style={{ padding: "18px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div>
                {CRITERIA.map(c => (
                  <div key={c.id} style={{ marginBottom: 13 }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 5, alignItems: "center" }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: T.rose, minWidth: 24 }}>{c.nr}</span>
                      <span style={{ fontSize: 13, color: T.text }}>{c.title}</span>
                    </div>
                    <ScoreBar score={selected.scores[c.id]} />
                  </div>
                ))}
              </div>
              <div>
                <RadarChart scores={selected.scores} size={190} />
                <div style={{ marginTop: 12 }}><AdviesCard totaal={getTotaal(selected.scores)} /></div>
              </div>
            </div>
            <div style={{ marginTop: 16, background: T.bgAlt, padding: "13px 16px", borderLeft: `2px solid ${T.rose}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.rose, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Indicatief beleidsadvies</div>
              <p style={{ margin: 0, fontSize: 13, color: T.textMid, lineHeight: 1.85, fontStyle: "italic" }}>{beleidsadvies(selected.naam, selected.scores, getTotaal(selected.scores))}</p>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "18px", fontSize: 13, color: T.textLight, border: `1px dashed ${T.sandDark}`, fontStyle: "italic" }}>
          Klik op een rij voor een gedetailleerde scoreverdeling
        </div>
      )}
    </div>
  );
}
 
// ─── OVER ─────────────────────────────────────────────────────────────────────
function OverPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <PageHeader title="Over het afwegingskader" sub="Achtergrond, methodologie en verantwoording" />
      {[
        { title: "Over dit instrument", accent: T.rose, body: `Dit afwegingskader is ontwikkeld als onderdeel van een afstudeerproject voor Gemeente Nijmegen. Het instrument ondersteunt gemeenten bij het maken van ethisch verantwoorde keuzes rondom de inzet van sociale mediaplatformen.\n\nHet is bedoeld voor communicatieprofessionals binnen gemeentelijke organisaties die platformkeuzes willen onderbouwen — richting management, bestuur, raad of collega's — op basis van publieke waarden in plaats van uitsluitend op bereik of populariteit.` },
        { title: "Waarom een afwegingskader?", body: `Sociale media spelen een centrale rol in de informatievoorziening, participatie, dienstverlening en crisiscommunicatie van gemeenten. Kanaalkeuzes kunnen echter niet meer uitsluitend gebaseerd worden op bereik.\n\nPrivacy, desinformatie, algoritmische sturing, digitale soevereiniteit en platformafhankelijkheid spelen een steeds grotere rol. Gemeenten moeten een zorgvuldige balans vinden tussen communicatie-effectiviteit en publieke waarden.` },
        { title: "Hoe is het kader ontwikkeld?", body: `Het afwegingskader is ontwikkeld op basis van:\n\n— Analyse van gemeentelijke communicatiestrategieën\n— Onderzoek naar mediagebruik van inwoners\n— Benchmarkonderzoek bij vergelijkbare gemeenten\n— Interviews met communicatieprofessionals\n— Toetsing aan wet- en regelgeving (AVG, Archiefwet, WCAG)\n— Trends binnen het socialmedialandschap\n— Maatschappelijke en ethische vraagstukken\n\nDe onderzoeksresultaten zijn verwerkt in een SWOT-analyse en confrontatiematrix, die hebben geleid tot de zes beoordelingscriteria.` },
        { title: "Methodologische onderbouwing (MCA)", accent: T.rose, body: `Dit afwegingskader is gebaseerd op de principes van een Multi Criteria Analyse (MCA).\n\nEen MCA wordt gebruikt wanneer een beslissing afhankelijk is van meerdere factoren die niet rechtstreeks met elkaar te vergelijken zijn. Bij de beoordeling van sociale mediaplatformen spelen bereik, publieke waarden, juridische aspecten, digitale soevereiniteit en uitvoerbaarheid allemaal een rol.\n\nOm deze factoren op een consistente manier te beoordelen zijn zes criteria ontwikkeld. Alle criteria worden gelijk gewogen.\n\nWaarom gelijke weging? Uit het onderzoek bleek geen aanleiding om één criterium structureel belangrijker te achten dan de andere. Een gelijke weging sluit aan bij het principe dat publieke waarden, juridische kaders én communicatiedoelen als gelijkwaardig worden beschouwd.` },
        { title: "Privacy & gegevens", body: `Dit instrument slaat geen beoordelingen op en deelt geen gegevens. Alle ingevulde scores zijn uitsluitend zichtbaar voor jou als gebruiker en worden niet bewaard na het sluiten van de browser.\n\nHet instrument is ontworpen voor intern gebruik binnen gemeentelijke organisaties.` },
      ].map(s => (
        <Collapsible key={s.title} title={s.title} defaultOpen={true} accent={s.accent || T.sandDark}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.9, color: T.textMid, whiteSpace: "pre-line" }}>{s.body}</p>
        </Collapsible>
      ))}
    </div>
  );
}
 
// ─── KENNISBANK ───────────────────────────────────────────────────────────────
function KennisbankPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <PageHeader title="Kennisbank" sub="Uitgebreide toelichting per beoordelingscriterium" />
      {CRITERIA.map(c => (
        <div key={c.id} style={{ marginBottom: 4 }}>
          <Collapsible title={`${c.nr} — ${c.title}`} accent={T.rose}>
            <div style={{ display: "grid", gap: 16 }}>
              {[{ label: "Definitie", body: c.definition }, { label: "Waarom belangrijk", body: c.waarom }].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.rose, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 5 }}>{s.label}</div>
                  <p style={{ margin: 0, fontSize: 13, color: T.textMid, lineHeight: 1.8 }}>{s.body}</p>
                </div>
              ))}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.rose, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Scorebeschrijvingen</div>
                {[1,2,3,4,5].map(n => (
                  <div key={n} style={{ display: "flex", gap: 10, marginBottom: 7, alignItems: "flex-start" }}>
                    <span style={{
                      width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      fontWeight: 800, fontSize: 11,
                      background: n >= 4 ? T.mintBg : n <= 2 ? T.dangerBg : T.amberBg,
                      color: n >= 4 ? T.mintText : n <= 2 ? T.dangerText : T.amberText,
                    }}>{n}</span>
                    <span style={{ fontSize: 13, color: T.textMid, lineHeight: 1.6 }}>{c.scores[n]}</span>
                  </div>
                ))}
              </div>
              {c.voorbeelden.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.rose, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Referentiescores</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {c.voorbeelden.map(v => (
                      <div key={v.naam} style={{ border: `1px solid ${T.border}`, padding: "8px 14px", textAlign: "center", minWidth: 85, background: T.bgCard }}>
                        <div style={{ fontSize: 11, color: T.textLight }}>{v.naam}</div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: v.score >= 4 ? T.mintText : v.score <= 2 ? T.danger : T.rose, marginTop: 4, fontFamily: "Georgia, serif" }}>{v.score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {c.aandachtspunten.length > 0 && (
                <div style={{ background: T.amberBg, borderLeft: `2px solid ${T.amber}`, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.amberText, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 7 }}>Aandachtspunten</div>
                  {c.aandachtspunten.map((a,i) => (
                    <p key={i} style={{ margin: "0 0 5px", fontSize: 13, color: T.textMid, lineHeight: 1.7 }}>— {a}</p>
                  ))}
                </div>
              )}
            </div>
          </Collapsible>
        </div>
      ))}
    </div>
  );
}
 
// ─── RAPPORT ──────────────────────────────────────────────────────────────────
function RapportPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ background: T.blush, padding: "30px 32px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left, rgba(212,184,235,0.6), transparent)" }} />
        <div style={{ fontSize: 11, color: T.rose, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Afwegingskader Social Media</div>
        <h1 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 900, color: T.text, fontFamily: "Georgia, serif", letterSpacing: "-0.5px" }}>Verkort adviesrapport</h1>
        <div style={{ color: T.textMid, fontSize: 13, fontStyle: "italic" }}>Verantwoord social media gebruik voor gemeenten — {new Date().getFullYear()}</div>
      </div>
 
      {[
        { nr: "01", title: "Aanleiding",
          body: `Gemeenten maken gebruik van diverse sociale mediaplatformen voor hun publieke communicatie. De snelle veranderingen in het socialmedialandschap, gecombineerd met toenemende juridische, ethische en strategische vraagstukken, maken het noodzakelijk om platformkeuzes onderbouwd en systematisch te maken.\n\nDit adviesrapport presenteert een afwegingskader waarmee communicatieprofessionals nieuwe en bestaande platformen ethisch verantwoord kunnen beoordelen.` },
        { nr: "02", title: "Onderzoeksmethode",
          body: `Het kader is ontwikkeld via een meervoudige onderzoeksaanpak:\n\n— Deskresearch naar gemeentelijke communicatiestrategieën en landelijke benchmarks\n— Analyse van mediagebruik en bereikgegevens van inwoners\n— Interviews met communicatieprofessionals binnen gemeentelijke organisaties\n— Juridische toetsing aan AVG, Archiefwet en toegankelijkheidsnormen\n— Trendanalyse van het socialmedialandschap\n\nDe resultaten zijn verwerkt in een SWOT-analyse en confrontatiematrix, op basis waarvan zes beoordelingscriteria zijn vastgesteld.` },
        { nr: "03", title: "Belangrijkste inzichten",
          body: `Uit het onderzoek komen vier centrale bevindingen naar voren:\n\n1. Toenemende platformafhankelijkheid\nGemeenten zijn sterk afhankelijk geworden van een beperkt aantal commerciële platforms, wat risico's met zich meebrengt bij beleidswijzigingen.\n\n2. Publieke waarden als expliciete factor\nBereik alleen is geen voldoende grond voor platformkeuze. Privacy, inclusiviteit en transparantie dienen expliciet te worden meegewogen.\n\n3. Voortdurende verandering\nHet socialmedialandschap verandert snel. Nieuwe platforms vragen om snelle beoordeling; bestaande platforms vereisen periodieke hertoetsing.\n\n4. Jongeren vragen om een andere benadering\nDoelgroepen onder de 25 zijn nauwelijks te bereiken via traditionele kanalen. Platforms als Snapchat en TikTok bieden kansen voor jongerencommunicatie.` },
        { nr: "04", title: "Waarom een afwegingskader?",
          body: `Een structureel afwegingskader biedt gemeenten:\n\n— Consistentie: alle platforms worden op dezelfde criteria beoordeeld\n— Transparantie: beslissingen zijn onderbouwd en uitlegbaar aan bestuur en raad\n— Toekomstbestendigheid: toepasbaar op nog onbekende platforms\n— Verantwoording: communicatieprofessionals tonen aan dat keuzes zijn getoetst aan publieke waarden en wettelijke kaders` },
        { nr: "05", title: "De zes beoordelingscriteria",
          body: CRITERIA.map(c => `${c.nr}. ${c.title}\n    ${c.definition}`).join("\n\n") },
        { nr: "06", title: "Aanbevelingen",
          body: `Op basis van de uitgevoerde MCA worden de volgende algemene aanbevelingen gedaan:\n\n1. Gebruik dit afwegingskader als standaard instrument\nNeem het kader op in het communicatiebeleid als verplicht instrument bij toekomstige platformkeuzes. Jaarlijkse herziening wordt aanbevolen.\n\n2. WhatsApp Kanaal (referentiescore: 24/30 — Actief inzetten)\nBiedt hoog bereik onder moeilijk bereikbare doelgroepen en vraagt beperkte capaciteit.\n\n3. Snapchat voor jongerencommunicatie (referentiescore: 21/30 — Voorwaardelijk inzetten)\nVoor campagnes gericht op jongeren (16–25 jaar) biedt Snapchat een uniek bereik.\n\n4. Onderzoek naar digitale alternatieven\nVoor communicatie waarbij digitale soevereiniteit cruciaal is, dienen open source-alternatieven te worden onderzocht.\n\n5. Documenteer alle beoordelingen\nBewaar de uitkomsten van MCA-beoordelingen bij het dossier van het communicatiebeleid voor traceerbaarheid.` },
      ].map(s => (
        <div key={s.nr} style={{ marginBottom: 4 }}>
          <Collapsible title={`${s.nr} — ${s.title}`} defaultOpen={true} accent={T.rose}>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.95, color: T.textMid, whiteSpace: "pre-line" }}>{s.body}</p>
          </Collapsible>
        </div>
      ))}
 
      <div style={{ background: T.bgAlt, border: `1px solid ${T.border}`, padding: "14px 18px", marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: T.textLight, fontStyle: "italic" }}>Afwegingskader Sociale Media v1.0 — {new Date().toLocaleDateString("nl-NL")}</div>
      </div>
    </div>
  );
}
 
// ─── Navigation ───────────────────────────────────────────────────────────────
const NAV = [
  { id: "home",      label: "Home" },
  { id: "beoordelen",label: "Platform beoordelen" },
  { id: "vergelijk", label: "Vergelijk platformen" },
  { id: "over",      label: "Over het kader" },
  { id: "kennisbank",label: "Kennisbank" },
  { id: "rapport",   label: "Adviesrapport" },
];
 
// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
 
  const renderPage = () => {
    switch (page) {
      case "home":       return <HomePage setPage={setPage} />;
      case "beoordelen": return <BeoordelenPage />;
      case "vergelijk":  return <VergelijkPage />;
      case "over":       return <OverPage />;
      case "kennisbank": return <KennisbankPage />;
      case "rapport":    return <RapportPage />;
      default:           return <HomePage setPage={setPage} />;
    }
  };
 
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: 252, background: T.bgAlt, borderRight: `1px solid ${T.border}`, flexShrink: 0, display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflow: "auto" }}>
        {/* Brand */}
        <div style={{ padding: "26px 22px 20px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontFamily: "Georgia, serif", fontWeight: 900, fontSize: 15, color: T.text, letterSpacing: "-0.3px", marginBottom: 4, lineHeight: 1.35 }}>
            Afwegingskader Social Media
          </div>
          <div style={{ width: 28, height: 2, background: T.rose, marginBottom: 10 }} />
          <div style={{ fontSize: 11, color: T.textLight, lineHeight: 1.6, letterSpacing: 0.2 }}>
            Verantwoord social media gebruik<br />voor gemeenten
          </div>
        </div>
 
        {/* Nav */}
        <nav style={{ flex: 1, padding: "14px 0" }}>
          {NAV.map(item => {
            const active = page === item.id;
            return (
              <button key={item.id} onClick={() => setPage(item.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  padding: "12px 22px",
                  background: active ? T.roseBg : "transparent",
                  border: "none",
                  borderLeft: `3px solid ${active ? T.rose : "transparent"}`,
                  color: active ? T.rose : T.textMid,
                  fontWeight: active ? 700 : 400, fontSize: 13, textAlign: "left",
                  cursor: "pointer", transition: "all 0.12s", fontFamily: "inherit",
                  borderBottom: `1px solid ${T.border}`,
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = T.blush; e.currentTarget.style.color = T.text; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.textMid; } }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
 
        {/* Footer — alleen naam hier */}
        <div style={{ padding: "16px 22px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 12, color: T.textMid, fontWeight: 600, marginBottom: 4 }}>Hilde van Oosten</div>
          <div style={{ fontSize: 11, color: T.textLight, lineHeight: 1.7, fontStyle: "italic" }}>
            Beoordelingen worden niet opgeslagen.<br />
            Versie 1.0 — {new Date().getFullYear()}
          </div>
        </div>
      </div>
 
      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <div style={{ background: T.bgCard, borderBottom: `1px solid ${T.border}`, padding: "0 30px", height: 46, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: T.textLight }}>Afwegingskader Social Media</span>
            <span style={{ color: T.sandDark, fontSize: 13 }}>›</span>
            <span style={{ fontSize: 12, color: T.rose, fontWeight: 600 }}>{NAV.find(n => n.id === page)?.label}</span>
          </div>
          <div style={{ fontSize: 11, color: T.textLight, fontStyle: "italic" }}>
            Verantwoord & ethisch afwegen
          </div>
        </div>
 
        {/* Content */}
        <div style={{ flex: 1, padding: "28px 32px", maxWidth: 940, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
 