import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Redirecting...',
};

export default async function RootPage() {
  redirect('/dashboard/overview');
} 