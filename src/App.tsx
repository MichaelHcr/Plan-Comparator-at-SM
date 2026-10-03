/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  Calculator, 
  HelpCircle, 
  Check, 
  Plus, 
  AlertCircle, 
  Coins, 
  ArrowRight, 
  Bookmark, 
  Building2, 
  Sparkles,
  RefreshCw,
  Info,
  X,
  XCircle
} from "lucide-react";
import { 
  TRANSLATIONS, 
  Language, 
  getTranslatedCategoryName,
  getTranslatedCategorySubtitle,
  getTranslatedCategoryDescription,
  getTranslatedCategoryNote,
  getTranslatedAppendixCategory,
  getTranslatedBenefitName,
  getTranslatedBrochureValue
} from "./translations";
import { Logo } from "./components/Logo";
import { ShieldLogo } from "./components/ShieldLogo";

// Definitions of the 4 policies shown in the image
interface Policy {
  id: string;
  name: string;
  deductible: number;
  coinsurance: number; // e.g. 90 means 90% (insurance pays 90%, patient pays 10%)
  oopMax: number;
  maxBenefit: string;
  prescriptionDrugs: string;
  annualPremium: number;
  network: string;
  shieldColor: string; // Tailwind colors for decorative shields
}

const POLICIES: Policy[] = [
  {
    id: "supreme",
    name: "Supreme",
    deductible: 0,
    coinsurance: 90,
    oopMax: 5000,
    maxBenefit: "Unlimited",
    prescriptionDrugs: "$15, $30, $50",
    annualPremium: 2333.00,
    network: "Select Plus",
    shieldColor: "bg-amber-100 text-amber-600 border-amber-300"
  },
  {
    id: "elite",
    name: "Elite",
    deductible: 0,
    coinsurance: 90,
    oopMax: 6350,
    maxBenefit: "Unlimited",
    prescriptionDrugs: "$15, 30%, 50%",
    annualPremium: 1998.00,
    network: "Select Plus",
    shieldColor: "bg-rose-100 text-red-600 border-rose-300"
  },
  {
    id: "prime100",
    name: "Prime 100",
    deductible: 100,
    coinsurance: 80,
    oopMax: 6350,
    maxBenefit: "Unlimited",
    prescriptionDrugs: "$15, 30%, 50%",
    annualPremium: 1695.00,
    network: "Choice Plus",
    shieldColor: "bg-blue-100 text-blue-600 border-blue-300"
  },
  {
    id: "prime500",
    name: "Prime 500",
    deductible: 500,
    coinsurance: 80,
    oopMax: 7350,
    maxBenefit: "Unlimited",
    prescriptionDrugs: "$25, 30%, 50%",
    annualPremium: 1267.00,
    network: "Choice Plus",
    shieldColor: "bg-emerald-100 text-emerald-600 border-emerald-300"
  }
];

interface AppendixRow {
  category: string;
  benefit: string;
  supreme: string;
  elite: string;
  prime100: string;
  prime500: string;
}

const APPENDIX_ROWS: AppendixRow[] = [
  {
    category: "General Policy Details",
    benefit: "Who is eligible?",
    supreme: "F-1 Full-time Student, J-1, OPT, ELP",
    elite: "F-1 Full-time Student, J-1, OPT, ELP",
    prime100: "F-1 Full-time Student, J-1, OPT, ELP",
    prime500: "F-1 Full-time Student, J-1, OPT, ELP"
  },
  {
    category: "General Policy Details",
    benefit: "Plan Administrator",
    supreme: "United Healthcare Student Resources",
    elite: "United Healthcare Student Resources",
    prime100: "United Healthcare Student Resources",
    prime500: "United Healthcare Student Resources"
  },
  {
    category: "General Policy Details",
    benefit: "Preferred Network",
    supreme: "United Healthcare Select Plus PPO",
    elite: "United Healthcare Select Plus PPO",
    prime100: "United Healthcare Choice Plus PPO",
    prime500: "United Healthcare Choice Plus PPO"
  },
  {
    category: "General Policy Details",
    benefit: "Deductible (In-network)",
    supreme: "$0",
    elite: "$0",
    prime100: "$100",
    prime500: "$500"
  },
  {
    category: "General Policy Details",
    benefit: "Deductible (Out-of-network)",
    supreme: "$250",
    elite: "$350",
    prime100: "$350",
    prime500: "$2,000"
  },
  {
    category: "General Policy Details",
    benefit: "Deductible (Student Health Center)",
    supreme: "$0",
    elite: "$0",
    prime100: "$0",
    prime500: "$0"
  },
  {
    category: "General Policy Details",
    benefit: "Coinsurance (In-network)",
    supreme: "90%",
    elite: "90%",
    prime100: "80%",
    prime500: "80%"
  },
  {
    category: "General Policy Details",
    benefit: "Coinsurance (Out-of-network)",
    supreme: "80%",
    elite: "70%",
    prime100: "70%",
    prime500: "60%"
  },
  {
    category: "General Policy Details",
    benefit: "Out-of-Pocket Maximum (In-network, Per Policy Year)",
    supreme: "$5,000",
    elite: "$6,350",
    prime100: "$6,350",
    prime500: "$7,350"
  },
  {
    category: "General Policy Details",
    benefit: "Out-of-Pocket Maximum (Out-of-network, Per Policy Year)",
    supreme: "$6,500",
    elite: "$8,000",
    prime100: "$8,000",
    prime500: "$14,700"
  },
  {
    category: "Outpatient Services",
    benefit: "Primary Care / Specialist / Therapist Visits",
    supreme: "90% after $15 Copay",
    elite: "90% after $25 Copay",
    prime100: "80% after $25 Copay",
    prime500: "80% after $75 Copay"
  },
  {
    category: "Outpatient Services",
    benefit: "Medically Necessary Dermatologist Visit",
    supreme: "90% after $15 Copay",
    elite: "90% after $25 Copay",
    prime100: "80% after $25 Copay",
    prime500: "80% after $75 Copay"
  },
  {
    category: "Outpatient Services",
    benefit: "Emergency Room Visits",
    supreme: "90% after $150 Copay (not required if admitted)",
    elite: "90% after $200 Copay (not required if admitted)",
    prime100: "80% after $200 Copay (not required if admitted)",
    prime500: "80% after $200 Copay (not required if admitted)"
  },
  {
    category: "Outpatient Services",
    benefit: "Urgent Care Visits",
    supreme: "90% after $25 Copay",
    elite: "90% after $50 Copay",
    prime100: "80% after $50 Copay",
    prime500: "80% after $75 Copay"
  },
  {
    category: "Outpatient Services",
    benefit: "Outpatient Surgery",
    supreme: "90%",
    elite: "90%",
    prime100: "80% after Deductible",
    prime500: "80% after Deductible"
  },
  {
    category: "Outpatient Services",
    benefit: "Laboratory Procedures",
    supreme: "90%",
    elite: "90%",
    prime100: "80% after Deductible",
    prime500: "80% after $30 Copay, after Deductible"
  },
  {
    category: "Outpatient Services",
    benefit: "Prescription Drugs (Tier 1 / 2 / 3) Member Responsibility",
    supreme: "$15, $30, $50",
    elite: "$15 / 30% / 50%",
    prime100: "$15 / 30% / 50%",
    prime500: "$25 / 30% / 50%"
  },
  {
    category: "Inpatient Services",
    benefit: "Inpatient Room & Board Expenses",
    supreme: "90%",
    elite: "90%",
    prime100: "80% after Deductible",
    prime500: "80% after Deductible"
  },
  {
    category: "Inpatient Services",
    benefit: "Intensive Care",
    supreme: "90%",
    elite: "90%",
    prime100: "80% after Deductible",
    prime500: "80% after Deductible"
  },
  {
    category: "Inpatient Services",
    benefit: "Hospital Miscellaneous Expenses",
    supreme: "90%",
    elite: "90%",
    prime100: "80% after Deductible",
    prime500: "80% after Deductible"
  },
  {
    category: "Inpatient Services",
    benefit: "Routine Newborn Care",
    supreme: "90%",
    elite: "90%",
    prime100: "80% after Deductible",
    prime500: "80% after Deductible"
  },
  {
    category: "Inpatient Services",
    benefit: "Inpatient Surgery",
    supreme: "90%",
    elite: "90%",
    prime100: "80% after Deductible",
    prime500: "80% after Deductible"
  },
  {
    category: "Other Services",
    benefit: "Ambulance Services",
    supreme: "90%",
    elite: "90%",
    prime100: "80% after Deductible",
    prime500: "80% after Deductible"
  },
  {
    category: "Other Services",
    benefit: "Durable Medical Equipment",
    supreme: "90%",
    elite: "90%",
    prime100: "80% after Deductible",
    prime500: "80% after Deductible"
  },
  {
    category: "Other Services",
    benefit: "Dental Treatment (Injury to sound/natural teeth)",
    supreme: "90% ($100 max/tooth)",
    elite: "90% ($100 max/tooth, $500 max/yr)",
    prime100: "80% after Deductible ($100 max/tooth, $500 max/yr)",
    prime500: "80% after Deductible ($100 max/tooth, $500 max/yr)"
  },
  {
    category: "Other Services",
    benefit: "Preventive Care Services",
    supreme: "100%",
    elite: "100%",
    prime100: "100%",
    prime500: "100%"
  },
  {
    category: "Other Services",
    benefit: "Adult Vision Benefits (Students Age 19+)",
    supreme: "$200 supplies + $100 exam",
    elite: "$200 supplies + $100 exam",
    prime100: "$200 supplies + $100 exam",
    prime500: "Not Covered"
  },
  {
    category: "Other Services",
    benefit: "Routine Physical Exams",
    supreme: "Covered (Included)",
    elite: "Not Covered",
    prime100: "Not Covered",
    prime500: "Not Covered"
  },
  {
    category: "Other Services",
    benefit: "Benefit Packages",
    supreme: "6 Exclusive Benefits (Included)",
    elite: "4 Exclusive Benefits (Included)",
    prime100: "Not Included (Optional Add-on)",
    prime500: "Not Included (Optional Add-on)"
  },
  {
    category: "Other Services",
    benefit: "Pediatric Dental & Vision Services",
    supreme: "See Endorsements (Covered under 19)",
    elite: "See Endorsements (Covered under 19)",
    prime100: "See Endorsements (Covered under 19)",
    prime500: "See Endorsements (Covered under 19)"
  },
  {
    category: "Other Services",
    benefit: "Tuberculosis Screening and Testing",
    supreme: "100%",
    elite: "100%",
    prime100: "100%",
    prime500: "100%"
  }
];

interface CategoryConfig {
  id: "lab" | "doctor" | "urgent" | "surgery" | "er";
  name: string;
  subtitle: string;
  defaultBilled: number;
  defaultAllowed: number;
  minBilled: number;
  maxBilled: number;
  stepBilled: number;
  copays: Record<string, number>;
  ruleType: "copay_coinsurance" | "deductible_coinsurance";
  description: string;
  note: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: "lab",
    name: "Outpatient Lab Test / Diagnostic X-Ray",
    subtitle: "Outpatient diagnostic lab procedures, blood tests, and X-ray imaging",
    defaultBilled: 500,
    defaultAllowed: 500,
    minBilled: 100,
    maxBilled: 3000,
    stepBilled: 50,
    copays: {
      supreme: 0,
      elite: 0,
      prime100: 0,
      prime500: 30
    },
    ruleType: "deductible_coinsurance",
    description: "Subject to deductible (extra $30 copay for Prime 500), and the remaining costs are shared by coinsurance.",
    note: "The usual allowed price is typically 30% of the bill (default), though it can vary depending on in-network contracts."
  },
  {
    id: "doctor",
    name: "Doctor / Specialist / Therapist Visit",
    subtitle: "Outpatient office visits (Primary Care, Specialist, Mental Health / Therapist)",
    defaultBilled: 400,
    defaultAllowed: 400,
    minBilled: 250,
    maxBilled: 800,
    stepBilled: 25,
    copays: {
      supreme: 15,
      elite: 25,
      prime100: 25,
      prime500: 75
    },
    ruleType: "copay_coinsurance",
    description: "Pay a flat copay per visit; the annual deductible is not required. Remaining costs are shared by coinsurance.",
    note: "The usual allowed price is typically 30% of the bill (default), though it can vary depending on in-network contracts."
  },
  {
    id: "urgent",
    name: "Urgent Care Visit",
    subtitle: "Urgent Care Center visits for non-life-threatening medical conditions",
    defaultBilled: 500,
    defaultAllowed: 500,
    minBilled: 200,
    maxBilled: 2500,
    stepBilled: 50,
    copays: {
      supreme: 25,
      elite: 50,
      prime100: 50,
      prime500: 75
    },
    ruleType: "copay_coinsurance",
    description: "Pay a flat Urgent Care copay per visit; the annual deductible is not required. Remaining costs are shared by coinsurance.",
    note: "The usual allowed price is typically 30% of the bill (default), though it can vary depending on in-network contracts."
  },
  {
    id: "surgery",
    name: "Surgery",
    subtitle: "Surgical procedures (Inpatient or Outpatient surgeries)",
    defaultBilled: 12000,
    defaultAllowed: 12000,
    minBilled: 2500,
    maxBilled: 30000,
    stepBilled: 250,
    copays: {
      supreme: 0,
      elite: 0,
      prime100: 0,
      prime500: 0
    },
    ruleType: "deductible_coinsurance",
    description: "Surgical procedures under all plans follow deductible + coinsurance rules. (Rules are identical for inpatient and outpatient surgeries).",
    note: "The usual allowed price is typically 30% of the bill (default), though it can vary depending on in-network contracts."
  },
  {
    id: "er",
    name: "Emergency Room (ER) Visit",
    subtitle: "Emergency medical treatment (copay is not required if admitted to hospital)",
    defaultBilled: 3500,
    defaultAllowed: 3500,
    minBilled: 1000,
    maxBilled: 10000,
    stepBilled: 100,
    copays: {
      supreme: 150,
      elite: 200,
      prime100: 200,
      prime500: 200
    },
    ruleType: "copay_coinsurance",
    description: "Pay a flat emergency copay per visit, with remaining costs shared via coinsurance.",
    note: "The usual allowed price is typically 30% of the bill (default), though it can vary depending on in-network contracts."
  }
];

export default function App() {
  // Language translation state (default English)
  const [lang, setLang] = useState<Language>("en");

  // Translation helper shorthand
  const t = (key: string, variables: Record<string, string | number> = {}) => {
    let text = TRANSLATIONS[lang]?.[key] || TRANSLATIONS["en"]?.[key] || key;
    Object.entries(variables).forEach(([k, v]) => {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    });
    return text;
  };

  // Scenario Selection (dropdown categories)
  const [activeCategory, setActiveCategory] = useState<"lab" | "doctor" | "urgent" | "surgery" | "er">("lab");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState<boolean>(true);
  const [showConditionsModal, setShowConditionsModal] = useState<boolean>(false);
  const [knowsEstimation, setKnowsEstimation] = useState<boolean>(false);

  // Active Category Config helper
  const activeConfig = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  // Editable bill costs: default to lab category defaults ($500)
  const [billedCostInput, setBilledCostInput] = useState<string>("500");
  const billedCost = Math.max(0, parseFloat(billedCostInput) || 0);
  const allowedPrice = billedCost;

  // Selected policy for formula walkthrough breakdown below
  const [walkthroughPolicyId, setWalkthroughPolicyId] = useState<string>("supreme");

  // Detailed appendix states
  const [appendixExpanded, setAppendixExpanded] = useState<boolean>(false);
  const [appendixCategory, setAppendixCategory] = useState<string>("all");
  const [appendixSearch, setAppendixSearch] = useState<string>("");

  // Per-policy card details expansion state (collapsed by default)
  const [expandedCardDetails, setExpandedCardDetails] = useState<Record<string, boolean>>({});

  // Helper calculation logic
  const calculateCosts = (policy: Policy, config: CategoryConfig, allowed: number) => {
    let copayPaid = 0;
    let deductiblePaid = 0;
    let coinsuranceBase = 0;
    let patientCoinsuranceShare = 0;
    let uncappedPatientPay = 0;

    if (config.ruleType === "copay_coinsurance") {
      const copayValue = config.copays[policy.id] || 0;
      
      if (allowed <= copayValue) {
        copayPaid = allowed;
        uncappedPatientPay = allowed;
      } else {
        copayPaid = copayValue;
        coinsuranceBase = allowed - copayPaid;
        const patientPercent = 100 - policy.coinsurance;
        patientCoinsuranceShare = coinsuranceBase * (patientPercent / 100);
        uncappedPatientPay = copayPaid + patientCoinsuranceShare;
      }
    } else {
      // Deductible + Coinsurance rule (standard lab / surgery / ER rule)
      const copayValue = config.copays[policy.id] || 0;
      if (copayValue > 0) {
        if (allowed <= copayValue) {
          copayPaid = allowed;
          uncappedPatientPay = allowed;
        } else {
          copayPaid = copayValue;
          const remainingAfterCopay = allowed - copayPaid;
          if (remainingAfterCopay <= policy.deductible) {
            deductiblePaid = remainingAfterCopay;
            uncappedPatientPay = copayPaid + deductiblePaid;
          } else {
            deductiblePaid = policy.deductible;
            coinsuranceBase = remainingAfterCopay - deductiblePaid;
            const patientPercent = 100 - policy.coinsurance;
            patientCoinsuranceShare = coinsuranceBase * (patientPercent / 100);
            uncappedPatientPay = copayPaid + deductiblePaid + patientCoinsuranceShare;
          }
        }
      } else {
        if (allowed <= policy.deductible) {
          deductiblePaid = allowed;
          uncappedPatientPay = allowed;
        } else {
          deductiblePaid = policy.deductible;
          coinsuranceBase = allowed - deductiblePaid;
          const patientPercent = 100 - policy.coinsurance;
          patientCoinsuranceShare = coinsuranceBase * (patientPercent / 100);
          uncappedPatientPay = deductiblePaid + patientCoinsuranceShare;
        }
      }
    }

    // Out-of-Pocket Maximum (OOPM) Capping Logic
    const isOopMaxReached = uncappedPatientPay > policy.oopMax;
    const totalPatientPay = isOopMaxReached ? policy.oopMax : uncappedPatientPay;
    const oopMaxDiscount = isOopMaxReached ? (uncappedPatientPay - policy.oopMax) : 0;
    const insuranceShare = Math.max(0, allowed - totalPatientPay);

    return {
      deductiblePaid,
      copayPaid,
      coinsuranceBase,
      patientCoinsuranceShare,
      uncappedPatientPay,
      totalPatientPay,
      insuranceShare,
      isOopMaxReached,
      oopMaxDiscount
    };
  };

  // Reset inputs to default values
  const handleResetDefaults = () => {
    setBilledCostInput(String(activeConfig.defaultBilled));
  };

  // Change category handler
  const handleSelectCategory = (catId: "lab" | "doctor" | "urgent" | "surgery" | "er") => {
    setActiveCategory(catId);
    const target = CATEGORIES.find(c => c.id === catId) || CATEGORIES[0];
    setBilledCostInput(String(target.defaultBilled));
    setDropdownOpen(false);
  };

  const handleBilledInputChange = (rawVal: string) => {
    if (rawVal === "") {
      setBilledCostInput("");
      return;
    }
    // Remove any negative signs and unwanted characters
    const cleanVal = rawVal.replace(/-/g, "").replace(/[^0-9.]/g, "");
    
    // Only allow valid non-negative numbers with up to 2 decimal places
    if (/^\d*\.?\d{0,2}$/.test(cleanVal)) {
      setBilledCostInput(cleanVal);
    }
  };

  const handleBilledCostChange = (val: number) => {
    setBilledCostInput(String(Math.max(0, val)));
  };

  const savings = 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Premium Crimson/Red and White Header */}
      <header className="bg-white border-b border-red-100 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-700"></div>
        
        {/* Top Language Selector Bar */}
        <div className="max-w-7xl mx-auto px-4 pt-4 sm:px-6 lg:px-8 flex justify-end">
          <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/50">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all cursor-pointer ${
                lang === "en" 
                  ? "bg-white text-red-600 shadow-xs" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("zh")}
              className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all cursor-pointer ${
                lang === "zh" 
                  ? "bg-white text-red-600 shadow-xs" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              中文
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-8 pt-2 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="mb-4">
                <Logo variant="full" className="h-10 sm:h-12 md:h-13 w-auto" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  {lang === "en" ? (
                    <>
                      How Much Can Your Insurance Plan Save You? <span className="text-red-600 block mt-1">Claims Scenario Simulation</span>
                    </>
                  ) : (
                    <>
                      你的保险计划可为你节省多少费用？<span className="text-red-600 block mt-1">理赔情景模拟</span>
                    </>
                  )}
                </h1>
                <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl">
                  {t("desc")}
                </p>
              </div>
            
            {/* Right Disclaimer Box (Simplified) */}
            <div className="self-start md:self-center">
              <div className="bg-amber-50 border border-amber-300 p-3.5 sm:p-4 rounded-xl max-w-sm text-xs sm:text-sm text-amber-950 leading-relaxed shadow-2xs">
                <div className="flex items-center gap-1.5 mb-1.5 font-bold text-amber-950 uppercase tracking-wide text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{t("disclaimer_title")}</span>
                </div>
                <p className="text-amber-900 text-xs sm:text-sm leading-relaxed">
                  {lang === "en"
                    ? "Results are for general reference only (in-network providers). Final costs depend on actual contracted rates and medical billing codes."
                    : "结果仅供参考（基于网络内医疗机构）。最终费用取决于真实结算代码与协议折扣价。"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Modal Overlay for Estimator Terms & Disclaimer */}
      {showDisclaimerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative max-h-[92vh] overflow-y-auto">
            {/* Header with Alert Icon, Title, & Language Selection */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 border border-red-100 shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-normal font-display">
                    {lang === "en" ? "Claims Scenario Simulation Disclaimer" : "理赔情景模拟免责声明与使用须知"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    {lang === "en" ? "Please review before using the Claims Scenario Simulation" : "在使用理赔情景模拟之前，请阅读以下声明"}
                  </p>
                </div>
              </div>

              {/* Language Selection Toggle */}
              <div className="flex items-center self-end sm:self-start bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0">
                <button
                  onClick={() => setLang("en")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    lang === "en" 
                      ? "bg-white text-red-600 shadow-xs" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLang("zh")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    lang === "zh" 
                      ? "bg-white text-red-600 shadow-xs" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  中文
                </button>
              </div>
            </div>

            {/* Explanatory & Disclaimer Content */}
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{lang === "en" ? "Claims Scenario Simulation Disclaimer" : "理赔情景模拟免责声明"}</span>
                </div>

                <div className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
                  <p>
                    {lang === "en" ? (
                      <>
                        This Claims Scenario Simulation aims to facilitate understanding of insurance terms and how claims are calculated, but is <span className="text-red-600 font-bold">no guarantee of final costs</span>.
                      </>
                    ) : (
                      <>
                        本理赔情景模拟旨在帮助理解保险条款与理赔计算方式，但<span className="text-red-600 font-bold">不对最终费用作任何保证</span>。
                      </>
                    )}
                  </p>
                  <p>
                    {lang === "en" ? (
                      <>
                        Results <span className="text-red-600 font-bold">cannot be used as a standard for real claims</span>, benefit determinations, or billing settlements.
                      </>
                    ) : (
                      <>
                        计算结果<span className="text-red-600 font-bold">不可用作实际理赔的标准</span>、保障判定或账单结算凭据。
                      </>
                    )}
                  </p>
                  <p>
                    {lang === "en" ? (
                      <>
                        Calculations apply to <span className="text-red-600 font-bold">in-network providers only</span> and assume your bill meets specific{" "}
                        <button
                          type="button"
                          onClick={() => setShowConditionsModal(true)}
                          className="text-red-600 font-bold underline decoration-red-300 hover:text-red-700 cursor-pointer inline-flex items-center gap-1 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 transition-colors"
                        >
                          <span>coverage conditions</span>
                          <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                        </button>
                        {" "}(such as medical necessity and prior authorizations).
                      </>
                    ) : (
                      <>
                        本估算仅限<span className="text-red-600 font-bold">网络内医疗机构 (In-Network)</span>，且假设就诊满足计划的{" "}
                        <button
                          type="button"
                          onClick={() => setShowConditionsModal(true)}
                          className="text-red-600 font-bold underline decoration-red-300 hover:text-red-700 cursor-pointer inline-flex items-center gap-1 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 transition-colors"
                        >
                          <span>前提条件</span>
                          <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                        </button>
                        （如医疗必需性、转诊与预先授权等）。
                      </>
                    )}
                  </p>
                  <p>
                    {lang === "en" ? (
                      <>
                        Your actual out-of-pocket costs <span className="text-red-600 font-bold">may vary depending on</span> medical coding, contracted provider rates, actual care received, and extra non-covered fees (such as facility fees or out-of-network balance billing).
                      </>
                    ) : (
                      <>
                        您的<span className="text-red-600 font-bold">实际自付金额将有可能变动</span>，取决于诊疗代码、网络协议价、实际服务内容及可能产生的未纳保额外费用（如设施费 Facility Fees 或网络外差额账单 Balance Billing）。
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Checkbox Acknowledgment */}
            <label className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/80 transition-colors select-none text-left">
              <input 
                type="checkbox"
                checked={knowsEstimation}
                onChange={(e) => setKnowsEstimation(e.target.checked)}
                className="w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500 cursor-pointer mt-0.5 accent-red-600 shrink-0"
              />
              <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                {lang === "en" ? (
                  <>
                    I understand that estimates have <span className="text-red-600 font-bold">no guarantee</span> and <span className="text-red-600 font-bold">cannot be used as a standard for real claims</span>.
                  </>
                ) : (
                  <>
                    我已了解计算结果仅供参考且<span className="text-red-600 font-bold">不作保证</span>，<span className="text-red-600 font-bold">不可用作实际理赔的标准</span>。
                  </>
                )}
              </span>
            </label>

            {/* Action Button */}
            <button
              disabled={!knowsEstimation}
              onClick={() => {
                setShowDisclaimerModal(false);
              }}
              className={`w-full py-3.5 px-6 font-black text-sm rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 ${
                knowsEstimation 
                  ? "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-md cursor-pointer hover:scale-[1.01]" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>{lang === "en" ? "I Understand & Agree" : "我已理解并开启理赔情景模拟"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Pop-up Window for "Conditions" Details */}
      {showConditionsModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-7 max-w-lg w-full space-y-5 relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    {lang === "en" ? "Required Plan Coverage Conditions" : "计划保障前提条件与适用规则"}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {lang === "en" ? "Estimations assume all of the following criteria are met:" : "以下为您获得保险报销所必须满足的前提要求："}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowConditionsModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Conditions */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                  <span>{lang === "en" ? "In-Network Providers & Allowed Amounts" : "网络内医疗机构与协议价 (In-Network & Allowed Amount)"}</span>
                </div>
                <p className="text-slate-600 pl-3.5 leading-relaxed">
                  {lang === "en"
                    ? "Estimates apply exclusively to contracted in-network providers under negotiated allowed amounts. Out-of-network balance billing (the difference charged above allowed rates) is excluded."
                    : "本估算仅适用于网络内（In-Network）合作医疗机构及协议折扣价（Allowed Amount）。网络外发生的额外差额账单（Balance Billing）不包含在估算内。"}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                  <span>{lang === "en" ? "Referrals & Prior Authorizations" : "转诊与预先授权 (Referrals & Prior Authorization)"}</span>
                </div>
                <p className="text-slate-600 pl-3.5 leading-relaxed">
                  {lang === "en"
                    ? "Services and procedures must follow plan medical management rules, including doctor referrals and required prior authorizations (approvals) before care is rendered."
                    : "所有就诊项目必须符合保险计划的转诊（Referral）和预先授权（Prior Authorization）审核规则，未经预先核准的项目可能影响报销。"}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                  <span>{lang === "en" ? "Medically Necessary" : "医疗必需性 (Medically Necessary)"}</span>
                </div>
                <p className="text-slate-600 pl-3.5 leading-relaxed">
                  {lang === "en"
                    ? "The medical service or treatment must be certified as medically necessary by a licensed healthcare provider for covered sickness or injury."
                    : "诊疗服务必须经持牌医生诊断评估为治疗涵盖疾病或伤害所必需的“医疗必需项目”。"}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                  <span>{lang === "en" ? "Not in Home Country" : "不在被保险人母国 (Not in Home Country)"}</span>
                </div>
                <p className="text-slate-600 pl-3.5 leading-relaxed">
                  {lang === "en"
                    ? "Care must be received within eligible plan territories (e.g., U.S. study destination) and is not covered when incurred in the insured's home country."
                    : "诊疗须在保险合规覆盖区域（如在美国留学期间）进行，在被保险人母国发生的医疗费用不属于本计划保障范围。"}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                  <span>{lang === "en" ? "Not in Competitive Sports" : "不含竞技类/职业体育运动"}</span>
                </div>
                <p className="text-slate-600 pl-3.5 leading-relaxed">
                  {lang === "en"
                    ? "Injuries sustained during intercollegiate, professional, or high-risk competitive sports activities are excluded unless covered by an optional rider."
                    : "因参加校际竞技体育、职业体育或高风险竞技运动引发的身体伤害不在标准保障范围内（除非购买有专项扩展条款）。"}
                </p>
              </div>

              <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{lang === "en" ? "More Details in Policy Certificates" : "更多细节见官方保单手册"}</span>
                </div>
                <p className="text-slate-700 pl-5 leading-relaxed text-xs">
                  {lang === "en"
                    ? "Pre-existing conditions, benefit caps, facility fees, and complete exclusions are detailed in the official policy certificate of coverage. Final benefits are determined after care via your Explanation of Benefits (EOB)."
                    : "完整的除外责任、既往病史 (Pre-existing conditions) 规则、设施费等未纳保杂费及细节条款，请以官方保单凭证 (Certificate of Coverage) 为准，最终理赔以诊疗后生成的理赔说明书 (EOB) 为准。"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowConditionsModal(false)}
              className="w-full py-2.5 font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors cursor-pointer"
            >
              {lang === "en" ? "Close Details" : "关闭详情"}
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

        {/* PART 2: Interactive Live Out-of-Pocket Cost Calculator */}
        <div id="billing-calculator-section" className="space-y-16 sm:space-y-24 scroll-mt-6">
          {/* COMBINED: Formulate Hypothetical Bill Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-300 shadow-sm space-y-8">
            {/* Unified Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-normal font-display">
                  {lang === "en" ? "1. Select Your Medical Visit Type (Simulation)" : "1. 选择你的就医类型（模拟）"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowDisclaimerModal(true)}
                  className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 font-bold transition-colors bg-slate-100 hover:bg-slate-200/80 px-3 py-2 rounded-xl border border-slate-200 cursor-pointer"
                  title={lang === "en" ? "View Disclaimer & Terms" : "查看使用须知与免责声明"}
                >
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lang === "en" ? "Disclaimer" : "免责声明"}</span>
                </button>

                <button 
                  onClick={handleResetDefaults}
                  className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1.5 font-bold transition-colors bg-red-50 hover:bg-red-100/70 px-3.5 py-2 rounded-xl border border-red-200 cursor-pointer shadow-2xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {t("reset_defaults")}
                </button>
              </div>
            </div>

                {/* Grid layout with 2 main columns: Left for category selection, Right for bill amount */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column (5/12): Bill Category Selector */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-base font-extrabold text-slate-700 uppercase tracking-wide block">
                        {lang === "en" ? "A. Medical Service Category" : "A. 医疗服务类别"}
                      </label>
                    </div>

                    {/* Selector Dropdown Control */}
                    <div className="relative">
                      <button
                        id="scenario-dropdown-btn"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-3.5 bg-white border-2 border-red-200 hover:border-red-400 rounded-xl font-medium text-slate-800 transition-all text-left shadow-2xs focus:ring-2 focus:ring-red-500 focus:outline-none cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                          <div>
                            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider leading-none">{t("selected_category")}</div>
                            <span className="text-slate-950 text-base font-bold">{getTranslatedCategoryName(activeConfig.id, lang)}</span>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {dropdownOpen && (
                        <div className="absolute right-0 left-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 z-30 overflow-hidden divide-y divide-slate-100">
                          {CATEGORIES.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => handleSelectCategory(cat.id)}
                              className={`w-full px-4 py-3.5 text-left hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer ${
                                activeCategory === cat.id ? "bg-red-50/40" : ""
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className={`w-2.5 h-2.5 rounded-full ${activeCategory === cat.id ? "bg-red-600" : "bg-slate-300"}`}></span>
                                <div>
                                  <span className={`font-semibold text-base block ${activeCategory === cat.id ? "text-red-700" : "text-slate-800"}`}>
                                    {getTranslatedCategoryName(cat.id, lang)}
                                  </span>
                                  <span className="text-xs text-slate-500 block mt-0.5 leading-snug">{getTranslatedCategorySubtitle(cat.id, lang)}</span>
                                </div>
                              </div>
                              {activeCategory === cat.id && (
                                <span className="text-xs bg-red-100 text-red-800 px-2.5 py-1 rounded-full font-bold">
                                  {lang === "en" ? "Active" : "已激活"}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dynamic Rule Description Alert */}
                    <div className="bg-red-50/60 rounded-xl p-4.5 border border-red-200/70 flex items-start gap-3">
                      <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="text-[15px] sm:text-base text-red-950 leading-relaxed">
                        <span className="font-bold text-red-700 block mb-1 text-[15px] sm:text-base">{t("payment_rule_applied")}</span>
                        {getTranslatedCategoryDescription(activeConfig.id, lang)}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (7/12): Bill Amount Specification & Short IRL Statement */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="space-y-0.5">
                          <label htmlFor="billed-price-input" className="text-base font-extrabold text-slate-700 uppercase tracking-wide block">
                            {lang === "en" ? "B. Simulated Bill (Allowed Amount)" : "B. 模拟账单金额 (允许协议价)"}
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-4 relative rounded-xl shadow-xs">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <span className="text-slate-500 font-bold text-base">$</span>
                          </div>
                          <input
                            type="text"
                            inputMode="decimal"
                            id="billed-price-input"
                            value={billedCostInput}
                            onChange={(e) => handleBilledInputChange(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === "+") {
                                e.preventDefault();
                              }
                            }}
                            onBlur={() => {
                              if (billedCostInput === "" || billedCostInput === "." || isNaN(parseFloat(billedCostInput))) {
                                setBilledCostInput("0");
                              } else if (billedCostInput.endsWith(".")) {
                                setBilledCostInput(billedCostInput.slice(0, -1));
                              }
                            }}
                            className="block w-full pl-8 pr-3 py-3 border-2 border-slate-200 focus:border-red-500 focus:ring-red-500 rounded-xl text-slate-950 font-black font-mono transition-colors text-lg"
                          />
                        </div>
                        <div className="md:col-span-8 space-y-1.5">
                          <input 
                            type="range"
                            min={activeConfig.minBilled || 100}
                            max={activeConfig.maxBilled}
                            step={activeConfig.stepBilled}
                            value={billedCost}
                            onChange={(e) => handleBilledInputChange(e.target.value)}
                            className="w-full accent-red-600 cursor-pointer h-2.5 bg-slate-100 rounded-lg"
                          />
                          <div className="flex justify-between text-xs font-bold text-slate-500 font-mono">
                            <span>Min: ${activeConfig.minBilled.toLocaleString()}</span>
                            <span>Max: ${activeConfig.maxBilled.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-normal">
                        {t("slider_billed_desc")}
                      </p>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed font-normal">
                        <Info className="w-4.5 h-4.5 text-slate-500 shrink-0 mt-0.5" />
                        <span>
                          {t("slider_range_note")}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>

        {/* SECTION: Live Out-of-Pocket Bill Simulator Results (Streamlined) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between gap-2 w-full">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-normal font-display">
                {lang === "en" ? "2. Under Different Plans, How Much Will You Pay Out-of-Pocket for This Bill?" : "2. 不同计划下，你需为该账单自付的金额是？"}
              </h2>
              <button
                onClick={() => setShowDisclaimerModal(true)}
                className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1.5 transition-colors bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 cursor-pointer"
              >
                <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>{lang === "en" ? "Disclaimer" : "免责声明"}</span>
              </button>
            </div>
          </div>

          {/* Grid of the 4 policy cards, completely parallel and highly-detailed columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-5">
            {POLICIES.map((policy) => {
              const costs = calculateCosts(policy, activeConfig, allowedPrice);
              const coinsurancePercent = policy.coinsurance;
              const patientCoinsurancePercent = 100 - coinsurancePercent;
              const isActiveWalkthrough = walkthroughPolicyId === policy.id;
              const isExpanded = !!expandedCardDetails[policy.id];
              
              // Percentages for the stacked visual progress bar
              const totalCost = allowedPrice;
              const copayPaid = costs.copayPaid ?? 0;
              const dedPaid = costs.deductiblePaid ?? 0;
              const patientCoinsPaid = costs.patientCoinsuranceShare ?? 0;
              const insurancePaid = costs.insuranceShare ?? 0;

              const copayPercent = totalCost > 0 ? (copayPaid / totalCost) * 100 : 0;
              const dedPercent = totalCost > 0 ? (dedPaid / totalCost) * 100 : 0;
              const patientCoinsPercent = totalCost > 0 ? (patientCoinsPaid / totalCost) * 100 : 0;
              const insuranceCoinsPercent = totalCost > 0 ? (insurancePaid / totalCost) * 100 : 0;

              // Benefits checklist configuration for collapsible section
              const benefitsConfig = [
                {
                  id: "preventive",
                  name: lang === "en" ? "Preventive Care Services" : "预防性医疗服务 (Preventive Care)",
                  subtext: "100%",
                  isCovered: true,
                  text: lang === "en" 
                    ? "All services defined as preventive care (immunizations, CDC vaccines, routine screenings, etc.) receive 100% in-network coverage with $0 Deductible and $0 Copay."
                    : "所有符合预防性医疗定义的项目（如疫苗接种、常规疾病筛查等）在网络内享受 100% 全额报销，$0 免赔额、$0 挂号费。",
                  tooltip: t("tooltip_preventive_care")
                },
                {
                  id: "vision",
                  name: lang === "en" ? "Adult Vision Benefits" : "成人视力福利 (Adult Vision)",
                  subtext: policy.id !== "prime500" ? "$200 + $100" : (lang === "en" ? "Not Covered" : "不包含"),
                  isCovered: policy.id !== "prime500",
                  text: lang === "en" 
                    ? "Routine Eye Exam ($100 max/yr) & Vision Supplies ($200 max/24mo for lenses, frames & contacts)."
                    : "常规眼科检查（每年最高$100）及配镜/隐形眼镜（每24个月最高$200）。",
                  tooltip: t("tooltip_adult_vision")
                },
                {
                  id: "physical",
                  name: lang === "en" ? "Routine Physical Exams" : "常规全身体检 (Physical Exams)",
                  isCovered: policy.id === "supreme",
                  text: lang === "en" 
                    ? "Comprehensive routine full-body checkups, wellness screenings, and physical examinations."
                    : "包含常规全身体格检查、健康筛查及相关化验诊断。",
                  tooltip: t("tooltip_physical_exam")
                },
                {
                  id: "package",
                  name: lang === "en" ? "Benefit Package" : "增值保障包 (Benefit Package)",
                  subtext: policy.id === "supreme" 
                    ? (lang === "en" ? "(Ultimate Abroad Benefit Package)" : "(赴美安心包)")
                    : policy.id === "elite"
                    ? (lang === "en" ? "(Ultimate Arrival Benefit Package)" : "(落地无忧包)")
                    : (lang === "en" ? "(Optional Add-on)" : "(可选加购)"),
                  isCovered: policy.id === "supreme" || policy.id === "elite",
                  text: policy.id === "supreme"
                    ? (lang === "en" 
                        ? "Ultimate Abroad Package included (OTC meds kit, 4x supplements, 6x counseling, dental benefit, iKang exam & 30-day travel insurance)."
                        : "赠送赴美安心包（含常备药包、4套营养品、6次心理咨询、牙科福利、体检及30天旅游险）。")
                    : policy.id === "elite"
                    ? (lang === "en" 
                        ? "Ultimate Arrival Package included (OTC meds kit, 4x supplements, 6x counseling & dental benefit)."
                        : "赠送落地无忧包（含常备药包、4套营养品、6次心理咨询及牙科福利）。")
                    : (lang === "en" 
                        ? "No package included under this plan; available as an optional add-on."
                        : "本计划不包含增值保障包，可按需单独选购可选增值包。"),
                  tooltip: policy.id === "supreme"
                    ? (lang === "en"
                        ? "Ultimate Abroad Benefit Package (赴美安心包):\nIncluded with Supreme. Features 6 exclusive perks: Over-the-counter medicine kit, 4x nutritional supplements, 6x mental counseling sessions, dental insurance benefit, iKang physical exam, and 30-day travel insurance."
                        : "赴美安心包 (Ultimate Abroad Package)：\nSupreme 计划免费赠送。包含 6 大专属权益：常用非处方常备药包、4套营养品、6次中文心理咨询、牙科保险福利、爱康国宾体检及30天旅游保险。")
                    : policy.id === "elite"
                    ? (lang === "en"
                        ? "Ultimate Arrival Benefit Package (落地无忧包):\nIncluded with Elite. Features 4 exclusive perks: Over-the-counter medicine kit, 4x nutritional supplements, 6x mental counseling sessions, and dental insurance benefit."
                        : "落地无忧包 (Ultimate Arrival Package)：\nElite 计划免费赠送。包含 4 大专属权益：常用非处方常备药包、4套营养品、6次中文心理咨询及牙科保险福利。")
                    : (lang === "en"
                        ? "Benefit Package:\nNo benefit package included under this plan, but you can purchase an optional package add-on."
                        : "增值保障包：\n本计划不包含增值保障包，但您可根据需要单独选购可选增值包。")
                }
              ];

              return (
                <div 
                  key={policy.id}
                  onClick={() => setWalkthroughPolicyId(policy.id)}
                  id={`policy-card-${policy.id}`}
                  className={`cursor-pointer bg-white rounded-2xl border-2 transition-all p-4 flex flex-col justify-between relative select-none ${
                    isActiveWalkthrough 
                      ? "border-red-600 shadow-md ring-1 ring-red-500/25 bg-red-500/[0.005]" 
                      : "border-slate-300 hover:border-slate-400 hover:shadow-xs bg-white"
                  }`}
                >
                  {/* Active Indicator Badge */}
                  {isActiveWalkthrough && (
                    <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                      {lang === "en" ? "Active Math" : "当前激活"}
                    </span>
                  )}

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-3.5">
                      {/* Header: Shield Emblem & Title & Premium Box */}
                    <div className="flex flex-col items-center justify-center py-1 text-center">
                      <div className="relative flex items-center justify-center mb-1.5">
                        <div className={`absolute inset-0 rounded-full blur-md opacity-25 ${
                          policy.id === "supreme" ? "bg-amber-400" :
                          policy.id === "elite" ? "bg-red-400" :
                          policy.id === "prime100" ? "bg-blue-400" : "bg-emerald-400"
                        }`}></div>
                        
                        <div className="relative w-12 h-12 flex items-center justify-center z-10">
                          <ShieldLogo policyId={policy.id} className="w-12 h-12 drop-shadow-xs" />
                        </div>
                      </div>
                      
                      <h3 className="font-extrabold text-slate-900 tracking-normal text-base font-display leading-tight">
                        {policy.name}
                      </h3>

                      {/* Premium Rate Box */}
                      <div className="mt-1.5 flex items-center justify-center gap-1.5 bg-slate-50 border border-slate-200/60 rounded-xl px-2.5 py-2 w-full">
                        <span className="text-xs sm:text-sm font-bold text-slate-600">
                          {lang === "en" ? "Annual Premium" : "年保费"}
                        </span>
                        <span className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">
                          ${policy.annualPremium.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* POLICY SPECIFICATIONS */}
                    <div className="space-y-1.5 text-xs sm:text-sm divide-y divide-slate-100 bg-slate-50/60 p-3 rounded-xl border border-slate-200/60 min-h-[178px]">
                      <div className="flex justify-between py-1 relative">
                        <span className="relative group cursor-help border-b border-dashed border-slate-300 hover:border-red-400 hover:text-red-600 transition-colors text-slate-600 font-medium text-xs sm:text-sm">
                          {t("row_deductible")}
                          <span className="absolute z-50 bottom-full left-0 mb-2 w-64 p-3 bg-slate-950 text-white text-xs font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none text-left">
                            <span className="block font-bold text-red-400 mb-0.5 uppercase text-xs">{t("row_deductible")}</span>
                            {t("tooltip_deductible")}
                          </span>
                        </span>
                        <span className="text-slate-900 font-bold font-mono text-xs sm:text-sm">
                          ${policy.deductible === 0 ? "0" : policy.deductible}
                        </span>
                      </div>

                      <div className="flex justify-between py-1 relative">
                        <span className="relative group cursor-help border-b border-dashed border-slate-300 hover:border-red-400 hover:text-red-600 transition-colors text-slate-600 font-medium text-xs sm:text-sm">
                          {t("row_coinsurance")}
                          <span className="absolute z-50 bottom-full left-0 mb-2 w-64 p-3 bg-slate-950 text-white text-xs font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none text-left">
                            <span className="block font-bold text-red-400 mb-0.5 uppercase text-xs">{t("row_coinsurance")}</span>
                            {t("tooltip_coinsurance")}
                          </span>
                        </span>
                        <span className="text-slate-900 font-bold font-mono text-xs sm:text-sm">
                          {policy.coinsurance}%
                        </span>
                      </div>

                      <div className="flex justify-between py-1 relative">
                        <span className="relative group cursor-help border-b border-dashed border-slate-300 hover:border-red-400 hover:text-red-600 transition-colors text-slate-600 font-medium text-xs sm:text-sm">
                          {t("row_oop_max")}
                          <span className="absolute z-50 bottom-full left-0 mb-2 w-64 p-3 bg-slate-950 text-white text-xs font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none text-left">
                            <span className="block font-bold text-red-400 mb-0.5 uppercase text-xs">{t("row_oop_max")}</span>
                            {t("tooltip_oop_max")}
                          </span>
                        </span>
                        <span className="text-slate-900 font-bold font-mono text-xs sm:text-sm">
                          ${policy.oopMax.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between py-1 relative">
                        <span className="relative group cursor-help border-b border-dashed border-slate-300 hover:border-red-400 hover:text-red-600 transition-colors text-slate-600 font-medium text-xs sm:text-sm">
                          {t("row_max_benefit")}
                          <span className="absolute z-50 bottom-full left-0 mb-2 w-64 sm:w-72 p-3 bg-slate-950 text-white text-xs font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none text-left">
                            <span className="block font-bold text-red-400 mb-0.5 uppercase text-xs">{t("row_max_benefit")}</span>
                            {t("tooltip_max_benefit")}
                          </span>
                        </span>
                        <span className="text-slate-900 font-semibold text-xs sm:text-sm">
                          {policy.maxBenefit === "Unlimited" && lang === "zh" ? "无上限保额" : policy.maxBenefit}
                        </span>
                      </div>

                      <div className="flex justify-between py-1 relative">
                        <span className="relative group cursor-help border-b border-dashed border-slate-300 hover:border-red-400 hover:text-red-600 transition-colors text-slate-600 font-medium text-xs sm:text-sm">
                          {t("row_prescription")}
                          <span className="absolute z-50 bottom-full right-0 sm:left-0 sm:right-auto mb-2 w-72 sm:w-80 p-3 bg-slate-950 text-white text-xs font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none text-left whitespace-pre-line leading-relaxed">
                            <span className="block font-bold text-red-400 mb-1 uppercase text-xs">{t("row_prescription")} (Tiers 1, 2, 3)</span>
                            {t("tooltip_prescription")}
                          </span>
                        </span>
                        <span className="text-slate-900 font-bold font-mono text-xs sm:text-sm truncate max-w-[130px]" title={policy.prescriptionDrugs}>
                          {getTranslatedBrochureValue(policy.prescriptionDrugs, lang)}
                        </span>
                      </div>
                    </div>

                    {/* See Covered Benefits Collapsible Toggle Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Toggle expansion across all 4 policy cards simultaneously
                        const nextState = !isExpanded;
                        setExpandedCardDetails({
                          supreme: nextState,
                          elite: nextState,
                          prime100: nextState,
                          prime500: nextState,
                        });
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-red-600 bg-slate-50 hover:bg-red-50/70 border border-slate-200 hover:border-red-200 rounded-lg transition-all cursor-pointer tracking-wide"
                    >
                      <span>
                        {isExpanded 
                          ? (lang === "en" ? "Hide Benefits" : "收起福利")
                          : (lang === "en" ? "More Benefits" : "更多福利")}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>

                    {/* Benefits Checklist (Collapsible) */}
                    {isExpanded && (
                      <div className="pt-2 space-y-1.5 border-t border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
                          {lang === "en" ? "Benefits" : "主要承保福利"}
                        </span>
                        <div className="space-y-1.5">
                          {benefitsConfig.map((benefit) => (
                            <div 
                              key={benefit.id}
                              className={`relative group flex items-center justify-between gap-2 p-1.5 rounded-lg border text-left cursor-help transition-all ${
                                benefit.isCovered 
                                  ? "bg-slate-50 border-slate-200 text-slate-800" 
                                  : "bg-slate-50/20 border-transparent text-slate-400"
                              }`}
                            >
                              <div className="min-w-0 flex-1 truncate pr-1">
                                <span className={`text-xs font-semibold block truncate ${benefit.isCovered ? "text-slate-800" : "text-slate-400"}`}>
                                  {benefit.name}
                                </span>
                                {benefit.subtext && (
                                  <span className={`text-[10px] block truncate font-normal ${benefit.isCovered ? "text-slate-500 font-medium" : "text-slate-400"}`}>
                                    {benefit.subtext}
                                  </span>
                                )}
                              </div>
                              <div className="shrink-0 flex items-center justify-center w-5 h-5">
                                {benefit.isCovered ? (
                                  <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                                    <Check className="w-3 h-3 stroke-[3.5]" />
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-white">
                                    <X className="w-2.5 h-2.5 stroke-[3.5]" />
                                  </div>
                                )}
                              </div>

                              {/* Hover Tooltip for benefit item */}
                              <span className="absolute z-50 bottom-full left-0 sm:left-auto sm:right-0 mb-2 w-72 sm:w-80 p-3 bg-slate-950 text-white text-xs font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none text-left whitespace-pre-line leading-relaxed">
                                <span className="block font-bold text-red-400 mb-1 uppercase text-xs">
                                  {benefit.name}
                                </span>
                                {benefit.tooltip || benefit.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Close upper section content */}
                    </div>

                    {/* Total Patient Pay highlight & Calculator Results */}
                    <div className="pt-4 mt-auto flex flex-col justify-end">
                      {/* Patient Pays Highlight Box with normalized minimum height */}
                      <div className={`border rounded-xl p-3 shadow-3xs space-y-2.5 min-h-[110px] flex flex-col justify-between ${
                        costs.isOopMaxReached ? "bg-amber-50 border-amber-300" : "bg-red-50/80 border-red-200/80"
                      }`}>
                        <div className="flex items-center justify-between min-h-[44px]">
                          <div className="text-left flex flex-col justify-center">
                            <span className={`text-xs font-extrabold uppercase tracking-wider block leading-none ${
                              costs.isOopMaxReached ? "text-amber-900" : "text-red-800"
                            }`}>
                              {lang === "en" ? "Patient Pays" : "用户自付"}
                            </span>
                            {costs.isOopMaxReached && (
                              <span className="text-[11px] font-black text-amber-700 uppercase tracking-tight block mt-1 leading-tight">
                                {lang === "en" ? "🛡️ OOP Max Capped!" : "🛡️ 已达自付封顶！"}
                              </span>
                            )}
                          </div>
                          <span className={`text-2xl sm:text-3xl font-black font-mono leading-none ${
                            costs.isOopMaxReached ? "text-amber-900" : "text-red-600"
                          }`}>
                            ${costs.totalPatientPay.toFixed(2)}
                          </span>
                        </div>

                        {/* Estimation Disclaimer inside Patient Pays Red Box */}
                        <div className={`pt-2 border-t flex items-start gap-1.5 text-left text-[11px] font-medium leading-snug min-h-[36px] ${
                          costs.isOopMaxReached ? "border-amber-200 text-amber-800" : "border-red-200/70 text-red-600"
                        }`}>
                          <Info className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            costs.isOopMaxReached ? "text-amber-700" : "text-red-500"
                          }`} />
                          <span>
                            {lang === "en"
                              ? "Estimation only; cannot be used for official insurance claims or billing settlement."
                              : "估算结果仅供参考，不可作为实际保险理赔申报或账单结算依据。"}
                          </span>
                        </div>
                      </div>

                      {/* Stacked Progress Bar Visual breakdown with normalized height & ample bottom spacing */}
                      <div className="space-y-1.5 pt-3 pb-2 min-h-[92px] flex flex-col justify-start">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <span>{lang === "en" ? "Cost Share" : "分摊细节"}</span>
                          <span className="font-mono">${allowedPrice}</span>
                        </div>
                        
                        {/* Visual segmented Bar */}
                        <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                          {copayPercent > 0 && (
                            <div 
                              style={{ width: `${copayPercent}%` }} 
                              className="bg-red-900 h-full transition-all" 
                              title={`Copay Paid: $${costs.copayPaid}`}
                            />
                          )}
                          {dedPercent > 0 && (
                            <div 
                              style={{ width: `${dedPercent}%` }} 
                              className="bg-red-700 h-full transition-all" 
                              title={`Deductible: $${costs.deductiblePaid}`}
                            />
                          )}
                          {patientCoinsPercent > 0 && (
                            <div 
                              style={{ width: `${patientCoinsPercent}%` }} 
                              className="bg-rose-400 h-full transition-all" 
                              title={`Student Portion: $${costs.patientCoinsuranceShare.toFixed(2)}`}
                            />
                          )}
                          {insuranceCoinsPercent > 0 && (
                            <div 
                              style={{ width: `${insuranceCoinsPercent}%` }} 
                              className="bg-slate-200 h-full transition-all" 
                              title={`Insurance Paid: $${costs.insuranceShare.toFixed(2)}`}
                            />
                          )}
                        </div>

                        {/* Legend below bar - with min-height and generous bottom margin */}
                        <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-xs text-slate-600 font-medium justify-center leading-tight pt-1.5 pb-1 min-h-[46px] items-start">
                          {copayPaid > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-900"></span>
                              <span>Copay (${copayPaid})</span>
                            </div>
                          )}
                          {dedPaid > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-700"></span>
                              <span>{lang === "en" ? "Ded" : "免赔"} (${dedPaid.toFixed(0)})</span>
                            </div>
                          )}
                          {patientCoinsPaid > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                              <span>{lang === "en" ? "Student" : "自付"} ({patientCoinsurancePercent}%)</span>
                            </div>
                          )}
                          {insurancePaid > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                              <span>{lang === "en" ? "Insurance" : "报销"} ({coinsurancePercent}%)</span>
                            </div>
                          )}
                          {totalCost === 0 && (
                            <span className="text-slate-400 text-xs italic">{lang === "en" ? "$0 Bill" : "$0 账单"}</span>
                          )}
                        </div>
                      </div>

                      {/* Detailed Line Items Calculation Section with fixed min-height for uniform alignment across all cases including OOP Max */}
                      <div className="space-y-1.5 text-xs sm:text-sm pt-3 border-t border-slate-200 min-h-[270px] flex flex-col justify-start">
                        <div className="flex justify-between text-slate-600">
                          <span>{lang === "en" ? "Total Bill Amount:" : "账单总额:"}</span>
                          <span className="font-mono font-semibold text-slate-900">${allowedPrice}</span>
                        </div>
                        
                        {costs.copayPaid > 0 && (
                          <div className="flex justify-between items-center text-slate-600">
                            <span>{lang === "en" ? "Copay Paid:" : "就诊自付额 (Copay):"}</span>
                            <span className="font-mono font-semibold text-red-600">
                              +${costs.copayPaid.toFixed(2)}
                            </span>
                          </div>
                        )}
                        {/* Deductible Line Item - Shown for ALL plans */}
                        {policy.deductible === 0 ? (
                          <div className="flex justify-between items-center text-slate-600">
                            <span>{lang === "en" ? "Deductible:" : "起付免赔额:"}</span>
                            <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                              {lang === "en" ? "No Deductible ($0)" : "无免赔额 ($0)"}
                            </span>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center text-slate-600">
                            <span>{lang === "en" ? "Deductible Applied:" : "本次抵扣免赔额:"}</span>
                            <span className="font-mono font-semibold text-red-600">
                              {costs.deductiblePaid > 0 ? `+$${costs.deductiblePaid.toFixed(2)}` : "$0.00"}
                            </span>
                          </div>
                        )}

                        {costs.patientCoinsuranceShare > 0 && (
                          <div className="flex justify-between text-slate-600">
                            <span>{lang === "en" ? `Coinsurance (${patientCoinsurancePercent}%):` : `共付自付 (${patientCoinsurancePercent}%):`}</span>
                            <span className="font-mono font-semibold text-red-600">
                              +${costs.patientCoinsuranceShare.toFixed(2)}
                            </span>
                          </div>
                        )}

                        {costs.isOopMaxReached && (
                          <div className="flex justify-between text-amber-800 font-bold bg-amber-50 px-1.5 py-1 rounded text-xs">
                            <span>{lang === "en" ? "OOP Max Discount:" : "封顶线优惠折扣:"}</span>
                            <span className="font-mono">-${costs.oopMaxDiscount.toFixed(2)}</span>
                          </div>
                        )}

                        {costs.insuranceShare > 0 && (
                          <div className="flex justify-between text-slate-500 pt-1.5 border-t border-dashed border-slate-200 text-xs sm:text-sm">
                            <span>{lang === "en" ? `Insurance share (${coinsurancePercent}%):` : `保险报销比例 (${coinsurancePercent}%):`}</span>
                            <span className="font-mono text-emerald-600 font-bold">
                              ${costs.insuranceShare.toFixed(2)}
                            </span>
                          </div>
                        )}

                        {/* Deductible status badge pinned at the bottom of the card for ALL plans */}
                        <div className="mt-auto pt-2">
                          {policy.deductible === 0 ? (
                            <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg py-1.5 px-3 flex items-center justify-center gap-1.5 shadow-2xs text-center min-h-[42px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                              <span>{lang === "en" ? "No Deductible" : "无免赔额 ($0 Deductible)"}</span>
                            </div>
                          ) : costs.deductiblePaid >= policy.deductible ? (
                            <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg py-1.5 px-3 flex items-center justify-center gap-1.5 shadow-2xs text-center min-h-[42px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                              <span>{lang === "en" ? "Annual Deductible is met" : "年度免赔额已达标"}</span>
                            </div>
                          ) : costs.deductiblePaid > 0 ? (
                            <div className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg py-1.5 px-3 flex flex-col items-center justify-center gap-0.5 shadow-2xs text-center min-h-[42px]">
                              <div className="flex items-center justify-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                                <span>
                                  {lang === "en"
                                    ? `$${costs.deductiblePaid.toFixed(0)} applied towards deductible`
                                    : `$${costs.deductiblePaid.toFixed(0)} 计入免赔额`}
                                </span>
                              </div>
                              <span className="text-[11px] font-medium text-amber-800">
                                {lang === "en"
                                  ? `$${(policy.deductible - costs.deductiblePaid).toFixed(0)} left`
                                  : `剩余 $${(policy.deductible - costs.deductiblePaid).toFixed(0)}`}
                              </span>
                            </div>
                          ) : (
                            <div className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg py-1.5 px-3 flex flex-col items-center justify-center gap-0.5 shadow-2xs text-center min-h-[42px]">
                              <div className="flex items-center justify-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                                <span>
                                  {lang === "en" ? "$0 applied towards deductible" : "$0 计入免赔额"}
                                </span>
                              </div>
                              <span className="text-[11px] font-medium text-amber-800">
                                {lang === "en" ? `$${policy.deductible} left` : `剩余 $${policy.deductible}`}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Enroll Button */}
                      <div className="pt-2 border-t border-slate-100">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(lang === "en" ? `Redirecting to official enrollment page for ${policy.name}...` : `正在前往 ${policy.name} 的官方在线申请页面...`);
                          }}
                          className="w-full py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs sm:text-sm rounded-lg shadow-2xs hover:shadow-xs transition-all cursor-pointer uppercase tracking-wider text-center"
                        >
                          {lang === "en" ? "Enroll Now" : "立即投保"}
                        </button>
                      </div>

                      {/* Interactive Hint */}
                      <div className="mt-1 text-xs text-center font-bold text-slate-500 group-hover:text-slate-600">
                        {isActiveWalkthrough 
                          ? (lang === "en" ? "✓ Calculation details displayed" : "已展示计算细节") 
                          : (lang === "en" ? "Click to view calculation details" : "点击查看计算细节")}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM SECTION: Calculation Formula & Step-by-Step Educational Breakdown (Overhauled & Slimmed) */}
        <div id="formula-section" className="bg-white rounded-xl border border-red-200 overflow-hidden shadow-xs">
          {/* Section Header */}
          <div className="bg-red-600 text-white py-4 px-6">
            <h2 className="text-xl font-extrabold font-display tracking-normal text-white">
              {lang === "en" ? "3. How is your out-of-pocket cost calculated?" : "3. 如何计算你的自付金额？"}
            </h2>
          </div>

          <div className="p-6 sm:p-10 space-y-10 sm:space-y-12">
            
            {/* The General Formula: Beautiful, completely responsive, wrap-safe, no scroll */}
            {(() => {
              const walkthroughPolicy = POLICIES.find(p => p.id === walkthroughPolicyId) || POLICIES[0];
              const wCopayVal = activeConfig.copays[walkthroughPolicy.id] || 0;
              const wHasCopay = wCopayVal > 0;
              const wHasDeductible = walkthroughPolicy.deductible > 0;

              let equationTitleEn = "DEDUCTIBLE + COINSURANCE CALCULATION";
              let equationTitleZh = "免赔额 (DEDUCTIBLE) + 共付比例计算";

              if (wHasCopay && wHasDeductible) {
                equationTitleEn = "COPAY + DEDUCTIBLE + COINSURANCE CALCULATION";
                equationTitleZh = "定额自付 (COPAY) + 免赔额 (DEDUCTIBLE) + 共付比例计算";
              } else if (wHasCopay && !wHasDeductible) {
                equationTitleEn = "COPAY + COINSURANCE CALCULATION";
                equationTitleZh = "定额共付 (COPAY) + 共付比例计算";
              } else if (!wHasCopay && !wHasDeductible) {
                equationTitleEn = "DIRECT COINSURANCE CALCULATION ($0 DEDUCTIBLE)";
                equationTitleZh = "零免赔额直接共付比例计算";
              }

              return (
                <div className="space-y-2.5 text-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-red-700 block mb-1">
                    {lang === "en" ? equationTitleEn : equationTitleZh}
                  </span>
                    
                    {wHasCopay && wHasDeductible ? (
                      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-sm sm:text-base md:text-lg font-bold text-slate-800 bg-slate-50 border border-slate-200/60 p-4 rounded-xl text-center w-full max-w-full">
                        <span className="text-red-700 bg-red-50/80 px-2.5 py-0.5 rounded border border-red-200">{lang === "en" ? "Copay" : "定额自付 (Copay)"}</span>
                        <span className="text-slate-400">+</span>
                        <span className="text-red-700 bg-red-50/80 px-2.5 py-0.5 rounded border border-red-200">{lang === "en" ? "Deductible" : "免赔额 (Deductible)"}</span>
                        <span className="text-slate-400">+</span>
                        <span className="text-slate-400">(</span>
                        <span className="text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">{lang === "en" ? "Allowed Price" : "协议价"}</span>
                        <span className="text-slate-400">-</span>
                        <span className="text-red-700 bg-red-50/80 px-2.5 py-0.5 rounded border border-red-200">{lang === "en" ? "Copay" : "定额自付 (Copay)"}</span>
                        <span className="text-slate-400">-</span>
                        <span className="text-red-700 bg-red-50/80 px-2.5 py-0.5 rounded border border-red-200">{lang === "en" ? "Deductible" : "免赔额"}</span>
                        <span className="text-slate-400">)</span>
                        <span className="text-slate-400">×</span>
                        <span className="text-slate-400">(</span>
                        <span className="text-slate-700">100%</span>
                        <span className="text-slate-400">-</span>
                        <span className="text-red-600 bg-red-50/80 px-2.5 py-0.5 rounded border border-red-200">{lang === "en" ? "Coinsurance %" : "保险报销 %"}</span>
                        <span className="text-slate-400">)</span>
                        <span className="text-slate-400">=</span>
                        <span className="text-red-600 font-extrabold bg-white px-2.5 py-0.5 rounded border border-red-300">{lang === "en" ? "Total Patient Pay" : "自付总额"}</span>
                      </div>
                    ) : wHasCopay && !wHasDeductible ? (
                      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-sm sm:text-base md:text-lg font-bold text-slate-800 bg-slate-50 border border-slate-200/60 p-4 rounded-xl text-center w-full max-w-full">
                        <span className="text-red-700 bg-red-50/80 px-2.5 py-0.5 rounded border border-red-200">{lang === "en" ? "Copay" : "定额自付 (Copay)"}</span>
                        <span className="text-slate-400">+</span>
                        <span className="text-slate-400">(</span>
                        <span className="text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">{lang === "en" ? "Allowed Price" : "协议价"}</span>
                        <span className="text-slate-400">-</span>
                        <span className="text-red-700 bg-red-50/80 px-2.5 py-0.5 rounded border border-red-200">{lang === "en" ? "Copay" : "定额自付 (Copay)"}</span>
                        <span className="text-slate-400">)</span>
                        <span className="text-slate-400">×</span>
                        <span className="text-slate-400">(</span>
                        <span className="text-slate-700">100%</span>
                        <span className="text-slate-400">-</span>
                        <span className="text-red-600 bg-red-50/80 px-2.5 py-0.5 rounded border border-red-200">{lang === "en" ? "Coinsurance %" : "保险报销 %"}</span>
                        <span className="text-slate-400">)</span>
                        <span className="text-slate-400">=</span>
                        <span className="text-red-600 font-extrabold bg-white px-2.5 py-0.5 rounded border border-red-300">{lang === "en" ? "Total Patient Pay" : "自付总额"}</span>
                      </div>
                    ) : !wHasCopay && wHasDeductible ? (
                      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-sm sm:text-base md:text-lg font-bold text-slate-800 bg-slate-50 border border-slate-200/60 p-4 rounded-xl text-center w-full max-w-full">
                        <span className="text-red-700 bg-red-50/80 px-2.5 py-0.5 rounded border border-red-200">{lang === "en" ? "Deductible" : "免赔额 (Deductible)"}</span>
                        <span className="text-slate-400">+</span>
                        <span className="text-slate-400">(</span>
                        <span className="text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">{lang === "en" ? "Allowed Price" : "协议价"}</span>
                        <span className="text-slate-400">-</span>
                        <span className="text-red-700 bg-red-50/80 px-2.5 py-0.5 rounded border border-red-200">{lang === "en" ? "Deductible" : "免赔额 (Deductible)"}</span>
                        <span className="text-slate-400">)</span>
                        <span className="text-slate-400">×</span>
                        <span className="text-slate-400">(</span>
                        <span className="text-slate-700">100%</span>
                        <span className="text-slate-400">-</span>
                        <span className="text-red-600 bg-red-50/80 px-2.5 py-0.5 rounded border border-red-200">{lang === "en" ? "Coinsurance %" : "保险报销 %"}</span>
                        <span className="text-slate-400">)</span>
                        <span className="text-slate-400">=</span>
                        <span className="text-red-600 font-extrabold bg-white px-2.5 py-0.5 rounded border border-red-300">{lang === "en" ? "Total Patient Pay" : "自付总额"}</span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-sm sm:text-base md:text-lg font-bold text-slate-800 bg-slate-50 border border-slate-200/60 p-4 rounded-xl text-center w-full max-w-full">
                        <span className="text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">{lang === "en" ? "Allowed Price" : "协议价"}</span>
                        <span className="text-slate-400">×</span>
                        <span className="text-slate-400">(</span>
                        <span className="text-slate-700">100%</span>
                        <span className="text-slate-400">-</span>
                        <span className="text-red-600 bg-red-50/80 px-2.5 py-0.5 rounded border border-red-200">{lang === "en" ? "Coinsurance %" : "保险报销 %"}</span>
                        <span className="text-slate-400">)</span>
                        <span className="text-slate-400">=</span>
                        <span className="text-red-600 font-extrabold bg-white px-2.5 py-0.5 rounded border border-red-300">{lang === "en" ? "Total Patient Pay" : "自付总额"}</span>
                      </div>
                    )}
                  </div>
              );
            })()}

            {/* Dynamic Math Walkthrough as a single-line plugged-in formula */}
            {(() => {
              const activePolicy = POLICIES.find(p => p.id === walkthroughPolicyId) || POLICIES[0];
              const activeCosts = calculateCosts(activePolicy, activeConfig, allowedPrice);
              const copayVal = activeConfig.copays[activePolicy.id] || 0;
              const hasCopay = copayVal > 0;
              const hasDeductible = activePolicy.deductible > 0;
              const patientCoinsPercent = 100 - activePolicy.coinsurance;

              return (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="text-center">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50/80 border border-red-200/80 px-3.5 py-1 rounded-full">
                      {lang === "en" ? `Under ${activePolicy.name.toUpperCase()} Plan` : `${activePolicy.name.toUpperCase()} 计划下`}
                    </span>
                  </div>

                  {/* Plugged-In Equation with exact numbers */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-sm sm:text-base md:text-lg font-extrabold text-slate-900 bg-red-50/20 border border-red-100 rounded-xl p-4 text-center w-full max-w-full">
                    {hasCopay && (
                      <>
                        <span className="text-red-700 bg-white border border-red-200 px-2.5 py-1 rounded shadow-2xs font-extrabold">
                          ${activeCosts.copayPaid} <span className="text-xs font-normal text-slate-500">{lang === "en" ? "(Copay)" : "(Copay)"}</span>
                        </span>
                        <span className="text-slate-400 font-normal">+</span>
                      </>
                    )}

                    {hasDeductible && (
                      <>
                        <span className="text-red-700 bg-white border border-red-200 px-2.5 py-1 rounded shadow-2xs font-extrabold">
                          ${activeCosts.deductiblePaid} <span className="text-xs font-normal text-slate-500">{lang === "en" ? "(Ded)" : "(免赔)"}</span>
                        </span>
                        <span className="text-slate-400 font-normal">+</span>
                      </>
                    )}

                    <span className="text-slate-400 font-normal">(</span>
                    <span className="text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded shadow-2xs font-black">${allowedPrice}</span>
                    
                    {hasCopay && (
                      <>
                        <span className="text-slate-400 font-normal">-</span>
                        <span className="text-red-700 bg-white border border-red-200 px-2.5 py-1 rounded shadow-2xs font-extrabold">${activeCosts.copayPaid}</span>
                      </>
                    )}

                    {hasDeductible && (
                      <>
                        <span className="text-slate-400 font-normal">-</span>
                        <span className="text-red-700 bg-white border border-red-200 px-2.5 py-1 rounded shadow-2xs font-extrabold">${activeCosts.deductiblePaid}</span>
                      </>
                    )}

                    <span className="text-slate-400 font-normal">)</span>
                    <span className="text-slate-400 font-normal">×</span>
                    <span className="text-slate-400 font-normal">(</span>
                    <span className="text-slate-600 font-normal">100%</span>
                    <span className="text-slate-400 font-normal">-</span>
                    <span className="text-red-600 bg-white border border-rose-200 px-2.5 py-1 rounded shadow-2xs font-extrabold">{activePolicy.coinsurance}%</span>
                    <span className="text-slate-400 font-normal">)</span>
                    <span className="text-slate-400 font-normal">=</span>
                    <span className="text-white bg-red-600 px-3.5 py-1.5 rounded-lg shadow-sm font-mono font-black text-base sm:text-lg">${activeCosts.totalPatientPay.toFixed(2)}</span>
                  </div>

                  {/* Estimation Disclaimer under Formula Result */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 max-w-2xl mx-auto text-left flex items-start gap-2.5">
                    <Info className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      <strong className="text-slate-800 font-bold mr-1">
                        {lang === "en" ? "Estimation Notice:" : "理赔免责提示："}
                      </strong>
                      {lang === "en"
                        ? "Estimates are for reference only. Actual costs depend on final insurance processing and in-network rates."
                        : "计算结果仅供参考。实际费用以保险公司最终理赔和网络协议价为准。"}
                    </p>
                  </div>

                  {/* Micro breakdown columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {hasCopay && hasDeductible ? (
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 text-left flex flex-col justify-between shadow-2xs">
                        <div>
                          <div className="text-sm font-bold text-red-700 uppercase tracking-wider mb-2">
                            {lang === "en" ? "1. Copay & Deductible Step" : "1. 定额自付 (Copay) 与免赔额 (Deductible) 步骤"}
                          </div>
                          <p className="text-[15px] sm:text-base text-slate-800 leading-relaxed">
                            {lang === "en"
                              ? `This plan requires a $${copayVal} copay plus the annual deductible. In this visit, $${activeCosts.copayPaid} goes to copay and $${activeCosts.deductiblePaid} goes toward your $${activePolicy.deductible} annual deductible.`
                              : `本服务包含 $${copayVal} Copay 及年度免赔额。本次就诊中，$${activeCosts.copayPaid} 支付了 Copay，另外 $${activeCosts.deductiblePaid} 用于冲抵 $${activePolicy.deductible} 的年度免赔额。`}
                          </p>
                        </div>
                        <div className="mt-3.5 pt-3 border-t border-slate-200 text-sm text-slate-700 leading-relaxed">
                          <span className="font-bold text-red-600 block mb-1">
                            {lang === "en" ? "💡 Annual One-Time Rule:" : "💡 年度一次性规则："}
                          </span>
                          {lang === "en" ? (
                            activeCosts.deductiblePaid >= activePolicy.deductible ? (
                              `Paid once per year! Your $${activePolicy.deductible} deductible is fully met on this visit, so future in-network visits this plan year have $0 deductible.`
                            ) : activeCosts.deductiblePaid > 0 ? (
                              `Paid once per year! Deductible is not fully met yet — you paid $${activeCosts.deductiblePaid} toward it, leaving $${(activePolicy.deductible - activeCosts.deductiblePaid).toFixed(0)} remaining for your next visit.`
                            ) : (
                              `Paid once per year! Once your $${activePolicy.deductible} deductible is fully met, future visits have $0 deductible and go straight to Coinsurance.`
                            )
                          ) : (
                            activeCosts.deductiblePaid >= activePolicy.deductible ? (
                              `每学年只需付一次！本次就诊已完全达标 $${activePolicy.deductible} 免赔额，本学年后续网络内就诊将享 $0 免赔额。`
                            ) : activeCosts.deductiblePaid > 0 ? (
                              `每学年只需付一次！本次尚未完全达标（本次抵扣 $${activeCosts.deductiblePaid}，还剩 $${(activePolicy.deductible - activeCosts.deductiblePaid).toFixed(0)} 差额）。下次就诊只需付清剩余部分即可达标。`
                            ) : (
                              `每学年只需付一次！一旦自付满 $${activePolicy.deductible} 门槛，接下来的就诊无需再付免赔额，直接进入比例分摊。`
                            )
                          )}
                        </div>
                      </div>
                    ) : hasCopay ? (
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 text-left shadow-2xs">
                        <div className="text-sm font-bold text-red-700 uppercase tracking-wider mb-2">
                          {lang === "en" ? "1. Copay Step" : "1. 定额自付 (Copay) 步骤"}
                        </div>
                        <p className="text-[15px] sm:text-base text-slate-800 leading-relaxed">
                          {lang === "en"
                            ? `Deductible is not required! You only pay a flat copay of $${copayVal} directly.`
                            : `无需免赔额！您只需直接支付 $${copayVal} 的固定门诊自付额 (Copay)。`}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 text-left flex flex-col justify-between shadow-2xs">
                        <div>
                          <div className="text-sm font-bold text-red-700 uppercase tracking-wider mb-2">
                            {lang === "en" ? "1. Deductible Step" : "1. 起付免赔额 (Deductible) 步骤"}
                          </div>
                          <p className="text-[15px] sm:text-base text-slate-800 leading-relaxed">
                            {lang === "en" ? (
                              activePolicy.deductible === 0 ? (
                                "This plan has no deductible — insurance cost sharing begins immediately."
                              ) : activeCosts.deductiblePaid > 0 ? (
                                `You paid $${activeCosts.deductiblePaid} for deductible on this visit.`
                              ) : (
                                `You pay the first $${activePolicy.deductible} before insurance begins.`
                              )
                            ) : (
                              activePolicy.deductible === 0 ? (
                                "本计划享有 $0 起付免赔额，保险福利将从第一块钱开始直接生效。"
                              ) : activeCosts.deductiblePaid > 0 ? (
                                `本次就诊您自付了 $${activeCosts.deductiblePaid} 的起付免赔额。`
                              ) : (
                                `在保险生效报销前，您需先自付最开始的 $${activePolicy.deductible} 年度免赔额。`
                              )
                            )}
                          </p>
                        </div>
                        {activePolicy.deductible > 0 && (
                          <div className="mt-3.5 pt-3 border-t border-slate-200 text-sm text-slate-700 leading-relaxed">
                            <span className="font-bold text-red-600 block mb-1">
                              {lang === "en" ? "💡 Annual One-Time Rule:" : "💡 年度一次性规则："}
                            </span>
                            {lang === "en" ? (
                              activeCosts.deductiblePaid >= activePolicy.deductible ? (
                                `Paid once per year! Your $${activePolicy.deductible} deductible is fully met on this visit, so future in-network visits this plan year have $0 deductible.`
                              ) : activeCosts.deductiblePaid > 0 ? (
                                `Paid once per year! Deductible is not fully met yet — you paid $${activeCosts.deductiblePaid} toward it, leaving $${(activePolicy.deductible - activeCosts.deductiblePaid).toFixed(0)} remaining for your next visit.`
                              ) : (
                                `Paid once per year! Once your $${activePolicy.deductible} deductible is fully met, future visits have $0 deductible and go straight to Coinsurance.`
                              )
                            ) : (
                              activeCosts.deductiblePaid >= activePolicy.deductible ? (
                                `每学年只需付一次！本次就诊已完全达标 $${activePolicy.deductible} 免赔额，本学年后续网络内就诊将享 $0 免赔额。`
                              ) : activeCosts.deductiblePaid > 0 ? (
                                `每学年只需付一次！本次尚未完全达标（本次抵扣 $${activeCosts.deductiblePaid}，还剩 $${(activePolicy.deductible - activeCosts.deductiblePaid).toFixed(0)} 差额）。下次就诊只需付清剩余部分即可达标。`
                              ) : (
                                `每学年只需付一次！一旦自付满 $${activePolicy.deductible} 门槛，接下来的就诊无需再付免赔额，直接进入比例分摊。`
                              )
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {activeCosts.coinsuranceBase > 0 ? (
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 text-left shadow-2xs">
                        <div className="text-sm font-bold text-red-700 uppercase tracking-wider mb-2">
                          {lang === "en" ? "2. Coinsurance Step" : "2. 共付比例分摊 (Coinsurance) 步骤"}
                        </div>
                        <p className="text-[15px] sm:text-base text-slate-800 leading-relaxed">
                          {lang === "en"
                            ? `The remaining $${activeCosts.coinsuranceBase} is split: you pay your share of ${patientCoinsPercent}% ($${activeCosts.patientCoinsuranceShare.toFixed(2)}), and insurance pays ${activePolicy.coinsurance}%.`
                            : `账单剩余的 $${activeCosts.coinsuranceBase} 由双方比例分摊：您付 ${patientCoinsPercent}% ($${activeCosts.patientCoinsuranceShare.toFixed(2)})，保险报销 ${activePolicy.coinsurance}%。`}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 text-left shadow-2xs opacity-75">
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                          {lang === "en" ? "2. Coinsurance Step ($0 Remaining)" : "2. 共付比例分摊（无剩余金额）"}
                        </div>
                        <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed">
                          {lang === "en"
                            ? `The entire bill was covered by Copay/Deductible ($${activeCosts.copayPaid + activeCosts.deductiblePaid}), so no coinsurance split applies for this visit.`
                            : `账单已全部由 Copay / 免赔额（$${activeCosts.copayPaid + activeCosts.deductiblePaid}）满足，本次就诊无剩余金额进入比例分摊阶段。`}
                        </p>
                      </div>
                    )}

                    <div className={`p-5 rounded-xl border text-left shadow-2xs ${
                      activeCosts.isOopMaxReached 
                        ? "bg-amber-50/80 border-amber-300" 
                        : "bg-slate-50 border-slate-200/60"
                    }`}>
                      <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${
                        activeCosts.isOopMaxReached ? "text-amber-900" : "text-red-700"
                      }`}>
                        {activeCosts.isOopMaxReached 
                          ? (lang === "en" ? "3. 🛡️ Out-of-Pocket Max Cap Reached!" : "3. 🛡️ 已触及年度自付封顶上限 (OOPM)！")
                          : (lang === "en" ? "3. Real-World Pricing" : "3. 真实世界定价")}
                      </div>
                      <p className={`text-[15px] sm:text-base leading-relaxed ${
                        activeCosts.isOopMaxReached ? "text-amber-950 font-medium" : "text-slate-800"
                      }`}>
                        {activeCosts.isOopMaxReached ? (
                          lang === "en"
                            ? `Calculated cost ($${activeCosts.uncappedPatientPay.toFixed(2)}) exceeded the plan's Out-of-Pocket Maximum of $${activePolicy.oopMax.toLocaleString()}. Your payment is capped at $${activePolicy.oopMax.toFixed(2)}, and insurance covers 100% of the rest ($${activeCosts.insuranceShare.toFixed(2)})!`
                            : `推导出的自付分摊 ($${activeCosts.uncappedPatientPay.toFixed(2)}) 超过了本计划的年度自付上限 $${activePolicy.oopMax.toLocaleString()}。您的自付额封顶为 $${activePolicy.oopMax.toFixed(2)}，超出部分均由保险公司 100% 全额承担 ($${activeCosts.insuranceShare.toFixed(2)})！`
                        ) : (
                          lang === "en"
                            ? "In real-world health insurance, doctors and clinics negotiate a discounted 'Allowed Amount' (contracted rate). This simulator simplifies calculations by treating your entered bill amount directly as this allowed amount."
                            : "在真实的医疗理赔中，诊所与医院会与保险网络商定打折后的‘允许金额 (Allowed Amount)’。为了简化演示并避免混淆，本模拟器直接基于您输入的账单金额作为允许的协议价格进行计算。"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>



        {/* SECTION 4: Appendix - Complete Benefit Schedule & Brochure Details */}
        <div className="bg-white rounded-2xl border-2 border-slate-300 overflow-hidden shadow-xs space-y-4 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-normal font-display">
                {lang === "en" ? "4. Appendix: Complete Benefit Schedule" : "4. 附录：完整保险保障明细表"}
              </h2>
            </div>

            {/* Expand / Collapse Button */}
            <button
              onClick={() => setAppendixExpanded(!appendixExpanded)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-950 text-white hover:bg-slate-900 transition-colors rounded-xl text-sm font-bold shadow-xs cursor-pointer self-start sm:self-center"
            >
              <span>{appendixExpanded ? (lang === "en" ? "Collapse Schedule" : "收起保障表") : (lang === "en" ? "Expand All 26 Benefits" : "展开全部 26 项福利")}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${appendixExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Interactive Filtering and Searching Controls (Only show when expanded) */}
          {appendixExpanded && (
            <div className="bg-slate-50 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                {[
                  { id: "all", label: lang === "en" ? "All Benefits" : "全部保障" },
                  { id: "General Policy Details", label: lang === "en" ? "Core Details" : "核心概览" },
                  { id: "Outpatient Services", label: lang === "en" ? "Outpatient" : "门诊服务" },
                  { id: "Inpatient Services", label: lang === "en" ? "Inpatient" : "住院服务" },
                  { id: "Other Services", label: lang === "en" ? "Other Services" : "其他服务" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setAppendixCategory(tab.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all border ${
                      appendixCategory === tab.id
                        ? "bg-white text-red-600 border-red-200 shadow-3xs"
                        : "bg-transparent text-slate-600 border-transparent hover:text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Live search input */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder={lang === "en" ? "Search benefits (e.g. Copay, Coinsurance)..." : "搜索保障项目 (例如 Copay, 免赔额)..."}
                  value={appendixSearch}
                  onChange={(e) => setAppendixSearch(e.target.value)}
                  className="w-full pl-3.5 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-red-500 font-medium placeholder-slate-400"
                />
                {appendixSearch && (
                  <button
                    onClick={() => setAppendixSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-x-auto border-2 border-slate-300 rounded-xl">
            <table className="w-full text-left border-collapse table-fixed min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/75 border-b-2 border-slate-300 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-600">
                  <th className="p-3.5 w-1/4">{lang === "en" ? "Benefit / Expense Covered" : "医疗保障细目 / 承保服务内容"}</th>
                  
                  {/* Supreme */}
                  <th className={`p-3.5 w-[18%] transition-all ${
                    walkthroughPolicyId === "supreme" 
                      ? "bg-amber-500/[0.06] text-amber-900 border-x-2 border-t border-amber-500/30" 
                      : ""
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Supreme</span>
                    </div>
                  </th>

                  {/* Elite */}
                  <th className={`p-3.5 w-[18%] transition-all ${
                    walkthroughPolicyId === "elite" 
                      ? "bg-red-500/[0.06] text-red-900 border-x-2 border-t border-red-500/30" 
                      : ""
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400"></span>
                      <span>Elite</span>
                    </div>
                  </th>

                  {/* Prime 100 */}
                  <th className={`p-3.5 w-[18%] transition-all ${
                    walkthroughPolicyId === "prime100" 
                      ? "bg-blue-500/[0.06] text-blue-900 border-x-2 border-t border-blue-500/30" 
                      : ""
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>Prime 100</span>
                    </div>
                  </th>

                  {/* Prime 500 */}
                  <th className={`p-3.5 w-[18%] transition-all ${
                    walkthroughPolicyId === "prime500" 
                      ? "bg-emerald-500/[0.06] text-emerald-900 border-x-2 border-t border-emerald-500/30" 
                      : ""
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Prime 500</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
                {(() => {
                  // Filter logic based on states
                  const displayRows = APPENDIX_ROWS.filter((row) => {
                    if (!appendixExpanded) {
                      return row.category === "General Policy Details" && 
                        ["Who is eligible?", "Deductible (In-network)", "Coinsurance (In-network)", "Out-of-Pocket Maximum (In-network, Per Policy Year)", "Preferred Network"].includes(row.benefit);
                    }
                    if (appendixCategory !== "all" && row.category !== appendixCategory) return false;
                    if (appendixSearch.trim()) {
                      const q = appendixSearch.toLowerCase();
                      return row.benefit.toLowerCase().includes(q) ||
                             row.supreme.toLowerCase().includes(q) ||
                             row.elite.toLowerCase().includes(q) ||
                             row.prime100.toLowerCase().includes(q) ||
                             row.prime500.toLowerCase().includes(q);
                    }
                    return true;
                  });

                  if (displayRows.length === 0) {
                    return (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500 font-medium text-sm">
                          {lang === "en" 
                            ? `No matching benefits found for "${appendixSearch}".` 
                            : `未找到与 "${appendixSearch}" 匹配的医疗保障细目。`}
                        </td>
                      </tr>
                    );
                  }

                  // Group by category to show header rows when expanded and not searching
                  let lastCategory = "";

                  return displayRows.map((row, idx) => {
                    const showCategoryHeader = appendixExpanded && !appendixSearch && row.category !== lastCategory;
                    if (showCategoryHeader) {
                      lastCategory = row.category;
                    }

                    return (
                      <tr key={idx} className="hover:bg-slate-50/40 transition-colors border-b border-slate-200">
                        {/* Benefit column with optional category heading prepended */}
                        <td className="p-3.5 font-medium text-slate-900 border-r border-slate-200">
                          {showCategoryHeader && (
                            <span className="block text-xs font-bold text-red-600 uppercase tracking-widest mb-1">
                              {getTranslatedAppendixCategory(row.category, lang)}
                            </span>
                          )}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span>{getTranslatedBenefitName(row.benefit, lang)}</span>
                            {row.benefit.includes("Prescription") && (
                              <span className="relative group cursor-help inline-flex items-center">
                                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-red-500 transition-colors" />
                                <span className="absolute z-50 bottom-full left-0 mb-2 w-72 sm:w-80 p-3 bg-slate-950 text-white text-xs font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none text-left whitespace-pre-line leading-relaxed">
                                  <span className="block font-bold text-red-400 mb-1 uppercase text-xs">{t("row_prescription")} (Tiers 1, 2, 3)</span>
                                  {t("tooltip_prescription")}
                                </span>
                              </span>
                            )}
                            {row.benefit.includes("Preventive") && (
                              <span className="relative group cursor-help inline-flex items-center">
                                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-red-500 transition-colors" />
                                <span className="absolute z-50 bottom-full left-0 mb-2 w-72 sm:w-80 p-3 bg-slate-950 text-white text-xs font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none text-left whitespace-pre-line leading-relaxed">
                                  <span className="block font-bold text-red-400 mb-1 uppercase text-xs">Preventive Care Services</span>
                                  {t("tooltip_preventive_care")}
                                </span>
                              </span>
                            )}
                            {row.benefit.includes("Physical Exams") && (
                              <span className="relative group cursor-help inline-flex items-center">
                                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-red-500 transition-colors" />
                                <span className="absolute z-50 bottom-full left-0 mb-2 w-72 sm:w-80 p-3 bg-slate-950 text-white text-xs font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none text-left whitespace-pre-line leading-relaxed">
                                  <span className="block font-bold text-red-400 mb-1 uppercase text-xs">Routine Physical Exams</span>
                                  {t("tooltip_physical_exam")}
                                </span>
                              </span>
                            )}
                            {row.benefit.includes("Adult Vision") && (
                              <span className="relative group cursor-help inline-flex items-center">
                                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-red-500 transition-colors" />
                                <span className="absolute z-50 bottom-full left-0 mb-2 w-72 sm:w-80 p-3 bg-slate-950 text-white text-xs font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none text-left whitespace-pre-line leading-relaxed">
                                  <span className="block font-bold text-red-400 mb-1 uppercase text-xs">Adult Vision Benefits</span>
                                  {t("tooltip_adult_vision")}
                                </span>
                              </span>
                            )}
                            {row.benefit.includes("Benefit Packages") && (
                              <span className="relative group cursor-help inline-flex items-center">
                                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-red-500 transition-colors" />
                                <span className="absolute z-50 bottom-full left-0 mb-2 w-72 sm:w-80 p-3 bg-slate-950 text-white text-xs font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none text-left whitespace-pre-line leading-relaxed">
                                  <span className="block font-bold text-red-400 mb-1 uppercase text-xs">Benefit Packages</span>
                                  {t("tooltip_benefit_packages")}
                                </span>
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Supreme */}
                        <td className={`p-3.5 font-medium transition-all ${
                          walkthroughPolicyId === "supreme" 
                            ? "bg-amber-500/[0.015] border-x-2 border-amber-500/20 font-semibold text-amber-950" 
                            : ""
                        }`}>
                          {getTranslatedBrochureValue(row.supreme, lang)}
                        </td>

                        {/* Elite */}
                        <td className={`p-3.5 font-medium transition-all ${
                          walkthroughPolicyId === "elite" 
                            ? "bg-red-500/[0.015] border-x-2 border-red-500/20 font-semibold text-red-950" 
                            : ""
                        }`}>
                          {getTranslatedBrochureValue(row.elite, lang)}
                        </td>

                        {/* Prime 100 */}
                        <td className={`p-3.5 font-medium transition-all ${
                          walkthroughPolicyId === "prime100" 
                            ? "bg-blue-500/[0.015] border-x-2 border-blue-500/20 font-semibold text-blue-950" 
                            : ""
                        }`}>
                          {getTranslatedBrochureValue(row.prime100, lang)}
                        </td>

                        {/* Prime 500 */}
                        <td className={`p-3.5 font-medium transition-all ${
                          walkthroughPolicyId === "prime500" 
                            ? "bg-emerald-500/[0.015] border-x-2 border-emerald-500/20 font-semibold text-emerald-950" 
                            : ""
                        }`}>
                          {getTranslatedBrochureValue(row.prime500, lang)}
                        </td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>

          {/* Quick toggle at bottom when collapsed for premium UX */}
          {!appendixExpanded && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setAppendixExpanded(true)}
                className="text-sm font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer transition-all"
              >
                {lang === "en" 
                  ? "Expand detailed specifications (including Outpatient & Inpatient services) →" 
                  : "展开详细计划书细则 (包含住院与门诊服务) →"}
              </button>
            </div>
          )}
        </div>

      </main>

      {/* Elegant minimalist footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center mb-2">
            <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/60 inline-flex items-center justify-center">
              <Logo isDark variant="full" className="h-8 sm:h-9 w-auto" />
            </div>
          </div>
          <p className="text-sm font-mono font-medium">
            {lang === "en" 
              ? "Claims Scenario Simulation • Built with React and Tailwind" 
              : "理赔情景模拟 • 基于 React 与 Tailwind CSS 开发"}
          </p>
          <div className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            {lang === "en" 
              ? "This tool provides interactive scenario simulations based on variables provided by student policies. Always consult official university student health plan brochures (UHC/Anthem) for final details, exceptions, copays, and out-of-pocket maximum rules."
              : "本系统提供的交互式情景模拟与费用分摊计算结果仅供自付额度政策对比和教育学习参考之用。具体的实际就医理赔规则、保障例外、特定Copay和年度最高自付上限等详情，请务必咨询学校、合作方 (Student Medicover) 或保险公司官方保单手册。"}
          </div>
        </div>
      </footer>
    </div>
  );
}
