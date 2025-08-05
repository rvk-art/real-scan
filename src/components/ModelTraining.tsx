import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  Play, 
  Pause, 
  Square, 
  Settings, 
  Brain, 
  Target,
  TrendingUp,
  Clock,
  Cpu
} from 'lucide-react';

interface TrainingMetrics {
  epoch: number;
  trainAccuracy: number;
  valAccuracy: number;
  trainLoss: number;
  valLoss: number;
  f1Score: number;
  precision: number;
  recall: number;
  learningRate: number;
}

const ModelTraining: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [totalEpochs] = useState(50);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [selectedModel, setSelectedModel] = useState('hybrid-cnn-vit');
  const [batchSize, setBatchSize] = useState('32');
  const [learningRate, setLearningRate] = useState('0.001');

  const [metrics, setMetrics] = useState<TrainingMetrics[]>([
    { epoch: 1, trainAccuracy: 0.65, valAccuracy: 0.62, trainLoss: 0.68, valLoss: 0.72, f1Score: 0.61, precision: 0.59, recall: 0.64, learningRate: 0.001 },
    { epoch: 5, trainAccuracy: 0.78, valAccuracy: 0.75, trainLoss: 0.45, valLoss: 0.52, f1Score: 0.74, precision: 0.73, recall: 0.76, learningRate: 0.001 },
    { epoch: 10, trainAccuracy: 0.85, valAccuracy: 0.82, trainLoss: 0.32, valLoss: 0.38, f1Score: 0.81, precision: 0.80, recall: 0.83, learningRate: 0.0008 },
    { epoch: 15, trainAccuracy: 0.91, valAccuracy: 0.87, trainLoss: 0.22, valLoss: 0.28, f1Score: 0.86, precision: 0.85, recall: 0.88, learningRate: 0.0006 },
    { epoch: 20, trainAccuracy: 0.94, valAccuracy: 0.90, trainLoss: 0.16, valLoss: 0.23, f1Score: 0.89, precision: 0.88, recall: 0.91, learningRate: 0.0004 },
    { epoch: 25, trainAccuracy: 0.96, valAccuracy: 0.92, trainLoss: 0.12, valLoss: 0.20, f1Score: 0.91, precision: 0.90, recall: 0.93, learningRate: 0.0002 },
    { epoch: 30, trainAccuracy: 0.97, valAccuracy: 0.93, trainLoss: 0.09, valLoss: 0.18, f1Score: 0.92, precision: 0.91, recall: 0.94, learningRate: 0.0001 }
  ]);

  const modelConfigs = {
    'hybrid-cnn-vit': {
      name: 'Hybrid CNN + Vision Transformer',
      description: 'Combines CNN spatial features with ViT temporal analysis',
      params: '47.2M parameters',
      estimatedTime: '~6 hours'
    },
    'efficientnet-b4': {
      name: 'EfficientNet-B4',
      description: 'Efficient convolutional neural network for image classification',
      params: '19.3M parameters',
      estimatedTime: '~4 hours'
    },
    'resnet50-lstm': {
      name: 'ResNet50 + LSTM',
      description: 'ResNet50 backbone with LSTM for temporal sequence analysis',
      params: '32.1M parameters',
      estimatedTime: '~5 hours'
    },
    'xception': {
      name: 'Xception',
      description: 'Depthwise separable convolutions for deepfake detection',
      params: '22.9M parameters',
      estimatedTime: '~4.5 hours'
    }
  };

  const startTraining = () => {
    setIsTraining(true);
    setCurrentEpoch(0);
    setTrainingProgress(0);

    // Simulate training progress
    const interval = setInterval(() => {
      setCurrentEpoch(prev => {
        const newEpoch = prev + 1;
        setTrainingProgress((newEpoch / totalEpochs) * 100);
        
        if (newEpoch >= totalEpochs) {
          clearInterval(interval);
          setIsTraining(false);
        }
        
        return newEpoch;
      });
    }, 200); // Faster simulation for demo
  };

  const pauseTraining = () => {
    setIsTraining(false);
  };

  const stopTraining = () => {
    setIsTraining(false);
    setCurrentEpoch(0);
    setTrainingProgress(0);
  };

  const currentConfig = modelConfigs[selectedModel as keyof typeof modelConfigs];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Model Training & Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="training" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
            </TabsList>

            <TabsContent value="training" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Training Control
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span>Model:</span>
                      <span className="font-medium">{currentConfig.name}</span>
                      
                      <span>Dataset:</span>
                      <span className="font-medium">FaceForensics++ + DFDC</span>
                      
                      <span>Batch Size:</span>
                      <span className="font-medium">{batchSize}</span>
                      
                      <span>Learning Rate:</span>
                      <span className="font-medium">{learningRate}</span>
                      
                      <span>Epochs:</span>
                      <span className="font-medium">{currentEpoch}/{totalEpochs}</span>
                      
                      <span>Estimated Time:</span>
                      <span className="font-medium">{currentConfig.estimatedTime}</span>
                    </div>

                    {isTraining && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Training Progress</span>
                          <span>{Math.round(trainingProgress)}%</span>
                        </div>
                        <Progress value={trainingProgress} className="h-2" />
                      </div>
                    )}

                    <div className="flex gap-2">
                      {!isTraining ? (
                        <Button onClick={startTraining} className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Start Training
                        </Button>
                      ) : (
                        <Button onClick={pauseTraining} variant="outline" className="flex-1">
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                      )}
                      <Button onClick={stopTraining} variant="destructive" size="sm">
                        <Square className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Live Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span>Current Accuracy:</span>
                      <span className="font-medium text-success">
                        {isTraining ? `${(65 + currentEpoch * 0.8).toFixed(1)}%` : '93.2%'}
                      </span>
                      
                      <span>Validation Accuracy:</span>
                      <span className="font-medium text-success">
                        {isTraining ? `${(62 + currentEpoch * 0.7).toFixed(1)}%` : '91.8%'}
                      </span>
                      
                      <span>Current Loss:</span>
                      <span className="font-medium">
                        {isTraining ? (0.68 - currentEpoch * 0.015).toFixed(3) : '0.142'}
                      </span>
                      
                      <span>F1-Score:</span>
                      <span className="font-medium text-primary">
                        {isTraining ? (0.61 + currentEpoch * 0.008).toFixed(3) : '0.927'}
                      </span>
                      
                      <span>GPU Utilization:</span>
                      <span className="font-medium text-warning">
                        {isTraining ? '95%' : '0%'}
                      </span>
                      
                      <span>Memory Usage:</span>
                      <span className="font-medium">
                        {isTraining ? '7.2/8.0 GB' : '0.8/8.0 GB'}
                      </span>
                    </div>

                    <div className="pt-2 border-t">
                      <Badge variant={isTraining ? "destructive" : "secondary"} className="w-full justify-center">
                        {isTraining ? (
                          <>
                            <Cpu className="h-3 w-3 mr-1 animate-pulse" />
                            Training Active
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            Ready to Train
                          </>
                        )}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Training & Validation Accuracy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={metrics}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="epoch" />
                        <YAxis domain={[0.5, 1]} />
                        <Tooltip 
                          formatter={(value: any, name: string) => [
                            `${(value * 100).toFixed(1)}%`, 
                            name === 'trainAccuracy' ? 'Training Accuracy' : 'Validation Accuracy'
                          ]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="trainAccuracy" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="valAccuracy" 
                          stroke="hsl(var(--success))" 
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Training & Validation Loss</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={metrics}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="epoch" />
                        <YAxis domain={[0, 0.8]} />
                        <Tooltip 
                          formatter={(value: any, name: string) => [
                            value.toFixed(3), 
                            name === 'trainLoss' ? 'Training Loss' : 'Validation Loss'
                          ]}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="trainLoss" 
                          stackId="1"
                          stroke="hsl(var(--destructive))" 
                          fill="hsl(var(--destructive) / 0.3)"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="valLoss" 
                          stackId="2"
                          stroke="hsl(var(--warning))" 
                          fill="hsl(var(--warning) / 0.3)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Metrics Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={metrics}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="epoch" />
                      <YAxis domain={[0.5, 1]} />
                      <Tooltip 
                        formatter={(value: any, name: string) => [
                          name === 'f1Score' || name === 'precision' || name === 'recall' 
                            ? value.toFixed(3) 
                            : `${(value * 100).toFixed(1)}%`, 
                          name === 'f1Score' ? 'F1-Score' :
                          name === 'precision' ? 'Precision' : 'Recall'
                        ]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="f1Score" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="precision" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="recall" 
                        stroke="hsl(var(--warning))" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="models" className="space-y-4">
              <div className="grid gap-4">
                {Object.entries(modelConfigs).map(([key, config]) => (
                  <Card 
                    key={key} 
                    className={`cursor-pointer transition-all ${
                      selectedModel === key ? 'ring-2 ring-primary' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedModel(key)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{config.name}</h4>
                          <p className="text-sm text-muted-foreground">{config.description}</p>
                        </div>
                        <div className="text-right text-sm">
                          <div className="font-medium">{config.params}</div>
                          <div className="text-muted-foreground">{config.estimatedTime}</div>
                        </div>
                      </div>
                      {selectedModel === key && (
                        <Badge variant="default" className="mt-2">
                          Selected
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="config" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Training Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Batch Size</label>
                      <Select value={batchSize} onValueChange={setBatchSize}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="16">16</SelectItem>
                          <SelectItem value="32">32</SelectItem>
                          <SelectItem value="64">64</SelectItem>
                          <SelectItem value="128">128</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Learning Rate</label>
                      <Select value={learningRate} onValueChange={setLearningRate}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.0001">0.0001</SelectItem>
                          <SelectItem value="0.001">0.001</SelectItem>
                          <SelectItem value="0.01">0.01</SelectItem>
                          <SelectItem value="0.1">0.1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Data Augmentation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Random Rotation:</span>
                        <Badge variant="secondary">±15°</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Horizontal Flip:</span>
                        <Badge variant="secondary">50% probability</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Brightness Adjustment:</span>
                        <Badge variant="secondary">±20%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Gaussian Noise:</span>
                        <Badge variant="secondary">σ=0.1</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Random Crop:</span>
                        <Badge variant="secondary">224×224</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelTraining;