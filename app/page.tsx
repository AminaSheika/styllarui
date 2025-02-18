import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Welcome to Styllar</h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl text-white">
        Get accurate body measurements using our advanced AI technology. Simply upload two photos and enter your basic
        information.
      </p>
      <Link href="/scan">
        <Button className="bg-white text-primary hover:bg-gray-200 text-lg px-6 py-3 rounded-full">
          Start Scanning <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  )
}

