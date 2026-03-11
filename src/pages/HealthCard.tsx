import React, { useState, KeyboardEvent } from "react";
import { ChevronRight, X, Plus, AlertTriangle, Syringe, User2, Dumbbell, Stethoscope } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import AppLayout from "@/components/AppLayout";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
interface MedRow { name: string; dose: string; freq: string; }
interface SurgeryRow { desc: string; year: string; }
interface VaccRow { name: string; date: string; }

interface CardState {
  // Stage 1
  sex: "male" | "female" | "";
  birthDate: string;
  height: string;
  weight: string;
  bloodType: string;
  rh: "+" | "-" | "";
  drugAllergies: string[];
  foodAllergies: string[];
  seasonalAllergies: string[];
  // Stage 2
  chronicDiseases: string[];
  medications: MedRow[];
  surgeries: SurgeryRow[];
  familyCardio: boolean;
  familyOncology: boolean;
  familyDiabetes: boolean;
  familyHypertension: boolean;
  // Stage 3
  smoking: "no" | "yes" | "";
  packYears: string;
  alcohol: "none" | "rare" | "regular" | "";
  activity: "sedentary" | "moderate" | "active" | "";
  work: string;
  // Stage 4
  pregnant: boolean;
  pregnancyWeeks: string;
  lactation: boolean;
  lastPeriod: string;
  vaccinations: VaccRow[];
  heartRateRest: string;
  bpSystolic: string;
  bpDiastolic: string;
  spo2: string;
}

const INITIAL: CardState = {
  sex: "", birthDate: "", height: "", weight: "", bloodType: "", rh: "",
  drugAllergies: [], foodAllergies: [], seasonalAllergies: [],
  chronicDiseases: [], medications: [], surgeries: [],
  familyCardio: false, familyOncology: false, familyDiabetes: false, familyHypertension: false,
  smoking: "", packYears: "", alcohol: "", activity: "", work: "",
  pregnant: false, pregnancyWeeks: "", lactation: false, lastPeriod: "",
  vaccinations: [], heartRateRest: "", bpSystolic: "", bpDiastolic: "", spo2: "",
};

const CHRONIC_SUGGESTIONS = [
  "Диабет 2 типа", "Диабет 1 типа", "Гипертония", "Астма", "ИБС",
  "Гипотиреоз", "Гипертиреоз", "ХОБЛ", "Атеросклероз", "Остеоартроз",
  "Ревматоидный артрит", "Эпилепсия", "Мигрень", "Псориаз", "Глаукома",
];

const BLOOD_TYPES = ["I+", "I−", "II+", "II−", "III+", "III−", "IV+", "IV−"];

// ──────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────
function StageCard({
  title, badge, icon, open, onToggle, children,
}: {
  title: string; badge?: string; icon: React.ReactNode;
  open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-2xl card-shadow overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-6 py-4 hover:bg-accent/50 transition-colors"
      >
        <span className="text-primary">{icon}</span>
        <span className="flex-1 text-sm font-semibold text-foreground text-left">{title}</span>
        {badge && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground mr-1">
            {badge}
          </span>
        )}
        <ChevronRight
          size={16}
          className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && <div className="px-6 pb-6 space-y-5 border-t border-border pt-5">{children}</div>}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">{children}</p>;
}

function TextInput({
  value, onChange, placeholder, type = "text", className = "",
}: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string; }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    />
  );
}

function PillToggle<T extends string>({
  options, value, onChange,
}: { options: { value: T; label: string }[]; value: T | ""; onChange: (v: T) => void; }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
            value === opt.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-border text-foreground hover:bg-accent"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ChipInput({
  chips, onAdd, onRemove, placeholder,
}: { chips: string[]; onAdd: (v: string) => void; onRemove: (i: number) => void; placeholder?: string; }) {
  const [input, setInput] = useState("");
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      onAdd(input.trim());
      setInput("");
    }
  };
  return (
    <div className="space-y-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip, i) => (
            <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {chip}
              <button onClick={() => onRemove(i)} className="hover:text-destructive transition-colors">
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function AutocompleteInput({
  chips, onAdd, onRemove, placeholder, suggestions,
}: { chips: string[]; onAdd: (v: string) => void; onRemove: (i: number) => void; placeholder?: string; suggestions: string[]; }) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = suggestions.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !chips.includes(s)
  );

  const add = (v: string) => { onAdd(v); setInput(""); setOpen(false); };
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) { e.preventDefault(); add(input.trim()); }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {open && filtered.length > 0 && (
          <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg max-h-48 overflow-y-auto">
            {filtered.map((s) => (
              <button
                key={s}
                onMouseDown={() => add(s)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip, i) => (
            <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {chip}
              <button onClick={() => onRemove(i)} className="hover:text-destructive transition-colors">
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// Main page
// ──────────────────────────────────────────────
const HealthCard = () => {
  const { t } = useLanguage();
  const [card, setCard] = useState<CardState>(INITIAL);
  const [open, setOpen] = useState<Record<number, boolean>>({ 1: true, 2: false, 3: false, 4: false });

  const toggle = (stage: number) => setOpen((prev) => ({ ...prev, [stage]: !prev[stage] }));
  const set = <K extends keyof CardState>(key: K, value: CardState[K]) =>
    setCard((prev) => ({ ...prev, [key]: value }));

  // ── BMI ──
  const bmi = card.height && card.weight
    ? (parseFloat(card.weight) / Math.pow(parseFloat(card.height) / 100, 2)).toFixed(1)
    : null;
  const bmiLabel = bmi
    ? parseFloat(bmi) < 18.5 ? "Дефицит веса"
    : parseFloat(bmi) < 25 ? "Норма"
    : parseFloat(bmi) < 30 ? "Избыточный вес"
    : "Ожирение"
    : null;

  // ── Completeness ──
  const stage1Filled = !!(card.sex || card.birthDate || card.height || card.weight || card.bloodType);
  const stage2Filled = !!(card.chronicDiseases.length || card.medications.length || card.familyCardio || card.familyOncology);
  const stage3Filled = !!(card.smoking || card.alcohol || card.activity || card.work);
  const stage4Filled = !!(card.vaccinations.length || card.heartRateRest || card.spo2);
  const filled = [stage1Filled, stage2Filled, stage3Filled, stage4Filled].filter(Boolean).length;
  const completeness = Math.round((filled / 4) * 100);

  // ── Allergy helpers ──
  const addChip = (field: "drugAllergies" | "foodAllergies" | "seasonalAllergies") => (v: string) =>
    set(field, [...card[field], v]);
  const removeChip = (field: "drugAllergies" | "foodAllergies" | "seasonalAllergies") => (i: number) =>
    set(field, card[field].filter((_, idx) => idx !== i));

  // ── Medication rows ──
  const addMed = () => set("medications", [...card.medications, { name: "", dose: "", freq: "" }]);
  const updateMed = (i: number, k: keyof MedRow, v: string) =>
    set("medications", card.medications.map((m, idx) => idx === i ? { ...m, [k]: v } : m));
  const removeMed = (i: number) => set("medications", card.medications.filter((_, idx) => idx !== i));

  // ── Surgery rows ──
  const addSurgery = () => set("surgeries", [...card.surgeries, { desc: "", year: "" }]);
  const updateSurgery = (i: number, k: keyof SurgeryRow, v: string) =>
    set("surgeries", card.surgeries.map((s, idx) => idx === i ? { ...s, [k]: v } : s));
  const removeSurgery = (i: number) => set("surgeries", card.surgeries.filter((_, idx) => idx !== i));

  // ── Vaccination rows ──
  const addVacc = () => set("vaccinations", [...card.vaccinations, { name: "", date: "" }]);
  const updateVacc = (i: number, k: keyof VaccRow, v: string) =>
    set("vaccinations", card.vaccinations.map((v2, idx) => idx === i ? { ...v2, [k]: v } : v2));
  const removeVacc = (i: number) => set("vaccinations", card.vaccinations.filter((_, idx) => idx !== i));

  return (
    <AppLayout>
      <div className="space-y-6 pb-24">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
            {t("healthCard.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{t("healthCard.subtitle")}</p>
        </div>

        {/* Progress bar */}
        <div className="bg-card rounded-2xl p-5 card-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">{t("healthCard.completeness")}</span>
            <span className="text-sm font-bold text-primary">{completeness}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {[stage1Filled, stage2Filled, stage3Filled, stage4Filled].map((filled, i) => (
              <span
                key={i}
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  filled ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>

        {/* ── Stage 1 ── */}
        <StageCard
          title={t("healthCard.stage1")}
          icon={<User2 size={18} strokeWidth={1.5} />}
          open={open[1]}
          onToggle={() => toggle(1)}
        >
          {/* Sex */}
          <div>
            <FieldLabel>{t("healthCard.sex")}</FieldLabel>
            <PillToggle
              options={[
                { value: "male" as const, label: t("healthCard.male") },
                { value: "female" as const, label: t("healthCard.female") },
              ]}
              value={card.sex}
              onChange={(v) => set("sex", v)}
            />
          </div>

          {/* Birth date */}
          <div>
            <FieldLabel>{t("healthCard.birthDate")}</FieldLabel>
            <TextInput type="date" value={card.birthDate} onChange={(v) => set("birthDate", v)} />
          </div>

          {/* Height + Weight + BMI */}
          <div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>{t("healthCard.height")}</FieldLabel>
                <TextInput type="number" value={card.height} onChange={(v) => set("height", v)} placeholder="170" />
              </div>
              <div>
                <FieldLabel>{t("healthCard.weight")}</FieldLabel>
                <TextInput type="number" value={card.weight} onChange={(v) => set("weight", v)} placeholder="70" />
              </div>
            </div>
            {bmi && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{t("healthCard.bmi")}:</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  parseFloat(bmi) < 18.5 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : parseFloat(bmi) < 25 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : parseFloat(bmi) < 30 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}>
                  {bmi} — {bmiLabel}
                </span>
              </div>
            )}
          </div>

          {/* Blood type + Rh */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>{t("healthCard.bloodType")}</FieldLabel>
              <select
                value={card.bloodType}
                onChange={(e) => set("bloodType", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">—</option>
                {BLOOD_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
              </select>
            </div>
            <div>
              <FieldLabel>{t("healthCard.rhFactor")}</FieldLabel>
              <PillToggle
                options={[{ value: "+" as const, label: "+" }, { value: "-" as const, label: "−" }]}
                value={card.rh}
                onChange={(v) => set("rh", v)}
              />
            </div>
          </div>

          {/* Allergies */}
          <div>
            <FieldLabel>{t("healthCard.allergies")}</FieldLabel>
            <div className="space-y-3">
              {(["drugAllergies", "foodAllergies", "seasonalAllergies"] as const).map((field) => (
                <div key={field} className="bg-accent/40 rounded-xl p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-2">{t(`healthCard.${field}`)}</p>
                  <ChipInput
                    chips={card[field]}
                    onAdd={addChip(field)}
                    onRemove={removeChip(field)}
                    placeholder={t("healthCard.allergyPlaceholder")}
                  />
                </div>
              ))}
            </div>
          </div>
        </StageCard>

        {/* ── Stage 2 ── */}
        <StageCard
          title={t("healthCard.stage2")}
          icon={<Stethoscope size={18} strokeWidth={1.5} />}
          open={open[2]}
          onToggle={() => toggle(2)}
        >
          {/* Chronic diseases */}
          <div>
            <FieldLabel>{t("healthCard.chronicDiseases")}</FieldLabel>
            <AutocompleteInput
              chips={card.chronicDiseases}
              onAdd={(v) => set("chronicDiseases", [...card.chronicDiseases, v])}
              onRemove={(i) => set("chronicDiseases", card.chronicDiseases.filter((_, idx) => idx !== i))}
              placeholder={t("healthCard.chronicPlaceholder")}
              suggestions={CHRONIC_SUGGESTIONS}
            />
          </div>

          {/* Medications */}
          <div>
            <FieldLabel>{t("healthCard.medications")}</FieldLabel>
            <div className="space-y-2">
              {card.medications.map((med, i) => (
                <div key={i} className="bg-accent/40 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">Препарат {i + 1}</span>
                    <button onClick={() => removeMed(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text" value={med.name} onChange={(e) => updateMed(i, "name", e.target.value)}
                      placeholder={t("healthCard.medName")}
                      className="col-span-3 px-2.5 py-1.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="text" value={med.dose} onChange={(e) => updateMed(i, "dose", e.target.value)}
                      placeholder={t("healthCard.medDose")}
                      className="px-2.5 py-1.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="text" value={med.freq} onChange={(e) => updateMed(i, "freq", e.target.value)}
                      placeholder={t("healthCard.medFreq")}
                      className="col-span-2 px-2.5 py-1.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              ))}
              <button onClick={addMed} className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium">
                <Plus size={14} /> {t("healthCard.addMed")}
              </button>
            </div>
          </div>

          {/* Surgeries */}
          <div>
            <FieldLabel>{t("healthCard.surgeries")}</FieldLabel>
            <div className="space-y-2">
              {card.surgeries.map((s, i) => (
                <div key={i} className="bg-accent/40 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">Запись {i + 1}</span>
                    <button onClick={() => removeSurgery(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <input
                      type="text" value={s.desc} onChange={(e) => updateSurgery(i, "desc", e.target.value)}
                      placeholder={t("healthCard.surgeryDesc")}
                      className="col-span-3 px-2.5 py-1.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="number" value={s.year} onChange={(e) => updateSurgery(i, "year", e.target.value)}
                      placeholder={t("healthCard.surgeryYear")}
                      className="px-2.5 py-1.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              ))}
              <button onClick={addSurgery} className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium">
                <Plus size={14} /> {t("healthCard.addSurgery")}
              </button>
            </div>
          </div>

          {/* Family history */}
          <div>
            <FieldLabel>{t("healthCard.familyHistory")}</FieldLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(["familyCardio", "familyOncology", "familyDiabetes", "familyHypertension"] as const).map((key) => (
                <label key={key} className="flex items-center gap-2.5 p-3 rounded-xl bg-accent/40 cursor-pointer hover:bg-accent/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={card[key]}
                    onChange={(e) => set(key, e.target.checked)}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm text-foreground">{t(`healthCard.${key}`)}</span>
                </label>
              ))}
            </div>
          </div>
        </StageCard>

        {/* ── Stage 3 ── */}
        <StageCard
          title={t("healthCard.stage3")}
          icon={<Dumbbell size={18} strokeWidth={1.5} />}
          open={open[3]}
          onToggle={() => toggle(3)}
        >
          {/* Smoking */}
          <div>
            <FieldLabel>{t("healthCard.smoking")}</FieldLabel>
            <PillToggle
              options={[
                { value: "no" as const, label: t("healthCard.smokingNo") },
                { value: "yes" as const, label: t("healthCard.smokingYes") },
              ]}
              value={card.smoking}
              onChange={(v) => set("smoking", v)}
            />
            {card.smoking === "yes" && (
              <div className="mt-2">
                <FieldLabel>{t("healthCard.packYears")}</FieldLabel>
                <TextInput type="number" value={card.packYears} onChange={(v) => set("packYears", v)} placeholder="10" className="max-w-[120px]" />
              </div>
            )}
          </div>

          {/* Alcohol */}
          <div>
            <FieldLabel>{t("healthCard.alcohol")}</FieldLabel>
            <PillToggle
              options={[
                { value: "none" as const, label: t("healthCard.alcoholNone") },
                { value: "rare" as const, label: t("healthCard.alcoholRare") },
                { value: "regular" as const, label: t("healthCard.alcoholRegular") },
              ]}
              value={card.alcohol}
              onChange={(v) => set("alcohol", v)}
            />
          </div>

          {/* Activity */}
          <div>
            <FieldLabel>{t("healthCard.activity")}</FieldLabel>
            <PillToggle
              options={[
                { value: "sedentary" as const, label: t("healthCard.activitySedentary") },
                { value: "moderate" as const, label: t("healthCard.activityModerate") },
                { value: "active" as const, label: t("healthCard.activityActive") },
              ]}
              value={card.activity}
              onChange={(v) => set("activity", v)}
            />
          </div>

          {/* Work conditions */}
          <div>
            <FieldLabel>{t("healthCard.workConditions")}</FieldLabel>
            <select
              value={card.work}
              onChange={(e) => set("work", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">—</option>
              {(["workOffice", "workPhysical", "workHazardous", "workComputer"] as const).map((k) => (
                <option key={k} value={k}>{t(`healthCard.${k}`)}</option>
              ))}
            </select>
          </div>
        </StageCard>

        {/* ── Stage 4 ── */}
        <StageCard
          title={t("healthCard.stage4")}
          badge={t("healthCard.optional")}
          icon={<Syringe size={18} strokeWidth={1.5} />}
          open={open[4]}
          onToggle={() => toggle(4)}
        >
          {/* Women-only block */}
          {card.sex === "female" && (
            <div className="space-y-3 bg-accent/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">{t("healthCard.womenSection")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-background cursor-pointer">
                  <input type="checkbox" checked={card.pregnant} onChange={(e) => set("pregnant", e.target.checked)} className="w-4 h-4 rounded accent-primary" />
                  <span className="text-sm text-foreground">{t("healthCard.pregnancy").split("(")[0].trim()}</span>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-background cursor-pointer">
                  <input type="checkbox" checked={card.lactation} onChange={(e) => set("lactation", e.target.checked)} className="w-4 h-4 rounded accent-primary" />
                  <span className="text-sm text-foreground">{t("healthCard.lactation")}</span>
                </label>
              </div>
              {card.pregnant && (
                <div>
                  <FieldLabel>{t("healthCard.pregnancy")}</FieldLabel>
                  <TextInput type="number" value={card.pregnancyWeeks} onChange={(v) => set("pregnancyWeeks", v)} placeholder="12" className="max-w-[100px]" />
                </div>
              )}
              <div>
                <FieldLabel>{t("healthCard.lastPeriod")}</FieldLabel>
                <TextInput type="date" value={card.lastPeriod} onChange={(v) => set("lastPeriod", v)} />
              </div>
            </div>
          )}
          {card.sex !== "female" && (
            <p className="text-xs text-muted-foreground italic">Раздел «Для женщин» доступен при выборе пола «Женский» в блоке 1.</p>
          )}

          {/* Vaccinations */}
          <div>
            <FieldLabel>{t("healthCard.vaccinations")}</FieldLabel>
            <div className="space-y-2">
              {card.vaccinations.map((v, i) => (
                <div key={i} className="bg-accent/40 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">Прививка {i + 1}</span>
                    <button onClick={() => removeVacc(i)} className="text-muted-foreground hover:text-destructive transition-colors"><X size={14} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text" value={v.name} onChange={(e) => updateVacc(i, "name", e.target.value)}
                      placeholder={t("healthCard.vaccName")}
                      className="px-2.5 py-1.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="date" value={v.date} onChange={(e) => updateVacc(i, "date", e.target.value)}
                      className="px-2.5 py-1.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              ))}
              <button onClick={addVacc} className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium">
                <Plus size={14} /> {t("healthCard.addVacc")}
              </button>
            </div>
          </div>

          {/* Wearable data */}
          <div>
            <FieldLabel>{t("healthCard.wearableData")}</FieldLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t("healthCard.heartRate")}</p>
                <TextInput type="number" value={card.heartRateRest} onChange={(v) => set("heartRateRest", v)} placeholder="65" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t("healthCard.bloodPressure")}</p>
                <div className="flex gap-1.5 items-center">
                  <input
                    type="number" value={card.bpSystolic} onChange={(e) => set("bpSystolic", e.target.value)}
                    placeholder="120"
                    className="w-full px-2.5 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-muted-foreground text-sm">/</span>
                  <input
                    type="number" value={card.bpDiastolic} onChange={(e) => set("bpDiastolic", e.target.value)}
                    placeholder="80"
                    className="w-full px-2.5 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t("healthCard.spo2")}</p>
                <TextInput type="number" value={card.spo2} onChange={(v) => set("spo2", v)} placeholder="98" />
              </div>
            </div>
          </div>
        </StageCard>

        {/* ── Disclaimer ── */}
        <div className="flex gap-3 bg-destructive/8 border border-destructive/20 rounded-2xl p-4">
          <AlertTriangle size={18} className="text-destructive mt-0.5 shrink-0" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground leading-relaxed">{t("healthCard.disclaimer")}</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default HealthCard;
