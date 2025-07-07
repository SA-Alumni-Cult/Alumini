import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import dbConnect from '@/lib/DbConnect';
import Alumni from '@/models/Login';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    await dbConnect();

    const filePath = path.join(process.cwd(), 'src', 'data', 'alumnidata.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    const inserted = await Alumni.insertMany(jsonData);
    return res.status(200).json({ message: 'Data uploaded successfully', inserted });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Failed to read or insert data' });
  }
}
