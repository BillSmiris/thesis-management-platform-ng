export interface StudentThesisResponseModel {
    id: number;
    title: string;
    startDate: Date;
    programmingLanguages: string[];
    technologies: string[];
    finalGrade: number;
    supervisorFirstName: string;
    supervisorLastName: string;
    supervisorEmail: string;
}