import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Bitcoin, Coins } from "lucide-react";

export default function InvestmentsPage() {
  // Dummy data for portfolio allocation
  const portfolioData = [
    { coin: "Bitcoin", symbol: "BTC", percentage: 50, value: 28750.20 },
    { coin: "Ethereum", symbol: "ETH", percentage: 30, value: 1560.80 },
    { coin: "Cardano", symbol: "ADA", percentage: 20, value: 0.48 }
  ];

  // Dummy data for activity feed
  const activityData = [
    { 
      id: 1, 
      type: "buy", 
      coin: "Bitcoin", 
      symbol: "BTC", 
      amount: 0.005, 
      price: 28750.20,
      date: "2024-03-10 14:23" 
    },
    { 
      id: 2, 
      type: "sell", 
      coin: "Ethereum", 
      symbol: "ETH", 
      amount: 0.1, 
      price: 1560.80,
      date: "2024-03-09 09:45" 
    },
    { 
      id: 3, 
      type: "buy", 
      coin: "Cardano", 
      symbol: "ADA", 
      amount: 100, 
      price: 0.48,
      date: "2024-03-08 16:30" 
    }
  ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Spot Investments</h1>
        <p className="text-lg text-muted-foreground">Track and manage your spot investments</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Portfolio Allocation Section */}
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-2xl">Portfolio Allocation</CardTitle>
              <CardDescription className="text-base">
                Your current cryptocurrency holdings
              </CardDescription>
            </div>
            <Bitcoin className="h-6 w-6 text-primary/80" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/50">
                  <TableHead className="w-[45%] text-base">Asset</TableHead>
                  <TableHead className="text-right text-base">Price</TableHead>
                  <TableHead className="text-right text-base">Allocation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioData.map((asset) => (
                  <TableRow 
                    key={asset.symbol}
                    className="hover:bg-muted/50 transition-colors even:bg-muted/5"
                  >
                    <TableCell className="font-medium text-base">
                      {asset.coin}
                      <span className="ml-2 text-muted-foreground text-sm">
                        {asset.symbol}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-base">
                      ${asset.value.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium text-base">
                      {asset.percentage}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Activity Feed Section */}
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-2xl">Activity Feed</CardTitle>
              <CardDescription className="text-base">
                Recent transactions history
              </CardDescription>
            </div>
            <Coins className="h-6 w-6 text-primary/80" />
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[450px] pr-4">
              <div className="space-y-4">
                {activityData.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="relative flex items-start space-x-4 rounded-lg border p-4 transition-all hover:bg-muted/50 hover:shadow-sm"
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-primary/0 transition-colors group-hover:bg-primary/50" />
                    <Badge 
                      variant={activity.type === 'buy' ? 'default' : 'destructive'} 
                      className="px-3 py-1 text-sm font-semibold capitalize"
                    >
                      {activity.type}
                    </Badge>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-base font-medium">
                          {activity.type === 'buy' ? 'Bought' : 'Sold'} {activity.amount} {activity.symbol}
                        </p>
                        <span className="text-base font-medium text-muted-foreground">
                          ${activity.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 