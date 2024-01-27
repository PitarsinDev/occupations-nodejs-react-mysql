import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  const [occupations, setOccupations] = useState([]);
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    fetchOccupations();
  }, []);

  const fetchOccupations = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/occupations');
      setOccupations(response.data);
    } catch (error) {
      console.error('Error fetching occupations:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:3001/api/occupations', { name, salary });
      fetchOccupations();
    } catch (error) {
      console.error('Error creating occupation:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/occupations/${id}`, { name, salary });
      fetchOccupations();
    } catch (error) {
      console.error('Error updating occupation:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/occupations/${id}`);
      fetchOccupations();
    } catch (error) {
      console.error('Error deleting occupation:', error);
    }
  };

  return (
    <>
      <div className='flex justify-center'>
        <div className='p-10'>
          <h1 className='text-red-600 text-2xl'>Occupations</h1>
          <div className='bg-red-600 w-5 h-1 rounded-full'></div>
        </div>
      </div>
      <div className='flex justify-center'>
        <ul>
          {occupations.map((occupation) => (
            <li key={occupation.id} className='flex gap-2 text-zinc-600'>
              <span className='text-red-600'>{occupation.name}</span> - <span className='text-red-600'>{occupation.salary}</span>
              <button onClick={() => handleUpdate(occupation.id)} className='bg-red-600 px-5 text-white rounded-md shadow-md'>Update</button>
              <button onClick={() => handleDelete(occupation.id)} className='bg-blue-600 px-5 text-white rounded-md shadow-md'>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex justify-center p-10  '>
        <div className='flex gap-5'>
          <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} className='border border-red-600 rounded-md pl-2'/>
          <input type="text" placeholder="Salary" onChange={(e) => setSalary(e.target.value)} className='border border-red-600 rounded-md pl-2'/>
          <button onClick={handleCreate} className='bg-red-600 px-5 text-white rounded-md shadow-md'>Create</button>
        </div>
      </div>
    </>
  )
}

export default App
