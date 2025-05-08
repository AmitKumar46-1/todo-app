import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addtodo = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const edittodo = (e) => {
    const id = e.target.name;
    const selected = todos.find(item => item.id === id);
    setEditId(id);
    setEditText(selected.todo);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      if (editText.trim() === "") {
        setEditId(null);
        return;
      }
      const newTodos = todos.map(item =>
        item.id === editId ? { ...item, todo: editText } : item
      );
      setTodos(newTodos);
      setEditId(null);
      setEditText("");
    }
  };

  const deletetodo = (e) => {
    const id = e.target.name;
    setTodos(todos.filter(item => item.id !== id));
  };

  const handlecheckbox = (e) => {
    const id = e.target.name;
    setTodos(todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  return (
    <div className="container bg-[#2d292946] p-4 ml-40 w-[75vw] rounded-lg min-h-screen">
      <div className="list flex justify-center">
        <input
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          className='border border-[#303030] w-[35vw] p-2 rounded-xl mr-4 bg-[#00000077] text-white placeholder-gray-400'
          type="text"
          placeholder='Write Your Text Here..'
        />
        <button
          onClick={addtodo}
          className='bg-yellow-300 px-5 py-2 font-bold rounded-full cursor-pointer hover:bg-yellow-200 text-black'>
          Add
        </button>
      </div>

      <div className="mt-6 border border-[#303030]"></div>

      <div className="todos">
        {todos.map((item, index) => (
          <div key={index} className="Mylist flex m-auto mt-6 ml-60 w-1/2 justify-between items-center">
            <input
              name={item.id}
              onClick={handlecheckbox}
              className='m-3 cursor-pointer'
              type="checkbox"
              checked={item.isCompleted}
              readOnly
            />

            {editId === item.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleEditKeyDown}
                className='w-full mr-4 p-1 rounded bg-[#1e1e1e] text-white outline-none'
                autoFocus
              />
            ) : (
              <div className={`text-white ${item.isCompleted ? "line-through" : ""}`}>
                {item.todo}
              </div>
            )}

            <div className="button flex gap-3">
              <button
                name={item.id}
                onClick={edittodo}
                className='bg-yellow-300 px-5 py-1 font-bold rounded-full cursor-pointer hover:bg-yellow-200 text-black'>
                Edit
              </button>
              <button
                name={item.id}
                onClick={deletetodo}
                className='bg-yellow-300 px-5 py-1 font-bold rounded-full cursor-pointer hover:bg-yellow-200 text-black'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
