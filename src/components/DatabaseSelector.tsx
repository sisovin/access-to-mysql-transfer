import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderOpen, Database } from "lucide-react";

interface DatabaseSelectorProps {
  onDatabaseSelected: (databasePath: string) => void;
}

export const DatabaseSelector = ({ onDatabaseSelected }: DatabaseSelectorProps) => {
  const [selectedFile, setSelectedFile] = useState<string>("");
  
  const handleFileSelect = () => {
    // In a real implementation, this would open a file dialog
    // For demo purposes, we'll simulate file selection
    const mockPath = "C:\\Database\\SampleDatabase.mdb";
    setSelectedFile(mockPath);
  };

  const handleConnect = () => {
    if (selectedFile) {
      onDatabaseSelected(selectedFile);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card border-border shadow-[var(--shadow-elegant)]">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mb-4">
          <Database className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl text-card-foreground">Select Access Database</CardTitle>
        <CardDescription className="text-muted-foreground">
          Choose an Access database file (.mdb or .accdb) to migrate to MySQL
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="database-path" className="text-card-foreground">Database File Path</Label>
          <div className="flex gap-2">
            <Input
              id="database-path"
              value={selectedFile}
              placeholder="Select an Access database file..."
              readOnly
              className="flex-1 bg-background border-border text-foreground"
            />
            <Button 
              onClick={handleFileSelect}
              variant="outline"
              className="px-4 border-border hover:bg-secondary"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Browse
            </Button>
          </div>
        </div>
        
        <Button 
          onClick={handleConnect}
          disabled={!selectedFile}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-[var(--transition-smooth)]"
        >
          <Database className="w-4 h-4 mr-2" />
          Connect to Database
        </Button>
      </CardContent>
    </Card>
  );
};