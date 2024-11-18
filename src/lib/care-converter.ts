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
    [StoolColor.IVROY]: '#000',
    [StoolColor.PALE]: '#000',
    [StoolColor.BEIGE]: '#000',
    [StoolColor.GOLDISH]: '#000',
    [StoolColor.LIGHT_GREEN]: '#000',
    [StoolColor.ORANGE]: '#000',
    [StoolColor.RED]: '#000',
    [StoolColor.BRIGHT_RED]: '#000',
    [StoolColor.LIGHT_BROWN]: '#000',
    [StoolColor.GREEN]: '#000',
    [StoolColor.BROWN]: '#000',
    [StoolColor.DARK_BROWN]: '#000',
    [StoolColor.BLACK]: '#000',
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
