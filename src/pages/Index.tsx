import { useState } from "react";
import { DatabaseSelector } from "@/components/DatabaseSelector";
import { MySQLConfiguration, MySQLConfig } from "@/components/MySQLConfiguration";
import { DatabasePreview } from "@/components/DatabasePreview";
import { TransferProgress } from "@/components/TransferProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, ArrowRight, CheckCircle2 } from "lucide-react";

type AppStep = 'database-select' | 'mysql-config' | 'preview' | 'transfer' | 'complete';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('database-select');
  const [selectedDatabase, setSelectedDatabase] = useState<string>("");
  const [mysqlConfig, setMysqlConfig] = useState<MySQLConfig | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const steps = [
    { id: 'database-select', label: 'Select Access Database', icon: Database },
    { id: 'mysql-config', label: 'MySQL Configuration', icon: Database },
    { id: 'preview', label: 'Preview & Select', icon: Database },
    { id: 'transfer', label: 'Transfer Data', icon: ArrowRight },
    { id: 'complete', label: 'Complete', icon: CheckCircle2 },
  ];

  const handleDatabaseSelected = (databasePath: string) => {
    setSelectedDatabase(databasePath);
    setCurrentStep('mysql-config');
  };

  const handleMySQLConfigured = (config: MySQLConfig) => {
    setMysqlConfig(config);
    setCurrentStep('preview');
  };

  const handleStartTransfer = (items: string[]) => {
    setSelectedItems(items);
    setCurrentStep('transfer');
  };

  const handleTransferComplete = () => {
    setCurrentStep('complete');
  };

  const handleStartOver = () => {
    setCurrentStep('database-select');
    setSelectedDatabase("");
    setMysqlConfig(null);
    setSelectedItems([]);
  };

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-subtle)] p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="mx-auto w-20 h-20 bg-[var(--gradient-primary)] rounded-full flex items-center justify-center shadow-[var(--shadow-glow)]">
            <Database className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Access to MySQL Migration Tool</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Seamlessly transfer your Access database tables, queries, and procedures to MySQL with our modern migration wizard
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-center text-foreground">Migration Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {steps.map((step, index) => {
                const status = getStepStatus(step.id);
                const StepIcon = step.icon;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-[var(--transition-smooth)] ${
                          status === 'completed'
                            ? 'bg-success text-success-foreground shadow-[var(--shadow-elegant)]'
                            : status === 'current'
                            ? 'bg-primary text-primary-foreground shadow-[var(--shadow-glow)]'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <div className="text-center">
                        <p className={`text-sm font-medium ${
                          status === 'current' ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {step.label}
                        </p>
                        <Badge 
                          variant={status === 'completed' ? 'default' : status === 'current' ? 'default' : 'secondary'}
                          className={`text-xs ${
                            status === 'completed' ? 'bg-success text-success-foreground' :
                            status === 'current' ? 'bg-primary text-primary-foreground' : ''
                          }`}
                        >
                          {status === 'completed' ? 'Done' : status === 'current' ? 'Active' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 transition-[var(--transition-smooth)] ${
                        getStepStatus(steps[index + 1].id) === 'completed' || 
                        (getStepStatus(steps[index].id) === 'completed' && getStepStatus(steps[index + 1].id) === 'current')
                          ? 'bg-primary' : 'bg-border'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="pb-8">
          {currentStep === 'database-select' && (
            <DatabaseSelector onDatabaseSelected={handleDatabaseSelected} />
          )}
          
          {currentStep === 'mysql-config' && (
            <MySQLConfiguration onConfigurationSaved={handleMySQLConfigured} />
          )}
          
          {currentStep === 'preview' && (
            <DatabasePreview 
              databasePath={selectedDatabase}
              onStartTransfer={handleStartTransfer}
            />
          )}
          
          {currentStep === 'transfer' && (
            <TransferProgress
              selectedItems={selectedItems}
              onBack={() => setCurrentStep('preview')}
              onComplete={handleTransferComplete}
            />
          )}
          
          {currentStep === 'complete' && (
            <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-success/10 to-primary/10 border-success/20 shadow-[var(--shadow-elegant)]">
              <CardContent className="pt-8 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-success rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-success-foreground" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Migration Complete!</h2>
                  <p className="text-muted-foreground">
                    Your Access database has been successfully transferred to MySQL.
                  </p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold text-foreground">Transfer Summary</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Source: {selectedDatabase}</p>
                    <p>• Target: {mysqlConfig?.host}:{mysqlConfig?.port}/{mysqlConfig?.database}</p>
                    <p>• Items transferred: {selectedItems.length}</p>
                  </div>
                </div>
                <button
                  onClick={handleStartOver}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg transition-[var(--transition-smooth)] shadow-[var(--shadow-glow)]"
                >
                  Start New Migration
                </button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
