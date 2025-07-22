import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table2, Search, Play, ArrowRight, Database } from "lucide-react";

interface DatabaseItem {
  name: string;
  type: 'table' | 'query' | 'procedure';
  recordCount?: number;
}

interface DatabasePreviewProps {
  databasePath: string;
  onStartTransfer: (selectedItems: string[]) => void;
}

export const DatabasePreview = ({ databasePath, onStartTransfer }: DatabasePreviewProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Mock data - in real implementation, this would come from the Access database
  const mockTables: DatabaseItem[] = [
    { name: "Customers", type: "table", recordCount: 1250 },
    { name: "Orders", type: "table", recordCount: 3420 },
    { name: "Products", type: "table", recordCount: 850 },
    { name: "Categories", type: "table", recordCount: 25 },
    { name: "Suppliers", type: "table", recordCount: 180 },
  ];

  const mockQueries: DatabaseItem[] = [
    { name: "CustomerOrderHistory", type: "query" },
    { name: "ProductsByCategory", type: "query" },
    { name: "MonthlyRevenue", type: "query" },
    { name: "TopCustomers", type: "query" },
  ];

  const mockProcedures: DatabaseItem[] = [
    { name: "UpdateInventory", type: "procedure" },
    { name: "ProcessOrder", type: "procedure" },
    { name: "GenerateReport", type: "procedure" },
  ];

  const allItems = [...mockTables, ...mockQueries, ...mockProcedures];

  const handleItemToggle = (itemName: string) => {
    setSelectedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  const handleSelectAll = (items: DatabaseItem[]) => {
    const itemNames = items.map(item => item.name);
    const allSelected = itemNames.every(name => selectedItems.includes(name));
    
    if (allSelected) {
      setSelectedItems(prev => prev.filter(item => !itemNames.includes(item)));
    } else {
      setSelectedItems(prev => [...new Set([...prev, ...itemNames])]);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'table': return <Table2 className="w-4 h-4" />;
      case 'query': return <Search className="w-4 h-4" />;
      case 'procedure': return <Play className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'table': return 'default';
      case 'query': return 'secondary';
      case 'procedure': return 'outline';
      default: return 'default';
    }
  };

  const renderItemsList = (items: DatabaseItem[], title: string) => (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-card-foreground">{title}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSelectAll(items)}
            className="border-border hover:bg-secondary"
          >
            {items.every(item => selectedItems.includes(item.name)) ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.name}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-[var(--transition-smooth)]"
              >
                <Checkbox
                  id={item.name}
                  checked={selectedItems.includes(item.name)}
                  onCheckedChange={() => handleItemToggle(item.name)}
                  className="border-border"
                />
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(item.type)}
                    <span className="font-medium text-card-foreground">{item.name}</span>
                    <Badge variant={getTypeBadgeVariant(item.type)} className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                  {item.recordCount && (
                    <span className="text-sm text-muted-foreground">
                      {item.recordCount.toLocaleString()} records
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto">
      <Card className="bg-card border-border shadow-[var(--shadow-elegant)]">
        <CardHeader>
          <CardTitle className="text-2xl text-card-foreground flex items-center gap-2">
            <Database className="w-6 h-6 text-primary" />
            Database Preview
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Connected to: <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{databasePath}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted">
              <TabsTrigger value="all" className="data-[state=active]:bg-background">All Items</TabsTrigger>
              <TabsTrigger value="tables" className="data-[state=active]:bg-background">Tables</TabsTrigger>
              <TabsTrigger value="queries" className="data-[state=active]:bg-background">Queries</TabsTrigger>
              <TabsTrigger value="procedures" className="data-[state=active]:bg-background">Procedures</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-4">
                  {renderItemsList(mockTables, `Tables (${mockTables.length})`)}
                </div>
                <div className="space-y-4">
                  {renderItemsList(mockQueries, `Queries (${mockQueries.length})`)}
                </div>
                <div className="space-y-4">
                  {renderItemsList(mockProcedures, `Procedures (${mockProcedures.length})`)}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tables" className="mt-6">
              {renderItemsList(mockTables, `Tables (${mockTables.length})`)}
            </TabsContent>
            
            <TabsContent value="queries" className="mt-6">
              {renderItemsList(mockQueries, `Queries (${mockQueries.length})`)}
            </TabsContent>
            
            <TabsContent value="procedures" className="mt-6">
              {renderItemsList(mockProcedures, `Procedures (${mockProcedures.length})`)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedItems.length > 0 && (
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-card-foreground">
                <h3 className="font-semibold text-lg">Ready to Transfer</h3>
                <p className="text-muted-foreground">
                  {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected for migration
                </p>
              </div>
              <Button
                onClick={() => onStartTransfer(selectedItems)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-glow)]"
                size="lg"
              >
                Start Transfer
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};