import { BlobServiceClient } from '@azure/storage-blob';
import dotnet from 'dotenv';

dotnet.config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw Error('Azure Storage Connection string not found');
}
console.log('Azure Blob storage v12 -DrillOps Training Videos');
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!containerName) {
  throw new Error('Azure Storage Container Dependencies Name not found');
}

const containerClient = blobServiceClient.getContainerClient(containerName);

export { blobServiceClient, containerClient, containerName };
