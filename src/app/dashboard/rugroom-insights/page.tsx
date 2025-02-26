import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function RugroomInsightsPage() {
  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">Rugroom Insights</h1>
      <Separator className="mb-4" />
      <Card className="p-4 mb-4">
        <h2 className="text-xl font-semibold">Latest Insights</h2>
        <p>Here you can find the latest insights related to the rugroom.</p>
      </Card>
      <Button variant="default" className="mt-2">
        Learn More
      </Button>
    </div>
  );
} 