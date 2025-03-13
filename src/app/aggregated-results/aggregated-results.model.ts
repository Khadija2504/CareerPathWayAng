export interface ProgressMetrics {
    skillAssessmentProgress: number;
    careerPathProgress: number;
    trainingProgress: number;
    goalProgress: number;
    careerPathProgressDetails: CareerPathProgressDetail[];
    skillAssessmentDetails: SkillAssessmentDetail[];
  }
  
  export interface CareerPathProgressDetail {
    careerPathName: string;
    totalSteps: number;
    completedSteps: number;
    progressPercentage: number;
  }
  
  export interface SkillAssessmentDetail {
    skillName: string;
    score: number;
    maxScore: number;
    progressPercentage: number;
  }
  
  export interface AggregatedResult {
    employeeId: number;
    employeeName: string;
    skillAssessmentPercentage: number;
    careerPathProgressPercentage: number;
    trainingProgramsCount: number;
    incompleteGoalsCount: number;
    rankingScore?: number;
  }