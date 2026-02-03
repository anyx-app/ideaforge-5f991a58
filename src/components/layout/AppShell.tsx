import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Lightbulb, BarChart3, Settings, LogOut, PlusCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function AppShell() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Lightbulb, label: 'My Ideas', path: '/ideas' },
    { icon: BarChart3, label: 'Market Analysis', path: '/analysis' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-20 shadow-sm relative">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <Lightbulb className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 tracking-tight">
            IdeaForge
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="mb-8">
            <button className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:scale-[1.02] active:scale-[0.98]">
              <PlusCircle className="w-5 h-5" />
              <span>New Idea</span>
            </button>
          </div>

          <div className="space-y-1">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Platform</p>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600 transition-colors'}`} />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header & Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      
      {/* Sidebar - Mobile */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl`}>
         <div className="p-4 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Lightbulb className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900">IdeaForge</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-500">
              <X className="w-6 h-6" />
            </button>
         </div>
         <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isActive(item.path) ? 'bg-blue-50 text-blue-700' : 'text-slate-600'}`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
         </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-slate-50">
        {/* Mobile Header Bar */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center gap-4 sticky top-0 z-20">
           <button onClick={() => setIsMobileMenuOpen(true)} className="p-1 text-slate-600">
             <Menu className="w-6 h-6" />
           </button>
           <span className="font-bold text-slate-900 text-lg">IdeaForge</span>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto scroll-smooth">
           <div className="container mx-auto p-4 md:p-8 lg:p-12 max-w-7xl">
              <Outlet />
           </div>
        </div>
      </main>
    </div>
  )
}
