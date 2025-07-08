export interface CardPropsT {
  position: number;
  onDelete: () => void;
  isFirst?: boolean; 
}

export interface CardDataT {
  id: number;
  position: number;
  photo: string;
  title: string;
  description: string;
}

export interface AudienceBlockT {
  description: string,
  chips: CardDataT[]
}