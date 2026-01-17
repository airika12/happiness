import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { requestTypes } from '@/src/data/requests';
import {
  HelpCircle,
  Clock,
  ShoppingCart,
  Palmtree,
  Laptop,
  Users,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, any> = {
  HelpCircle,
  Clock,
  ShoppingCart,
  Palmtree,
  Laptop,
  Users,
};

export default function RequestsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">各種申請</h1>
        <p className="text-muted-foreground">
          社内の申請フォームはこちらから
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {requestTypes.map((request) => {
          const Icon = iconMap[request.icon] || HelpCircle;
          return (
            <Link key={request.id} href={`/requests/${request.type}`}>
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                <CardHeader>
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-2">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{request.name}</CardTitle>
                  <CardDescription>{request.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    申請フォームを開く
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
