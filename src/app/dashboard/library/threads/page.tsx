import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Bookmark } from 'lucide-react';

// Sample data for each category
const cryptoThreads = [
  {
    id: 1,
    title: "Bitcoin's Next Move: Technical Analysis",
    excerpt: "Breaking down the current market structure and potential scenarios.",
    author: {
      name: "Alex Thompson",
      avatar: "https://api.slingacademy.com/public/sample-users/1.png",
    },
    tags: ["BTC", "Analysis"]
  },
  {
    id: 2,
    title: "DeFi Protocol Security Audit Results",
    excerpt: "Latest findings from major protocol audits and implications.",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.slingacademy.com/public/sample-users/2.png",
    },
    tags: ["DeFi", "Security"]
  }
];

const economyThreads = [
  {
    id: 1,
    title: "Global Market Impact on Crypto",
    excerpt: "How traditional markets are influencing crypto movements.",
    author: {
      name: "Emma Roberts",
      avatar: "https://api.slingacademy.com/public/sample-users/3.png",
    },
    tags: ["Markets", "Analysis"]
  },
  {
    id: 2,
    title: "Institutional Investment Trends",
    excerpt: "Tracking institutional money flow in the crypto space.",
    author: {
      name: "Mike Davidson",
      avatar: "https://api.slingacademy.com/public/sample-users/4.png",
    },
    tags: ["Institutions", "Trends"]
  }
];

const bigBrainThreads = [
  {
    id: 1,
    title: "Zero Knowledge Proofs Explained",
    excerpt: "Deep dive into the mathematics behind ZK technology.",
    author: {
      name: "Dr. Lisa Wang",
      avatar: "https://api.slingacademy.com/public/sample-users/5.png",
    },
    tags: ["ZK", "Tech"]
  },
  {
    id: 2,
    title: "Game Theory in Crypto Markets",
    excerpt: "Understanding market dynamics through game theory principles.",
    author: {
      name: "Prof. James Miller",
      avatar: "https://api.slingacademy.com/public/sample-users/6.png",
    },
    tags: ["Theory", "Markets"]
  }
];

function ThreadList({ threads }: { threads: typeof cryptoThreads }) {
  return (
    <div className="space-y-6">
      {threads.map((thread) => (
        <Card key={thread.id} className="relative group hover:shadow-md transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary">
          <CardHeader className="pb-3">
            <div className="flex gap-2 mb-3">
              {thread.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
              {thread.title}
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-2 text-sm">
              {thread.excerpt}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 ring-2 ring-background">
                  <AvatarImage src={thread.author.avatar} />
                  <AvatarFallback>{thread.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{thread.author.name}</span>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function ThreadsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-6">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Sash Threads
            </h1>
            <p className="text-muted-foreground mt-1">Knowledge base for the Sash community</p>
          </div>
          <Button>New Thread</Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search threads..." 
            className="pl-9 bg-muted/50"
          />
        </div>
      </div>

      <Tabs defaultValue="crypto" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3 p-1">
            <TabsTrigger 
              value="crypto"
              className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500 transition-all duration-200"
            >
              Crypto
            </TabsTrigger>
            <TabsTrigger 
              value="economy"
              className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-500 transition-all duration-200"
            >
              Economy
            </TabsTrigger>
            <TabsTrigger 
              value="bigbrain"
              className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500 transition-all duration-200"
            >
              BigBrainTesto
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="h-[calc(100vh-22rem)] rounded-lg border bg-muted/5 p-4">
          <TabsContent value="crypto" className="mt-0 space-y-4">
            <ThreadList threads={cryptoThreads} />
          </TabsContent>

          <TabsContent value="economy" className="mt-0 space-y-4">
            <ThreadList threads={economyThreads} />
          </TabsContent>

          <TabsContent value="bigbrain" className="mt-0 space-y-4">
            <ThreadList threads={bigBrainThreads} />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
} 