"use client";

import { Button } from "@/components/ui/button";
import type { OnboardingQuestion } from "@/types";

interface OnboardingOptionsProps {
  question: OnboardingQuestion;
  onSelect: (value: string) => void;
}

export function OnboardingOptions({ question, onSelect }: OnboardingOptionsProps) {
  return (
    <div className="flex flex-col gap-2">
      {question.options.map((option) => (
        <Button
          key={option.value}
          variant="secondary"
          size="sm"
          onClick={() => onSelect(option.value)}
          className="justify-start text-left"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
