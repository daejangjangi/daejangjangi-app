export interface CartoonDetail {
  chapter: number;
  title: string;
  profile: string;
  toonImages: string[];
  likeCount: number;
}

export interface CartoonListItem {
  id: number;
  chapter: number;
  title: string;
  profile: string;
  hit: number;
  likeCount: number;
}

export interface CartoonList {
  id: number;
  title: string;
  overview: string;
  yoil: string;
  chapters: CartoonListItem[];
}
