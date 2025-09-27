'use server';

import { predictDeliveryTime, DeliveryTimePredictionInput } from '@/ai/flows/delivery-time-prediction';
import { suggestOptimalLoad, OptimalLoadSuggestionInput } from '@/ai/flows/optimal-load-suggestion';
import { documentRecognition, DocumentRecognitionInput } from '@/ai/flows/document-recognition';

export async function getDeliveryTimePrediction(input: DeliveryTimePredictionInput) {
  const result = await predictDeliveryTime(input);
  return result;
}

export async function getOptimalLoadSuggestion(input: OptimalLoadSuggestionInput) {
  const result = await suggestOptimalLoad(input);
  return result;
}

export async function getDocumentRecognition(input: DocumentRecognitionInput) {
  const result = await documentRecognition(input);
  return result;
}
