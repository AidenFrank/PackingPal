'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';



export default function Home()
{
  const [account, setAccounts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAccounts = async () => {
      const { data, error } = await supabase.from('account').select('*')
      if (error) setError(error.message)
      else setAccounts(data)
    }

    fetchAccounts()
  }, []);

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-bold mb-4">Database Error</h1>
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Accounts</h1>
      {account.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-2 py-1">UserID</th>
              <th className="border border-gray-400 px-2 py-1">Username</th>
              <th className="border border-gray-400 px-2 py-1">Password</th>
            </tr>
          </thead>
          <tbody>
            {account.map((account) => (
              <tr key={account.UserID}>
                <td className="border border-gray-400 px-2 py-1">{account.UserID}</td>
                <td className="border border-gray-400 px-2 py-1">{account.Username}</td>
                <td className="border border-gray-400 px-2 py-1">{account.Password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
