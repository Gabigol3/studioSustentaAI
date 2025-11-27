'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-product-image-for-sustainability.ts';
import '@/ai/flows/analyze-product-text-for-sustainability.ts';
import '@/ai/flows/summarize-environmental-impact.ts';


    