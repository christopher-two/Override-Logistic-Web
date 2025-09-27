'use server';

/**
 * @fileOverview A delivery time prediction AI agent.
 *
 * - predictDeliveryTime - A function that predicts the delivery time based on historical data, real-time traffic, and weather conditions.
 * - DeliveryTimePredictionInput - The input type for the predictDeliveryTime function.
 * - DeliveryTimePredictionOutput - The return type for the predictDeliveryTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DeliveryTimePredictionInputSchema = z.object({
  historicalData: z.string().describe('Historical delivery data, including dates, times, and routes.'),
  realTimeTraffic: z.string().describe('Real-time traffic conditions data.'),
  weatherConditions: z.string().describe('Current weather conditions data.'),
  deliveryAddress: z.string().describe('The destination delivery address.'),
  packageDetails: z.string().describe('Details about the package, including size and weight.'),
});
export type DeliveryTimePredictionInput = z.infer<typeof DeliveryTimePredictionInputSchema>;

const DeliveryTimePredictionOutputSchema = z.object({
  estimatedDeliveryTime: z.string().describe('The estimated delivery time, in ISO format.'),
  confidenceLevel: z.number().describe('A number between 0 and 1 indicating the confidence level of the prediction.'),
  reasoning: z.string().describe('The reasoning behind the estimated delivery time.'),
});
export type DeliveryTimePredictionOutput = z.infer<typeof DeliveryTimePredictionOutputSchema>;

export async function predictDeliveryTime(input: DeliveryTimePredictionInput): Promise<DeliveryTimePredictionOutput> {
  return predictDeliveryTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'deliveryTimePredictionPrompt',
  input: {schema: DeliveryTimePredictionInputSchema},
  output: {schema: DeliveryTimePredictionOutputSchema},
  prompt: `You are an expert logistics assistant specializing in predicting delivery times.

You will use the following information to predict the delivery time, and your confidence in that time.

Historical Data: {{{historicalData}}}
Real-time Traffic: {{{realTimeTraffic}}}
Weather Conditions: {{{weatherConditions}}}
Delivery Address: {{{deliveryAddress}}}
Package Details: {{{packageDetails}}}

Based on this information, provide an estimated delivery time, your confidence (as a number between 0 and 1) in your prediction, and the reasoning behind it.

Ensure the estimated delivery time is returned in ISO format.
`,
});

const predictDeliveryTimeFlow = ai.defineFlow(
  {
    name: 'predictDeliveryTimeFlow',
    inputSchema: DeliveryTimePredictionInputSchema,
    outputSchema: DeliveryTimePredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
