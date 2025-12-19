// Stackability and Learning Pathway System
import { NSQF_LEVELS, SECTORS, QUALIFICATION_TYPES, SAMPLE_QUALIFICATION_PACKS } from './nsqf';

// Learning Pathways - Define how credentials stack up
export const LEARNING_PATHWAYS = [
  {
    id: "pathway-it-fullstack",
    name: "Full Stack Web Developer Pathway",
    sector: "it_ites",
    targetNSQFLevel: 6,
    totalCredits: 360,
    description: "Complete pathway from basic computing to full-stack web development",
    stages: [
      {
        level: 1,
        name: "Computer Basics",
        credits: 30,
        duration: "3 months",
        skills: ["Basic Computer Operations", "Typing", "File Management"]
      },
      {
        level: 3,
        name: "Front-end Basics",
        credits: 60,
        duration: "6 months",
        skills: ["HTML", "CSS", "JavaScript Basics"],
        prerequisites: [1]
      },
      {
        level: 4,
        name: "Front-end Frameworks",
        credits: 90,
        duration: "9 months",
        skills: ["React", "Vue", "Responsive Design"],
        prerequisites: [3]
      },
      {
        level: 5,
        name: "Back-end Development",
        credits: 90,
        duration: "9 months",
        skills: ["Node.js", "Database", "API Development"],
        prerequisites: [4]
      },
      {
        level: 6,
        name: "Full Stack Integration",
        credits: 90,
        duration: "9 months",
        skills: ["System Architecture", "DevOps", "Cloud Deployment"],
        prerequisites: [5]
      }
    ]
  },
  {
    id: "pathway-healthcare-nurse",
    name: "Professional Nursing Pathway",
    sector: "healthcare",
    targetNSQFLevel: 7,
    totalCredits: 480,
    description: "From healthcare assistant to registered nurse",
    stages: [
      {
        level: 3,
        name: "Healthcare Assistant",
        credits: 60,
        duration: "6 months",
        skills: ["Patient Care Basics", "First Aid", "Medical Terminology"]
      },
      {
        level: 4,
        name: "General Duty Assistant",
        credits: 80,
        duration: "8 months",
        skills: ["Patient Monitoring", "Basic Nursing Skills", "Medical Equipment"],
        prerequisites: [3]
      },
      {
        level: 5,
        name: "Nursing Technician",
        credits: 120,
        duration: "12 months",
        skills: ["Clinical Procedures", "Medication Administration", "Patient Assessment"],
        prerequisites: [4]
      },
      {
        level: 6,
        name: "Staff Nurse Diploma",
        credits: 140,
        duration: "14 months",
        skills: ["Advanced Care", "Emergency Response", "Healthcare Management"],
        prerequisites: [5]
      },
      {
        level: 7,
        name: "Registered Nurse",
        credits: 80,
        duration: "8 months",
        skills: ["Specialized Care", "Patient Advocacy", "Healthcare Policy"],
        prerequisites: [6]
      }
    ]
  },
  {
    id: "pathway-retail-manager",
    name: "Retail Management Pathway",
    sector: "retail",
    targetNSQFLevel: 5,
    totalCredits: 240,
    description: "From sales associate to retail manager",
    stages: [
      {
        level: 2,
        name: "Retail Sales Associate",
        credits: 40,
        duration: "4 months",
        skills: ["Customer Service", "Point of Sale", "Product Knowledge"]
      },
      {
        level: 3,
        name: "Senior Sales Associate",
        credits: 60,
        duration: "6 months",
        skills: ["Advanced Selling", "Inventory Management", "Team Collaboration"],
        prerequisites: [2]
      },
      {
        level: 4,
        name: "Team Leader",
        credits: 70,
        duration: "7 months",
        skills: ["Team Supervision", "Performance Management", "Conflict Resolution"],
        prerequisites: [3]
      },
      {
        level: 5,
        name: "Retail Manager",
        credits: 70,
        duration: "7 months",
        skills: ["Store Operations", "Budget Management", "Strategic Planning"],
        prerequisites: [4]
      }
    ]
  }
];

// Credit Transfer Rules
export const CREDIT_TRANSFER_RULES = [
  {
    fromSector: "it_ites",
    toSector: "electronics",
    conversionRate: 0.8,
    maxTransferableCredits: 100,
    conditions: ["Must be at same or lower NSQF level"]
  },
  {
    fromSector: "healthcare",
    toSector: "beauty",
    conversionRate: 0.6,
    maxTransferableCredits: 60,
    conditions: ["Only for hygiene and safety related skills"]
  },
  {
    fromSector: "retail",
    toSector: "hospitality",
    conversionRate: 0.7,
    maxTransferableCredits: 80,
    conditions: ["Customer service skills transferable"]
  }
];

// Prerequisites mapping
export const PREREQUISITE_MAP = {
  "QP-IT-002": ["QP-IT-001"], // Web Developer requires Data Entry Operator
  "QP-HC-001": [], // General Duty Assistant has no prerequisites
  "QP-RT-001": [], // Retail Sales Associate has no prerequisites
};

// Calculate stackability
export function calculateStackability(credentials) {
  if (!credentials || credentials.length === 0) {
    return {
      totalCredits: 0,
      stackableCredits: 0,
      pathwayProgress: [],
      recommendations: []
    };
  }

  const totalCredits = credentials.reduce((sum, cred) => sum + (cred.credits || 0), 0);
  
  // Identify which pathways the user is on
  const pathwayProgress = LEARNING_PATHWAYS.map(pathway => {
    const relevantCreds = credentials.filter(cred => cred.sector === pathway.sector);
    const completedStages = [];
    const totalPathwayCredits = relevantCreds.reduce((sum, cred) => sum + (cred.credits || 0), 0);
    
    pathway.stages.forEach(stage => {
      const hasCredentialAtLevel = relevantCreds.some(cred => 
        cred.nsqfLevel === stage.level && cred.status === 'verified'
      );
      if (hasCredentialAtLevel) {
        completedStages.push(stage.level);
      }
    });

    const progress = (completedStages.length / pathway.stages.length) * 100;
    const nextStage = pathway.stages.find(stage => !completedStages.includes(stage.level));

    return {
      pathwayId: pathway.id,
      pathwayName: pathway.name,
      sector: pathway.sector,
      completedStages,
      totalStages: pathway.stages.length,
      progress: Math.round(progress),
      earnedCredits: totalPathwayCredits,
      totalCredits: pathway.totalCredits,
      nextStage: nextStage ? {
        level: nextStage.level,
        name: nextStage.name,
        credits: nextStage.credits,
        skills: nextStage.skills
      } : null,
      isComplete: progress === 100
    };
  }).filter(p => p.completedStages.length > 0 || p.earnedCredits > 0);

  // Generate recommendations
  const recommendations = generateRecommendations(credentials, pathwayProgress);

  return {
    totalCredits,
    stackableCredits: totalCredits, // All verified credits are stackable
    pathwayProgress,
    recommendations
  };
}

function generateRecommendations(credentials, pathwayProgress) {
  const recommendations = [];
  
  // Find pathways user has started but not completed
  pathwayProgress.forEach(progress => {
    if (!progress.isComplete && progress.nextStage) {
      recommendations.push({
        type: "continue_pathway",
        priority: "high",
        message: `Continue on ${progress.pathwayName}`,
        action: `Complete ${progress.nextStage.name} (NSQF Level ${progress.nextStage.level})`,
        credits: progress.nextStage.credits,
        sector: progress.sector
      });
    }
  });

  // Suggest new pathways based on sector
  const userSectors = new Set(credentials.map(c => c.sector));
  LEARNING_PATHWAYS.forEach(pathway => {
    if (!userSectors.has(pathway.sector)) {
      recommendations.push({
        type: "explore_pathway",
        priority: "medium",
        message: `Explore ${pathway.name}`,
        action: `Start with ${pathway.stages[0].name}`,
        credits: pathway.totalCredits,
        sector: pathway.sector
      });
    }
  });

  // Suggest credit transfers if applicable
  const transferOpportunities = findCreditTransferOpportunities(credentials);
  transferOpportunities.forEach(opp => {
    recommendations.push({
      type: "credit_transfer",
      priority: "medium",
      message: `Transfer ${opp.credits} credits from ${opp.fromSector} to ${opp.toSector}`,
      action: "Apply for credit transfer",
      credits: opp.credits,
      sector: opp.toSector
    });
  });

  return recommendations.slice(0, 5); // Limit to top 5 recommendations
}

export function findCreditTransferOpportunities(credentials) {
  const opportunities = [];
  
  CREDIT_TRANSFER_RULES.forEach(rule => {
    const fromSectorCreds = credentials.filter(c => 
      c.sector === rule.fromSector && c.status === 'verified'
    );
    
    if (fromSectorCreds.length > 0) {
      const totalCredits = fromSectorCreds.reduce((sum, c) => sum + (c.credits || 0), 0);
      const transferableCredits = Math.min(
        Math.floor(totalCredits * rule.conversionRate),
        rule.maxTransferableCredits
      );
      
      if (transferableCredits > 0) {
        opportunities.push({
          fromSector: rule.fromSector,
          toSector: rule.toSector,
          credits: transferableCredits,
          conditions: rule.conditions
        });
      }
    }
  });
  
  return opportunities;
}

export function checkPrerequisites(qualificationPackId, userCredentials) {
  const prerequisites = PREREQUISITE_MAP[qualificationPackId] || [];
  
  if (prerequisites.length === 0) {
    return { met: true, missing: [] };
  }
  
  const userQPs = new Set(
    userCredentials
      .filter(c => c.status === 'verified')
      .map(c => c.qualificationPack)
      .filter(qp => qp)
  );
  
  const missing = prerequisites.filter(prereq => !userQPs.has(prereq));
  
  return {
    met: missing.length === 0,
    missing,
    required: prerequisites
  };
}

export function getPathwayByid(pathwayId) {
  return LEARNING_PATHWAYS.find(p => p.id === pathwayId);
}

export function getPathwaysBySector(sectorId) {
  return LEARNING_PATHWAYS.filter(p => p.sector === sectorId);
}

export function calculateCreditsToNextLevel(currentCredits, currentLevel) {
  const nextLevel = currentLevel + 1;
  if (nextLevel > 10) return null;
  
  // Approximate credits needed for next level (varies by pathway)
  const creditsPerLevel = {
    1: 30,
    2: 50,
    3: 70,
    4: 90,
    5: 120,
    6: 150,
    7: 180,
    8: 210,
    9: 240,
    10: 300
  };
  
  const requiredForNext = creditsPerLevel[nextLevel] || 100;
  return Math.max(0, requiredForNext - currentCredits);
}
