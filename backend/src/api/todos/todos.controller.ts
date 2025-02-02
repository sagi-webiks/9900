import type { Request, Response } from "express";
import {
	createTodo,
	getAllTodos,
	getTodoById,
	updateTodo,
	deleteTodo,
} from "./todos.service";

export const createTodoController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const todoData = req.body;
		const newTodo = await createTodo(todoData);
		res.status(201).json(newTodo); 
	} catch (error) {
		res.status(500).json({ message: "Error creating Todo", error });
	}
};

export const getAllTodosController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const todos = await getAllTodos();
		res.status(200).json(todos); 
	} catch (error) {
		res.status(500).json({ message: "Error fetching Todos", error });
	}
};

export const getTodoByIdController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const { id } = req.params;
	try {
		const todo = await getTodoById(id);
		if (!todo) {
			res.status(404).json({ message: "Todo not found" });
		} else {
			res.status(200).json(todo); 
		}
	} catch (error) {
		res.status(500).json({ message: "Error fetching Todo", error });
	}
};

export const updateTodoController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const { id } = req.params;
	try {
		const updatedTodo = await updateTodo(id, req.body);
		if (!updatedTodo) {
			res.status(404).json({ message: "Todo not found" });
		} else {
			res.status(200).json(updatedTodo); 
		}
	} catch (error) {
		res.status(500).json({ message: "Error updating Todo", error });
	}
};

export const deleteTodoController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const { id } = req.params;
	try {
		const deletedTodo = await deleteTodo(id);
		if (!deletedTodo) {
			res.status(404).json({ message: "Todo not found" });
		} else {
			res.status(200).json({ message: "Todo deleted successfully" }); 
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting Todo", error });
	}
};
