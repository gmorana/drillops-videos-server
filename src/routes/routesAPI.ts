import express from 'express';

import { getContainerList } from '../controllers/index';
import { getSASKey } from '../controllers/accessKey';
const router = express.Router();

router.get('/container', getContainerList);
router.post('/accessKey', getSASKey);

export default router;
