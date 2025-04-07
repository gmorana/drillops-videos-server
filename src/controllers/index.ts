// Simulate user data (replace with your actual logic)
import { Request, Response } from 'express';
import { containerClient } from '../config/azureStorage';

export const getContainerList = async (req: Request, res: Response) => {
  const contentList = [];
  try {
    for await (const blob of containerClient.listBlobsFlat()) {
      console.log('\t', blob.name);
      contentList.push(blob.name);
    }
    res.status(200).json({ success: true, data: contentList });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
