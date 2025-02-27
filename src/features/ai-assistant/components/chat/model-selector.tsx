'use client';

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Cpu } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ModelConfig } from "../../types";
import { openRouterConfig } from "../../config/api-config";
import { Icons } from '@/components/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  className?: string;
}

export function ModelSelector({
  selectedModel,
  onModelChange,
  className
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  
  // Flatten models array for easier access
  const allModels = [
    ...openRouterConfig.models.text,
    ...openRouterConfig.models.multimodal
  ];

  // Find current model
  const currentModel = allModels.find(model => model.id === selectedModel) || allModels[0];

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className={cn("w-full justify-between hover:bg-gray-200 transition-colors")}
          >
            <div className="flex items-center gap-2 truncate">
              <Icons.settings className="h-4 w-4 shrink-0 opacity-50" />
              <Cpu className="h-4 w-4 shrink-0 opacity-50" />
              <span className="truncate">{currentModel.name}</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 bg-white shadow-lg rounded-lg">
          <Command>
            <CommandInput placeholder="Search models..." className="border-b-2 border-gray-300" />
            <CommandList>
              <CommandEmpty>No models found.</CommandEmpty>
              <CommandGroup heading="Text Models">
                {openRouterConfig.models.text.map((model) => (
                  <Tooltip key={model.id}>
                    <TooltipTrigger asChild>
                      <CommandItem
                        value={model.id}
                        onSelect={() => {
                          onModelChange(model.id);
                          setOpen(false);
                        }}
                        className="hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex flex-col gap-1 w-full">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icons.settings className="h-4 w-4" />
                              <Check
                                className={cn(
                                  "h-4 w-4",
                                  selectedModel === model.id ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <span>{model.name}</span>
                            </div>
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Badge variant="secondary" className="ml-auto">
                                  {model.contextWindow / 1000}k ctx
                                </Badge>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="flex justify-between space-x-4">
                                  <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">{model.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {model.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {model.features.map((feature) => (
                                        <Badge
                                          key={feature}
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          {feature}
                                        </Badge>
                                      ))}
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                      <span>Latency: {model.latency}</span>
                                      <span>Speed: {model.throughput}</span>
                                    </div>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </div>
                      </CommandItem>
                    </TooltipTrigger>
                    <TooltipContent>{model.description}</TooltipContent>
                  </Tooltip>
                ))}
              </CommandGroup>
              <CommandGroup heading="Multimodal Models">
                {openRouterConfig.models.multimodal.map((model) => (
                  <CommandItem
                    key={model.id}
                    value={model.id}
                    onSelect={() => {
                      onModelChange(model.id);
                      setOpen(false);
                    }}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Check
                            className={cn(
                              "h-4 w-4",
                              selectedModel === model.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span>{model.name}</span>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Badge variant="secondary" className="ml-auto">
                              {model.contextWindow / 1000}k ctx
                            </Badge>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                              <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{model.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {model.description}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {model.features.map((feature) => (
                                    <Badge
                                      key={feature}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                  <span>Latency: {model.latency}</span>
                                  <span>Speed: {model.throughput}</span>
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
} 