export type PhaseCategory = 
  | 'Phase A (Water Phase)' 
  | 'Phase B (Oil Phase)' 
  | 'Phase C (Actives & Stabilizer)' 
  | 'Phase D (Preservative & Adjuster)';

export type HalalStatus = 
  | 'HALAL_VERIFIED' 
  | 'HALAL_EXEMPT' 
  | 'HALAL_REVIEW_REQUIRED' 
  | 'HIGH_RISK_HARAM';

export type RegulatoryStatus = 
  | 'BPOM_COMPLIANT' 
  | 'COSING_APPROVED' 
  | 'RESTRICTED_MAX_LIMIT' 
  | 'BPOM_VIOLATION' 
  | 'UNDER_REVIEW';

export interface CoaDetails {
  lot_number: string;
  release_date: string;
  expiry_date: string;
  appearance: string;
  assay_purity_pct: number;
  melting_point_c?: string;
  loss_on_drying_pct: number;
  heavy_metals_ppm: string;
  microbial_alt: string;
  pathogens: string;
  ph_solution_1pct?: number;
}

export interface MsdsDetails {
  ghs_classification: string;
  signal_word: 'Danger' | 'Warning' | 'None (Non-hazardous)';
  hazard_statements: string[];
  precautionary_statements: string[];
  first_aid_eye: string;
  first_aid_skin: string;
  spill_procedure: string;
  handling_storage: string;
  personal_protective_equipment: string;
}

export interface Ingredient {
  id: string;
  inci_name: string;
  trade_name?: string;
  cas_number?: string;
  functions: string[];
  typical_min_pct: number;
  typical_max_pct: number;
  regulatory_max_pct?: number;
  halal_status: HalalStatus;
  regulatory_status: RegulatoryStatus;
  estimated_cost_per_kg: number;
  currency: string;
  supplier?: string;
  description: string;
  hlb_value?: number;
  rhlb_ow?: number;
  rhlb_wo?: number;
  coa_details?: CoaDetails;
  msds_details?: MsdsDetails;
}

export interface FormulaLineItem {
  id: string;
  ingredient_id: string;
  inci_name: string;
  trade_name: string;
  phase: PhaseCategory;
  percentage: number;
  calculated_mass_g: number;
  cost_per_kg: number;
  halal_status: HalalStatus;
  is_active?: boolean;
  function: string;
}

export interface ModelMetrics {
  accuracy_pct: number;
  accuracy_label: 'BAIK' | 'JELEK';
  precision_pct: number;
  precision_label: 'BAIK' | 'JELEK';
  correlation_r: number;
  correlation_label: 'BAIK' | 'JELEK';
}

export interface FormulaReplacementSolution {
  culprit_ingredient: string;
  reason: string;
  replacement_title: string;
  replacements: {
    inci_name: string;
    percentage: number;
    function: string;
  }[];
  projected_cogs: number;
  regulatory_gain: string;
}

export interface FormulaCandidate {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  target_profile: string;
  raw_material_cost_per_kg: number;
  predicted_ph: number;
  predicted_viscosity_cps: number;
  predicted_stability_score: number;
  sensory_finish: string;
  // BPOM & Halal checks
  bpom_compliant: boolean;
  bpom_violation_detail?: string;
  halal_compliant: boolean;
  halal_violation_detail?: string;
  replacement_solution?: FormulaReplacementSolution;
  // Evaluation Metrics
  metrics: ModelMetrics;
  blockers_count: number;
  items: FormulaLineItem[];
  oil_phase_rhlb?: number;
  emulsifier_hlb_match?: number;
}

export interface ProcessStep {
  id: string;
  order: number;
  name: string;
  phase: string;
  equipment: string;
  target_temp_c: number;
  actual_temp_c?: number;
  target_rpm: number;
  actual_rpm?: number;
  target_duration_min: number;
  actual_duration_min?: number;
  endpoint_criteria: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'DEVIATION';
  operator_notes?: string;
  has_deviation?: boolean;
}

export interface TrialBatch {
  id: string;
  batch_number: string;
  candidate_id: string;
  candidate_name: string;
  target_mass_kg: number;
  operator_name: string;
  created_at: string;
  status: 'SCHEDULED' | 'RUNNING' | 'COMPLETED_SUCCESS' | 'DEVIATION_FLAGGED';
  steps: ProcessStep[];
  measured_ph?: number;
  measured_viscosity_cps?: number;
  appearance_test?: string;
  deviation_reason?: string;
}

export type FishboneCategory = 
  | 'Man' 
  | 'Machine' 
  | 'Material' 
  | 'Method' 
  | 'Measurement' 
  | 'Environment';

export interface FishboneBranch {
  category: FishboneCategory;
  icon: string;
  causes: {
    id: string;
    text: string;
    detail: string;
    likelihood: 'HIGH' | 'MEDIUM' | 'LOW';
    status: 'HYPOTHESIS' | 'CONFIRMED_CAUSE' | 'RULED_OUT';
    evidence?: string;
  }[];
}

export interface FiveWhyItem {
  order: number;
  question: string;
  answer: string;
  evidence_status: 'CONFIRMED_EVIDENCE' | 'UNVERIFIED_ASSUMPTION' | 'MISSING_DATA';
  cognitive_bias_alert?: string;
}

export interface CapaItem {
  id: string;
  report_id: string;
  title: string;
  incident_date: string;
  problem_statement: string;
  severity: 'CRITICAL' | 'MAJOR' | 'MINOR';
  status: 'Closed' | 'Open' | 'Extended';
  root_cause: string;
  corrective_action: string;
  preventive_action: string;
  effectiveness_review: string;
  similarity_score?: number;
  category: string;
  owner: string;
}

export interface OilPhaseComponent {
  id: string;
  name: string;
  mass_grams: number;
  rhlb_ow: number;
  rhlb_wo?: number;
}

export interface QtppProfile {
  product_name: string;
  product_category: string;
  target_market: string;
  target_ph_min: number;
  target_ph_max: number;
  target_viscosity_min: number;
  target_viscosity_max: number;
  sensory_target: string;
  target_cogs_max_idr: number;
  shelf_life_months: number;
  halal_required: boolean;
  bpom_registered: boolean;
}

export interface StabilityTestResult {
  id: string;
  test_name: string;
  condition: string;
  duration_text: string;
  initial_viscosity_cps: number;
  measured_viscosity_cps: number;
  viscosity_drop_pct: number;
  is_stable: boolean;
  phase_separation_observed: boolean;
  notes: string;
  trial_dataset_source: string;
}

export interface CppParameter {
  id: string;
  name: string;
  phase: string;
  unit: string;
  target_val: number;
  run_1: number;
  run_2: number;
  run_3: number;
  median: number;
  deviation_range: number;
  status: 'OPTIMAL' | 'DEVIATION' | 'ACCEPTABLE';
  impact: string;
}

export interface CmaAttribute {
  id: string;
  material_name: string;
  attribute_name: string;
  target_spec: string;
  actual_measured: string;
  status: 'COMPLIANT' | 'CRITICAL_RISK' | 'WARNING';
  impact_to_cqa: string;
}

export interface CppTargetStep {
  no: number;
  stage_name: string;
  phase: string;
  temp_target: string;
  time_target: string;
  speed_target: string;
  output_target: string;
}

export interface CppActualStep {
  no: number;
  stage_name: string;
  phase: string;
  temp_actual: string;
  time_actual: string;
  speed_actual: string;
  observation_actual: string;
}

export interface CppFinalObservation {
  parameter: string;
  target: string;
  result_t0: string;
  result_t24: string;
  status: 'OK' | 'Perlu Perhatian' | 'Kritis';
  evaluation_note: string;
}

