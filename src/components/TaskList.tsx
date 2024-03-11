import axios from 'axios';
import { useEffect, useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
}

function Task() {
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get('http://127.0.0.1:8000/api/tasks');
    setTasks(result.data);
    console.log(result.data);
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/tasks', {
        title: title,
        description: description,
      });
      console.log('Task Registration Successfully');
      setId('');
      setTitle('');
      setDescription('');
      Load();
    } catch (err) {
      alert('Task Registration Failed');
    }
  }

  async function editTask(task: Task) {
    setTitle(task.title);
    setDescription(task.description);
    setId(task.id);
  }

  async function deleteTaskt(id: string) {
    await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`);
    console.log('Task deleted Successfully');
    Load();
  }

  async function update(event: React.FormEvent) {
    event.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8000/api/tasks/${id}`, {
        id: id,
        title: title,
        description: description,
      });
      console.log('Registration Updated');
      setId('');
      setTitle('');
      setDescription('');
      Load();
    } catch (err) {
      alert('Task Registration Failed');
    }
  }

  return (
    <div className=''>
      <h1 className='text-center pt-4 pb-2 max-w-3xl m-auto text-md font-medium text-gray-900'>Lista de Tareas</h1>
      <div className="my-3 max-w-3xl m-auto">
        <form className='max-w-sm mx-auto'>
          <div className="my-5">
            <input
              type="text"
              className=""
              id="task_id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label className='block mb-2 text-sm font-medium text-gray-900'>Nombre de la Tarea</label>
            <input 
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder='Ingrese el nombre de la tarea'
              id="taskTitle"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="my-5">
            <label className='block mb-2 text-sm font-medium text-gray-900'>Descripción de la tarea</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder='Ingrese la descripción de la tarea'
              id="taskDescription"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div className='flex gap-3 mt-2'>
            <button className="shadow bg-blue-600 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={save}>
              Guardar
            </button>
            <button className="shadow bg-zinc-500 hover:bg-zinc-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={update}>
              Actualizar
            </button>
          </div>
        </form>
      </div>
      <br />
      <div className='relative overflow-x-auto max-w-3xl m-auto'>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border" align="center">
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
            <tr>
              <th scope="col" className="px-6 py-3">Taskt Id</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Description</th>

              <th scope="col" className="px-6 py-3">Option</th>
            </tr>
          </thead>
          {tasks.map((task) => (
            <tbody key={task.id}>
              <tr className='bg-white border-b'>
                <th scope="row" className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{task.id} </th>
                <td className='px-6 py-4'>{task.title}</td>
                <td className='px-6 py-4'>{task.description}</td>
                <td className='flex px-6 py-4 gap-2'>
                  <button
                    type="button"
                    className="shadow bg-blue-600 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-3 rounded"
                    onClick={() => editTask(task)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="shadow bg-red-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-3 rounded"
                    onClick={() => deleteTaskt(task.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Task;
