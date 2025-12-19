// NSQF (National Skills Qualifications Framework) Data
// Aligned with NCVET standards

export const NSQF_LEVELS = [
  {
    level: 1,
    name: "Level 1 - Basic",
    description: "Certificate (Basic Skills)",
    processRequired: "Recall and demonstrate practical skill, routine and repetitive in narrow range of application",
    professionalKnowledge: "Familiar with common trade terminology; Perform routine tasks using appropriate tools and equipment",
    professionalSkill: "Receive and transmit written and oral messages; Basic arithmetic and algebraic principles; Personal financing and basic understanding of social and natural environment",
    coreSkill: "Work under close supervision",
    responsibility: "No responsibility"
  },
  {
    level: 2,
    name: "Level 2 - Foundation",
    description: "Certificate (Foundation Skills)",
    processRequired: "Recall and demonstrate practical skill, job ready, basic problem solving through alternative solutions",
    professionalKnowledge: "Basic facts, process and principle applied in trade of employment; Read and follow basic instructions and safety practices",
    professionalSkill: "Receive and transmit written and oral messages with some accuracy; Carry out basic written instruction; Basic arithmetic with formulae; Personal financing and understanding of social norms",
    coreSkill: "Work under close supervision with some degree of autonomy",
    responsibility: "Limited responsibility"
  },
  {
    level: 3,
    name: "Level 3 - Skilled",
    description: "Certificate (Skilled Worker)",
    processRequired: "Demonstrate field specific applications, select and apply solutions to defined problems",
    professionalKnowledge: "Factual knowledge of field of knowledge or study; Comprehend and apply theoretical principles to some depth in a narrow range of application",
    professionalSkill: "Communicate in writing and orally with minimum required clarity and skill; Basic understanding of social and natural environment; Apply mathematical concepts for practical purposes",
    coreSkill: "Work with others with some degree of supervision",
    responsibility: "Some responsibility for own work"
  },
  {
    level: 4,
    name: "Level 4 - Advanced Skilled",
    description: "Certificate/Diploma",
    processRequired: "Recall and demonstrate practical skill, routine and repetitive, select and apply solutions to a defined range of problems",
    professionalKnowledge: "Factual knowledge of field of work or study; Some theoretical knowledge in narrow area of work or study; Awareness of boundaries of area of knowledge",
    professionalSkill: "Language to communicate written or oral, with required clarity, skill and effectiveness; Understanding of social, political and natural environment; Use basic mathematical concepts",
    coreSkill: "Work with others with some autonomy",
    responsibility: "Some responsibility for work done individually and in groups"
  },
  {
    level: 5,
    name: "Level 5 - Technician/Supervisor",
    description: "Diploma/Advanced Diploma",
    processRequired: "Carry out a range of tasks involving standard and non-standard operations; Solve routine problems using problem solving tools; Interpretation of available information",
    professionalKnowledge: "Knowledge of facts, principles, processes and general concepts; Awareness of main areas and boundaries of the field of work or study",
    professionalSkill: "Communicate with required clarity and purpose; Basic understanding of social and ecological environment; Apply mathematical concepts for practical purposes; Interpret documents, drawings, charts in the context of knowledge or work",
    coreSkill: "Work with responsibility of work of self and others",
    responsibility: "Responsibility for own work and limited responsibility for others' work"
  },
  {
    level: 6,
    name: "Level 6 - Advanced Technician",
    description: "Advanced Diploma/Bachelor Degree",
    processRequired: "Exercise a reasonable degree of choice in a broad range of activities involving standard and non-standard practices; Evaluate and use information to plan and develop investigative strategies",
    professionalKnowledge: "Factual and theoretical knowledge in broad contexts within a field of work or study; Understanding and awareness of main areas within field of study/work and inter-relatedness with allied areas",
    professionalSkill: "Communication with clarity and purpose; Engage in debates and arguments; Understanding of social, ecological environment; Can interpret mathematical abstractions and relationships",
    coreSkill: "Supervise work of others and take responsibility for evaluation",
    responsibility: "Full responsibility for own work and full or partial responsibility for work of others"
  },
  {
    level: 7,
    name: "Level 7 - Professional",
    description: "Bachelor Degree/Post Graduate Diploma",
    processRequired: "Apply knowledge and skills in a broad range of complex technical or professional activities; Exercise considerable degree of autonomy and judgment in determining course of action; Responsibility for formulating and executing course of action",
    professionalKnowledge: "Wide ranging factual and theoretical knowledge in broad contexts within the field; Knowledge to work across areas; Understanding of boundaries of knowledge and relation to other areas",
    professionalSkill: "Present arguments and opinions with degree of clarity and logic; Apply mathematical knowledge in practical field; Reasonably good understanding of social, political, cultural and natural environment",
    coreSkill: "Exercise reasonable degree of autonomy and judgment",
    responsibility: "Full responsibility for output of group and development of people"
  },
  {
    level: 8,
    name: "Level 8 - Advanced Professional",
    description: "Post Graduate Diploma/Master Degree",
    processRequired: "Apply advanced knowledge and skills in a broad range of complex technical or professional activities; Exercise considerable autonomy and judgment; Take responsibility for processes, materials, and outputs of considerable value; Demonstrate substantial command over the area of knowledge or work",
    professionalKnowledge: "Advanced knowledge in specialized or multidisciplinary areas; Demonstrates command and understanding of theories and principles; Understanding of recent developments and specialized areas in the field",
    professionalSkill: "Communicate with precision and engage in sustained arguments; Critically evaluate evidence; Understanding of social, political and ecological environment; Apply and critically evaluate mathematical concepts in practical field",
    coreSkill: "Manage processes and lead teams with considerable autonomy",
    responsibility: "Full responsibility for processes, materials, and outputs"
  },
  {
    level: 9,
    name: "Level 9 - Expert",
    description: "Master Degree/MPhil",
    processRequired: "Work in highly specialized and complex technical, professional or research activities; Develop new knowledge and procedures; Exercise complete autonomy; Take full responsibility for determining and achieving personal and/or group outcomes",
    professionalKnowledge: "Highly specialized knowledge, part of it at the forefront of the field; Awareness of knowledge gaps and their relation to multidisciplinary fields; Development of new knowledge through research",
    professionalSkill: "Communicate and engage with peers on complex topics; Critically evaluate and assimilate new research; Understanding and interpretation of social, political and cultural environment; Apply advanced mathematical concepts",
    coreSkill: "Exercise complete autonomy in determining work outputs",
    responsibility: "Full responsibility for determining strategic direction and achieving outcomes"
  },
  {
    level: 10,
    name: "Level 10 - Authority",
    description: "Doctoral/Post-Doctoral",
    processRequired: "Work at the most advanced frontier areas of knowledge; Generate new knowledge and understanding; Take full responsibility for creating and sustaining innovation",
    professionalKnowledge: "At the most advanced and specialized level, at the frontiers of knowledge; Creation of new knowledge through original research",
    professionalSkill: "Highest levels of communication to peers and public at large; Lead research teams; Highest understanding of social, political, cultural and natural environment; Apply most advanced mathematical concepts",
    coreSkill: "Exercise complete autonomy and stewardship",
    responsibility: "Full accountability for sustaining and extending discipline"
  }
];

export const SECTORS = [
  { id: "agriculture", name: "Agriculture", ssc: "Agriculture Sector Skill Council" },
  { id: "automotive", name: "Automotive", ssc: "Automotive Skills Development Council" },
  { id: "banking", name: "Banking & Finance", ssc: "Banking, Financial Services & Insurance Sector Skill Council" },
  { id: "beauty", name: "Beauty & Wellness", ssc: "Beauty & Wellness Sector Skill Council" },
  { id: "construction", name: "Construction", ssc: "Construction Sector Skills Council" },
  { id: "domestic_workers", name: "Domestic Workers", ssc: "Domestic Workers Sector Skill Council" },
  { id: "electronics", name: "Electronics & Hardware", ssc: "Electronics Sector Skills Council" },
  { id: "food_processing", name: "Food Processing", ssc: "Food Industry Capacity & Skill Initiative" },
  { id: "gem_jewellery", name: "Gem & Jewellery", ssc: "Gem & Jewellery Sector Skill Council" },
  { id: "green_jobs", name: "Green Jobs", ssc: "Green Jobs Sector Skill Council" },
  { id: "handicrafts", name: "Handicrafts & Carpet", ssc: "Handicrafts and Carpet Sector Skill Council" },
  { id: "healthcare", name: "Healthcare", ssc: "Healthcare Sector Skill Council" },
  { id: "hospitality", name: "Hospitality & Tourism", ssc: "Tourism & Hospitality Sector Skill Council" },
  { id: "it_ites", name: "IT & ITES", ssc: "IT-ITeS Sector Skill Council" },
  { id: "leather", name: "Leather", ssc: "Leather Sector Skill Council" },
  { id: "logistics", name: "Logistics", ssc: "Logistics Sector Skill Council" },
  { id: "media", name: "Media & Entertainment", ssc: "Media & Entertainment Skills Council" },
  { id: "mining", name: "Mining", ssc: "Indian Mining and Minerals Sector Skill Council" },
  { id: "plumbing", name: "Plumbing", ssc: "Plumbing Sector Skill Council" },
  { id: "power", name: "Power", ssc: "Power Sector Skill Council" },
  { id: "retail", name: "Retail", ssc: "Retailers Association's Skill Council" },
  { id: "rubber", name: "Rubber", ssc: "Rubber Skill Development Council" },
  { id: "security", name: "Security", ssc: "Security Sector Skill Development Council" },
  { id: "sports", name: "Sports", ssc: "Sports, Physical Education, Fitness & Leisure Sector Skill Council" },
  { id: "telecom", name: "Telecom", ssc: "Telecom Sector Skill Council" },
  { id: "textile", name: "Textile & Handloom", ssc: "Textile Sector Skill Council" },
  { id: "others", name: "Others", ssc: "Other Sector Skill Councils" }
];

export const QUALIFICATION_TYPES = [
  { id: "certificate", name: "Certificate", minLevel: 1, maxLevel: 4 },
  { id: "diploma", name: "Diploma", minLevel: 4, maxLevel: 6 },
  { id: "advanced_diploma", name: "Advanced Diploma", minLevel: 5, maxLevel: 6 },
  { id: "bachelor", name: "Bachelor Degree", minLevel: 6, maxLevel: 7 },
  { id: "pg_diploma", name: "Post Graduate Diploma", minLevel: 7, maxLevel: 8 },
  { id: "master", name: "Master Degree", minLevel: 8, maxLevel: 9 },
  { id: "mphil", name: "MPhil", minLevel: 9, maxLevel: 9 },
  { id: "phd", name: "PhD/Doctoral", minLevel: 10, maxLevel: 10 },
  { id: "micro_credential", name: "Micro-Credential", minLevel: 1, maxLevel: 10 },
  { id: "skill_certificate", name: "Skill Certificate", minLevel: 1, maxLevel: 10 }
];

// Sample Qualification Packs (QPs)
export const SAMPLE_QUALIFICATION_PACKS = [
  {
    id: "QP-IT-001",
    name: "Data Entry Operator",
    sector: "it_ites",
    nsqfLevel: 3,
    credits: 60,
    duration: "6 months",
    description: "Perform data entry operations using computers and software applications"
  },
  {
    id: "QP-IT-002",
    name: "Web Developer",
    sector: "it_ites",
    nsqfLevel: 5,
    credits: 120,
    duration: "12 months",
    description: "Design, develop and maintain websites and web applications"
  },
  {
    id: "QP-HC-001",
    name: "General Duty Assistant",
    sector: "healthcare",
    nsqfLevel: 4,
    credits: 80,
    duration: "8 months",
    description: "Assist healthcare professionals in patient care activities"
  },
  {
    id: "QP-RT-001",
    name: "Retail Sales Associate",
    sector: "retail",
    nsqfLevel: 3,
    credits: 50,
    duration: "5 months",
    description: "Handle customer interactions and sales in retail environments"
  },
  {
    id: "QP-AU-001",
    name: "Automotive Service Technician",
    sector: "automotive",
    nsqfLevel: 4,
    credits: 100,
    duration: "10 months",
    description: "Diagnose and repair automotive vehicles"
  }
];

// Helper functions
export function getNSQFLevel(level) {
  return NSQF_LEVELS.find(l => l.level === level) || null;
}

export function getSector(sectorId) {
  return SECTORS.find(s => s.id === sectorId) || null;
}

export function getQualificationType(typeId) {
  return QUALIFICATION_TYPES.find(q => q.id === typeId) || null;
}

export function getQualificationPack(qpId) {
  return SAMPLE_QUALIFICATION_PACKS.find(qp => qp.id === qpId) || null;
}

export function isValidNSQFLevel(level, qualificationType) {
  const qType = getQualificationType(qualificationType);
  if (!qType) return true; // If no type specified, allow any level
  return level >= qType.minLevel && level <= qType.maxLevel;
}

export function calculateCredits(nsqfLevel, durationMonths) {
  // Basic credit calculation: 10 credits per NSQF level per month
  return nsqfLevel * durationMonths * 10;
}

export function getRecommendedPathway(currentLevel, targetLevel) {
  const steps = [];
  for (let level = currentLevel + 1; level <= targetLevel; level++) {
    steps.push(getNSQFLevel(level));
  }
  return steps;
}
