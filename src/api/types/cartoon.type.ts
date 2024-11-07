export interface CartoonChapterDetail {
  chapter: number;
  title: string;
  profile: string;
  toonImages: string[];
  likeCount: number;
}

export interface CartoonChapter {
  id: number;
  chapter: number;
  title: string;
  profile: string;
  hit: number;
  likeCount: number;
}

export interface Cartoon {
  id: number;
  title: string;
  overview: string;
  yoil: string;
  chapters: CartoonChapter[];
}
