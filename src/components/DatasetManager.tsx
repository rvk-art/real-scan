import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Play, Pause } from 'lucide-react';


const DatasetManager: React.FC = () => {

  
  const [modelTraining, setModelTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);


  const startTraining = () => {
    setModelTraining(true);
    setTrainingProgress(0);

    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setModelTraining(false);
          return 100;
        }
        return prev + Math.random() * 2;
      });
    }, 200);
  };



  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Dataset Management & Training
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="datasets" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="training">Model Training</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>


            <TabsContent value="training" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Model Training</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span>Architecture:</span>
                      <span className="font-medium">CNN + ViT Hybrid</span>
                      
                      <span>Dataset:</span>
                      <span className="font-medium">FaceForensics++ + DFDC</span>
                      
                      <span>Batch Size:</span>
                      <span className="font-medium">32</span>
                      
                      <span>Learning Rate:</span>
                      <span className="font-medium">0.001</span>
                    </div>

                    {modelTraining && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Training Progress</span>
                          <span>{Math.round(trainingProgress)}%</span>
                        </div>
                        <Progress value={trainingProgress} className="h-2" />
                      </div>
                    )}

                    <Button 
                      onClick={startTraining}
                      disabled={modelTraining}
                      className="w-full"
                    >
                      {modelTraining ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Training in Progress...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start Training
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Training Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span>Current Epoch:</span>
                      <span className="font-medium">{modelTraining ? Math.floor(trainingProgress / 10) : '15/50'}</span>
                      
                      <span>Training Accuracy:</span>
                      <span className="font-medium text-success">94.3%</span>
                      
                      <span>Validation Accuracy:</span>
                      <span className="font-medium text-success">91.8%</span>
                      
                      <span>Training Loss:</span>
                      <span className="font-medium">0.142</span>
                      
                      <span>Validation Loss:</span>
                      <span className="font-medium">0.198</span>
                      
                      <span>F1-Score:</span>
                      <span className="font-medium text-success">0.927</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-success">94.3%</div>
                    <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">0.927</div>
                    <div className="text-sm text-muted-foreground">F1-Score</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-warning">2.3s</div>
                    <div className="text-sm text-muted-foreground">Avg Processing Time</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Model Performance by Dataset</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'FaceForensics++ (Face2Face)', accuracy: 96.2, f1: 0.954 },
                      { name: 'FaceForensics++ (Deepfakes)', accuracy: 94.8, f1: 0.932 },
                      { name: 'FaceForensics++ (FaceSwap)', accuracy: 93.1, f1: 0.918 },
                      { name: 'DFDC Challenge', accuracy: 89.7, f1: 0.885 },
                      { name: 'Celeb-DF', accuracy: 91.4, f1: 0.903 }
                    ].map((dataset) => (
                      <div key={dataset.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">{dataset.name}</span>
                        <div className="flex gap-4 text-sm">
                          <span>Accuracy: <span className="font-medium text-success">{dataset.accuracy}%</span></span>
                          <span>F1: <span className="font-medium text-primary">{dataset.f1}</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatasetManager;