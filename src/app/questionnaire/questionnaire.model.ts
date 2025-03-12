export interface Skill {
    id: number;
    name: string;
    description?: string;
    category?: string;
}
  
export interface Questionnaire {
    id: number;
    questionText: string;
    options: string[];
    correctAnswer: string;
    skill: Skill;
    skill_id: number;
}