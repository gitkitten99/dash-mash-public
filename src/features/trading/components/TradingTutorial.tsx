'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const TUTORIAL_STEPS = [
  {
    title: 'Welcome to Demo Trading',
    description: 'Learn how to use our demo trading platform with this quick tutorial.',
  },
  {
    title: 'Select Your Asset',
    description: 'Choose between Bitcoin (BTC) or Ethereum (ETH) to trade. Watch the live price updates in real-time.',
  },
  {
    title: 'Choose Direction',
    description: 'Go LONG if you think the price will rise, or SHORT if you think it will fall.',
  },
  {
    title: 'Set Leverage',
    description: 'Use the slider or quick preset buttons to set your leverage. Higher leverage means higher risk and potential returns.',
  },
  {
    title: 'Position Size',
    description: 'Enter your trade size or use percentage buttons of your balance. Always manage your risk carefully.',
  },
  {
    title: 'Risk Management',
    description: 'Set Stop Loss and Take Profit levels to automatically close your position at certain prices.',
  },
  {
    title: "You're Ready!",
    description: 'Start with small positions to practice and monitor your trades in the Positions tab.',
  },
];

interface TradingTutorialProps {
  onComplete: () => void;
}

export function TradingTutorial({ onComplete }: TradingTutorialProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      onComplete();
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
    onComplete();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{TUTORIAL_STEPS[currentStep].title}</DialogTitle>
          <DialogDescription className="pt-2">
            {TUTORIAL_STEPS[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        <Progress value={progress} className="my-2" />
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            type="button"
            variant="secondary"
            onClick={handleSkip}
          >
            Skip Tutorial
          </Button>
          <Button
            type="button"
            onClick={handleNext}
          >
            {currentStep < TUTORIAL_STEPS.length - 1 ? 'Next' : 'Get Started'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 