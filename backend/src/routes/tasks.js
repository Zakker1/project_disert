import express from 'express';
import multer from 'multer';
import { enqueueTask, getTaskStatus } from '../services/taskService.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), async (req, res) => {
  const { path } = req.file;
  const { taskId } = await enqueueTask(path);
  res.json({ taskId });
});

router.get('/status/:id', async (req, res) => {
  const data = await getTaskStatus(req.params.id);
  res.json(data || { status: 'not found' });
});

export default router;