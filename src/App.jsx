import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [showFinished, setShowFinished] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
    setLoaded(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, loaded]);

  // Add a new todo
  const addTodo = () => {
    if (todo.trim() === '') return;
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
  };

  // Handle Enter key for adding todo
  const handleAddKeyDown = (e) => {
    if (e.key === 'Enter' && todo.trim() !== '') {
      addTodo();
    }
  };

  // Toggle completion status
  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  // Initiate editing a todo
  const editTodo = (e) => {
    const id = e.target.name;
    const selected = todos.find((item) => item.id === id);
    setEditId(id);
    setEditText(selected.todo);
  };

  // Handle Enter key for editing todo
  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (editText.trim() === '') {
        setEditId(null);
        return;
      }
      const updatedTodos = todos.map((item) =>
        item.id === editId ? { ...item, todo: editText } : item
      );
      setTodos(updatedTodos);
      setEditId(null);
      setEditText('');
    }
  };

  // Show delete confirmation
  const deleteTodo = (id) => {
    setShowConfirm(true);
    setDeleteId(id);
  };

  // Confirm deletion
  const confirmDelete = () => {
    setTodos(todos.filter((todo) => todo.id !== deleteId));
    setShowConfirm(false);
    setDeleteId(null);
  };

  // Handle input change
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Toggle show finished todos
  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

      {/* Title */}
      <div className="text-center text-3xl sm:text-4xl font-extrabold text-yellow-300 mt-6">
        MY TO-DO LIST
      </div>

      {/* Main Container */}
      <div className="bg-black/30 backdrop-blur-md p-4 sm:p-6 mt-6 mx-auto w-[90vw] sm:w-[80vw] rounded-xl shadow-2xl min-h-screen text-white font-poppins">

        {/* Input Field and Add Button */}
        <div className="flex flex-col sm:flex-row justify-center mb-6 gap-3 sm:gap-4">
          <input
            onChange={handleChange}
            onKeyDown={handleAddKeyDown}
            value={todo}
            className="w-full sm:w-[40vw] p-2 sm:p-3 rounded-xl bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200 text-sm sm:text-base"
            type="text"
            placeholder="Write your task..."
          />
          <button
            onClick={addTodo}
            className="bg-yellow-300 text-black font-bold px-4 py-2 rounded-full hover:bg-yellow-200 transition-all duration-300 cursor-pointer text-sm sm:text-base"
          >
            Add
          </button>
        </div>

        {/* Show Finished Toggle */}
        <div className="flex items-center justify-between border-2 border-yellow-300 bg-black/40 p-3 sm:p-4 rounded-xl w-full sm:max-w-sm mx-auto mt-6 shadow-lg">
          <span className="text-white text-sm sm:text-lg font-semibold">Show Finished</span>
          <label className="relative inline-block w-10 h-5 sm:w-12 sm:h-6 cursor-pointer">
            <input
              onChange={toggleFinished}
              checked={showFinished}
              type="checkbox"
              className="sr-only peer"
            />
            <div className="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-yellow-400 transition-colors duration-300"></div>
            <div className="absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5 sm:peer-checked:translate-x-6"></div>
          </label>
        </div>

        {/* Todo List */}
        <div className="space-y-3 mt-6 max-h-[80vh] overflow-y-auto">
          {todos.map((item, index) => (
            (showFinished || !item.isCompleted) && (
              <div
                key={index}
                className="flex items-center justify-between bg-black/50 backdrop-blur-md rounded-lg px-3 py-2 sm:px-4 sm:py-3 w-full sm:w-3/4 mx-auto shadow-md transition-all duration-300 flex-nowrap gap-3"
              >
                <div className="flex items-center min-w-0 flex-1 gap-3">
                  <input
                    name={item.id}
                    onClick={handleCheckbox}
                    type="checkbox"
                    className="h-4 w-4 sm:h-5 sm:w-5 cursor-pointer shrink-0"
                    checked={item.isCompleted}
                    readOnly
                  />
                  {editId === item.id ? (
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={handleEditKeyDown}
                      className="w-full p-1 rounded bg-[#1e1e1e] text-white outline-none text-sm truncate"
                      autoFocus
                    />
                  ) : (
                    <div className={`text-sm sm:text-base truncate ${item.isCompleted ? 'line-through text-gray-400' : ''}`}>
                      {item.todo}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    className="bg-yellow-300 px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-bold rounded-full cursor-pointer hover:bg-yellow-200 transition-all duration-300 text-black"
                    name={item.id}
                    onClick={editTodo}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(item.id)}
                    className="bg-yellow-300 px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-bold rounded-full cursor-pointer hover:bg-yellow-200 transition-all duration-300 text-black"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50 z-50 transition-opacity duration-300">
          <div className="bg-black text-white p-6 rounded-2xl shadow-xl text-center w-11/12 sm:w-96 scale-100 transition-transform duration-300">
            <p className="mb-6 text-lg sm:text-xl font-semibold">Are you sure you want to delete this to-do?</p>
            <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 sm:px-5 sm:py-2 rounded-full font-bold transition-colors duration-300 cursor-pointer text-sm sm:text-base"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 sm:px-5 sm:py-2 rounded-full font-bold transition-colors duration-300 cursor-pointer text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
