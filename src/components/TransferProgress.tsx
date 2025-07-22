import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, XCircle, Clock, Database, ArrowLeft, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TransferItem {
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  progress: number;
  recordsTransferred?: number;
  totalRecords?: number;
  error?: string;
}

interface TransferProgressProps {
  selectedItems: string[];
  onBack: () => void;
  onComplete: () => void;
}

export const TransferProgress = ({ selectedItems, onBack, onComplete }: TransferProgressProps) => {
  const [transferItems, setTransferItems] = useState<TransferItem[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isTransferring, setIsTransferring] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize transfer items
    const items: TransferItem[] = selectedItems.map(name => ({
      name,
      status: 'pending',
      progress: 0,
      totalRecords: Math.floor(Math.random() * 5000) + 100, // Mock data
    }));
    setTransferItems(items);
  }, [selectedItems]);

  const startTransfer = async () => {
    setIsTransferring(true);
    
    for (let i = 0; i < transferItems.length; i++) {
      // Update item to in-progress
      setTransferItems(prev => prev.map((item, index) => 
        index === i ? { ...item, status: 'in-progress' } : item
      ));

      // Simulate transfer progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        setTransferItems(prev => prev.map((item, index) => 
          index === i ? { 
            ...item, 
            progress,
            recordsTransferred: Math.floor((progress / 100) * (item.totalRecords || 0))
          } : item
        ));
      }

      // Mark as completed (with occasional failures for demo)
      const failed = Math.random() < 0.1; // 10% chance of failure
      setTransferItems(prev => prev.map((item, index) => 
        index === i ? { 
          ...item, 
          status: failed ? 'failed' : 'completed',
          error: failed ? 'Connection timeout' : undefined,
          recordsTransferred: failed ? 0 : item.totalRecords
        } : item
      ));

      // Update overall progress
      setOverallProgress(((i + 1) / transferItems.length) * 100);
    }

    setIsTransferring(false);
    setIsCompleted(true);

    const successCount = transferItems.filter(item => item.status === 'completed').length;
    const failureCount = transferItems.filter(item => item.status === 'failed').length;

    if (failureCount === 0) {
      toast({
        title: "Migration Complete!",
        description: `Successfully transferred all ${successCount} items to MySQL database.`,
        className: "bg-success text-success-foreground",
      });
    } else {
      toast({
        title: "Migration Finished with Errors",
        description: `${successCount} items transferred successfully, ${failureCount} failed.`,
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'failed': return <XCircle className="w-4 h-4 text-destructive" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-primary animate-spin" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      case 'in-progress': return <Badge className="bg-primary text-primary-foreground">In Progress</Badge>;
      default: return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const completedCount = transferItems.filter(item => item.status === 'completed').length;
  const failedCount = transferItems.filter(item => item.status === 'failed').length;

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <Card className="bg-card border-border shadow-[var(--shadow-elegant)]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-card-foreground flex items-center gap-2">
                <Database className="w-6 h-6 text-primary" />
                Database Migration Progress
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Transferring {selectedItems.length} items to MySQL database
              </CardDescription>
            </div>
            {!isTransferring && !isCompleted && (
              <Button 
                onClick={onBack}
                variant="outline"
                className="border-border hover:bg-secondary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-card-foreground">Overall Progress</h3>
              <span className="text-sm text-muted-foreground">
                {Math.round(overallProgress)}% Complete
              </span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            {isCompleted && (
              <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                <div className="text-sm text-card-foreground">
                  <span className="text-success font-medium">{completedCount} successful</span>
                  {failedCount > 0 && (
                    <span className="text-destructive font-medium ml-4">{failedCount} failed</span>
                  )}
                </div>
                <Button 
                  onClick={onComplete}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Download className="w-4 h-4 mr-2" />
                  View Results
                </Button>
              </div>
            )}
          </div>

          {/* Individual Items Progress */}
          <div className="space-y-3">
            <h3 className="font-semibold text-card-foreground">Item Details</h3>
            <ScrollArea className="h-[400px] rounded-lg border border-border p-4 bg-background">
              <div className="space-y-3">
                {transferItems.map((item, index) => (
                  <Card key={item.name} className="bg-card border-border/50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(item.status)}
                            <span className="font-medium text-card-foreground">{item.name}</span>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>
                        
                        {item.status === 'in-progress' && (
                          <div className="space-y-2">
                            <Progress value={item.progress} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{item.recordsTransferred?.toLocaleString()} / {item.totalRecords?.toLocaleString()} records</span>
                              <span>{item.progress}%</span>
                            </div>
                          </div>
                        )}
                        
                        {item.status === 'completed' && (
                          <div className="text-sm text-success">
                            ✓ {item.recordsTransferred?.toLocaleString()} records transferred successfully
                          </div>
                        )}
                        
                        {item.status === 'failed' && item.error && (
                          <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                            ✗ Error: {item.error}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {!isTransferring && !isCompleted && (
            <Button
              onClick={startTransfer}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-glow)]"
              size="lg"
            >
              <Database className="w-4 h-4 mr-2" />
              Start Transfer Process
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};