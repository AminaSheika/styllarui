import Link from "next/link"
import { Ruler } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="sticky top-5 z-50 flex items-center justify-center w-full">
      <div className="flex items-center justify-between w-[87%] px-5 py-4 navbar-glass rounded-[15px]">
        <Link href="/" className="flex items-center space-x-2">
          {/* <Ruler className="h-6 w-6 text-white" /> */}
          <span className="text-lg font-bold text-white">STYLLAR</span>
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-gray-200 transition-colors">
            Home
          </Link>
          <Link href="/scan" className="text-white hover:text-gray-200 transition-colors">
            Scan
          </Link>
        </div>
      </div>
    </nav>
  )
}

