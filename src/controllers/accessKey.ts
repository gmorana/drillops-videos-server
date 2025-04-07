import {
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
} from '@azure/storage-blob';

import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

function isTokenExpired(token: string | undefined): boolean | undefined {
  if (!token) return;
  if (typeof token === 'undefined') return;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
  const { exp } = JSON.parse(jsonPayload);
  const expired = Date.now() >= exp * 1000;
  return expired;
}

export const getSASKey = async (req: Request, res: Response): Promise<void> => {
  const secs_exp = Number(process.env.SECS_EXP_KEY) || 600;
  const { token, containerName } = req.body;
  const resIsExpired = isTokenExpired(token);
  if (!token || !containerName) {
    res.status(400).json({ message: 'Token and container name are required' });
    return;
  }
  if (resIsExpired) {
    res.status(401).json({ message: 'Token expired' });
  }
  try {
    const constants = {
      accountName: process.env.AZURE_ACCOUNT_NAME,
      accountKey: process.env.AZURE_ACCOUNT_KEY,
    };
    if (!constants.accountName || !constants.accountKey) {
      throw new Error('Azure account name or key is not defined in environment variables');
    }
    const sharedKeyCredential = new StorageSharedKeyCredential(constants.accountName, constants.accountKey);
    const sasOptions = {
      containerName,
      permissions: ContainerSASPermissions.parse('r'), // Read only
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + secs_exp * 1000),
    };

    const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
    res.status(200).json({ success: true, data: sasToken });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
