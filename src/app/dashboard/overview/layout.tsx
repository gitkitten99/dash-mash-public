import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

// Mock data
const mockData = {
  title: "Dashboard",
  description: "This is a mock dashboard description.",
  items: [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ],
};

export default function OverViewLayout() {
  return (
    <PageContainer fullWidth>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            {mockData.title}
          </h2>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {mockData.items.map(item => (
            <Card key={item.id} className="border-l-4 border-l-primary/20 hover:border-l-primary transition-all shadow-md hover:shadow-lg">
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>Mock Data</div>
                <p className='text-xs text-muted-foreground'>This is a mock item description.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
