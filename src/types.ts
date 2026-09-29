export interface Skill {
  id: string;
  name: string;
}

export interface CVData {
  photo: string | null;
  fullName: string;
  address: string;
  phone: string;
  education: string;
  skills: Skill[];
}
