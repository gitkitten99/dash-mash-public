'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search, Menu, AlertTriangle, Info, Lightbulb, ArrowRight } from "lucide-react";
import { useState } from "react";

const sidebarNavItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Introduction",
        href: "#introduction",
      },
      {
        title: "Dashboard Layout",
        href: "#layout",
      },
      {
        title: "Navigation",
        href: "#navigation",
      },
    ],
  },
  {
    title: "Main Features",
    items: [
      {
        title: "Trading Analytics",
        href: "#trading",
      },
      {
        title: "Crypto Portfolio",
        href: "#portfolio",
      },
      {
        title: "AI Assistant",
        href: "#ai-assistant",
      },
      {
        title: "Price Alerts",
        href: "#alerts",
      },
    ],
  },
  {
    title: "Customization",
    items: [
      {
        title: "User Settings",
        href: "#settings",
      },
      {
        title: "Theme Options",
        href: "#theme",
      },
      {
        title: "Notifications",
        href: "#notifications",
      },
    ],
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">
                Dashboard Documentation
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  className="pl-8"
                />
              </div>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="py-4">
                  <DocsSidebarNav items={sidebarNavItems} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="container flex-1">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] lg:gap-10">
          {/* Sidebar Nav */}
          <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-[220px] lg:w-[240px] border-r md:sticky md:block">
            <ScrollArea className="h-full py-6 pr-6 lg:py-8">
              <DocsSidebarNav items={sidebarNavItems} />
            </ScrollArea>
          </aside>

          {/* Main Content */}
          <main className="relative flex-1 py-6 h-[calc(100vh-3.5rem)] overflow-y-auto">
            <ScrollArea className="h-full">
              <div className="space-y-8">
                {/* Introduction */}
                <section id="introduction" className="pb-12">
                  <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
                    <CardHeader>
                      <CardTitle className="text-4xl">Dashboard Guide</CardTitle>
                      <CardDescription className="text-lg">
                        A comprehensive guide to using the Next.js Trading Dashboard
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="leading-7">
                        The Next.js Trading Dashboard is your all-in-one platform for cryptocurrency trading, portfolio management, and market analysis. This guide will help you navigate through all features and make the most of the dashboard.
                      </p>
                      <div className="grid gap-4 md:grid-cols-3">
                        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <span>🎯</span> Purpose
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">Cryptocurrency trading and portfolio management</p>
                          </CardContent>
                        </Card>
                        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <span>🔑</span> Key Features
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">Trading analytics, AI assistance, real-time alerts</p>
                          </CardContent>
                        </Card>
                        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <span>👥</span> For
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">Traders, investors, and crypto enthusiasts</p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Layout Section */}
                <section id="layout" className="pb-12">
                  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Dashboard Layout</h2>
                  <Tabs defaultValue="overview" className="mt-6">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="navigation">Navigation</TabsTrigger>
                      <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-6 space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
                          <CardHeader>
                            <CardTitle>Navigation Sidebar</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">Quick access to all dashboard features and sections</p>
                          </CardContent>
                        </Card>
                        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
                          <CardHeader>
                            <CardTitle>Main Content Area</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">Displays charts, tables, and analysis tools</p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    <TabsContent value="navigation" className="mt-6">
                      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
                        <CardContent className="pt-6">
                          <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>Navigation Tips</AlertTitle>
                            <AlertDescription>
                              Use the sidebar to quickly navigate between different sections. The sidebar can be collapsed for more screen space.
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="shortcuts" className="mt-6">
                      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <h4 className="font-medium">Keyboard Shortcuts</h4>
                            <div className="grid gap-2">
                              <div className="flex items-center justify-between">
                                <span>Toggle Sidebar</span>
                                <Badge variant="outline">⌘ + B</Badge>
                              </div>
                              <Separator />
                              <div className="flex items-center justify-between">
                                <span>Quick Search</span>
                                <Badge variant="outline">⌘ + K</Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </section>

                {/* Trading Analytics */}
                <section id="trading" className="pb-12">
                  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Trading Analytics</h2>
                  <div className="mt-8">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="charts">
                        <AccordionTrigger>Price Charts</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              Real-time cryptocurrency price movements with multiple timeframes
                            </p>
                            <div className="grid gap-2">
                              <Badge>Real-time Updates</Badge>
                              <Badge>Multiple Timeframes</Badge>
                              <Badge>Technical Indicators</Badge>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="indicators">
                        <AccordionTrigger>Technical Indicators</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              Comprehensive set of technical indicators for analysis
                            </p>
                            <div className="grid gap-2">
                              <Badge>RSI</Badge>
                              <Badge>MACD</Badge>
                              <Badge>Moving Averages</Badge>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <Alert className="mt-6" variant="default">
                      <Lightbulb className="h-4 w-4" />
                      <AlertTitle>Pro Tip</AlertTitle>
                      <AlertDescription>
                        Use the customizable dashboard widgets to create your perfect trading view. Drag and drop widgets to arrange them according to your preferences.
                      </AlertDescription>
                    </Alert>
                  </div>
                </section>

                {/* AI Assistant */}
                <section id="ai-assistant" className="pb-12">
                  <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
                    <CardHeader>
                      <CardTitle>AI Assistant</CardTitle>
                      <CardDescription>
                        Make informed trading decisions with AI-powered insights
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
                          <CardHeader>
                            <CardTitle className="text-lg">Market Analysis</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">AI-powered market trend analysis and predictions</p>
                          </CardContent>
                        </Card>
                        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
                          <CardHeader>
                            <CardTitle className="text-lg">Trading Signals</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">Get notified about potential trading opportunities</p>
                          </CardContent>
                        </Card>
                      </div>

                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Important Note</AlertTitle>
                        <AlertDescription>
                          While the AI Assistant provides valuable insights, always conduct your own research and never trade solely based on automated recommendations.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </section>

                {/* Settings */}
                <section id="settings" className="pb-12">
                  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Customizing Your Experience</h2>
                  <div className="mt-8">
                    <Tabs defaultValue="theme" className="w-full">
                      <TabsList className="w-full justify-start">
                        <TabsTrigger value="theme">Theme</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="privacy">Privacy</TabsTrigger>
                      </TabsList>
                      <TabsContent value="theme" className="mt-6 space-y-4">
                        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
                          <CardContent className="pt-6">
                            <div className="space-y-2">
                              <h4 className="font-medium">Theme Preferences</h4>
                              <p className="text-sm text-muted-foreground">Customize the look and feel of your dashboard</p>
                              <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4" />
                                  <span>Switch between light and dark modes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4" />
                                  <span>Customize accent colors</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4" />
                                  <span>Adjust UI density</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      {/* Add other tabs content similarly */}
                    </Tabs>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </main>
        </div>
      </div>
    </div>
  );
}

function DocsSidebarNav({ items, className, ...props }: any) {
  return (
    <div className={cn("w-full", className)} {...props}>
      {items.map((item: any, index: number) => (
        <div key={index} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && (
            <DocsSidebarNavItems items={item.items} activeSection={props.activeSection} />
          )}
        </div>
      ))}
    </div>
  );
}

function DocsSidebarNavItems({ items, activeSection }: any) {
  return (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item: any, index: number) => {
        const isActive = activeSection === item.href.slice(1);
        return (
          <a
            key={index}
            href={item.href}
            className={cn(
              "flex w-full items-center rounded-md p-2 transition-colors duration-200",
              isActive
                ? "bg-accent text-accent-foreground shadow-md"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.title}
          </a>
        );
      })}
    </div>
  );
} 