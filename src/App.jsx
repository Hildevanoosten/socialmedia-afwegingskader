import { useState, useRef } from "react";
 
// ─── Nijmegen Brand Tokens ────────────────────────────────────────────────────
// Primary: #830823 (PMS 201 rood) Secondary: #1a1a1a (zwart) White: #ffffff
// Accent light: #f5e6e9 Border: #d4b0b7 Text muted: #5a5a5a
 
const NMG = {
red: "#830823",
redDark: "#5e0619",
redLight: "#a00f2b",
redBg: "#f9f0f2",
redBorder: "#d4b0b7",
black: "#1a1a1a",
gray900: "#2d2d2d",
gray700: "#4a4a4a",
gray500: "#7a7a7a",
gray300: "#c8c8c8",
gray100: "#f4f4f4",
white: "#ffffff",
};
 
// ─── Data ────────────────────────────────────────────────────────────────────
 
const CRITERIA = [
{
id: "bereik",
title: "Nabijheid en bereik",
nr: "01",
short: "Bereik",
definition:
"Dit criterium beoordeelt in hoeverre een platform inwoners bereikt die momenteel onvoldoende worden bereikt via bestaande gemeentelijke communicatiekanalen.",
waarom:
"Gemeenten willen alle inwoners kunnen bereiken. Een platform dat een unieke of ondervertegenwoordigde doelgroep bedient, levert een strategische meerwaarde.",
scores: {
1: "Bereikt vrijwel geen relevante doelgroep.",
2: "Beperkt aanvullend bereik ten opzichte van bestaande kanalen.",
3: "Gemiddeld bereik, overlapping met bestaande doelgroepen.",
4: "Groot aanvullend bereik dat bestaande kanalen versterkt.",
5: "Bereikt een unieke of moeilijk bereikbare doelgroep (bijv. jongeren).",
},
voorbeelden: [
{ naam: "Snapchat", score: 5 },
{ naam: "WhatsApp Kanaal", score: 5 },
{ naam: "Instagram", score: 5 },
{ naam: "Facebook", score: 4 },
{ naam: "X (Twitter)", score: 3 },
],
aandachtspunten: [
"Let op het verschil tussen platform-populariteit en daadwerkelijk bereik van de specifieke doelgroep.",
"Overweeg demografische data bij de beoordeling.",
],
},
{
id: "opdracht",
title: "Publieke opdracht en functionaliteit",
nr: "02",
short: "Functionaliteit",
definition:
"In welke mate ondersteunt het platform de publieke taak van de gemeente? Denk aan informeren, activeren, participeren en dienstverlening.",
waarom:
"Een platform dat niet bijdraagt aan gemeentelijke communicatiedoelen is geen efficiënte inzet van publieke middelen.",
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
id: "juridisch",
title: "Wettelijke en bestuurlijke kaders",
nr: "03",
short: "Juridisch",
definition:
"Past het platform binnen de wettelijke verantwoordelijkheden van de gemeente? Denk aan AVG, transparantie, archivering en toegankelijkheid.",
waarom:
"Als overheid heeft de gemeente een bijzondere verantwoordelijkheid ten aanzien van persoonsgegevens, archivering en toegankelijkheid.",
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
id: "soevereiniteit",
title: "Digitale soevereiniteit",
nr: "04",
short: "Soevereiniteit",
definition:
"In welke mate blijft de gemeente onafhankelijk van commerciële technologiebedrijven en behoudt zij controle over data, content en algoritmen?",
waarom:
"Afhankelijkheid van commerciële platforms brengt risico's: algoritmische veranderingen, data-exploitatie en verlies van publiek bereik.",
scores: {
1: "Volledige afhankelijkheid van commercieel platform, geen eigen controle.",
2: "Grote afhankelijkheid; data en algoritmen volledig extern.",
3: "Gedeelde controle; enige eigen invloed mogelijk.",
4: "Beperkte afhankelijkheid; gemeente heeft substantiële controle.",
5: "Volledige controle; open source of eigenaarschap van data.",
},
voorbeelden: [
{ naam: "WhatsApp", score: 2 },
{ naam: "Instagram", score: 2 },
{ naam: "Facebook", score: 2 },
{ naam: "Snapchat", score: 2 },
{ naam: "Mastodon", score: 5 },
],
aandachtspunten: [
"Overweeg exit-strategieën bij sterke afhankelijkheid.",
"Open source-alternatieven verdienen extra weging bij gevoelige communicatie.",
],
},
{
id: "ethisch",
title: "Maatschappelijke en ethische aspecten",
nr: "05",
short: "Ethisch",
definition:
"Welke maatschappelijke gevolgen en risico's brengt het platform met zich mee? Denk aan privacy, inclusiviteit, desinformatie en online veiligheid.",
waarom:
"Als publieke instantie heeft de gemeente een voorbeeldfunctie. Platforms met hoge risico's op desinformatie of privacy-schending zijn in strijd met publieke waarden.",
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
id: "capaciteit",
title: "Impact op afdeling Communicatie",
nr: "06",
short: "Capaciteit",
definition:
"Hoeveel capaciteit vraagt het platform van de afdeling Communicatie? Denk aan dagelijks beheer, moderatie en specialistische kennis.",
waarom:
"Publieke middelen voor communicatie zijn beperkt. Een platform met hoge beheerslast vraagt een expliciete afweging ten opzichte van de meerwaarde.",
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
 
const BESTAANDE_PLATFORMEN = [
{ naam: "WhatsApp Kanaal", scores: { bereik: 5, opdracht: 4, juridisch: 3, soevereiniteit: 2, ethisch: 3, capaciteit: 4 } },
{ naam: "Snapchat", scores: { bereik: 5, opdracht: 3, juridisch: 3, soevereiniteit: 2, ethisch: 3, capaciteit: 3 } },
{ naam: "Instagram", scores: { bereik: 5, opdracht: 4, juridisch: 3, soevereiniteit: 2, ethisch: 3, capaciteit: 3 } },
{ naam: "Facebook", scores: { bereik: 4, opdracht: 4, juridisch: 3, soevereiniteit: 2, ethisch: 3, capaciteit: 3 } },
{ naam: "X (Twitter)", scores: { bereik: 3, opdracht: 3, juridisch: 2, soevereiniteit: 2, ethisch: 2, capaciteit: 2 } },
];
 
function getTotaal(scores) {
return Object.values(scores).reduce((s, v) => s + (v || 0), 0);
}
 
function getAdvies(totaal) {
if (totaal >= 24) return { label: "Actief inzetten", color: "#166534", bg: "#f0fdf4", border: "#86efac", dot: "#22c55e", kaart: "Groen" };
if (totaal >= 18) return { label: "Voorwaardelijk inzetten", color: "#854d0e", bg: "#fefce8", border: "#fde047", dot: "#eab308", kaart: "Geel" };
if (totaal >= 12) return { label: "Pilot of experiment", color: "#9a3412", bg: "#fff7ed", border: "#fdba74", dot: "#f97316", kaart: "Oranje" };
return { label: "Niet inzetten", color: "#991b1b", bg: "#fef2f2", border: "#fca5a5", dot: "#ef4444", kaart: "Rood" };
}
 
function beleidsadvies(naam, scores, totaal) {
const sterke = CRITERIA.filter((c) => (scores[c.id] || 0) >= 4);
const zwakke = CRITERIA.filter((c) => (scores[c.id] || 0) <= 2);
let t = `Op basis van de Multi Criteria Analyse scoort ${naam} ${totaal} van de maximaal 30 punten. `;
if (totaal >= 24) t += `Dit is een sterke score die een actieve inzet rechtvaardigt. Gemeente Nijmegen kan dit platform inzetten als structureel communicatiekanaal.`;
else if (totaal >= 18) t += `Dit is een gemiddelde score. Inzet is mogelijk onder specifieke voorwaarden. Het verdient aanbeveling om de aandachtspunten te adresseren alvorens het platform breed in te zetten.`;
else if (totaal >= 12) t += `De score geeft aanleiding tot terughoudendheid. Overwogen kan worden het platform in te zetten als onderdeel van een beperkte pilot, waarbij de risico's nauwgezet worden gemonitord.`;
else t += `De score geeft geen aanleiding tot inzet. De geconstateerde risico's en beperkingen wegen zwaarder dan de potentiële voordelen.`;
if (sterke.length > 0) t += ` Sterke punten zijn: ${sterke.map((c) => c.title).join(", ")}.`;
if (zwakke.length > 0) t += ` Aandacht is vereist voor: ${zwakke.map((c) => c.title).join(", ")}.`;
return t;
}
 
// ─── Nijmegen Eagle SVG (gestileerde adelaar) ─────────────────────────────────
function NijmegenEagle({ size = 32, color = NMG.white }) {
return (
<svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
{/* Simplified double-headed eagle inspired by Nijmegen coat of arms */}
<g fill={color}>
{/* Body */}
<ellipse cx="50" cy="56" rx="14" ry="18" />
{/* Left head */}
<ellipse cx="30" cy="30" rx="10" ry="8" />
<ellipse cx="24" cy="24" rx="5" ry="4" />
{/* Right head */}
<ellipse cx="70" cy="30" rx="10" ry="8" />
<ellipse cx="76" cy="24" rx="5" ry="4" />
{/* Neck connectors */}
<path d="M36 36 Q43 44 50 44 Q57 44 64 36 Q57 28 50 32 Q43 28 36 36Z" />
{/* Wings */}
<path d="M36 52 Q18 44 12 56 Q20 62 36 62Z" />
<path d="M64 52 Q82 44 88 56 Q80 62 64 62Z" />
{/* Tail */}
<path d="M42 72 Q50 82 58 72 Q54 68 50 70 Q46 68 42 72Z" />
{/* Talons */}
<path d="M44 74 Q40 82 38 84 M44 74 Q43 83 41 86 M44 74 Q46 82 45 85" strokeWidth="2" stroke={color} fill="none" />
<path d="M56 74 Q60 82 62 84 M56 74 Q57 83 59 86 M56 74 Q54 82 55 85" strokeWidth="2" stroke={color} fill="none" />
{/* Crown-like top detail */}
<rect x="27" y="19" width="6" height="4" rx="1" />
<rect x="73" y="19" width="6" height="4" rx="1" transform="translate(-6,0)" />
</g>
</svg>
);
}
 
// ─── Radar Chart ─────────────────────────────────────────────────────────────
function RadarChart({ scores, size = 260 }) {
const cx = size / 2, cy = size / 2, r = size * 0.37;
const n = CRITERIA.length;
const angles = CRITERIA.map((_, i) => (2 * Math.PI * i) / n - Math.PI / 2);
const pt = (score, i) => {
const frac = (score || 0) / 5;
return [cx + r * frac * Math.cos(angles[i]), cy + r * frac * Math.sin(angles[i])];
};
const gridPts = (frac) => angles.map((a) => [cx + r * frac * Math.cos(a), cy + r * frac * Math.sin(a)]);
const polyline = (pts) => pts.map((p) => p.join(",")).join(" ");
const dataPoints = CRITERIA.map((c, i) => pt(scores[c.id] || 0, i));
 
return (
<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", margin: "0 auto" }}>
{[1, 2, 3, 4, 5].map((level) => (
<polygon key={level} points={polyline(gridPts(level / 5))} fill={level === 5 ? "#fdf0f2" : "none"} stroke="#e8d0d4" strokeWidth="1" />
))}
{angles.map((a, i) => (
<line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="#e8d0d4" strokeWidth="1" />
))}
<polygon points={polyline(dataPoints)} fill="rgba(131,8,35,0.12)" stroke={NMG.red} strokeWidth="2" />
{dataPoints.map((p, i) => (
<circle key={i} cx={p[0]} cy={p[1]} r="4" fill={NMG.red} />
))}
{CRITERIA.map((c, i) => {
const lx = cx + (r + 22) * Math.cos(angles[i]);
const ly = cy + (r + 22) * Math.sin(angles[i]);
const anchor = Math.cos(angles[i]) < -0.1 ? "end" : Math.cos(angles[i]) > 0.1 ? "start" : "middle";
return (
<text key={i} x={lx} y={ly + 4} textAnchor={anchor} fontSize="10" fill={NMG.gray700} fontFamily="system-ui, sans-serif">
{c.short}
</text>
);
})}
</svg>
);
}
 
// ─── Score Bar ────────────────────────────────────────────────────────────────
function ScoreBar({ score }) {
const col = score <= 2 ? "#ef4444" : score <= 3 ? "#f97316" : NMG.red;
return (
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
<div style={{ flex: 1, height: 6, background: "#ede0e3", borderRadius: 3, overflow: "hidden" }}>
<div style={{ width: `${(score / 5) * 100}%`, height: "100%", background: col, borderRadius: 3, transition: "width 0.4s ease" }} />
</div>
<span style={{ fontWeight: 700, fontSize: 13, color: col, minWidth: 20 }}>{score}/5</span>
</div>
);
}
 
// ─── Score Selector ───────────────────────────────────────────────────────────
function ScoreSelector({ value, onChange }) {
const [hov, setHov] = useState(0);
const labels = { 1: "Onvoldoende", 2: "Matig", 3: "Voldoende", 4: "Goed", 5: "Uitstekend" };
return (
<div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
{[1, 2, 3, 4, 5].map((n) => {
const active = n <= (hov || value);
return (
<button
key={n}
onClick={() => onChange(n)}
onMouseEnter={() => setHov(n)}
onMouseLeave={() => setHov(0)}
title={labels[n]}
style={{
width: 38, height: 38, borderRadius: 4,
border: `2px solid ${active ? NMG.red : NMG.gray300}`,
background: active ? NMG.red : NMG.white,
color: active ? NMG.white : NMG.gray500,
fontWeight: 700, fontSize: 15, cursor: "pointer",
transition: "all 0.12s",
}}
>{n}</button>
);
})}
{(hov || value) > 0 && (
<span style={{ fontSize: 12, color: NMG.gray500, marginLeft: 4, fontStyle: "italic" }}>{labels[hov || value]}</span>
)}
</div>
);
}
 
// ─── Collapsible ─────────────────────────────────────────────────────────────
function Collapsible({ title, children, defaultOpen = false, isRed }) {
const [open, setOpen] = useState(defaultOpen);
return (
<div style={{ border: `1px solid ${isRed ? NMG.redBorder : "#e0e0e0"}`, borderRadius: 0, overflow: "hidden", marginBottom: 2 }}>
<button
onClick={() => setOpen(!open)}
style={{
width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
padding: "14px 20px", background: open ? (isRed ? "#fdf0f2" : NMG.gray100) : NMG.white,
border: "none", cursor: "pointer", textAlign: "left",
borderLeft: `4px solid ${isRed ? NMG.red : NMG.gray300}`,
}}
>
<span style={{ fontWeight: 600, fontSize: 15, color: NMG.black }}>{title}</span>
<span style={{ fontSize: 18, color: NMG.gray500, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", display: "inline-block" }}>▾</span>
</button>
{open && (
<div style={{ padding: "18px 20px", background: NMG.white, borderTop: `1px solid ${isRed ? NMG.redBorder : "#e8e8e8"}`, borderLeft: `4px solid ${isRed ? NMG.red : NMG.gray300}` }}>
{children}
</div>
)}
</div>
);
}
 
// ─── Advies Badge ─────────────────────────────────────────────────────────────
function AdviesCard({ totaal }) {
const adv = getAdvies(totaal);
return (
<div style={{ background: adv.bg, border: `2px solid ${adv.border}`, borderRadius: 0, padding: "20px 24px", textAlign: "center" }}>
<div style={{ width: 16, height: 16, borderRadius: "50%", background: adv.dot, margin: "0 auto 10px" }} />
<div style={{ fontWeight: 800, fontSize: 20, color: adv.color, letterSpacing: "-0.5px" }}>{adv.label}</div>
<div style={{ fontSize: 13, color: NMG.gray500, marginTop: 6 }}>{adv.kaart} — {totaal} van 30 punten</div>
</div>
);
}
 
// ─── Page Header ─────────────────────────────────────────────────────────────
function PageHeader({ title, sub, breadcrumb }) {
return (
<div style={{ marginBottom: 28 }}>
{breadcrumb && (
<div style={{ fontSize: 12, color: NMG.gray500, marginBottom: 8, display: "flex", gap: 6, alignItems: "center" }}>
<span>Communicatie</span>
<span style={{ color: NMG.gray300 }}>›</span>
<span style={{ color: NMG.red }}>{breadcrumb}</span>
</div>
)}
<h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800, color: NMG.black, letterSpacing: "-0.5px" }}>{title}</h1>
{sub && <p style={{ margin: 0, color: NMG.gray700, fontSize: 15, lineHeight: 1.6 }}>{sub}</p>}
<div style={{ width: 48, height: 3, background: NMG.red, marginTop: 14 }} />
</div>
);
}
 
// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
return (
<div>
{/* Hero */}
<div style={{ background: NMG.red, padding: "40px 40px 36px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
{/* Decorative eagle watermark */}
<div style={{ position: "absolute", right: 30, top: "50%", transform: "translateY(-50%)", opacity: 0.08 }}>
<NijmegenEagle size={160} color={NMG.white} />
</div>
<div style={{ position: "relative", zIndex: 1 }}>
<div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
Gemeente Nijmegen — Afdeling Communicatie
</div>
<h1 style={{ margin: "0 0 14px", fontSize: 32, fontWeight: 900, color: NMG.white, letterSpacing: "-1px", lineHeight: 1.15 }}>
Social Media<br />Afwegingskader
</h1>
<p style={{ margin: "0 0 28px", fontSize: 16, color: "rgba(255,255,255,0.85)", maxWidth: 540, lineHeight: 1.7 }}>
Beoordeel sociale mediaplatformen op basis van publieke waarden, bereik, uitvoerbaarheid en strategische relevantie.
</p>
<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
{[
{ label: "Start beoordeling", page: "beoordelen", primary: true },
{ label: "Bekijk vergelijking", page: "vergelijk" },
{ label: "Lees adviesrapport", page: "rapport" },
].map((btn) => (
<button key={btn.page} onClick={() => setPage(btn.page)} style={{
padding: "11px 22px", border: btn.primary ? "none" : "2px solid rgba(255,255,255,0.5)",
background: btn.primary ? NMG.white : "transparent",
color: btn.primary ? NMG.red : NMG.white,
fontWeight: 700, fontSize: 14, cursor: "pointer", borderRadius: 0,
transition: "all 0.12s",
}}>{btn.label}</button>
))}
</div>
</div>
</div>
 
{/* Stats */}
<div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "#e0e0e0", marginBottom: 28 }}>
{[
{ n: "6", label: "Beoordelingscriteria" },
{ n: "30", label: "Maximaal puntentotaal" },
{ n: "5", label: "Geanalyseerde platformen" },
{ n: "4", label: "Adviescategorieën" },
].map((s) => (
<div key={s.label} style={{ background: NMG.white, padding: "20px 18px" }}>
<div style={{ fontSize: 32, fontWeight: 900, color: NMG.red, letterSpacing: "-1px" }}>{s.n}</div>
<div style={{ fontSize: 12, color: NMG.gray700, marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
</div>
))}
</div>
 
{/* Platform overview */}
<div style={{ marginBottom: 28 }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
<h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: NMG.black }}>Actuele platformscores</h2>
<button onClick={() => setPage("vergelijk")} style={{ fontSize: 13, color: NMG.red, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
Volledig overzicht →
</button>
</div>
<div style={{ border: "1px solid #e0e0e0", overflow: "hidden" }}>
{BESTAANDE_PLATFORMEN.map((p, i) => {
const t = getTotaal(p.scores);
const adv = getAdvies(t);
return (
<div key={p.naam} style={{
display: "flex", alignItems: "center", justifyContent: "space-between",
padding: "14px 18px", background: i % 2 === 0 ? NMG.white : NMG.gray100,
borderBottom: i < BESTAANDE_PLATFORMEN.length - 1 ? "1px solid #e8e8e8" : "none",
}}>
<span style={{ fontWeight: 600, fontSize: 14, color: NMG.black }}>{p.naam}</span>
<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
<span style={{ fontSize: 22, fontWeight: 900, color: adv.dot }}>{t}</span>
<span style={{
fontSize: 11, fontWeight: 700, padding: "3px 10px",
background: adv.bg, color: adv.color, border: `1px solid ${adv.border}`,
textTransform: "uppercase", letterSpacing: 0.5,
}}>{adv.label}</span>
</div>
</div>
);
})}
</div>
</div>
 
{/* Feature cards */}
<div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1, background: "#e0e0e0" }}>
{[
{ icon: "◼", title: "Multi Criteria Analyse", desc: "Wetenschappelijk onderbouwde methode voor objectieve platformvergelijking op meerdere gelijkwaardige criteria.", page: "over" },
{ icon: "◼", title: "Zes criteria", desc: "Bereik, functionaliteit, juridisch, soevereiniteit, ethiek en capaciteitsimpact vormen een compleet beoordelingskader.", page: "kennisbank" },
{ icon: "◼", title: "Directe adviezen", desc: "Automatisch gegenereerde beleidsadviezen in gemeentelijke taal op basis van de behaalde score.", page: "beoordelen" },
{ icon: "◼", title: "Kennisbank", desc: "Gedetailleerde toelichting per criterium met voorbeelden, definities en aandachtspunten voor professionals.", page: "kennisbank" },
].map((c) => (
<div key={c.title} onClick={() => setPage(c.page)} style={{
background: NMG.white, padding: "22px 20px", cursor: "pointer",
borderLeft: `4px solid ${NMG.white}`,
transition: "border-color 0.12s",
}}
onMouseEnter={(e) => e.currentTarget.style.borderLeftColor = NMG.red}
onMouseLeave={(e) => e.currentTarget.style.borderLeftColor = NMG.white}
>
<div style={{ fontSize: 8, color: NMG.red, marginBottom: 10 }}>◼◼◼</div>
<div style={{ fontWeight: 700, fontSize: 15, color: NMG.black, marginBottom: 8 }}>{c.title}</div>
<div style={{ fontSize: 13, color: NMG.gray700, lineHeight: 1.6 }}>{c.desc}</div>
</div>
))}
</div>
</div>
);
}
 
// ─── BEOORDELEN ───────────────────────────────────────────────────────────────
function BeoordelenPage({ saved, setSaved }) {
const [naam, setNaam] = useState("");
const [scores, setScores] = useState({});
const [open, setOpen] = useState(null);
const [submitted, setSubmitted] = useState(false);
const filled = Object.keys(scores).length;
const totaal = getTotaal(scores);
 
const handleSave = () => {
setSaved([...saved, { naam, scores, totaal, datum: new Date().toLocaleDateString("nl-NL") }]);
alert(`Beoordeling voor "${naam}" opgeslagen.`);
};
 
if (submitted) {
const adv = getAdvies(totaal);
const sterke = CRITERIA.filter((c) => (scores[c.id] || 0) >= 4);
const zwakke = CRITERIA.filter((c) => (scores[c.id] || 0) <= 2);
return (
<div>
<div style={{ background: NMG.red, padding: "24px 28px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
<div>
<div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>Beoordelingsresultaat</div>
<h1 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: NMG.white }}>{naam}</h1>
<div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>{new Date().toLocaleDateString("nl-NL")}</div>
</div>
<div style={{ display: "flex", gap: 8 }}>
<button onClick={handleSave} style={{ padding: "9px 16px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: NMG.white, fontWeight: 600, fontSize: 13, cursor: "pointer", borderRadius: 0 }}>
Opslaan
</button>
<button onClick={() => { setNaam(""); setScores({}); setSubmitted(false); setOpen(null); }} style={{ padding: "9px 16px", background: NMG.white, border: "none", color: NMG.red, fontWeight: 700, fontSize: 13, cursor: "pointer", borderRadius: 0 }}>
Nieuwe beoordeling
</button>
</div>
</div>
 
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
<AdviesCard totaal={totaal} />
<div style={{ border: "1px solid #e0e0e0", padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
<RadarChart scores={scores} size={200} />
</div>
</div>
 
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
{sterke.length > 0 && (
<div style={{ background: "#f0fdf4", border: "1px solid #86efac", padding: "16px 18px" }}>
<div style={{ fontWeight: 700, fontSize: 13, color: "#166534", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Sterke punten</div>
{sterke.map((c) => (
<div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
<span style={{ fontSize: 13, color: NMG.black }}>{c.title}</span>
<span style={{ fontWeight: 800, color: "#22c55e", fontSize: 16 }}>{scores[c.id]}</span>
</div>
))}
</div>
)}
{zwakke.length > 0 && (
<div style={{ background: "#fff7ed", border: "1px solid #fdba74", padding: "16px 18px" }}>
<div style={{ fontWeight: 700, fontSize: 13, color: "#9a3412", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Aandachtspunten</div>
{zwakke.map((c) => (
<div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
<span style={{ fontSize: 13, color: NMG.black }}>{c.title}</span>
<span style={{ fontWeight: 800, color: "#f97316", fontSize: 16 }}>{scores[c.id]}</span>
</div>
))}
</div>
)}
</div>
 
<div style={{ border: "1px solid #e0e0e0", padding: "18px 20px", marginBottom: 20, borderLeft: `4px solid ${NMG.red}` }}>
<div style={{ fontWeight: 700, fontSize: 13, color: NMG.red, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Automatisch beleidsadvies</div>
<p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: NMG.gray700 }}>{beleidsadvies(naam, scores, totaal)}</p>
</div>
 
<div style={{ border: "1px solid #e0e0e0", padding: "18px 20px" }}>
<div style={{ fontWeight: 700, fontSize: 13, color: NMG.black, marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>Scoreverdeling per criterium</div>
{CRITERIA.map((c) => (
<div key={c.id} style={{ marginBottom: 14 }}>
<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
<span style={{ fontSize: 11, fontWeight: 700, color: NMG.red, minWidth: 24 }}>{c.nr}</span>
<span style={{ fontSize: 13, color: NMG.black, fontWeight: 500 }}>{c.title}</span>
</div>
<ScoreBar score={scores[c.id] || 0} />
</div>
))}
</div>
</div>
);
}
 
return (
<div>
<PageHeader title="Nieuw platform beoordelen" sub="Beoordeel een platform aan de hand van de zes MCA-criteria" breadcrumb="Nieuw platform beoordelen" />
 
<div style={{ border: "1px solid #e0e0e0", padding: "18px 20px", marginBottom: 20 }}>
<label style={{ display: "block", fontWeight: 600, fontSize: 13, color: NMG.black, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Naam van het platform</label>
<input
value={naam}
onChange={(e) => setNaam(e.target.value)}
placeholder="Bijv. TikTok, LinkedIn, Mastodon…"
style={{
width: "100%", padding: "11px 14px", border: "1px solid #d0d0d0",
fontSize: 15, color: NMG.black, outline: "none", boxSizing: "border-box",
fontFamily: "inherit", borderRadius: 0,
}}
/>
</div>
 
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
<div style={{ fontSize: 13, color: NMG.gray500 }}>{filled} van 6 criteria ingevuld</div>
<div style={{ fontSize: 15, fontWeight: 800, color: NMG.red }}>{totaal}/30 punten</div>
</div>
 
{/* Progress bar */}
<div style={{ height: 3, background: "#e8d0d4", marginBottom: 20, overflow: "hidden" }}>
<div style={{ width: `${(filled / 6) * 100}%`, height: "100%", background: NMG.red, transition: "width 0.3s ease" }} />
</div>
 
{CRITERIA.map((c) => (
<div key={c.id} style={{
border: `1px solid ${open === c.id ? NMG.redBorder : "#e0e0e0"}`,
marginBottom: 4,
borderLeft: `4px solid ${scores[c.id] ? NMG.red : "#e0e0e0"}`,
}}>
<div
onClick={() => setOpen(open === c.id ? null : c.id)}
style={{ padding: "15px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open === c.id ? NMG.redBg : NMG.white }}
>
<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
<span style={{ fontSize: 11, fontWeight: 800, color: NMG.red, minWidth: 28 }}>{c.nr}</span>
<div>
<div style={{ fontWeight: 600, fontSize: 14, color: NMG.black }}>{c.title}</div>
{scores[c.id] && <div style={{ fontSize: 11, color: NMG.gray500, marginTop: 2 }}>Score: {scores[c.id]}/5</div>}
</div>
</div>
<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
{scores[c.id] && (
<span style={{
width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
background: scores[c.id] >= 4 ? "#dcfce7" : scores[c.id] <= 2 ? "#fee2e2" : "#fef3c7",
color: scores[c.id] >= 4 ? "#166534" : scores[c.id] <= 2 ? "#991b1b" : "#854d0e",
fontWeight: 800, fontSize: 13,
}}>{scores[c.id]}</span>
)}
<span style={{ color: NMG.gray300, fontSize: 16 }}>{open === c.id ? "▲" : "▾"}</span>
</div>
</div>
 
{open === c.id && (
<div style={{ padding: "18px 18px 18px 50px", borderTop: `1px solid ${NMG.redBorder}` }}>
<div style={{ background: NMG.gray100, padding: "12px 14px", marginBottom: 16, borderLeft: `3px solid ${NMG.red}` }}>
<div style={{ fontSize: 11, fontWeight: 700, color: NMG.red, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Definitie</div>
<p style={{ margin: 0, fontSize: 13, color: NMG.gray700, lineHeight: 1.7 }}>{c.definition}</p>
</div>
 
<div style={{ marginBottom: 16 }}>
<div style={{ fontSize: 11, fontWeight: 700, color: NMG.black, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Scorebeschrijvingen</div>
{[1, 2, 3, 4, 5].map((n) => (
<div key={n} style={{ display: "flex", gap: 10, marginBottom: 6, alignItems: "flex-start" }}>
<span style={{
width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
fontWeight: 800, fontSize: 12,
background: n >= 4 ? "#dcfce7" : n <= 2 ? "#fee2e2" : "#fef3c7",
color: n >= 4 ? "#166534" : n <= 2 ? "#991b1b" : "#854d0e",
}}>{n}</span>
<span style={{ fontSize: 13, color: NMG.gray700, lineHeight: 1.5 }}>{c.scores[n]}</span>
</div>
))}
</div>
 
<div style={{ marginBottom: c.voorbeelden.length > 0 ? 16 : 0 }}>
<div style={{ fontSize: 11, fontWeight: 700, color: NMG.black, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Selecteer een score</div>
<ScoreSelector value={scores[c.id] || 0} onChange={(v) => setScores({ ...scores, [c.id]: v })} />
</div>
 
{c.voorbeelden.length > 0 && (
<div style={{ background: "#f0f9ff", padding: "10px 14px", borderLeft: `3px solid #0ea5e9` }}>
<div style={{ fontSize: 11, fontWeight: 700, color: "#0369a1", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Referentiescores</div>
<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
{c.voorbeelden.map((v) => (
<span key={v.naam} style={{ fontSize: 12, background: NMG.white, border: "1px solid #bae6fd", padding: "3px 10px", color: NMG.black }}>
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
<button
onClick={() => { if (naam.trim() && filled === 6) setSubmitted(true); }}
disabled={!naam.trim() || filled < 6}
style={{
padding: "14px 32px",
background: (!naam.trim() || filled < 6) ? NMG.gray300 : NMG.red,
color: NMG.white, border: "none", fontWeight: 800, fontSize: 15,
cursor: (!naam.trim() || filled < 6) ? "not-allowed" : "pointer", borderRadius: 0,
letterSpacing: 0.5,
}}
>
{filled < 6 ? `Nog ${6 - filled} ${6 - filled === 1 ? "criterium" : "criteria"} invullen` : "Bekijk beoordeling →"}
</button>
</div>
</div>
);
}
 
// ─── VERGELIJK ────────────────────────────────────────────────────────────────
function VergelijkPage() {
const [selected, setSelected] = useState(null);
const sorted = [...BESTAANDE_PLATFORMEN].sort((a, b) => getTotaal(b.scores) - getTotaal(a.scores));
 
return (
<div>
<PageHeader title="Vergelijk bestaande platformen" sub="Overzicht van de MCA-scores voor geanalyseerde platformen" breadcrumb="Vergelijking" />
 
<div style={{ border: "1px solid #e0e0e0", overflow: "hidden", marginBottom: 20 }}>
<table style={{ width: "100%", borderCollapse: "collapse" }}>
<thead>
<tr style={{ background: NMG.red }}>
<th style={{ padding: "13px 18px", textAlign: "left", fontSize: 12, fontWeight: 700, color: NMG.white, letterSpacing: 0.5 }}>Platform</th>
{CRITERIA.map((c) => <th key={c.id} style={{ padding: "13px 10px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", textAlign: "center", textTransform: "uppercase", letterSpacing: 0.5 }}>{c.short}</th>)}
<th style={{ padding: "13px 18px", fontSize: 12, fontWeight: 700, color: NMG.white, textAlign: "center", letterSpacing: 0.5 }}>Totaal</th>
<th style={{ padding: "13px 18px", fontSize: 12, fontWeight: 700, color: NMG.white, textAlign: "center", letterSpacing: 0.5 }}>Advies</th>
</tr>
</thead>
<tbody>
{sorted.map((p, i) => {
const t = getTotaal(p.scores);
const adv = getAdvies(t);
const isSel = selected?.naam === p.naam;
return (
<tr key={p.naam} onClick={() => setSelected(isSel ? null : p)}
style={{ background: isSel ? NMG.redBg : i % 2 === 0 ? NMG.white : NMG.gray100, cursor: "pointer", transition: "background 0.1s", borderBottom: "1px solid #ececec" }}
>
<td style={{ padding: "13px 18px", fontWeight: 700, fontSize: 14, color: NMG.black, borderLeft: isSel ? `3px solid ${NMG.red}` : "3px solid transparent" }}>{p.naam}</td>
{CRITERIA.map((c) => {
const s = p.scores[c.id];
return (
<td key={c.id} style={{ padding: "13px 10px", textAlign: "center" }}>
<span style={{
display: "inline-flex", width: 26, height: 26, alignItems: "center", justifyContent: "center",
fontWeight: 800, fontSize: 13,
background: s >= 4 ? "#dcfce7" : s <= 2 ? "#fee2e2" : "#fef3c7",
color: s >= 4 ? "#166534" : s <= 2 ? "#991b1b" : "#854d0e",
}}>{s}</span>
</td>
);
})}
<td style={{ padding: "13px 18px", textAlign: "center", fontWeight: 900, fontSize: 20, color: adv.dot }}>{t}</td>
<td style={{ padding: "13px 14px", textAlign: "center" }}>
<span style={{
fontSize: 11, fontWeight: 700, padding: "4px 10px", background: adv.bg,
color: adv.color, border: `1px solid ${adv.border}`, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap",
}}>{adv.label}</span>
</td>
</tr>
);
})}
</tbody>
</table>
</div>
 
{selected ? (
<div style={{ border: `1px solid ${NMG.redBorder}`, borderLeft: `4px solid ${NMG.red}` }}>
<div style={{ background: NMG.redBg, padding: "14px 18px", borderBottom: `1px solid ${NMG.redBorder}` }}>
<h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: NMG.black }}>Detail: {selected.naam}</h2>
</div>
<div style={{ padding: "20px 18px" }}>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
<div>
{CRITERIA.map((c) => (
<div key={c.id} style={{ marginBottom: 14 }}>
<div style={{ display: "flex", gap: 8, marginBottom: 5, alignItems: "center" }}>
<span style={{ fontSize: 11, fontWeight: 800, color: NMG.red, minWidth: 24 }}>{c.nr}</span>
<span style={{ fontSize: 13, color: NMG.black, fontWeight: 500 }}>{c.title}</span>
</div>
<ScoreBar score={selected.scores[c.id]} />
</div>
))}
</div>
<div>
<RadarChart scores={selected.scores} size={200} />
<div style={{ marginTop: 12 }}>
<AdviesCard totaal={getTotaal(selected.scores)} />
</div>
</div>
</div>
<div style={{ marginTop: 18, background: NMG.gray100, padding: "14px 16px", borderLeft: `3px solid ${NMG.red}` }}>
<div style={{ fontSize: 11, fontWeight: 700, color: NMG.red, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Beleidsadvies</div>
<p style={{ margin: 0, fontSize: 13, color: NMG.gray700, lineHeight: 1.85 }}>{beleidsadvies(selected.naam, selected.scores, getTotaal(selected.scores))}</p>
</div>
</div>
</div>
) : (
<div style={{ textAlign: "center", padding: "20px", fontSize: 13, color: NMG.gray500, border: "1px dashed #d0d0d0" }}>
Klik op een platform voor gedetailleerde scoreverdeling
</div>
)}
</div>
);
}
 
// ─── OVER ─────────────────────────────────────────────────────────────────────
function OverPage() {
return (
<div style={{ maxWidth: 760 }}>
<PageHeader title="Over het afwegingskader" sub="Achtergrond, methodologie en verantwoording" breadcrumb="Over het kader" />
{[
{ title: "Waarom een afwegingskader?", isRed: true, body: `Sociale media spelen een centrale rol in de informatievoorziening, participatie, dienstverlening en crisiscommunicatie van gemeenten. Kanaalkeuzes kunnen echter niet meer uitsluitend gebaseerd worden op bereik.\n\nPrivacy, desinformatie, algoritmische sturing, digitale soevereiniteit en platformafhankelijkheid spelen een steeds grotere rol. Gemeenten moeten een zorgvuldige balans vinden tussen communicatie-effectiviteit en publieke waarden.` },
{ title: "Ontwikkeling van het kader", body: `Het afwegingskader is ontwikkeld op basis van een brede analyse:\n\n• Analyse van gemeentelijke communicatiestrategieën\n• Onderzoek naar mediagebruik van inwoners\n• Benchmarkonderzoek bij vergelijkbare gemeenten\n• Interviews met communicatieprofessionals\n• Toetsing aan wet- en regelgeving (AVG, Archiefwet, WCAG)\n• Trends binnen het socialmedialandschap\n• Maatschappelijke en ethische vraagstukken\n\nDe onderzoeksresultaten zijn verwerkt in een SWOT-analyse en confrontatiematrix, die hebben geleid tot de zes beoordelingscriteria.` },
{ title: "Methodologische onderbouwing (MCA)", isRed: true, body: `Dit afwegingskader is gebaseerd op de principes van een Multi Criteria Analyse (MCA).\n\nEen MCA wordt gebruikt wanneer een beslissing afhankelijk is van meerdere factoren die niet rechtstreeks met elkaar te vergelijken zijn. Binnen de beoordeling van sociale mediaplatformen spelen bereik, publieke waarden, juridische aspecten, digitale soevereiniteit en uitvoerbaarheid een rol.\n\nOm deze factoren op een consistente manier te beoordelen zijn zes beoordelingscriteria ontwikkeld. Alle criteria worden gelijk gewogen.\n\nWaarom gelijke weging? Uit het onderzoek bleek geen aanleiding om één criterium structureel belangrijker te achten dan de andere. Een gelijke weging sluit aan bij het principe dat publieke waarden, juridische kaders én communicatiedoelen als gelijkwaardig worden beschouwd.` },
{ title: "Toepassing en actualisering", body: `Het afwegingskader is bedoeld als levend instrument. Het socialmedialandschap verandert voortdurend: nieuwe platformen ontstaan, bestaande platformen wijzigen hun beleid en wet- en regelgeving evolueert.\n\nHet wordt aanbevolen om het kader jaarlijks te herzien en de scores voor bestaande platformen te actualiseren op basis van nieuwe inzichten.` },
].map((s) => (
<Collapsible key={s.title} title={s.title} defaultOpen={true} isRed={s.isRed}>
<p style={{ margin: 0, fontSize: 14, lineHeight: 1.9, color: NMG.gray700, whiteSpace: "pre-line" }}>{s.body}</p>
</Collapsible>
))}
</div>
);
}
 
// ─── KENNISBANK ───────────────────────────────────────────────────────────────
function KennisbankPage() {
return (
<div style={{ maxWidth: 760 }}>
<PageHeader title="Kennisbank" sub="Uitgebreide toelichting per beoordelingscriterium" breadcrumb="Kennisbank" />
{CRITERIA.map((c) => (
<div key={c.id} style={{ marginBottom: 4 }}>
<Collapsible title={`${c.nr} — ${c.title}`} isRed>
<div style={{ display: "grid", gap: 16 }}>
{[
{ label: "Definitie", body: c.definition },
{ label: "Waarom belangrijk", body: c.waarom },
].map((s) => (
<div key={s.label}>
<div style={{ fontSize: 11, fontWeight: 700, color: NMG.red, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
<p style={{ margin: 0, fontSize: 13, color: NMG.gray700, lineHeight: 1.8 }}>{s.body}</p>
</div>
))}
<div>
<div style={{ fontSize: 11, fontWeight: 700, color: NMG.red, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Scorebeschrijvingen</div>
{[1, 2, 3, 4, 5].map((n) => (
<div key={n} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
<span style={{
width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
fontWeight: 800, fontSize: 12,
background: n >= 4 ? "#dcfce7" : n <= 2 ? "#fee2e2" : "#fef3c7",
color: n >= 4 ? "#166534" : n <= 2 ? "#991b1b" : "#854d0e",
}}>{n}</span>
<span style={{ fontSize: 13, color: NMG.gray700, lineHeight: 1.6 }}>{c.scores[n]}</span>
</div>
))}
</div>
{c.voorbeelden.length > 0 && (
<div>
<div style={{ fontSize: 11, fontWeight: 700, color: NMG.red, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Referentiescores</div>
<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
{c.voorbeelden.map((v) => (
<div key={v.naam} style={{ border: "1px solid #e0e0e0", padding: "10px 16px", textAlign: "center", minWidth: 90 }}>
<div style={{ fontSize: 12, color: NMG.gray500 }}>{v.naam}</div>
<div style={{ fontSize: 22, fontWeight: 900, color: v.score >= 4 ? "#22c55e" : v.score <= 2 ? NMG.red : "#f97316", marginTop: 4 }}>{v.score}</div>
</div>
))}
</div>
</div>
)}
{c.aandachtspunten.length > 0 && (
<div style={{ background: "#fffbeb", borderLeft: `3px solid #f59e0b`, padding: "12px 16px" }}>
<div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Aandachtspunten</div>
{c.aandachtspunten.map((a, i) => (
<p key={i} style={{ margin: "0 0 6px", fontSize: 13, color: NMG.gray700, lineHeight: 1.7 }}>— {a}</p>
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
<div style={{ maxWidth: 760 }}>
<div style={{ background: NMG.red, padding: "32px 36px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
<div style={{ position: "absolute", right: 24, bottom: -10, opacity: 0.07 }}>
<NijmegenEagle size={120} color={NMG.white} />
</div>
<div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>Gemeente Nijmegen — Afdeling Communicatie</div>
<h1 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 900, color: NMG.white, letterSpacing: "-0.5px" }}>Verkort adviesrapport</h1>
<div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>Social Media Afwegingskader — {new Date().getFullYear()}</div>
</div>
 
{[
{ nr: "01", title: "Aanleiding", body: `Gemeente Nijmegen maakt gebruik van diverse sociale mediaplatformen voor haar publieke communicatie. De snelle veranderingen in het socialmedialandschap, gecombineerd met toenemende juridische, ethische en strategische vraagstukken, maken het noodzakelijk om platformkeuzes onderbouwd en systematisch te maken.\n\nDit adviesrapport presenteert een afwegingskader waarmee communicatieprofessionals nieuwe en bestaande platformen kunnen beoordelen op basis van meerdere criteria.` },
{ nr: "02", title: "Onderzoeksmethode", body: `Het kader is ontwikkeld via een meervoudige onderzoeksaanpak:\n\n— Deskresearch naar gemeentelijke communicatiestrategieën en landelijke benchmarks\n— Analyse van mediagebruik en bereikgegevens van inwoners van Nijmegen\n— Interviews met communicatieprofessionals binnen en buiten de gemeente\n— Juridische toetsing aan AVG, Archiefwet en toegankelijkheidsnormen\n— Trendanalyse van het socialmedialandschap\n\nDe resultaten zijn samengevoegd in een SWOT-analyse en confrontatiematrix, op basis waarvan zes beoordelingscriteria zijn vastgesteld.` },
{ nr: "03", title: "Belangrijkste inzichten", body: `Uit het onderzoek komen vier centrale bevindingen naar voren:\n\n1. Toenemende platformafhankelijkheid — Gemeenten zijn sterk afhankelijk geworden van een beperkt aantal commerciële platforms, wat risico's met zich meebrengt bij beleidswijzigingen.\n\n2. Publieke waarden als expliciete factor — Bereik alleen is geen voldoende grond voor platformkeuze. Privacy, inclusiviteit en transparantie dienen expliciet te worden meegewogen.\n\n3. Voortdurende verandering — Het socialmedialandschap verandert snel. Nieuwe platforms vragen om snelle beoordeling; bestaande platforms vereisen periodieke hertoetsing.\n\n4. Jongeren vragen om een andere benadering — Doelgroepen onder de 25 zijn nauwelijks te bereiken via traditionele kanalen. Platforms als Snapchat en TikTok bieden kansen voor jongerencommunicatie.` },
{ nr: "04", title: "Waarom een afwegingskader?", body: `Een structureel afwegingskader biedt de gemeente:\n\n— Consistentie: alle platforms worden op dezelfde criteria beoordeeld\n— Transparantie: beslissingen zijn onderbouwd en uitlegbaar aan bestuur en raad\n— Toekomstbestendigheid: toepasbaar op nog onbekende platforms\n— Verantwoording: communicatieprofessionals kunnen aantonen dat een keuze is getoetst aan publieke waarden en wettelijke kaders` },
{ nr: "05", title: "De zes beoordelingscriteria", body: CRITERIA.map((c) => `${c.nr}. ${c.title}\n ${c.definition}`).join("\n\n") },
{ nr: "06", title: "Aanbevelingen", body: `Op basis van de uitgevoerde MCA worden de volgende aanbevelingen gedaan:\n\n1. WhatsApp Kanaal implementeren (score: 24/30 — Actief inzetten)\n Het WhatsApp Kanaal biedt hoog bereik onder moeilijk bereikbare doelgroepen en vraagt beperkte capaciteit.\n\n2. Snapchat Ads inzetten voor jongerencommunicatie (score: 21/30 — Voorwaardelijk inzetten)\n Voor campagnes gericht op jongeren (16–25 jaar) biedt Snapchat een uniek bereik.\n\n3. Het afwegingskader structureel toepassen\n Het kader dient te worden opgenomen in het communicatiebeleid als verplicht instrument bij toekomstige platformkeuzes. Jaarlijkse herziening wordt aanbevolen.\n\n4. Onderzoek naar digitale alternatieven\n Voor communicatie waarbij digitale soevereiniteit cruciaal is, dienen open source-alternatieven te worden onderzocht.` },
].map((s) => (
<div key={s.nr} style={{ marginBottom: 4 }}>
<Collapsible title={`${s.nr} — ${s.title}`} defaultOpen={true} isRed>
<p style={{ margin: 0, fontSize: 13, lineHeight: 1.95, color: NMG.gray700, whiteSpace: "pre-line" }}>{s.body}</p>
</Collapsible>
</div>
))}
 
<div style={{ background: NMG.gray100, padding: "16px 20px", marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<div style={{ fontSize: 12, color: NMG.gray500 }}>Gemeente Nijmegen — Social Media Afwegingskader v1.0 — {new Date().toLocaleDateString("nl-NL")}</div>
<div style={{ opacity: 0.3 }}><NijmegenEagle size={28} color={NMG.red} /></div>
</div>
</div>
);
}
 
// ─── OPGESLAGEN ───────────────────────────────────────────────────────────────
function OpslaanPage({ saved }) {
if (saved.length === 0) return (
<div style={{ textAlign: "center", padding: "60px 20px", border: "1px dashed #d0d0d0" }}>
<NijmegenEagle size={48} color={NMG.redBorder} />
<h2 style={{ color: NMG.black, marginBottom: 8, marginTop: 16 }}>Geen opgeslagen beoordelingen</h2>
<p style={{ color: NMG.gray500, margin: 0 }}>Start een nieuwe beoordeling en sla deze op om hem hier te bekijken.</p>
</div>
);
 
return (
<div>
<PageHeader title="Opgeslagen beoordelingen" sub={`${saved.length} beoordeling${saved.length !== 1 ? "en" : ""} opgeslagen`} breadcrumb="Opgeslagen" />
{saved.map((b, i) => {
const adv = getAdvies(b.totaal);
return (
<div key={i} style={{ border: "1px solid #e0e0e0", padding: "16px 20px", marginBottom: 4, borderLeft: `4px solid ${adv.dot}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<div>
<div style={{ fontWeight: 700, fontSize: 15, color: NMG.black }}>{b.naam}</div>
<div style={{ fontSize: 12, color: NMG.gray500, marginTop: 4 }}>Beoordeeld op {b.datum}</div>
</div>
<div style={{ textAlign: "right" }}>
<div style={{ fontSize: 28, fontWeight: 900, color: adv.dot }}>{b.totaal}</div>
<div style={{ fontSize: 11, color: adv.color, textTransform: "uppercase", letterSpacing: 0.5 }}>{adv.label}</div>
</div>
</div>
);
})}
</div>
);
}
 
// ─── Navigation ───────────────────────────────────────────────────────────────
const NAV = [
{ id: "home", label: "Home", sub: null },
{ id: "beoordelen", label: "Nieuw platform beoordelen", sub: "MCA-instrument" },
{ id: "vergelijk", label: "Vergelijk platformen", sub: "Overzicht" },
{ id: "over", label: "Over het afwegingskader", sub: "Methodologie" },
{ id: "kennisbank", label: "Kennisbank", sub: "Criteria uitgelegd" },
{ id: "rapport", label: "Verkort adviesrapport", sub: "Aanbevelingen" },
{ id: "opgeslagen", label: "Opgeslagen beoordelingen", sub: "Archief" },
];
 
// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
const [page, setPage] = useState("home");
const [saved, setSaved] = useState([]);
 
const renderPage = () => {
switch (page) {
case "home": return <HomePage setPage={setPage} />;
case "beoordelen": return <BeoordelenPage saved={saved} setSaved={setSaved} />;
case "vergelijk": return <VergelijkPage />;
case "over": return <OverPage />;
case "kennisbank": return <KennisbankPage />;
case "rapport": return <RapportPage />;
case "opgeslagen": return <OpslaanPage saved={saved} />;
default: return <HomePage setPage={setPage} />;
}
};
 
return (
<div style={{ display: "flex", minHeight: "100vh", background: "#f4f4f4", fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}>
{/* Sidebar */}
<div style={{ width: 268, background: NMG.black, flexShrink: 0, display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflow: "auto" }}>
{/* Logo area */}
<div style={{ background: NMG.red, padding: "22px 20px 20px" }}>
<div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
<NijmegenEagle size={36} color={NMG.white} />
<div>
<div style={{ color: NMG.white, fontWeight: 900, fontSize: 18, letterSpacing: "-0.5px", lineHeight: 1 }}>Nijmegen</div>
<div style={{ color: "rgba(255,255,255,0.65)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Gemeente</div>
</div>
</div>
<div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 10, marginTop: 4 }}>
<div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.4, letterSpacing: 0.3 }}>
Social Media Afwegingskader
</div>
</div>
</div>
 
{/* Nav */}
<nav style={{ flex: 1, padding: "12px 0" }}>
{NAV.map((item) => {
const active = page === item.id;
return (
<button
key={item.id}
onClick={() => setPage(item.id)}
style={{
width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
padding: "13px 20px",
background: active ? NMG.red : "transparent",
borderLeft: active ? `3px solid rgba(255,255,255,0.4)` : "3px solid transparent",
border: "none", borderRight: "none",
color: active ? NMG.white : "rgba(255,255,255,0.55)",
fontWeight: active ? 700 : 400, fontSize: 13, textAlign: "left",
cursor: "pointer", transition: "all 0.12s",
borderBottom: "1px solid rgba(255,255,255,0.05)",
}}
onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = NMG.white; } }}
onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; } }}
>
<span>{item.label}</span>
{item.id === "opgeslagen" && saved.length > 0 && (
<span style={{ background: NMG.red, color: NMG.white, borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{saved.length}</span>
)}
</button>
);
})}
</nav>
 
{/* Footer */}
<div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
<div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
Versie 1.0 — {new Date().getFullYear()}<br />
Afdeling Communicatie
</div>
</div>
</div>
 
{/* Main */}
<div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
{/* Top bar */}
<div style={{ background: NMG.white, borderBottom: "1px solid #e0e0e0", padding: "0 32px", height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
<span style={{ fontSize: 11, color: NMG.gray500, textTransform: "uppercase", letterSpacing: 0.5 }}>Communicatie</span>
<span style={{ color: NMG.gray300, fontSize: 14 }}>›</span>
<span style={{ fontSize: 12, color: NMG.red, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
{NAV.find((n) => n.id === page)?.label}
</span>
</div>
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
<div style={{ width: 1, height: 20, background: "#e0e0e0" }} />
<NijmegenEagle size={20} color={NMG.red} />
</div>
</div>
 
{/* Content */}
<div style={{ flex: 1, padding: "28px 32px", maxWidth: 980, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
{renderPage()}
</div>
</div>
</div>
);
}

