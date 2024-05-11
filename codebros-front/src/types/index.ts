export type Developer = {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone: string
}
export type DraftDeveloper = Omit<Developer, 'id'>


export type LoginUser = {
    password: string
    email: string
}

export type PersonalInfo = {
    location: string;
    timeZone: string;
};

type SkillsType = {
    name: string;
    type: "HARD" | "SOFT";
};

type LanguagesType = {
    name: string;
    level: "BASIC" | "INTERMEDIATE" | "ADVANCED";
};

type ExperiencesType = {
    title: string;
    company: string;
    position: string;
    location: string;
    startDate: Date;
    endDate: Date;
    description: string;
    industry: string;
};

type CertificationsType = {
    name: string;
    authority: string;
    license: string;
    startDate: Date;
    endDate: Date;
    url: string;
};

export type ApplicantType = {
    location: string;
    timeZone: string;
    employmentStatus: "FULL_TIME" | "PART_TIME" | "CONTRACT";
    availableHours: number;
    willingToTravel: boolean;
    provisionForRemoteWork: boolean;
    feeFees: string;
    portfolio: string;
    linkedIn: string;
    github: string;
    skills: SkillsType[];
    languages: LanguagesType[];
    experiences: ExperiencesType[];
    certifications: CertificationsType[];
};

export interface FormData {
    location: string;
    timezone: string;
    employmentStatus: string;
    avalibleHours: number;
    willingToTravel: boolean;
    provisionForRemoteWork: boolean;
    feeFees: number;
    portfolio: string;
    linkedIn: string;
    github: string;
}


type RequiredSkillsType = {
    name: string;
    type: "HARD" | "SOFT";
};

type RequiredLanguagesType = {
    name: string;
    level: "BASIC" | "INTERMEDIATE" | "ADVANCED";
};

export type ProjectType = {
    name: string;
    description: string;
    requiredSkills: RequiredSkillsType[];
    requiredLanguages: RequiredLanguagesType[];
    teamSize: number;
    duration: string;
    remote: boolean;
    budget: string;
    client: string;
};
