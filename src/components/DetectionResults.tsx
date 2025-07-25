import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, Eye, Brain, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DetectionResult {
  isDeepfake: boolean;
  confidence: number;
  processingTime: number;
  analysisDetails: {
    facialFeatures: number;
    lipSync: number;
    temporalConsistency: number;
    artifactDetection: number;
  };
  explanations: string[];
  metadata: {
    resolution: string;
    duration?: string;
    format: string;
  };
}

interface DetectionResultsProps {
  result: DetectionResult;
  fileName: string;
}

const DetectionResults = ({ result, fileName }: DetectionResultsProps) => {
  const getStatusIcon = () => {
    if (result.isDeepfake) {
      return <XCircle className="h-6 w-6 text-danger" />;
    }
    return <CheckCircle className="h-6 w-6 text-success" />;
  };

  const getStatusColor = () => {
    if (result.isDeepfake) {
      return result.confidence > 80 ? 'danger' : 'warning';
    }
    return 'success';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className="border-border/50 shadow-[0_0_30px_hsl(var(--primary)/0.1)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getStatusIcon()}
            <span>Detection Results for {fileName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Status */}
          <div className="text-center space-y-4">
            <div className={cn(
              "text-3xl font-bold",
              result.isDeepfake ? 'text-danger' : 'text-success'
            )}>
              {result.isDeepfake ? 'DEEPFAKE DETECTED' : 'AUTHENTIC CONTENT'}
            </div>
            <Badge 
              variant={result.isDeepfake ? 'destructive' : 'default'}
              className="text-lg px-4 py-2"
            >
              {result.confidence.toFixed(1)}% Confidence
            </Badge>
          </div>

          {/* Confidence Meter */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Confidence Level</span>
              <span className={getConfidenceColor(result.confidence)}>
                {result.confidence.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={result.confidence} 
              className={cn(
                "h-3",
                result.isDeepfake ? '[&>div]:bg-danger' : '[&>div]:bg-success'
              )}
            />
          </div>

          {/* Processing Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">{result.processingTime}ms</div>
              <div className="text-sm text-muted-foreground">Processing Time</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">
                {Object.keys(result.analysisDetails).length}
              </div>
              <div className="text-sm text-muted-foreground">Analysis Models</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Detailed Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(result.analysisDetails).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className={getConfidenceColor(value)}>{value.toFixed(1)}%</span>
              </div>
              <Progress value={value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Explanations */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            AI Analysis Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.explanations.map((explanation, index) => (
              <Alert key={index} className="border-border/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{explanation}</AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            File Metadata
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium">Resolution:</span>
              <span className="ml-2 text-sm text-muted-foreground">{result.metadata.resolution}</span>
            </div>
            <div>
              <span className="text-sm font-medium">Format:</span>
              <span className="ml-2 text-sm text-muted-foreground">{result.metadata.format}</span>
            </div>
            {result.metadata.duration && (
              <div className="col-span-2">
                <span className="text-sm font-medium">Duration:</span>
                <span className="ml-2 text-sm text-muted-foreground">{result.metadata.duration}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetectionResults;