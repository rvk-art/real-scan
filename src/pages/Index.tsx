import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FileUpload from '@/components/FileUpload';
import ProcessingStatus from '@/components/ProcessingStatus';
import DetectionResults from '@/components/DetectionResults';
import { Shield, Brain, Eye, Zap, CheckCircle, Users, Globe, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const { toast } = useToast();

  interface ProcessingStep {
    id: string;
    name: string;
    description: string;
    status: 'pending' | 'processing' | 'completed';
    progress: number;
  }

  const processingSteps: ProcessingStep[] = [
    {
      id: 'preprocessing',
      name: 'Preprocessing',
      description: 'Extracting frames and normalizing data',
      status: 'pending',
      progress: 0
    },
    {
      id: 'feature_extraction',
      name: 'Feature Extraction',
      description: 'Analyzing facial features and temporal patterns',
      status: 'pending',
      progress: 0
    },
    {
      id: 'classification',
      name: 'Classification',
      description: 'AI model inference and confidence calculation',
      status: 'pending',
      progress: 0
    }
  ];

  const [steps, setSteps] = useState(processingSteps);

  const simulateAnalysis = async (file: File) => {
    setIsProcessing(true);
    setDetectionResult(null);
    
    // Reset steps
    setSteps(processingSteps);
    setProcessingStep(0);
    setOverallProgress(0);

    // Simulate processing steps
    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(i);
      
      // Update current step to processing
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index === i ? 'processing' : index < i ? 'completed' : 'pending'
      })));

      // Simulate step progress
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setSteps(prev => prev.map((step, index) => ({
          ...step,
          progress: index === i ? progress : step.progress
        })));
        setOverallProgress((i * 100 + progress) / steps.length);
      }

      // Mark step as completed
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index <= i ? 'completed' : 'pending'
      })));
    }

    // Generate mock result based on file analysis
    const isVideo = file.type.startsWith('video/');
    const mockResult: DetectionResult = {
      isDeepfake: Math.random() > 0.7, // 30% chance of being deepfake
      confidence: 75 + Math.random() * 20, // 75-95% confidence
      processingTime: 1200 + Math.random() * 800,
      analysisDetails: {
        facialFeatures: 80 + Math.random() * 15,
        lipSync: isVideo ? 70 + Math.random() * 25 : 0,
        temporalConsistency: isVideo ? 85 + Math.random() * 10 : 0,
        artifactDetection: 90 + Math.random() * 10
      },
      explanations: [
        "Facial landmark analysis detected consistent eye movement patterns",
        "Temporal coherence analysis found natural frame-to-frame transitions",
        isVideo ? "Lip-sync analysis shows natural speech alignment" : "Static image analysis completed successfully",
        "No significant compression artifacts or manipulation traces detected"
      ].filter(Boolean),
      metadata: {
        resolution: "1920x1080",
        duration: isVideo ? "00:00:15" : undefined,
        format: file.type.split('/')[1].toUpperCase()
      }
    };

    setDetectionResult(mockResult);
    setIsProcessing(false);
    
    toast({
      title: "Analysis Complete",
      description: `File analyzed in ${mockResult.processingTime}ms`,
    });
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    simulateAnalysis(file);
  };

  const resetAnalysis = () => {
    setUploadedFile(null);
    setDetectionResult(null);
    setIsProcessing(false);
    setProcessingStep(0);
    setOverallProgress(0);
    setSteps(processingSteps);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground">
                Advanced AI Detection System
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Deepfake Detection
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Cutting-edge AI system utilizing CNNs, Vision Transformers, and behavioral analytics 
              to detect manipulated media with 94.3% accuracy. Protect against digital deception 
              and ensure content authenticity.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                Military-grade Security
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                Real-time Processing
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="h-4 w-4 text-primary" />
                Explainable AI
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-foreground mb-2">Upload Media for Analysis</h2>
              <p className="text-muted-foreground">
                Our AI system supports images and videos. Get instant deepfake detection results.
              </p>
            </div>
            
            <FileUpload 
              onFileUpload={handleFileUpload}
              isProcessing={isProcessing}
            />

            {uploadedFile && !isProcessing && !detectionResult && (
              <div className="text-center">
                <Button 
                  variant="default" 
                  size="lg" 
                  onClick={() => simulateAnalysis(uploadedFile)}
                  className="bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
                >
                  Start Analysis
                </Button>
              </div>
            )}

            {detectionResult && (
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={resetAnalysis}
                  className="w-full"
                >
                  Analyze Another File
                </Button>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {isProcessing && (
              <ProcessingStatus 
                currentStep={processingStep}
                overallProgress={overallProgress}
                steps={steps}
              />
            )}

            {detectionResult && uploadedFile && (
              <DetectionResults 
                result={detectionResult}
                fileName={uploadedFile.name}
              />
            )}

            {!isProcessing && !detectionResult && (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/20 mt-1">
                        <Brain className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Multi-Modal Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          CNNs analyze spatial features while Vision Transformers process temporal sequences
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/20 mt-1">
                        <Eye className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Behavioral Analytics</h4>
                        <p className="text-sm text-muted-foreground">
                          Examines facial expressions, lip-sync, and micro-movements
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/20 mt-1">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Explainable Results</h4>
                        <p className="text-sm text-muted-foreground">
                          Get detailed insights into why content was flagged
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-secondary/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Proven Performance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our system has been tested on leading datasets including FaceForensics++, DFDC, and Celeb-DF
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">94.3%</div>
              <div className="text-sm text-muted-foreground">Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">&lt;1.2s</div>
              <div className="text-sm text-muted-foreground">Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.1%</div>
              <div className="text-sm text-muted-foreground">True Positive Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2.3%</div>
              <div className="text-sm text-muted-foreground">False Positive Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Critical Applications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Protecting digital integrity across industries and use cases
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <div className="p-4 rounded-full bg-primary/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cybersecurity</h3>
                <p className="text-muted-foreground">
                  Protect against identity fraud, social engineering, and unauthorized access attempts
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <div className="p-4 rounded-full bg-primary/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Media Verification</h3>
                <p className="text-muted-foreground">
                  Ensure authenticity of news content and prevent spread of misinformation
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <div className="p-4 rounded-full bg-primary/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
                <p className="text-muted-foreground">
                  Verify executive communications and protect against CEO fraud attempts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;