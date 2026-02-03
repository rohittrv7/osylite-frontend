import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  icon: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center relative z-10">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300',
                step.id < currentStep
                  ? 'bg-primary text-primary-foreground'
                  : step.id === currentStep
                  ? 'bg-primary text-primary-foreground ring-4 ring-gold/30'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {step.id < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-lg">{step.icon}</span>
              )}
            </div>
            <span
              className={cn(
                'mt-2 text-xs font-medium hidden sm:block',
                step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
