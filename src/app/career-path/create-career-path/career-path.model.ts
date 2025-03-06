export interface CareerPath {
    id?: number;
    name: string;
    description: string;
    employeeId: number | null;
    steps: CareerPathStep[];
    employee?: User;
  }

  export interface User {
    id?: number;
    lastName: string;
    firstName: string;
    email: string;
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