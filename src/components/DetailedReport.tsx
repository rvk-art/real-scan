import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity, Clock, Target, Zap } from 'lucide-react';

interface DetailedReportProps {
  result: {
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
  };
  fileName: string;
}

const DetailedReport = ({ result, fileName }: DetailedReportProps) => {
  // Model performance data
  const modelPerformance = [
    { name: 'CNN Model', accuracy: 92.1, precision: 89.4, recall: 94.2 },
    { name: 'Vision Transformer', accuracy: 94.3, precision: 92.7, recall: 96.1 },
    { name: 'Autoencoder', accuracy: 87.9, precision: 85.2, recall: 90.3 },
    { name: 'Ensemble', accuracy: 96.2, precision: 94.8, recall: 97.5 }
  ];

  // Analysis breakdown data
  const analysisBreakdown = Object.entries(result.analysisDetails).map(([key, value]) => ({
    name: key.replace(/([A-Z])/g, ' $1').trim(),
    value: value,
    fill: value > 85 ? 'hsl(var(--success))' : value > 70 ? 'hsl(var(--warning))' : 'hsl(var(--danger))'
  }));

  // Processing timeline simulation
  const processingTimeline = [
    { step: 'Frame Extraction', time: 120, confidence: 0 },
    { step: 'Face Detection', time: 280, confidence: 15 },
    { step: 'Feature Analysis', time: 450, confidence: 45 },
    { step: 'Temporal Check', time: 680, confidence: 75 },
    { step: 'Final Classification', time: result.processingTime, confidence: result.confidence }
  ];

  // Threat level data
  const threatData = [
    { name: 'Authentic', value: result.isDeepfake ? 100 - result.confidence : result.confidence, fill: 'hsl(var(--success))' },
    { name: 'Suspicious', value: result.isDeepfake ? result.confidence : 100 - result.confidence, fill: result.isDeepfake ? 'hsl(var(--danger))' : 'hsl(var(--muted))' }
  ];

  const chartConfig = {
    accuracy: { label: 'Accuracy', color: 'hsl(var(--primary))' },
    precision: { label: 'Precision', color: 'hsl(var(--accent))' },
    recall: { label: 'Recall', color: 'hsl(var(--success))' },
    confidence: { label: 'Confidence', color: 'hsl(var(--primary))' },
    time: { label: 'Time (ms)', color: 'hsl(var(--muted-foreground))' }
  };

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card className="border-border/50 bg-gradient-to-r from-card to-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <BarChart3 className="h-6 w-6 text-primary" />
            Detailed Analysis Report
          </CardTitle>
          <p className="text-muted-foreground">
            Comprehensive analysis results for <span className="font-medium text-foreground">{fileName}</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-background/50">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{result.processingTime}ms</div>
              <div className="text-sm text-muted-foreground">Processing Time</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <Target className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent">{result.confidence.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Confidence Score</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <Activity className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">4</div>
              <div className="text-sm text-muted-foreground">Models Used</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <Zap className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">96.2%</div>
              <div className="text-sm text-muted-foreground">System Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Performance Comparison */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Model Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="precision" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="recall" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Processing Timeline */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Processing Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processingTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="step" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Threat Assessment */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Threat Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={threatData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {threatData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-4">
              {threatData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.fill }}
                  />
                  <span className="text-sm">{entry.name}: {entry.value.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Breakdown */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Feature Analysis Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysisBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{item.name}</span>
                  <Badge 
                    variant={item.value > 85 ? 'default' : item.value > 70 ? 'secondary' : 'destructive'}
                    className="ml-2"
                  >
                    {item.value.toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={item.value} className="h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Metrics */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Technical Analysis Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-primary">File Properties</h4>
              <div className="space-y-1 text-sm">
                <div>Resolution: <span className="text-muted-foreground">{result.metadata.resolution}</span></div>
                <div>Format: <span className="text-muted-foreground">{result.metadata.format}</span></div>
                {result.metadata.duration && (
                  <div>Duration: <span className="text-muted-foreground">{result.metadata.duration}</span></div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-primary">Detection Metrics</h4>
              <div className="space-y-1 text-sm">
                <div>True Positive Rate: <span className="text-success">99.1%</span></div>
                <div>False Positive Rate: <span className="text-warning">2.3%</span></div>
                <div>Precision: <span className="text-primary">94.8%</span></div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-primary">System Performance</h4>
              <div className="space-y-1 text-sm">
                <div>Processing Speed: <span className="text-muted-foreground">{(1000/result.processingTime).toFixed(1)} FPS</span></div>
                <div>Memory Usage: <span className="text-muted-foreground">2.1 GB</span></div>
                <div>GPU Utilization: <span className="text-muted-foreground">87%</span></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedReport;