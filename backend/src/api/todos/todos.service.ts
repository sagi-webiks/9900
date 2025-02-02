import Todo, { type ITodo } from './todos.model';


export const createTodo = async (todoData: Omit<ITodo, '_id'>): Promise<ITodo> => {
    console.log(todoData);
    const todo = new Todo({
        ...todoData,
        properties: {
            ...todoData.properties,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    });
    console.log(todo);
    await todo.save();
    return todo;
};


export const getAllTodos = async (): Promise<ITodo[]> => {
  return await Todo.find(); 
};


export const getTodoById = async (id: string): Promise<ITodo | null> => {
  return await Todo.findById(id); 
};


export const updateTodo = async (
  id: string,
  updateData: Partial<ITodo>
): Promise<ITodo | null> => {
  return await Todo.findByIdAndUpdate(id, updateData, { new: true }); 
};


export const deleteTodo = async (id: string): Promise<ITodo | null> => {
  return await Todo.findByIdAndDelete(id); 
}
