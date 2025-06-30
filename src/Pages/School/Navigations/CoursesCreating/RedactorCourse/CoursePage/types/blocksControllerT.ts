import {ReactNode} from "react";
import {CatalogCourseT} from "api/apiTypes"
import {AudienceBlockT, CardDataT} from "../Blocks/types/audienceBlockT";
import {Section} from "../../../../../../../types/courseStatT";

export type BlockT = {
  id: number;
  content: string;
  visible: boolean;
  onlyShow?: boolean;
  canUp: boolean;
  canDown: boolean;
}

export type HeaderT = {
  id: number;
  content: string;
  visible: boolean;
  onlyShow?: boolean;
  canUp: boolean;
  canDown: boolean;
  photoBackground: string;
  name: string;
  description: string;
  contact_link: string;
}

export type StatsT = {
  id: number;
  content: string;
  visible: boolean;
  onlyShow?: boolean;
  canUp: boolean;
  canDown: boolean;
  lessonCount: number;
}

export type AudiencT = {
  id: number;
  content: string;
  description: string,
  chips: CardDataT[];
  visible: boolean;
  onlyShow?: boolean;
  canUp: boolean;
  canDown: boolean;
}

export type TrainingProgT = {
  id: number;
  content: string;
  visible: boolean;
  onlyShow?: boolean;
  canUp: boolean;
  canDown: boolean;
  sections: Section[];
}

export type TrainingPurpT = {
  id: number;
  content: string;
  description: string,
  chips: CardDataT[];
  visible: boolean;
  onlyShow?: boolean;
  canUp: boolean;
  canDown: boolean;
}
export interface LinkButtonT {
  id: number;
  content: string;
  name: string;
  link?: string;
  color: string;
  visible: boolean;
  onlyShow?: boolean;
  canUp: boolean;
  canDown: boolean;
}

export type AdvanT = {
  id: number;
  content: string;
  description: string,
  chips: CardDataT[];
  visible: boolean;
  onlyShow?: boolean;
  canUp: boolean;
  canDown: boolean;
}

export type BlockKeys = {
  header: HeaderT,
  stats: StatsT,
  audience: AudiencT,
  advantage: AdvanT,
  trainingProgram: TrainingProgT,
  trainingPurpose: TrainingPurpT,
  linkButton: LinkButtonT,
  // advantage: AdvanT,
}

export type BlocksT = BlockT[];

export type BlocksControllerT = {
  openModal: () => void;
}

export interface HeaderBlockT {
  openModal: () => void;
}

export interface StatsBlockT {
  countOfLessons: number;
}

export interface TrainingProgramT {
  // course: CatalogCourseT;
  // handleToggleOpen: (index: number) => void;
  // openIndex: number;
}