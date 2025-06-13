import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex justify-between items-center'>
                <Link to="/" className='text-3xl font-bold font-mono text-primary tracking-tighter'>
                    &lt;ThinkBoard /&gt;
                </Link>
                <Link to='/create' className='btn btn-primary'>
                    <PlusIcon className='w-4 h-4 mr-2' />
                    <span>New Note</span>
                </Link>
            </div>
        </div>

    </header>
  )
}

export default Navbar