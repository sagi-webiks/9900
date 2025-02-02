import express, { type Router } from 'express';
import {
  createTodoController,
  getAllTodosController,
  getTodoByIdController,
  updateTodoController,
  deleteTodoController,
} from './todos.controller';

const router: Router = express.Router();

/**
 * @route POST /api/todos
 * @description Add a new Todo
 * @access Public
 */
router.post('/', createTodoController);

/**
 * @route GET /api/todos
 * @description Get all Todos
 * @access Public
 */
router.get('/', getAllTodosController);

/**
 * @route GET /api/todos/:id
 * @description Get a single Todo by ID
 * @access Public
 */
router.get('/:id', getTodoByIdController);

/**
 * @route PUT /api/todos/:id
 * @description Update a Todo by ID
 * @access Public
 */
router.put('/:id', updateTodoController);

/**
 * @route DELETE /api/todos/:id
 * @description Delete a Todo by ID
 * @access Public
 */
router.delete('/:id', deleteTodoController);

export default router;
