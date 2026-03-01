import { Link } from "wouter";
import { AlertCircle, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-md">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-cyan-400" />
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>

          <p className="text-white/60 mb-8">
            Looks like this page doesn't exist. Let's get you back to the portfolio.
          </p>

          <Link href="/">
            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-6 shadow-lg shadow-cyan-500/25 border-0">
              <HomeIcon className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
