import {Category} from './member.types';

export interface NewsLetter {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  profileImage: string;
  category: Category;
}
