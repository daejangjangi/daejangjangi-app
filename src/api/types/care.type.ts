export enum StoolForm {
  VERY_HARD = 'VERY_HARD', // 매우 딱딱함
  HARD = 'HARD', // 딱딱함
  A_LITTLE_HARD = 'A_LITTLE_HARD', // 약간 딱딱함
  FORMED = 'FORMED', // 보통
  A_LITTLE_LOOSE = 'A_LITTLE_LOOSE', // 약간 묽음
  LOOSE = 'LOOSE', // 묽음
  VERY_LOOSE = 'VERY_LOOSE', // 매우 묽음
}

export enum StoolColor {
  IVORY = 'IVORY',
  PALE = 'PALE',
  BEIGE = 'BEIGE',
  GOLDISH = 'GOLDISH',
  LIGHT_GREEN = 'LIGHT_GREEN',
  ORANGE = 'ORANGE',
  RED = 'RED',
  BRIGHT_RED = 'BRIGHT_RED',
  LIGHT_BROWN = 'LIGHT_BROWN',
  GREEN = 'GREEN',
  BROWN = 'BROWN',
  DARK_BROWN = 'DARK_BROWN',
  BLACK = 'BLACK',
}

export enum StoolProteinLumps {
  NOTHING = 'NOTHING', // 없음
  LITTLE = 'LITTLE', // 조금 있어요
  MANY = 'MANY', // 많아요
  AMBIGUOUS = 'AMBIGUOUS', // 모르겠어요
}

export enum StoolMucus {
  NOTHING = 'NOTHING', // 없음
  LITTLE = 'LITTLE', // 조금 있어요
  LOTS = 'LOTS', // 많아요
  AMBIGUOUS = 'AMBIGUOUS', // 모르겠어요
}

export enum DietType {
  BREAST_MILK = 'BREAST_MILK', // 수유
  POWDERED_MILK = 'POWDERED_MILK', // 분유
  SOLID_FOOD = 'SOLID_FOOD', // 이유식
}

// 배변일지
export interface CareLog {
  id: number;
  date: string;
  form: StoolForm;
  color: StoolColor;
}
