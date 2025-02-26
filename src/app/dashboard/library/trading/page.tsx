'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  PlayCircle, 
  BookOpen,
  MessageSquare,
  ArrowUpRight,
  Clock,
  LineChart,
  BookMarked,
  MessageCircle,
  ChevronRight,
  Bot
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const resources = [
  {
    title: "Trading Fundamentals",
    description: "Essential concepts, market mechanics, and basic strategies",
    duration: "30 mins read",
    type: "guide",
    icon: BookOpen
  },
  {
    title: "Risk Management",
    description: "Understanding position sizing and risk control",
    duration: "20 mins read",
    type: "guide",
    icon: BookOpen
  },
  {
    title: "Market Analysis",
    description: "Learn to read market conditions and trends",
    duration: "25 mins read",
    type: "guide",
    icon: BookOpen
  }
];

const marketAnalysis = [
  {
    title: "BTC Technical Analysis",
    content: "Key resistance levels to watch: $48K and $52K. RSI showing potential reversal.",
    timestamp: "2 hours ago"
  },
  {
    title: "ETH Market Structure",
    content: "Ethereum showing strong support at $2,800. Watch for breakout above $3,200.",
    timestamp: "5 hours ago"
  }
];

export default function TradingPage() {
  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Trading</h1>
              <p className="text-muted-foreground mt-1">
                Resources and market analysis
              </p>
            </div>
            <Link href="/dashboard/library/demotrading">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg transition-all duration-300"
              >
                <div className="relative z-10 flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Demo Trading
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
            </Link>
          </div>
          <Separator />
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="live-trades" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-2 w-[600px] p-1 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger 
                value="live-trades" 
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-200 py-3"
              >
                <div className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  <span>Live Trades & Analysis</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="resources" 
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-200 py-3"
              >
                <div className="flex items-center gap-2">
                  <BookMarked className="h-5 w-5" />
                  <span>Resources</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Live Trades & Analysis Tab */}
          <TabsContent value="live-trades" className="mt-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Active Trades Section */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <LineChart className="h-5 w-5 text-primary" />
                    Active Trades
                  </CardTitle>
                  <CardDescription>
                    Currently open positions and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    {/* Placeholder for active trades component */}
                    <div className="space-y-4 p-4">
                      <div className="rounded-lg border bg-card p-4 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">BTC/USDT</Badge>
                          <Badge variant="success">LONG</Badge>
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Entry Price</span>
                            <span className="font-medium">$48,250</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current PnL</span>
                            <span className="font-medium text-green-500">+$520.50</span>
                          </div>
                        </div>
                      </div>
                      {/* Add more trade cards here */}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Analysis Feed Section */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Bot className="h-5 w-5 text-primary" />
                    Market Analysis
                  </CardTitle>
                  <CardDescription>
                    Trading insights from Sensei
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-4">
                      {marketAnalysis.map((analysis, index) => (
                        <div key={index} className="rounded-lg bg-muted/50 p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm text-primary">{analysis.title}</h4>
                            <span className="text-xs text-muted-foreground">{analysis.timestamp}</span>
                          </div>
                          <p className="text-sm">{analysis.content}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {resources.map((resource, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                      <resource.icon className="h-5 w-5" />
                      {resource.title}
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {resource.duration}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full group-hover:bg-primary/5">
                      Read More
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
} 