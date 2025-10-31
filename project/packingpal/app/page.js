'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';



export default function Home()
{
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('todos').select('*')
      if (error) console.error(error)
      else setTodos(data)
    }

    fetchData()
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Todos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </main>
  );
}
