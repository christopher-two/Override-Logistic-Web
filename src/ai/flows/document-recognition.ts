'use server';
/**
 * @fileOverview An AI agent for extracting text and data from driver's documents (photos) using OCR and AI.
 *
 * - documentRecognition - A function that handles the document recognition process.
 * - DocumentRecognitionInput - The input type for the documentRecognition function.
 * - DocumentRecognitionOutput - The return type for the documentRecognition function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DocumentRecognitionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a driver's document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  documentType: z
    .string()
    .describe('The type of the document (e.g., driver license, insurance card).'),
});
export type DocumentRecognitionInput = z.infer<typeof DocumentRecognitionInputSchema>;

const DocumentRecognitionOutputSchema = z.object({
  extractedData: z.record(z.string(), z.string()).describe('The extracted data from the document, as a JSON object.'),
  confidenceScore: z.number().describe('A confidence score (0-1) indicating the accuracy of the data extraction.'),
});
export type DocumentRecognitionOutput = z.infer<typeof DocumentRecognitionOutputSchema>;

export async function documentRecognition(input: DocumentRecognitionInput): Promise<DocumentRecognitionOutput> {
  return documentRecognitionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'documentRecognitionPrompt',
  input: {schema: DocumentRecognitionInputSchema},
  output: {schema: DocumentRecognitionOutputSchema},
  prompt: `You are an expert in extracting data from documents using OCR and AI.

You will receive a photo of a document and its type. You will use this information to extract the relevant data from the document.

Document Type: {{{documentType}}}
Photo: {{media url=photoDataUri}}

Return the extracted data as a JSON object and provide a confidence score (0-1) indicating the accuracy of the data extraction.
`,
});

const documentRecognitionFlow = ai.defineFlow(
  {
    name: 'documentRecognitionFlow',
    inputSchema: DocumentRecognitionInputSchema,
    outputSchema: DocumentRecognitionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
