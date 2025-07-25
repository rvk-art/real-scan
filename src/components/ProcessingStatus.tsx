import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain, Eye, Zap, CheckCircle } from 'lucide-react';

interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
}

interface ProcessingStatusProps {
  currentStep: number;
  overallProgress: number;
  steps: ProcessingStep[];
}

const ProcessingStatus = ({ currentStep, overallProgress, steps }: ProcessingStatusProps) => {
  const getStepIcon = (step: ProcessingStep) => {
    switch (step.id) {
      case 'preprocessing':
        return <Zap className="h-4 w-4" />;
      case 'feature_extraction':
        return <Eye className="h-4 w-4" />;
      case 'classification':
        return <Brain className="h-4 w-4" />;
      default:
        return <Loader2 className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="border-border/50 shadow-[0_0_30px_hsl(var(--primary)/0.1)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          AI Analysis in Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Overall Progress</span>
            <span className="text-primary">{overallProgress.toFixed(0)}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Processing Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {step.status === 'completed' ? (
                  <div className="p-2 rounded-full bg-success/20">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                ) : step.status === 'processing' ? (
                  <div className="p-2 rounded-full bg-primary/20">
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  </div>
                ) : (
                  <div className="p-2 rounded-full bg-muted/50">
                    {getStepIcon(step)}
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{step.name}</h4>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  <Badge variant={getStatusColor(step.status) as any} className="text-xs">
                    {step.status}
                  </Badge>
                </div>
                
                {step.status === 'processing' && (
                  <Progress value={step.progress} className="h-1" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Current Analysis Info */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI Models Active</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• CNN Architecture: Analyzing spatial features</p>
            <p>• Vision Transformer: Processing temporal sequences</p>
            <p>• Autoencoder: Detecting anomalies and inconsistencies</p>
            <p>• Behavioral Analytics: Examining facial movements</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingStatus;