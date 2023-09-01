import express from 'express';
import healthRecordController from '../controllers/userHealthRecord.js';

const router = express.Router();

router.get('/healthrecord', healthRecordController.healthRecordPanel)

router.get('/view-records', healthRecordController.viewHealthRecord)
router.get('/get-total-records', healthRecordController.totalHealthRecordOneMonth)
router.post('/edit-record', healthRecordController.editHealthRecord)
router.post('/delete-record', healthRecordController.deleteHealthRecord)
router.post('/create-record', healthRecordController.createUserHealthRecord)

router.get('/get-bmi', healthRecordController.returnLatestHeightAndWeight)
router.get('/health-monitor', healthRecordController.viewHealthMonitor)

export default router;
