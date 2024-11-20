/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {AppText} from '@/src/common/AppComponents';
import {S} from './StoolFormStepStyles';

interface QuestionOption {
  value: any;
  label: string;
}

interface QuestionProps {
  title: string;
  options: QuestionOption[];
  value: any;
  onChange: (value: any) => void;
  isSingleRow?: boolean;
}

export default function QuestionSection({
  title,
  options,
  value,
  onChange,
  isSingleRow = false,
}: QuestionProps) {
  const renderOptions = () => {
    if (isSingleRow) {
      return (
        <S.SingleAnswerRow>
          {options.map((option: QuestionOption) => (
            <S.AnswerButton
              key={option.value}
              $selected={value === option.value}
              onPress={() => onChange(option.value)}
            >
              <S.AnswerText textType='B1' $selected={value === option.value}>
                {option.label}
              </S.AnswerText>
            </S.AnswerButton>
          ))}
        </S.SingleAnswerRow>
      );
    }

    const rows: React.ReactNode[] = [];
    for (let i = 0; i < options.length; i += 2) {
      rows.push(
        <S.AnswerRow key={i}>
          {options.slice(i, i + 2).map((option: QuestionOption) => (
            <S.AnswerButton
              key={option.value}
              $selected={value === option.value}
              onPress={() => onChange(option.value)}
            >
              <S.AnswerText textType='B1' $selected={value === option.value}>
                {option.label}
              </S.AnswerText>
            </S.AnswerButton>
          ))}
        </S.AnswerRow>,
      );
    }
    return <S.AnswerContainer>{rows}</S.AnswerContainer>;
  };

  return (
    <S.Question>
      <AppText textType='B1'>{title}</AppText>
      {renderOptions()}
    </S.Question>
  );
}
