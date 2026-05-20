import { Op } from 'sequelize';
import Note from '../models/Note.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const SORT_FIELDS = {
  'date-desc': ['created_at', 'DESC'],
  'date-asc': ['created_at', 'ASC'],
  'title-asc': ['title', 'ASC'],
  'title-desc': ['title', 'DESC'],
  'category-asc': ['category', 'ASC'],
};

export const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title?.trim()) throw new ApiError(400, 'Title is required');
  if (!content?.trim()) throw new ApiError(400, 'Content is required');
  if (!category?.trim()) throw new ApiError(400, 'Category is required');

  const note = await Note.create({
    title: title.trim(),
    content: content.trim(),
    category: category.trim(),
  });

  res.status(201).json({
    success: true,
    message: 'Note created successfully',
    data: note,
  });
});

export const getAllNotes = asyncHandler(async (req, res) => {
  const { search, category, sort = 'date-desc' } = req.query;
  const where = {};

  if (category && category !== 'all') {
    where.category = category;
  }

  if (search?.trim()) {
    const term = `%${search.trim()}%`;
    where[Op.or] = [
      { title: { [Op.like]: term } },
      { content: { [Op.like]: term } },
      { category: { [Op.like]: term } },
    ];
  }

  const order = SORT_FIELDS[sort] || SORT_FIELDS['date-desc'];

  const notes = await Note.findAll({
    where,
    order: [order],
  });

  res.json({
    success: true,
    count: notes.length,
    data: notes,
  });
});

export const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findByPk(req.params.id);

  if (!note) {
    throw new ApiError(404, 'Note not found');
  }

  res.json({
    success: true,
    data: note,
  });
});

export const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findByPk(req.params.id);

  if (!note) {
    throw new ApiError(404, 'Note not found');
  }

  const { title, content, category } = req.body;

  if (title !== undefined) {
    if (!title?.trim()) throw new ApiError(400, 'Title cannot be empty');
    note.title = title.trim();
  }
  if (content !== undefined) {
    if (!content?.trim()) throw new ApiError(400, 'Content cannot be empty');
    note.content = content.trim();
  }
  if (category !== undefined) {
    if (!category?.trim()) throw new ApiError(400, 'Category cannot be empty');
    note.category = category.trim();
  }

  await note.save();

  res.json({
    success: true,
    message: 'Note updated successfully',
    data: note,
  });
});

export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findByPk(req.params.id);

  if (!note) {
    throw new ApiError(404, 'Note not found');
  }

  await note.destroy();

  res.json({
    success: true,
    message: 'Note deleted successfully',
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const notes = await Note.findAll({
    attributes: ['category'],
    group: ['category'],
    raw: true,
  });

  const categories = [...new Set(notes.map((n) => n.category))].sort();

  res.json({
    success: true,
    data: categories,
  });
});
