'use server';

/**
 * @fileOverview A flow to suggest the optimal loading sequence and arrangement for trucks.
 *
 * - suggestOptimalLoad - A function that suggests the optimal load.
 * - OptimalLoadSuggestionInput - The input type for the suggestOptimalLoad function.
 * - OptimalLoadSuggestionOutput - The return type for the suggestOptimalLoad function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimalLoadSuggestionInputSchema = z.object({
  truckDimensions: z
    .string()
    .describe('The dimensions of the truck in the format LxWxH (e.g., 10x2.5x3 meters).'),
  packages: z
    .array(z.object({
      id: z.string().describe('Unique identifier for the package.'),
      dimensions: z.string().describe('The dimensions of the package in the format LxWxH (e.g., 1x0.5x0.5 meters).'),
      weight: z.number().describe('The weight of the package in kilograms.'),
      deliveryOrder: z.number().describe('The order in which the package needs to be delivered (1 being the first).'),
    }))
    .describe('An array of packages to be loaded onto the truck.'),
  constraints: z
    .string()
    .optional()
    .describe('Any constraints on how the packages can be loaded (e.g., fragile packages must be on top).'),
});
export type OptimalLoadSuggestionInput = z.infer<typeof OptimalLoadSuggestionInputSchema>;

const OptimalLoadSuggestionOutputSchema = z.object({
  suggestion: z
    .string()
    .describe(
      'A detailed suggestion for the optimal loading sequence and arrangement, including the order of packages and their placement within the truck, to minimize wasted space and improve loading efficiency.'
    ),
  diagramDataUri: z
    .string()
    .optional()
    .describe(
      "A data URI containing a diagram or visualization of the suggested loading arrangement. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type OptimalLoadSuggestionOutput = z.infer<typeof OptimalLoadSuggestionOutputSchema>;

export async function suggestOptimalLoad(
  input: OptimalLoadSuggestionInput
): Promise<OptimalLoadSuggestionOutput> {
  return optimalLoadSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimalLoadSuggestionPrompt',
  input: {schema: OptimalLoadSuggestionInputSchema},
  output: {schema: OptimalLoadSuggestionOutputSchema},
  prompt: `You are an expert logistics specialist. You will suggest the optimal loading sequence and arrangement for a truck, minimizing wasted space and improving loading efficiency.

Truck Dimensions: {{{truckDimensions}}}
Packages:
{{#each packages}}
- ID: {{id}}, Dimensions: {{dimensions}}, Weight: {{weight}} kg, Delivery Order: {{deliveryOrder}}
{{/each}}
Constraints: {{{constraints}}}

Consider the delivery order, package dimensions and weight, and any constraints to provide a detailed suggestion for the optimal loading sequence and arrangement. If possible, include instructions that could be followed by a human, such as "load package X first, then package Y on top of package X."
If it would be beneficial, also provide a textual description of how a diagram of the loading arrangement would look in the diagramDataUri field.
`, // Modified prompt here
});

const optimalLoadSuggestionFlow = ai.defineFlow(
  {
    name: 'optimalLoadSuggestionFlow',
    inputSchema: OptimalLoadSuggestionInputSchema,
    outputSchema: OptimalLoadSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
