import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import ExpandableCard from '@/components/ui/ExpandableCard';

const insightsData = [
  {
    title: "Latest Insights",
    content: <p>Additional details about the latest insights can go here.</p>,
    imageSrc: "https://dummyimage.com/150",
    description: "This is a description of the latest insights.",
    ctaText: "Learn More",
    ctaLink: "/rugroom-insights",
  },
  // Add more insights as needed
];

export default function RugroomInsightsPage() {
  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">Rugroom Insights</h1>
      <Separator className="mb-4" />
      <Card className="p-4 mb-4">
        <h2 className="text-xl font-semibold">Latest Insights</h2>
        <p>Here you can find the latest insights related to the rugroom.</p>
      </Card>
      {insightsData.map((insight, index) => (
        <ExpandableCard key={index} {...insight} />
      ))}
      <Button variant="default" className="mt-2">
        Learn More
      </Button>
    </div>
  );
} 