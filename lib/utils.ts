import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import csv from 'csvtojson'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractCSV(file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        const csvData = event.target.result as string
        const jsonArray = await csv().fromString(csvData);
        const indexedArray = jsonArray.map((row, index) => ({ index: index + 1, ...row }));
        resolve(JSON.stringify({ data: indexedArray }))
      } else {
        reject(new Error("Failed to read file"))
      }
    }
    reader.onerror = () => reject(new Error("Error reading file"))
    reader.readAsText(file)
  })
}

 