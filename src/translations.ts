export type Language = "en" | "zh";

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    brand: "Student Medicover",
    title_part1: "How Much Can Your Insurance Plan Save You? ",
    title_part2: "Claims Scenario Simulation",
    desc: "Understand core policy terms and reimbursement calculation methods to choose the insurance you need most.",
    disclaimer_title: "Important Disclaimer Notice",
    disclaimer_desc: "This Claims Scenario Simulation aims to facilitate understanding of insurance terms and how claims are calculated, but is no guarantee of final costs. Results cannot be used as a standard for real claims, benefit determinations, or billing settlements. Calculations apply to in-network providers only and assume your bill meets specific coverage conditions (such as medical necessity and prior authorizations). Your actual out-of-pocket costs may vary depending on medical coding, contracted provider rates, services received, and extra non-covered fees (such as facility fees or out-of-network balance billing).",
    
    step1_title: "1. Select Your Medical Visit Type (Simulation)",
    step1_desc: "Choose the kind of medical service billed. Different service types are subject to different copay and deductible rules.",
    selected_category: "SELECTED CATEGORY",
    payment_rule_applied: "Payment Rule Applied",
    
    step2_title: "2. Under Different Plans, How Much Will You Pay Out-of-Pocket for This Bill?",
    reset_defaults: "Reset Defaults",
    billed_cost: "Bill Amount (Allowed/Contracted Rate)",
    original_invoice: "Allowed Bill Amount",
    allowed_price: "Allowed Price (Contracted Rate)",
    in_network_max: "In-Network Maximum",
    slider_billed_desc: "The simulated bill amount (treated directly as the allowed/contracted amount).",
    slider_range_note: "Presets reflect typical costs for this visit type, though actual bills may vary or exceed this range. Feel free to type in any custom amount.",
    slider_allowed_desc: "The discounted, contracted rate negotiated by insurance.",
    slider_allowed_note: "Note: The usual allowed price is typically 30% of the bill (default), though it can vary depending on in-network contracts.",
    
    in_network_benefit: "IN-NETWORK BENEFIT",
    savings_discount: "In-Network Savings Discount",
    savings_desc: "Because you went in-network, the network immediately discounts the bill by {savings}. This is never charged to you!",
    immediate_savings: "IMMEDIATE SAVINGS",
    
    step3_title: "3. How is your out-of-pocket cost calculated?",
    how_is_oop_calculated: "How is this out-of-pocket cost calculated?",
    step3_desc: "Compare how each student health plan handles this specific bill category under the same cost parameters.",
    show_relative_bars: "Show relative cost breakdown bars",
    
    table_plan_details: "PLAN DETAILS",
    table_deductible_met: "DEDUCTIBLE MET",
    table_coinsurance_share: "COINSURANCE SHARE",
    table_est_patient_pay: "ESTIMATED PATIENT PAY",
    
    row_deductible: "Deductible",
    row_coinsurance: "Coinsurance",
    row_oop_max: "Out-of-pocket Maximum",
    row_max_benefit: "Maximum Benefit",
    row_prescription: "Prescription Drugs",
    row_annual_premium: "Annual Premium",
    tooltip_deductible: "The annual amount you must pay out-of-pocket for covered medical services before your insurance starts to pay.",
    tooltip_coinsurance: "The percentage of allowed medical costs that you or the insurance pays after meeting the deductible. If coinsurance is 80%, insurance pays 80% and you pay 20% of the contracted rate.",
    tooltip_oop_max: "The absolute maximum amount you could pay in a policy year for covered in-network services. Once reached, the insurance plan pays 100% of all covered medical services for the rest of the year.",
    tooltip_max_benefit: "This refers to the maximum amount an insurance company will pay for covered services during a specific coverage period. All plans featured here provide Unlimited maximum benefit coverage.",
    tooltip_prescription: "Pay a fixed copay or a percentage of cost for Tier 1, 2, and 3 drugs respectively:\n• Tier 1: Generic drugs.\n• Tier 2: Preferred brand-name drugs.\n• Tier 3: Non-preferred / specialty drugs.",
    tooltip_annual_premium: "The standard total price you pay to purchase this health insurance plan for the entire academic policy year. It is paid upfront and guarantees continuous medical protection.",
    tooltip_preventive_care: "Enjoy $0 copay, $0 deductible, and 0% coinsurance (100% covered) for in-network preventive care services like vaccines (CDC ACIP immunization recommendations), TB testing, and other wellness screenings listed under the ACA Preventive Services standards (USPSTF Grade A & B recommendations, HRSA Comprehensive Guidelines, and Public Health Service Act Section 2713).",
    tooltip_physical_exam: "Routine Physical Exams: Routine full-body physical examinations, health screenings, and diagnostic testing not covered under Preventive Care.",
    tooltip_adult_vision: "Adult Vision Benefits (Students Age 19+):\n• Routine Eye Exam: 1 exam per policy year up to $100.\n• Vision Care Supplies: Combined maximum of $200 every 24 months for lenses and frames, including contacts.",
    tooltip_benefit_packages: "Student Care Benefit Packages:\n• Supreme: 6 exclusive benefits (OTC medicine kit, 4x nutritional supplements, 6x mental counseling sessions, dental insurance benefit, physical exam, and 30-day travel insurance).\n• Elite: 4 exclusive benefits (OTC medicine kit, 4x nutritional supplements, 6x mental counseling sessions, and dental insurance benefit).\n• Prime 100 & Prime 500: Not included (optional add-on).",
    
    enroll_now: "Enroll Now",
    waived_copay_applies: "Not Required (Copay Applies)",
    met_of: "Met of",
    patient_pays_of_remaining: "Patient Pays {percent}% of remaining",
    insurance_pays_of_remaining: "Insurance Pays {percent}% of remaining",
    patient_pays_of_allowed: "Patient Pays 100% of allowed",
    insurance_pays_nothing: "Insurance Pays 0%",
    total_out_of_pocket: "Total Out-of-Pocket Cost",
    insurance_responsibility: "Insurance Responsibility",
    
    benefit_comparison_table: "Benefit Comparison Table",
    step4_title: "4. Core Plan Benefits & Exclusion Criteria",
    step4_desc: "Check key visual benefits side-by-side. Hover your mouse pointer over any benefit card to view a floating explanation of what is included, or why the service is not covered.",
    benefits_status: "Benefits status",
    ultimate_abroad: "Ultimate Abroad",
    ultimate_arrival: "Ultimate Arrival",
    
    how_costs_calculated: "How Health Insurance Costs are Calculated",
    copay_coins_equation: "Copay + Coinsurance Equation",
    deduct_coins_equation: "Standard Deductible + Coinsurance Equation",
    live_numbers: "Live Numbers: {policy}",
    patient_pays_100_directly: "Patient Pays 100% of allowed directly",
    copay_step_title: "1. Copay Step",
    copay_step_desc: "Deductible is not required! You pay a flat copay of {copay} directly. In this case, {amount} goes to copay.",
    deduct_step_title: "1. Deductible Step",
    deduct_step_desc: "You pay the first {deductible}. In this case, {amount} goes to meet the deductible.",
    coins_step_title: "2. Coinsurance Step",
    coins_step_desc: "The remaining {base} is split: you pay {percent}% ({amount}), and insurance pays {ins_percent}%.",
    discount_step_title: "3. Contract Discount",
    discount_step_desc: "In-network contract discounted {savings} (difference between billed {billed} and allowed {allowed}). You never pay this difference!",
    
    brochure_extract: "Official Brochure Extract",
    appendix_title: "Appendix: Complete Benefit Schedule",
    appendix_desc_expanded: "Explore all 26 inpatient, outpatient, and prescription benefits extracted directly from official student health plan certificates.",
    appendix_desc_collapsed: "View a quick core summary of plan benefits. Toggle expand below to search and view the complete benefit comparison.",
    collapse_schedule: "Collapse Schedule",
    expand_all: "Expand All 26 Benefits",
    search_placeholder: "Search benefits (e.g. Copay, Coinsurance)...",
    no_matching_benefits: "No matching benefits found for \"{query}\".",
    expand_detailed_specs: "Expand detailed specifications (including Outpatient & Inpatient services) &rarr;",
    
    all_benefits: "All Benefits",
    core_details: "Core Details",
    outpatient: "Outpatient",
    inpatient: "Inpatient",
    other_services: "Other Services",
    benefit_expense_covered: "Benefit / Expense Covered",
    
    footer_text: "Claims Scenario Simulation • Built with React and Tailwind",
    footer_disclaimer: "This Claims Scenario Simulation provides coverage examples to show how health plans cover medical care. Your actual costs will be different depending on the actual care you receive, the prices your providers charge, and many other factors. Focus on the cost-sharing amounts (deductibles, copayments and coinsurance) and excluded services under the plan. Use this information to compare the portion of costs you might pay under different health plans. Please note these coverage examples are based on self-only coverage."
  },
  zh: {
    brand: "Student Medicover 留学生医保",
    title_part1: "你的保险计划可为你节省多少费用？",
    title_part2: "理赔情景模拟",
    desc: "理解保险核心条款与理赔计算方式，选择你最需要的保险",
    disclaimer_title: "重要免责声明须知",
    disclaimer_desc: "本理赔情景模拟旨在帮助理解保险条款与理赔计算方式，但不对最终费用作任何保证。计算结果不可用作实际理赔的标准、保障判定或账单结算凭据。本估算仅限网络内医疗机构 (In-Network)，且假设就诊满足计划的前提条件（如医疗必需性、转诊与预先授权等）。您的实际自付金额将有可能变动，取决于具体诊疗代码、网络协议价、实际服务内容及可能产生的未纳保额外费用（如设施费 Facility Fees 或网络外差额账单 Balance Billing）。",
    
    step1_title: "1. 选择你的就医类型（模拟）",
    step1_desc: "选择您所收到或预计进行的医疗服务类型。不同的服务类型适用不同的门诊自付额（Copay）和免赔额（Deductible）规则。",
    selected_category: "已选账单类别",
    payment_rule_applied: "适用的自付规则",
    
    step2_title: "2. 不同计划下，你需为该账单自付的金额是？",
    reset_defaults: "重置默认值",
    billed_cost: "账单金额 (Allowed/协议打折价)",
    original_invoice: "允许的协议账单金额",
    allowed_price: "协议打折价 (Allowed Price)",
    in_network_max: "网络内协议最高价",
    slider_billed_desc: "模拟账单金额（直接作为允许的协议价格计算）。",
    slider_range_note: "预设数值为该就医类型的常见参考区间，实际账单可能有所浮动或超出此范围，支持直接输入任意自定义金额。",
    slider_allowed_desc: "保险网络协商达成的打折协议价格（网络内价格）。",
    slider_allowed_note: "注：通常网络协议价格约为账单金额的30%（默认值），具体取决于网络合同。",
    
    in_network_benefit: "网络内福利",
    savings_discount: "网络内专属节省折扣",
    savings_desc: "因为您使用的是网络内（In-Network）机构，保险网络将直接减免账单金额中的 {savings}。这笔减免金额绝不需要您支付！",
    immediate_savings: "直接为您节省",
    
    step3_title: "3. 如何计算你的自付金额？",
    how_is_oop_calculated: "该自付金额是如何计算出的？",
    step3_desc: "对比在相同的账单金额和协议价参数下，各个计划对该项医疗服务的费用分摊和您的最终自付金额。",
    show_relative_bars: "显示相对费用分摊条形图",
    
    table_plan_details: "计划详情",
    table_deductible_met: "自付免赔额",
    table_coinsurance_share: "共付比例分摊 (Coinsurance)",
    table_est_patient_pay: "估算您需支付的总额",
    
    row_deductible: "年度免赔额 (Deductible)",
    row_coinsurance: "保险赔付比例 (Coinsurance)",
    row_oop_max: "年度最高自付限额 (OOP Max)",
    row_max_benefit: "最高保额 (Max Benefit)",
    row_prescription: "处方药自付额",
    row_annual_premium: "年度保费",
    tooltip_deductible: "年度免赔额（起付线）。在保险开始为您报销之前，您每年必须自付的医疗服务费总额。",
    tooltip_coinsurance: "共付比例。满足免赔额后，由您和保险公司分摊协议价医疗费用的比例。例如：共付比例为 80%，代表保险报销 80%，您自费 20%。",
    tooltip_oop_max: "年度最高自付上限。在一个保单年度内，您为网络内涵盖的服务支付的绝对最高自费总额。一旦达到该上限，保险公司将承担该年余下时间 100% 的全部医疗开支。",
    tooltip_max_benefit: "最高保额指保险公司在特定保障期内为受保医疗服务支付的最高金额（本页面所有计划均提供无上限 Unlimited 保额保障）。",
    tooltip_prescription: "按药物等级（Tier 1、2、3）分别支付固定 Copay 或自付比例：\n• Tier 1：仿制普药 (Generic)\n• Tier 2：首选品牌药 (Preferred Brand)\n• Tier 3：非首选/特药 (Non-Preferred / Specialty)",
    tooltip_annual_premium: "购买此医疗保险计划一整个学年的保费总额。预先支付，保障您在该保险年度内享受持续的健康保险待遇。",
    tooltip_preventive_care: "享受 $0 Copay、$0 免赔额及 0% Coinsurance（网络内 100% 全额报销）：涵盖疫苗接种（CDC ACIP 免疫规划推荐）、结核菌素检测（TB Test）以及平价医疗法案（ACA / 公共卫生服务法案 Section 2713）预防性服务标准（USPSTF A/B 级推荐与 HRSA 综合指南）中所列的各项健康筛查与预防性医疗服务。",
    tooltip_physical_exam: "常规全身体格检查：包含未列入预防性医疗服务范围的常规全身体检、健康筛查及相关诊断化验。",
    tooltip_adult_vision: "成人视力福利（满 19 岁及以上学生）：\n• 常规眼科检查：每保单年度 1 次，最高报销 $100。\n• 配镜与隐形眼镜：每 24 个月最高报销 $200（含镜片、镜架及隐形眼镜）。",
    tooltip_benefit_packages: "留学生关怀保障包：\n• Supreme：赠送 6 大专属权益（常备药包、4套营养品、6次心理咨询、牙科保险、体检及30天旅游险）。\n• Elite：赠送 4 大专属权益（常备药包、4套营养品、6次心理咨询及牙科保险）。\n• Prime 100 与 Prime 500：不包含（可按需选购）。",
    
    enroll_now: "立即投保",
    waived_copay_applies: "不适用（仅需支付 Copay）",
    met_of: "已满足 / 总额",
    patient_pays_of_remaining: "用户自付协议价剩余部分的 {percent}%",
    insurance_pays_of_remaining: "保险支付协议价剩余部分的 {percent}%",
    patient_pays_of_allowed: "用户自付100%协议价",
    insurance_pays_nothing: "保险支付 0%",
    total_out_of_pocket: "用户自付总金额 (Out-of-Pocket)",
    insurance_responsibility: "保险公司承担金额",
    
    benefit_comparison_table: "核心福利对比表",
    step4_title: "4. 核心计划福利与承保限制对比",
    step4_desc: "横向对比各项关键福利。将鼠标指针悬停在任何福利项目上，可以查看该福利所包含的具体范围，或不予承保的中文说明。",
    benefits_status: "福利承保状态",
    ultimate_abroad: "Ultimate Abroad 增值保障包",
    ultimate_arrival: "Ultimate Arrival 增值保障包",
    
    how_costs_calculated: "如何计算你的自付金额？",
    copay_coins_equation: "Copay + Coinsurance 计算方式",
    deduct_coins_equation: "标准免赔额 + Coinsurance 计算方式",
    live_numbers: "实时计算过程: {policy}",
    patient_pays_100_directly: "用户直接支付 100% 的协议价金额",
    copay_step_title: "1. Copay 步骤",
    copay_step_desc: "无需免赔额！您直接每次就诊支付固定的 Copay 门诊自付额 {copay}。在此计算中，您支付的 {amount} 用于 Copay。",
    deduct_step_title: "1. 免赔额（Deductible）步骤",
    deduct_step_desc: "您需要自己支付最开始的免赔额 {deductible}。在本项服务中，您的 {amount} 用于满足起付线。",
    coins_step_title: "2. 共付比例（Coinsurance）步骤",
    coins_step_desc: "协议价扣除上述起付部分后，剩余的 {base} 将按比例拆分：您承担 <b>{percent}%（即 {amount}）</b>，保险公司承担 <b>{ins_percent}%</b>。",
    discount_step_title: "3. 医疗折扣",
    discount_step_desc: "选择网络内医疗机构共为您减免了 {savings}（原始账单 ${billed} 与网络协议价 ${allowed} 的差额）。此差额部分保险公司已为您省去，您无需支付！",
    
    brochure_extract: "官方宣传册提取",
    appendix_title: "附录：完整医疗服务福利一览表",
    appendix_desc_expanded: "查看直接从官方留学生健康保险条款中提取的全部 26 项住院、门诊及处方药福利细节。",
    appendix_desc_collapsed: "查看计划的核心福利摘要。点击下方展开以进行搜索和查看完整福利对比。",
    collapse_schedule: "收起福利表",
    expand_all: "展开全部 26 项福利",
    search_placeholder: "搜索福利（例如：Copay、Coinsurance、住院）...",
    no_matching_benefits: "未找到与 \"{query}\" 匹配的福利。",
    expand_detailed_specs: "展开详细保障规格（包含住院与门诊服务） &rarr;",
    
    all_benefits: "全部福利",
    core_details: "核心详情",
    outpatient: "门诊服务",
    inpatient: "住院服务",
    other_services: "其他服务",
    benefit_expense_covered: "涵盖的医疗福利 / 费用项目",
    
    footer_text: "理赔情景模拟 • 基于 React 与 Tailwind 驱动",
    footer_disclaimer: "本理赔情景模拟所展示的诊疗项目仅作为本保险计划可能如何承保医疗照顾的示意示例。您的实际看病费用将有所不同，具体取决于您接受的实际治疗、医疗服务提供方的收费价格及许多其他因素。请重点关注计划下的费用分摊金额（免赔额、定额自付和自付比例）以及排除不保的诊疗服务。请利用这些信息来对比您在不同健康保险计划下可能承担的费用比例。请注意，这些保障示例均基于个人单人（Self-only）承保范围。"
  }
};

export const getTranslatedCategoryName = (id: string, lang: Language): string => {
  const map: Record<string, Record<Language, string>> = {
    lab: {
      en: "Outpatient Lab Test / Diagnostic X-Ray",
      zh: "门诊化验检查与 X 光 / 诊断项目"
    },
    doctor: {
      en: "Doctor / Specialist / Therapist Visit",
      zh: "医生 / 专科医生 / 理疗门诊"
    },
    urgent: {
      en: "Urgent Care Visit",
      zh: "急诊诊所 (Urgent Care) 就诊"
    },
    surgery: {
      en: "Surgery",
      zh: "手术项目"
    },
    er: {
      en: "Emergency Room (ER) Visit",
      zh: "急诊室 (ER) 急诊"
    }
  };
  return map[id]?.[lang] || id;
};

export const getTranslatedCategorySubtitle = (id: string, lang: Language): string => {
  const map: Record<string, Record<Language, string>> = {
    lab: {
      en: "Outpatient diagnostic lab procedures, blood tests, and X-ray imaging",
      zh: "门诊化验检查、血液检测及 X 光等常规诊断项目"
    },
    doctor: {
      en: "Outpatient office visits (Primary Care, Specialist, Mental Health / Therapist)",
      zh: "门诊诊所就诊（全科医生、专科医生、心理健康/咨询）"
    },
    urgent: {
      en: "Urgent Care Center visits for non-life-threatening conditions",
      zh: "非危及生命的紧急就医（Urgent Care 诊所就诊）"
    },
    surgery: {
      en: "Surgical procedures (Inpatient or Outpatient surgeries)",
      zh: "所有手术治疗项目（包含门诊手术与住院手术，保障规则相同）"
    },
    er: {
      en: "Emergency medical treatment (copay is not required if admitted to hospital)",
      zh: "紧急医疗救治（若直接收治住院，将无需缴纳急诊自付额）"
    }
  };
  return map[id]?.[lang] || id;
};

export const getTranslatedCategoryDescription = (id: string, lang: Language): string => {
  const map: Record<string, Record<Language, string>> = {
    lab: {
      en: "Subject to deductible (extra $30 copay for Prime 500), and the remaining costs are shared by coinsurance.",
      zh: "扣除免赔额（Prime 500 另含 $30 Copay），剩余费用按共付比例分摊。"
    },
    doctor: {
      en: "Pay a flat copay per visit; the annual deductible is not required. Remaining costs are shared by coinsurance.",
      zh: "每次就诊支付固定 Copay，无需扣除年度免赔额。剩余费用由双方按比例分摊。"
    },
    urgent: {
      en: "Pay a flat Urgent Care copay per visit; the annual deductible is not required. Remaining costs are shared by coinsurance.",
      zh: "每次就诊支付固定 Urgent Care 自付额（Copay），无需扣除年度免赔额（Deductible），剩余费用再由双方按比例分摊。"
    },
    surgery: {
      en: "Surgical procedures under all plans follow deductible + coinsurance rules. (Rules are identical for inpatient and outpatient surgeries).",
      zh: "手术项目统一先适用年度起付免赔额（Deductible），达标后由保险公司按共付比例分摊（住院与门诊手术规则完全相同）。"
    },
    er: {
      en: "Pay a flat emergency copay per visit, with remaining costs shared via coinsurance.",
      zh: "每次急诊支付固定 Copay，剩余费用再由双方按比例分摊。"
    }
  };
  return map[id]?.[lang] || id;
};

export const getTranslatedCategoryNote = (id: string, lang: Language): string => {
  const map: Record<string, Record<Language, string>> = {
    lab: {
      en: "The usual allowed price is typically 30% of the bill (default), though it can vary depending on in-network contracts.",
      zh: "通常网络协议价约为账单金额的30%（默认值），具体取决于与保险网络的合同约定。"
    },
    doctor: {
      en: "The usual allowed price is typically 30% of the bill (default), though it can vary depending on in-network contracts.",
      zh: "通常网络协议价约为账单金额的30%（默认值），具体取决于与保险网络的合同约定。"
    },
    urgent: {
      en: "The usual allowed price is typically 30% of the bill (default), though it can vary depending on in-network contracts.",
      zh: "通常网络协议价约为账单金额的30%（默认值），具体取决于与保险网络的合同约定。"
    },
    surgery: {
      en: "The usual allowed price is typically 30% of the bill (default), though it can vary depending on in-network contracts.",
      zh: "通常网络协议价约为账单金额的30%（默认值），具体取决于与保险网络的合同约定。"
    },
    er: {
      en: "The usual allowed price is typically 30% of the bill (default), though it can vary depending on in-network contracts.",
      zh: "通常网络协议价约为账单金额的30%（默认值），具体取决于与保险网络的合同约定。"
    }
  };
  return map[id]?.[lang] || id;
};

export const getTranslatedAppendixCategory = (category: string, lang: Language): string => {
  if (lang === "en") return category;
  const map: Record<string, string> = {
    "General Policy Details": "常规保单详情",
    "Outpatient Services": "门诊服务",
    "Inpatient Services": "住院服务",
    "Other Services": "其他服务"
  };
  return map[category] || category;
};

export const getTranslatedBenefitName = (benefit: string, lang: Language): string => {
  if (lang === "en") return benefit;
  const map: Record<string, string> = {
    "Who is eligible?": "谁有资格投保？",
    "Plan Administrator": "计划管理人",
    "Preferred Network": "网络内合作医生与医院 (Network)",
    "Deductible (In-network)": "自付免赔额（网络内）",
    "Deductible (Out-of-network)": "自付免赔额（网络外）",
    "Deductible (Student Health Center)": "免赔额（校医院/学生健康中心）",
    "Coinsurance (In-network)": "共付比例（网络内，保险支付比例）",
    "Coinsurance (Out-of-network)": "共付比例（网络外，保险支付比例）",
    "Out-of-Pocket Maximum (In-network, Per Policy Year)": "年度最高自付限额（网络内 OOP Max）",
    "Out-of-Pocket Maximum (Out-of-network, Per Policy Year)": "年度最高自付限额（网络外 OOP Max）",
    "Primary Care / Specialist / Therapist Visits": "全科医生 / 专科医生 / 理疗门诊",
    "Medically Necessary Dermatologist Visit": "医疗必要性皮肤科就诊",
    "Emergency Room Visits": "急诊室 (ER) 就诊",
    "Urgent Care Visits": "急诊诊所 (Urgent Care) 就诊",
    "Outpatient Surgery": "门诊手术",
    "Laboratory Procedures": "实验室检验/化验程序",
    "Prescription Drugs (Tier 1 / 2 / 3) Member Responsibility": "处方药（Tier 1 / 2 / 3）会员自付额",
    "Inpatient Room & Board Expenses": "住院食宿及病房费",
    "Intensive Care": "重症监护室 (ICU)",
    "Hospital Miscellaneous Expenses": "医院住院杂项开支",
    "Routine Newborn Care": "常规新生儿护理",
    "Inpatient Surgery": "住院手术",
    "Ambulance Services": "救护车服务",
    "Durable Medical Equipment": "耐用医疗设备 (DME)",
    "Dental Treatment (Injury to sound/natural teeth)": "牙科治疗（限健全天然牙受损）",
    "Preventive Care Services": "预防性医疗服务 (Preventive Care, 100%报销)",
    "Routine Physical Exams": "常规全身体格检查 (Routine Physical Exams)",
    "Adult Vision Benefits (Students Age 19+)": "成人视力福利 (满19岁+)",
    "Adult Vision: Routine Eye Exam": "常规眼科检查 (Routine Eye Exam, 满19岁+)",
    "Adult Vision: Vision Care Supplies": "配镜与隐形眼镜 (Vision Care Supplies, 满19岁+)",
    "Benefit Packages": "增值保障包 (Benefit Package)",
    "Pediatric Dental & Vision Services": "儿科牙科与视力保障 (仅限19岁以下)",
    "Tuberculosis Screening and Testing": "结核菌素筛查与检测 (TB Screening)"
  };
  return map[benefit] || benefit;
};

export const getTranslatedBrochureValue = (value: string, lang: Language): string => {
  if (lang === "en") return value;
  
  // Strict matching
  if (value === "F-1 Full-time Student, J-1, OPT, ELP") {
    return "F-1全日制学生、J-1访问学者、OPT实习期、ELP语言项目";
  }
  if (value === "United Healthcare Student Resources") {
    return "联合健康保险学生资源部 (UHCSR)";
  }
  if (value === "Unlimited") {
    return "无上限保额 (Unlimited)";
  }
  if (value === "$200 supplies + $100 exam") {
    return "$200 配镜 + $100 验光";
  }
  if (value === "Not Included (Optional Add-on)") {
    return "不包含（可选增值包加购）";
  }
  if (value === "Covered (Included)") {
    return "已包含 (Covered)";
  }
  if (value === "Not Covered" || value === "Not Included" || value === "No Benefits") {
    return "不包含 (Not Covered)";
  }
  if (value === "$100 / year" || value === "100% (Up to $100/yr)") {
    return "$100 / 每年";
  }
  if (value === "$200 / 24 months" || value === "100% (Up to $200/24 mo)") {
    return "$200 / 每24个月";
  }
  if (value.includes("6 Exclusive Benefits") || value.includes("Ultimate Abroad")) {
    return "6 大专属权益 (已包含)";
  }
  if (value.includes("4 Exclusive Benefits") || value.includes("Ultimate Arrival")) {
    return "4 大专属权益 (已包含)";
  }
  if (value === "See Endorsements (Covered under 19)") {
    return "见附页背书 (仅限19岁以下)";
  }
  
  // Coinsurance / Copays regex-based translation
  let res = value;
  res = res.replace(/after Copay/g, "自付后");
  res = res.replace(/after Deductible/g, "满足免赔额后");
  res = res.replace(/waived if admitted/g, "若收住院则无需自付额");
  res = res.replace(/not applicable if admitted/g, "若收住院则无需自付额");
  res = res.replace(/not required if admitted/g, "若收住院则无需自付额");
  res = res.replace(/max\/tooth/g, "最高/每颗牙");
  res = res.replace(/max\/yr/g, "最高/每年");
  
  // Common terms
  res = res.replace(/Copay/g, "共付自付额");
  res = res.replace(/Deductible/g, "起付免赔额");
  
  return res;
};
