import {create} from 'zustand';
import {
  StoolColor,
  StoolForm,
  StoolMucus,
  StoolProteinLumps,
  DietType,
} from '@/src/api/types/care.type';

interface StoolDiagnosisState {
  // 이미지 분석 사용 여부
  isAnalyzed: boolean;

  // StoolFormStep 상태
  form: StoolForm;
  color: StoolColor;
  mucus: StoolMucus;
  proteinLumps: StoolProteinLumps;
  isBloody: boolean | null;
  bloodyStoolDescription: string;
  stoolImageUrl: string;
  stoolAt: Date;

  // StoolExtraFormStep 상태
  additionalDescription: string;
  dietType: DietType;
  dietDescription: string;

  // 액션
  setIsAnalyzed: (isAnalyzed: boolean) => void;
  setForm: (form: StoolForm) => void;
  setColor: (color: StoolColor) => void;
  setMucus: (mucus: StoolMucus) => void;
  setProteinLumps: (proteinLumps: StoolProteinLumps) => void;
  setIsBloody: (isBloody: boolean | null) => void;
  setBloodyStoolDescription: (description: string) => void;
  setStoolImageUrl: (url: string) => void;
  setAdditionalDescription: (description: string) => void;
  setDietType: (type: DietType) => void;
  setDietDescription: (description: string) => void;
  reset: () => void;
}

const initialState = {
  isAnalyzed: false,
  form: StoolForm.FORMED,
  color: StoolColor.IVORY,
  mucus: StoolMucus.AMBIGUOUS,
  proteinLumps: StoolProteinLumps.AMBIGUOUS,
  isBloody: null,
  bloodyStoolDescription: '',
  stoolImageUrl: '',
  additionalDescription: '',
  dietType: DietType.SOLID_FOOD,
  dietDescription: '',
  stoolAt: new Date(),
};

export const useStoolDiagnosisStore = create<StoolDiagnosisState>(set => ({
  ...initialState,
  setIsAnalyzed: isAnalyzed => set({isAnalyzed}),
  setForm: form => set({form}),
  setColor: color => set({color}),
  setMucus: mucus => set({mucus}),
  setProteinLumps: proteinLumps => set({proteinLumps}),
  setIsBloody: isBloody => set({isBloody}),
  setBloodyStoolDescription: bloodyStoolDescription => set({bloodyStoolDescription}),
  setStoolImageUrl: stoolImageUrl => set({stoolImageUrl}),
  setAdditionalDescription: additionalDescription => set({additionalDescription}),
  setDietType: dietType => set({dietType}),
  setDietDescription: dietDescription => set({dietDescription}),
  reset: () => set(initialState),
}));
