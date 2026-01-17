'use client';

import { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { requestTypes } from '@/src/data/requests';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RequestFormPage({ params }: { params: { type: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const request = requestTypes.find((r) => r.type === params.type);

  if (!request) {
    notFound();
  }

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredFields = request.fields.filter((f) => f.required);
    const missingFields = requiredFields.filter((f) => !formData[f.id]?.trim());

    if (missingFields.length > 0) {
      toast({
        title: '入力エラー',
        description: '必須項目をすべて入力してください',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: request.type,
          name: request.name,
          data: formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSuccess(true);
      toast({
        title: '申請完了',
        description: '申請を受け付けました。承認者に通知が送信されました。',
      });

      setTimeout(() => {
        router.push('/requests');
      }, 2000);
    } catch (error) {
      toast({
        title: '送信エラー',
        description: '申請の送信に失敗しました。もう一度お試しください。',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center p-12">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">申請が完了しました</h2>
          <p className="text-muted-foreground mb-6">
            承認者に通知が送信されました。結果はメールでお知らせします。
          </p>
          <Link href="/requests">
            <Button>申請一覧に戻る</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/requests">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            申請一覧に戻る
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{request.name}</CardTitle>
          <CardDescription>{request.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {request.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>

                {field.type === 'text' && (
                  <Input
                    id={field.id}
                    type="text"
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                )}

                {field.type === 'number' && (
                  <Input
                    id={field.id}
                    type="number"
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                )}

                {field.type === 'date' && (
                  <Input
                    id={field.id}
                    type="date"
                    required={field.required}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                )}

                {field.type === 'textarea' && (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    rows={4}
                  />
                )}

                {field.type === 'select' && field.options && (
                  <Select
                    required={field.required}
                    value={formData[field.id] || ''}
                    onValueChange={(value) => handleInputChange(field.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {field.type === 'file' && (
                  <Input
                    id={field.id}
                    type="file"
                    required={field.required}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleInputChange(field.id, file.name);
                      }
                    }}
                  />
                )}
              </div>
            ))}

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    送信中...
                  </>
                ) : (
                  '申請を送信'
                )}
              </Button>
              <Link href="/requests" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  キャンセル
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
