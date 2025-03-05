export interface CareerPath {
    id?: number;
    name: string;
    description: string;
    steps: CareerPathStep[];
  }
  
  export interface CareerPathStep {
    id?: number;
    title: string;
    description: string;
    requiredSkillId: number | null;
    requiredSkill?: Skill;
  }
  
  export interface Skill {
    id: number;
    name: string;
  }