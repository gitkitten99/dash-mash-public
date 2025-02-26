'use client';

import { Suspense } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, ExternalLink } from "lucide-react";
import { useState } from "react";
import { aiTools } from "@/features/ai-showcase/data/tools";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";

function AIToolCard({ tool, category, index }: { tool: any, category: string, index: number }) {
  return (
    <Card className="group relative overflow-hidden border-muted bg-card transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <tool.icon className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">{tool.title}</CardTitle>
              <CardDescription className="mt-2 line-clamp-2">{tool.description}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-secondary/80">{tool.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tool.features.map((feature: string) => (
            <Badge key={feature} variant="outline" className="bg-background">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={`${category}-${tool.title}-${index}`} className="border-none">
            <AccordionTrigger className="flex w-full items-center justify-between rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              Learn More About {tool.title}
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Overview</h4>
                  <p className="text-sm text-muted-foreground">{tool.detailedInfo.overview}</p>
                </div>
                <div>
                  <h4 className="font-medium">Key Capabilities</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {tool.detailedInfo.capabilities.map((capability: string) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Use Cases</h4>
                  <p className="text-sm text-muted-foreground">{tool.detailedInfo.useCases}</p>
                </div>
                <div>
                  <h4 className="font-medium">Pricing</h4>
                  <p className="text-sm text-muted-foreground">{tool.detailedInfo.pricing}</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href={tool.detailedInfo.link} target="_blank" rel="noopener noreferrer">
                    Visit {tool.title}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}

function AIToolsGrid({ category }: { category: string }) {
  const categoryData = aiTools.find(cat => cat.category === category);
  
  if (!categoryData) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 items-start">
      {categoryData.items.map((tool, index) => (
        <Suspense 
          key={`${category}-${tool.title}-${index}`}
          fallback={
            <Card className="p-6 space-y-4">
              <SkeletonLoader variant="card" />
            </Card>
          }
        >
          <AIToolCard tool={tool} category={category} index={index} />
        </Suspense>
      ))}
    </div>
  );
}

export default function AIPage() {
  const [activeCategory, setActiveCategory] = useState("Language Models");

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Tools</h1>
            <p className="text-muted-foreground">Explore and understand modern AI technologies</p>
          </div>
          <Button className="hidden sm:flex" variant="outline">
            <Brain className="mr-2 h-4 w-4" />
            Learn More
          </Button>
        </div>
      </div>

      <Tabs defaultValue="Language Models" className="space-y-6" onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-3">
          {aiTools.map((category) => (
            <TabsTrigger 
              key={category.category} 
              value={category.category}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category.category}
            </TabsTrigger>
          ))}
        </TabsList>

        {aiTools.map((category) => (
          <TabsContent key={category.category} value={category.category} className="space-y-6">
            <Suspense fallback={<SkeletonLoader variant="card" count={2} />}>
              <AIToolsGrid category={category.category} />
            </Suspense>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 