import { ReactNode, createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export type TodosProviderProps = {
    children: ReactNode;
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContextType = {
    todos: Todo[];
    handleAddToDo: (task: string) => void;
    toggleTodoAsCompleted: (id: string) => void;
    handleDeleteTodo: (id: string) => void;
}

// Create context with a default null value
const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider = ({ children }: TodosProviderProps) => { // Fixed the typo here
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const storedTodos = localStorage.getItem("todos");
            return storedTodos ? JSON.parse(storedTodos) : [];
        } catch (error) {
            console.error("Failed to load todos from localStorage", error);
            return [];
        }
    });

    // Persist todos to localStorage whenever the todos change
    useEffect(() => {
        try {
            localStorage.setItem("todos", JSON.stringify(todos));
        } catch (error) {
            console.error("Failed to save todos to localStorage", error);
        }
    }, [todos]);

    // useCallback to prevent recreation of functions unnecessarily
    const handleAddToDo = useCallback((task: string) => {
        setTodos((prev) => [
            {
                id: Math.random().toString(36).substring(2, 9), // ID generation simplified
                task,
                completed: false,
                createdAt: new Date()
            },
            ...prev
        ]);
    }, []);

    const toggleTodoAsCompleted = useCallback((id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, []);

    const handleDeleteTodo = useCallback((id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }, []);

    // Memoize the context value to avoid unnecessary re-renders
    const value = useMemo(
        () => ({
            todos,
            handleAddToDo, 
            toggleTodoAsCompleted, 
            handleDeleteTodo, 
        }),
        [todos, handleAddToDo, toggleTodoAsCompleted, handleDeleteTodo]
    );

    return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
};

// Hook for accessing todos context
export const useTodos = () => {
    const context = useContext(TodosContext);
    if (!context) {
        throw new Error("useTodos must be used within a TodosProvider");
    }
    return context;
}
