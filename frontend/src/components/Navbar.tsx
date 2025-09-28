import { Github } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="relative top-4 z-50 inset-x-0 flex justify-center">
      <div className="flex items-center gap-4 backdrop-blur-md bg-white/10 border border-white/15 text-white px-6 py-2 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:bg-white/15">
        
       
        <Link to="/" className="text-md font-bold font-mono tracking-tight ">
          CrispAI
        </Link>
        <div className='pl-10'></div>

        {/* Status dot */}
        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

       
        <a
          href="https://github.com/baseer4/crisp-ai-interview-assistant"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white text-gray-400"
        >
          <Github className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
