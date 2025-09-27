'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, PlusCircle, Trash2, Wand2 } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { optimalLoadSchema } from '@/lib/schemas';
import { getOptimalLoadSuggestion } from '@/lib/actions';
import type { OptimalLoadSuggestionOutput } from '@/ai/flows/optimal-load-suggestion';

type FormData = z.infer<typeof optimalLoadSchema>;

export default function OptimalLoadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<OptimalLoadSuggestionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(optimalLoadSchema),
    defaultValues: {
      truckDimensions: '13.6x2.45x2.7',
      packages: [{ id: 'PKG-001', dimensions: '1.2x0.8x1.0', weight: 500, deliveryOrder: 2 }],
      constraints: 'Fragile packages on top. Last-in, first-out for delivery order.',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'packages',
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await getOptimalLoadSuggestion(data);
      setSuggestion(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get optimal load suggestion. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Optimal Load Suggestion"
        description="AI-powered tool to optimize truck loading."
      />
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Load Details</CardTitle>
                <CardDescription>Enter the details for the truck and packages.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="truckDimensions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Truck Dimensions (LxWxH meters)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 13.6x2.45x2.7" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Packages</FormLabel>
                  <div className="space-y-4 mt-2">
                    {fields.map((field, index) => (
                      <Card key={field.id} className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`packages.${index}.id`}
                            render={({ field }) => <FormItem><FormLabel>ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>}
                          />
                          <FormField
                            control={form.control}
                            name={`packages.${index}.dimensions`}
                            render={({ field }) => <FormItem><FormLabel>Dimensions</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>}
                          />
                          <FormField
                            control={form.control}
                            name={`packages.${index}.weight`}
                            render={({ field }) => <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>}
                          />
                          <FormField
                            control={form.control}
                            name={`packages.${index}.deliveryOrder`}
                            render={({ field }) => <FormItem><FormLabel>Delivery #</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="mt-2 text-destructive"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </Card>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => append({ id: `PKG-00${fields.length + 1}`, dimensions: '', weight: 0, deliveryOrder: fields.length + 1 })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Package
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="constraints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Constraints</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Fragile items on top" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Get Suggestion
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>AI Suggestion</CardTitle>
            <CardDescription>The optimal loading arrangement will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {suggestion && (
              <div className="space-y-4">
                <h3 className="font-semibold">Loading Sequence:</h3>
                <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                  {suggestion.suggestion}
                </div>
                {suggestion.diagramDataUri && (
                    <>
                    <h3 className="font-semibold pt-4">Diagram Description:</h3>
                     <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                        {suggestion.diagramDataUri}
                    </div>
                    </>
                )}
              </div>
            )}
             {!isLoading && !suggestion && (
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                    <p>Your loading suggestion will be displayed here once generated.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
