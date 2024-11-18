import {
  StoolForm,
  StoolColor,
  StoolProteinLumps,
  StoolMucus,
  DietType,
} from '../api/types/care.type';

export const convertStoolForm = (form: StoolForm): string => {
  const formMap: Record<StoolForm, string> = {
    [StoolForm.VERY_HARD]: '매우 딱딱함',
    [StoolForm.HARD]: '딱딱함',
    [StoolForm.A_LITTLE_HARD]: '약간 딱딱함',
    [StoolForm.FORMED]: '보통',
    [StoolForm.A_LITTLE_LOOSE]: '약간 묽음',
    [StoolForm.LOOSE]: '묽음',
    [StoolForm.VERY_LOOSE]: '매우 묽음',
  };
  return formMap[form];
};

export const convertStoolColor = (color: StoolColor): string => {
  const colorMap: Record<StoolColor, string> = {
    [StoolColor.IVORY]: '#E8D694',
    [StoolColor.PALE]: '#D1C5A4',
    [StoolColor.BEIGE]: '#CBB17D',
    [StoolColor.GOLDISH]: '#E6B73D',
    [StoolColor.LIGHT_GREEN]: '#9CA238',
    [StoolColor.ORANGE]: '#E47737',
    [StoolColor.RED]: '#E15C40',
    [StoolColor.BRIGHT_RED]: '#8A1A11',
    [StoolColor.LIGHT_BROWN]: '#7F591C',
    [StoolColor.GREEN]: '#5B6233',
    [StoolColor.BROWN]: '#5F2E0D',
    [StoolColor.DARK_BROWN]: '#4C2209',
    [StoolColor.BLACK]: '#240D02',
  };
  return colorMap[color];
};

export const convertStoolProteinLumps = (proteinLumps: StoolProteinLumps): string => {
  const proteinLumpsMap: Record<StoolProteinLumps, string> = {
    [StoolProteinLumps.NOTHING]: '없음',
    [StoolProteinLumps.LITTLE]: '조금 있어요',
    [StoolProteinLumps.MANY]: '많아요',
    [StoolProteinLumps.AMBIGUOUS]: '모르겠어요',
  };
  return proteinLumpsMap[proteinLumps];
};

export const convertStoolMucus = (mucus: StoolMucus): string => {
  const mucusMap: Record<StoolMucus, string> = {
    [StoolMucus.NOTHING]: '없음',
    [StoolMucus.LITTLE]: '조금 있어요',
    [StoolMucus.LOTS]: '많아요',
    [StoolMucus.AMBIGUOUS]: '모르겠어요',
  };
  return mucusMap[mucus];
};

export const convertDietType = (dietType: DietType): string => {
  const dietTypeMap: Record<DietType, string> = {
    [DietType.BREAST_MILK]: '수유',
    [DietType.POWDERED_MILK]: '분유',
    [DietType.SOLID_FOOD]: '이유식',
  };
  return dietTypeMap[dietType];
};
