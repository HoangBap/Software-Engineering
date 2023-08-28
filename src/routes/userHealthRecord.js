import express from 'express';
import healthRecordController from '../controllers/userHealthRecord.js';

const router = express.Router();

router.get('/health-records', healthRecordController.viewHealthRecord);
router.post('/edit-health-record', healthRecordController.editHealthRecord);
router.post('/delete-health-record', healthRecordController.deleteHealthRecord);

export default router;