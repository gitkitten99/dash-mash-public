'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar
} from '@/components/ui/sidebar';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import {
  Star,
  Clock,
  ChevronRight,
  Pin,
  History,
  Bookmark,
  Settings,
  LucideIcon,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { useCallback, useEffect, useRef } from 'react';
import { SidebarItem } from '@/components/ui/sidebar-item';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ModeToggle } from '@/components/mode-toggle';

interface NavItem {
  title: string;
  url: string;
  icon: keyof typeof Icons;
  items?: NavItem[];
}

function getIcon(icon: keyof typeof Icons | undefined) {
  if (!icon) return null;
  return Icons[icon] || null;
}

// Recent items - This could be stored in localStorage or fetched from an API
const recentItems: NavItem[] = [
  { title: 'Dashboard Overview', url: '/dashboard/overview', icon: 'dashboard' },
  { title: 'Trading Analysis', url: '/dashboard/library/trading', icon: 'trading' },
  { title: 'AI Models', url: '/dashboard/library/ai', icon: 'ai' }
];

// Replace favoriteItems with rugRoomItems
const rugRoomItems: NavItem[] = [
  { title: 'AI Assistant', url: '/dashboard/ai-assistant', icon: 'ai' },
  { title: 'Rugroom Insights', url: '/dashboard/rugroom-insights', icon: 'dashboard' },
];

// Crypto Warrior items
const cryptoItems: NavItem[] = [
  { title: 'Market Overview', url: '/dashboard/crypto/market', icon: 'trading' },
  { title: 'Portfolio Tracker', url: '/dashboard/crypto/portfolio', icon: 'investments' },
  { title: 'Trading Bot', url: '/dashboard/crypto/bot', icon: 'ai' },
  { title: 'Price Alerts', url: '/dashboard/crypto/alerts', icon: 'alert' }
];

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebar = useSidebar();
  const isOpen = sidebar.state === 'expanded';
  const [showRugRoom, setShowRugRoom] = React.useState(true);
  const [showCrypto, setShowCrypto] = React.useState(false);
  const [openSections, setOpenSections] = React.useState<{ [key: string]: boolean }>({});
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Function to get all focusable elements in a section
  const getFocusableElements = (sectionId: string): HTMLElement[] => {
    const section = sectionRefs.current[sectionId];
    if (!section) return [];
    
    return Array.from(
      section.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
  };

  const toggleSection = (sectionUrl: string) => {
    setOpenSections(prev => {
      const newState = { ...prev, [sectionUrl]: !prev[sectionUrl] };
      // Store last focused element before closing
      if (!newState[sectionUrl]) {
        lastFocusedElement.current = document.activeElement as HTMLElement;
      }
      return newState;
    });
  };

  const handleSidebarToggle = (e: KeyboardEvent) => {
    if (e.altKey && e.key === 'n') {
      e.preventDefault();
      sidebar.toggleSidebar();
    }
  };

  const handleQuickSectionNavigation = (e: KeyboardEvent) => {
    if (e.altKey && /^[1-9]$/.test(e.key)) {
      e.preventDefault();
      const index = parseInt(e.key) - 1;
      const sections = [...rugRoomItems, ...navItems, ...cryptoItems];
      if (sections[index]) {
        router.push(sections[index].url);
      }
    }
  };

  const handleArrowNavigation = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('[role="navigation"]')) {
      const currentSection = e.target.closest('[role="region"]')?.getAttribute('aria-label');
      if (!currentSection) return;

      const focusableElements = getFocusableElements(currentSection);
      const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
          focusableElements[nextIndex]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
          focusableElements[prevIndex]?.focus();
          break;
        case 'Escape':
          e.preventDefault();
          if (openSections[currentSection]) {
            toggleSection(currentSection);
            lastFocusedElement.current?.focus();
          }
          break;
      }
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    handleSidebarToggle(e);
    handleQuickSectionNavigation(e);
    handleArrowNavigation(e);
  }, [sidebar, router, openSections]);

  // Set up keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Focus styles for better visibility
  const focusStyles = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-shadow duration-200";
  const itemStyles = "flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-accent sidebar-menu-item";

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar 
        role="navigation"
        aria-label="Main navigation"
      >
        <SidebarHeader className="border-b px-2 py-4">
          <SidebarItem
            href="/"
            icon={Icons.logo ? <Icons.logo /> : undefined}
            title="Dashboard"
            showTooltip={false}
          />
        </SidebarHeader>

        <SidebarContent>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {/* Rugroom Agent Section */}
            <div 
              ref={(el) => { sectionRefs.current['rugroom'] = el }}
              className="px-2 py-2"
              role="region"
              aria-label="Rugroom Agent"
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between px-2 py-3",
                  focusStyles,
                  "bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10"
                )}
                onClick={() => setShowRugRoom(!showRugRoom)}
                aria-expanded={showRugRoom}
                aria-controls="rugroom-content"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowRugRoom(!showRugRoom);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Icons.ai className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className={cn("sidebar-menu-item font-semibold text-base", !isOpen && "hidden")}>
                      Rugroom Agent
                    </span>
                  </div>
                </div>
                {isOpen && (
                  <ChevronRight 
                    className={cn(
                      "h-4 w-4 transition-transform text-primary",
                      showRugRoom && "rotate-90"
                    )}
                    aria-hidden="true"
                  />
                )}
              </Button>
              {showRugRoom && isOpen && (
                <div 
                  id="rugroom-content"
                  className="mt-3 space-y-1"
                  role="group"
                  aria-label="Rugroom Agent tools"
                >
                  {rugRoomItems.map((item, index) => {
                    const ItemIcon = getIcon(item.icon);
                    return (
                      <SidebarItem
                        key={item.url}
                        href={item.url}
                        icon={ItemIcon ? <ItemIcon /> : undefined}
                        title={item.title}
                        isSubmenu
                        data-index={index}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <Separator className="my-2" />

            {/* Main Navigation */}
            <SidebarMenu role="navigation" aria-label="Main menu">
              {navItems.map((item, index) => {
                const ItemIcon = getIcon(item.icon);
                const isOpen = openSections[item.url];
                const sectionId = `section-${index}`;
                
                return item.items?.length ? (
                  <div 
                    key={index}
                    ref={(el) => { sectionRefs.current[sectionId] = el }}
                    className="relative"
                    role="group"
                    aria-label={item.title}
                  >
                    <Button 
                      variant="ghost" 
                      className={cn("w-full justify-between px-2", focusStyles)}
                      onClick={() => toggleSection(item.url)}
                      aria-expanded={isOpen}
                      aria-controls={`${sectionId}-content`}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleSection(item.url);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {ItemIcon && <ItemIcon className="h-4 w-4" aria-hidden="true" />}
                        <span className={cn("sidebar-menu-item", !sidebar.state && "hidden")}>
                          {item.title}
                        </span>
                      </div>
                      {sidebar.state === 'expanded' && (
                        <ChevronRight 
                          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} 
                          aria-hidden="true"
                        />
                      )}
                    </Button>
                    {isOpen && (
                      <div 
                        id={`${sectionId}-content`}
                        className="mt-2 space-y-1 pl-4"
                        role="group"
                        aria-label={`${item.title} submenu`}
                      >
                        {item.items.map((subItem, subIndex) => {
                          const SubItemIcon = getIcon(subItem.icon);
                          return (
                            <SidebarItem
                              key={subItem.url}
                              href={subItem.url}
                              icon={SubItemIcon ? <SubItemIcon /> : undefined}
                              title={subItem.title}
                              isSubmenu
                              data-index={`${index}-${subIndex}`}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <SidebarItem
                    key={item.url}
                    href={item.url}
                    icon={ItemIcon ? <ItemIcon /> : undefined}
                    title={item.title}
                    data-index={index}
                  />
                );
              })}
            </SidebarMenu>

            <Separator className="my-2" />

            {/* Crypto Warrior Section */}
            <div 
              ref={(el) => { sectionRefs.current['crypto'] = el }}
              className="px-2 py-2"
              role="region"
              aria-label="Crypto Warrior"
            >
              <Button
                variant="ghost"
                className={cn("w-full justify-between px-2", focusStyles)}
                onClick={() => setShowCrypto(!showCrypto)}
                aria-expanded={showCrypto}
                aria-controls="crypto-content"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowCrypto(!showCrypto);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <Icons.trading className="h-4 w-4" aria-hidden="true" />
                  <span className={cn("sidebar-menu-item", !isOpen && "hidden")}>
                    Crypto Warrior
                  </span>
                </div>
                {isOpen && (
                  <ChevronRight 
                    className={cn(
                      "h-4 w-4 transition-transform",
                      showCrypto && "rotate-90"
                    )}
                    aria-hidden="true"
                  />
                )}
              </Button>
              {showCrypto && isOpen && (
                <div 
                  id="crypto-content"
                  className="mt-2 space-y-1"
                  role="group"
                  aria-label="Crypto Warrior items"
                >
                  {cryptoItems.map((item, index) => {
                    const ItemIcon = getIcon(item.icon);
                    return (
                      <SidebarItem
                        key={item.url}
                        href={item.url}
                        icon={ItemIcon ? <ItemIcon /> : undefined}
                        title={item.title}
                        isSubmenu
                        data-index={index}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </ScrollArea>
        </SidebarContent>

        <SidebarFooter className="border-t px-2 py-4">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => window.open('/docs', '_blank')}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">Documentation</span>
            </div>
            <HelpCircle className="h-4 w-4 ml-auto" />
          </Button>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
