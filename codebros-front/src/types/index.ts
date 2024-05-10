export type Developer = {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone: string
}

export type LoginUser = {
    password: string
    email: string
}

export type PersonalInfo = {
    location: string;
    timeZone: string;
};

export type Skill = {
    name: string;
    type: 'SOFT' | "HARD";
};

export type Language = {
    name: string;
    level: "BASIC" | "INTERMEDIATE" | "ADVANCED";
};

export type Experience = {
    title: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    industry: string;
};

export type Certification = {
    name: string;
    authority: string;
    license: string;
    startDate: string;
    endDate: string;
    url: string;
};

export type AdditionalInfo = {
    employmentStatus: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" | "INTERN" | "OTHER";
    availableHours: number;
    willingToTravel: boolean;
    provisionForRemoteWork: boolean;
    feeFees: string;
    portfolio: string;
    linkedIn: string;
    github: string;
    skills: Skill[];
    languages: Language[];
    experiences: Experience[];
    certifications: Certification[];
};

export type ProfileData = {
    personalInfo: PersonalInfo;
    additionalInfo: AdditionalInfo;
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

export type DraftDeveloper = Omit<Developer, 'id'> 