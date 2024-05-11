import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

interface Skill {
    id: string;
    name: string;
    type: string;
}

interface SkillsFormState {
    skills: Skill[];
    addSkill: () => void;
    updateSkill: (id: string, field: 'name' | 'type', value: string) => void;
    removeSkill: (id: string) => void;
}

export const useSkillsStore = create<SkillsFormState>((set) => ({
    skills: [],
    addSkill: () =>
        set((state) => ({
            skills: [...state.skills, { id: uuidv4(), name: '', type: '' }],
        })),
    updateSkill: (id, field, value) =>
        set((state) => ({
            skills: state.skills.map((skill) =>
                skill.id === id ? { ...skill, [field]: value } : skill
            ),
        })),
    removeSkill: (id) =>
        set((state) => ({
            skills: state.skills.filter((skill) => skill.id !== id),
        })),
}));

interface Languages {
    id: string;
    name: string;
    level: string;
}

interface LanguagesFormState {
    languages: Languages[];
    addLanguage: () => void;
    handleLanguageChange: (id: string, field: 'name' | 'level', value: string) => void;
    removeLanguage: (id: string) => void;
}

interface Experience {
    id: string;
    title: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    industry: string;
}

interface ExperiencesFormState {
    experiences: Experience[];
    addExperience: () => void;
    removeExperience: (id: string) => void;
    handleExperienceChange: (id: string, field: keyof Experience, value: string) => void;
}

interface Certification {
    id: string;
    name: string;
    authority: string;
    license: string;
    startDate: string;
    endDate: string;
    url: string;
}

interface CertificationsFormState {
    certifications: Certification[];
    addCertification: () => void;
    removeCertification: (id: string) => void;
    handleCertificationChange: (id: string, field: keyof Certification, value: string) => void;
}

export const useCertificationsStore = create<CertificationsFormState>((set) => ({
    certifications: [],
    addCertification: () =>
        set((state) => ({
            certifications: [
                ...state.certifications,
                {
                    id: uuidv4(),
                    name: "",
                    authority: "",
                    license: "",
                    startDate: "",
                    endDate: "",
                    url: ""
                },
            ],
        })),
    removeCertification: (id) =>
        set((state) => ({
            certifications: state.certifications.filter((certification) => certification.id !== id),
        })),
    handleCertificationChange: (id, field, value) =>
        set((state) => ({
            certifications: state.certifications.map((certification) =>
                certification.id === id ? { ...certification, [field]: value } : certification
            ),
        })),
}));


export const useExperiencesStore = create<ExperiencesFormState>((set) => ({
    experiences: [],
    addExperience: () =>
        set((state) => ({
            experiences: [
                ...state.experiences,
                {
                    id: uuidv4(),
                    title: '',
                    company: '',
                    position: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    industry: ''
                },
            ],
        })),
    removeExperience: (id) =>
        set((state) => ({
            experiences: state.experiences.filter((experience) => experience.id !== id),
        })),
    handleExperienceChange: (id, field, value) =>
        set((state) => ({
            experiences: state.experiences.map((experience) =>
                experience.id === id ? { ...experience, [field]: value } : experience
            ),
        })),
}));


export const useLanguagesStore = create<LanguagesFormState>((set) => ({
    languages: [],
    addLanguage: () =>
        set((state) => ({
            languages: [...state.languages, { id: uuidv4(), name: '', level: '' }],
        })),
    handleLanguageChange: (id, field, name) =>
        set((state) => ({
            languages: state.languages.map((skill) =>
                skill.id === id ? { ...skill, [field]: name } : skill
            ),
        })),
    removeLanguage: (id) =>
        set((state) => ({
            languages: state.languages.filter((skill) => skill.id !== id),
        })),
}));



export const useConsultorDetailsStore = create((set) => ({
    consultorDetails: null,
    setConsultorDetails: (details) => set({ consultorDetails: details }),
}));



