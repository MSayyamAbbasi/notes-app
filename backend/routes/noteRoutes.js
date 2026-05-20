import { Router } from 'express';
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  getCategories,
} from '../controllers/noteController.js';

const router = Router();

router.get('/categories', getCategories);
router.route('/').get(getAllNotes).post(createNote);
router.route('/:id').get(getNoteById).put(updateNote).delete(deleteNote);

export default router;
