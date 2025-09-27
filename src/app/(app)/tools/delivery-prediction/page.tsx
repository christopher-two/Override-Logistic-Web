'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Wand2 } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { deliveryPredictionSchema } from '@/lib/schemas';
import { getDeliveryTimePrediction } from '@/lib/actions';
import type { DeliveryTimePredictionOutput } from '@/ai/flows/delivery-time-prediction';
import { Progress } from '@/components/ui/progress';

type FormData = z.infer<typeof deliveryPredictionSchema>;

export default function DeliveryPredictionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<DeliveryTimePredictionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(deliveryPredictionSchema),
    defaultValues: {
      historicalData: 'Recent deliveries to this area average 3.5 hours during peak traffic.',
      realTimeTraffic: 'Heavy congestion reported on I-5 South near the city center.',
      weatherConditions: 'Light rain, 15°C, wind 10 km/h.',
      deliveryAddress: '123 Main St, Anytown, USA',
      packageDetails: 'Standard parcel, 5kg.',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await getDeliveryTimePrediction(data);
      setPrediction(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get delivery prediction. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Delivery Time Prediction"
        description="AI-powered ETA calculations based on real-time data."
      />
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Prediction Factors</CardTitle>
                <CardDescription>Enter the data to use for the ETA prediction.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="historicalData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Historical Data</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="e.g., Average delivery times, past delays" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="realTimeTraffic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Real-Time Traffic</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="e.g., Waze/Google Maps data, accident reports" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weatherConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weather Conditions</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="e.g., Rain, snow, wind speed" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Textarea rows={2} placeholder="Full destination address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="packageDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Details</FormLabel>
                      <FormControl>
                        <Textarea rows={2} placeholder="e.g., Size, weight, special handling" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Predict ETA
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>AI Prediction</CardTitle>
            <CardDescription>The estimated time of arrival will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {prediction && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery Time</p>
                  <p className="text-2xl font-bold font-headline">
                    {new Date(prediction.estimatedDeliveryTime).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Confidence Level ({Math.round(prediction.confidenceLevel * 100)}%)</p>
                  <Progress value={prediction.confidenceLevel * 100} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reasoning</p>
                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                    {prediction.reasoning}
                  </div>
                </div>
              </div>
            )}
             {!isLoading && !prediction && (
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                    <p>Your ETA prediction will be displayed here once generated.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
