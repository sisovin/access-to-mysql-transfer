import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Server, Database, User, Lock, CheckCircle2, AlertCircle } from "lucide-react";

interface MySQLConfigurationProps {
  onConfigurationSaved: (config: MySQLConfig) => void;
}

export interface MySQLConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

export const MySQLConfiguration = ({ onConfigurationSaved }: MySQLConfigurationProps) => {
  const [config, setConfig] = useState<MySQLConfig>({
    host: "localhost",
    user: "",
    password: "",
    database: "",
    port: 3306
  });
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: keyof MySQLConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setConnectionStatus('idle');
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success/failure (90% success rate for demo)
    const success = Math.random() > 0.1;
    setConnectionStatus(success ? 'success' : 'error');
    setIsTestingConnection(false);
  };

  const handleSaveConfiguration = () => {
    onConfigurationSaved(config);
  };

  const isFormValid = config.host && config.user && config.database;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card border-border shadow-[var(--shadow-elegant)]">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-4">
          <Server className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-card-foreground">MySQL Configuration</CardTitle>
        <CardDescription className="text-muted-foreground">
          Configure your MySQL database connection settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="host" className="text-card-foreground flex items-center gap-2">
              <Server className="w-4 h-4" />
              Host
            </Label>
            <Input
              id="host"
              value={config.host}
              onChange={(e) => handleInputChange('host', e.target.value)}
              placeholder="localhost"
              className="bg-background border-border text-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="port" className="text-card-foreground">Port</Label>
            <Input
              id="port"
              type="number"
              value={config.port}
              onChange={(e) => handleInputChange('port', parseInt(e.target.value) || 3306)}
              placeholder="3306"
              className="bg-background border-border text-foreground"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="user" className="text-card-foreground flex items-center gap-2">
            <User className="w-4 h-4" />
            Username
          </Label>
          <Input
            id="user"
            value={config.user}
            onChange={(e) => handleInputChange('user', e.target.value)}
            placeholder="mysql_username"
            className="bg-background border-border text-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-card-foreground flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={config.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Enter your password"
            className="bg-background border-border text-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="database" className="text-card-foreground flex items-center gap-2">
            <Database className="w-4 h-4" />
            Database Name
          </Label>
          <Input
            id="database"
            value={config.database}
            onChange={(e) => handleInputChange('database', e.target.value)}
            placeholder="target_database"
            className="bg-background border-border text-foreground"
          />
        </div>

        {connectionStatus === 'success' && (
          <Alert className="border-success/20 bg-success/10">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <AlertDescription className="text-success">
              Connection successful! MySQL database is ready for data transfer.
            </AlertDescription>
          </Alert>
        )}

        {connectionStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Connection failed. Please check your credentials and database settings.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3">
          <Button
            onClick={testConnection}
            disabled={!isFormValid || isTestingConnection}
            variant="outline"
            className="flex-1 border-border hover:bg-secondary"
          >
            {isTestingConnection ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Database className="w-4 h-4 mr-2" />
                Test Connection
              </>
            )}
          </Button>
          
          <Button
            onClick={handleSaveConfiguration}
            disabled={!isFormValid || connectionStatus !== 'success'}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Connection Status:</span>
            <Badge 
              variant={connectionStatus === 'success' ? 'default' : connectionStatus === 'error' ? 'destructive' : 'secondary'}
              className={connectionStatus === 'success' ? 'bg-success text-success-foreground' : ''}
            >
              {connectionStatus === 'success' ? 'Connected' : connectionStatus === 'error' ? 'Failed' : 'Not Tested'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};