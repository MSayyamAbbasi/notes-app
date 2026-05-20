import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Note = sequelize.define(
  'Note',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Title is required' },
        len: { args: [1, 255], msg: 'Title must be between 1 and 255 characters' },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Content is required' },
      },
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'General',
      validate: {
        notEmpty: { msg: 'Category is required' },
      },
    },
  },
  {
    tableName: 'notes',
    indexes: [
      { fields: ['category'] },
      { fields: ['created_at'] },
    ],
  }
);

export default Note;
