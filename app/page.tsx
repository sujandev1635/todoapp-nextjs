import Link from 'next/link'
import React from 'react'
import { Prisma } from './db'
import TodoItem from './components/page'

function getTodos(){
  return Prisma.todo.findMany()
}
async function toggleTodo(id:string, complete:boolean){
  "use server"

  await Prisma.todo.update({where:{id}, date:{complete}})
}

export default async function Home() {
  const todos = await getTodos()
  //await prisma.todo.create({data:{title:"test", complete:false}})
  
  return (
    <>
    <header className='flex justify-between items-center mb-4'>
      <h1 className='text-2xl'>Todos</h1>
      <Link href="/new" className='border border-slate-3000 text-slate-300 px-2 py-1 rounded hover:bg-slate-200 focus-within:bg-slate-700 outline-none'>New</Link>
    </header>
    <ul className='pl-4'>
      {todos.map(todo =>(
        <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
      ))}
    </ul>
    </>
  )
}
