import React from 'react'
import { ArrowRight, Zap, Target, TrendingUp, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-xl shadow-blue-900/20">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Zap className="w-64 h-64 rotate-12" />
        </div>
        <div className="relative z-10 p-8 md:p-12 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
            Validate Your Vision with Confidence
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            Turn your startup ideas into reality with data-backed insights. Start your next analysis today.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-lg shadow-black/10">
              <Plus className="w-5 h-5" />
              New Analysis
            </button>
            <button className="bg-blue-800/50 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800/70 transition-colors">
              View Tutorials
            </button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Ideas', value: '12', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Market Potential', value: '$4.2B', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Validation Score', value: '85%', icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-slate-400 text-sm font-medium">Last 30 days</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-slate-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Recent Validations</h2>
          <Link to="/ideas" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { title: 'AI-Powered Garden Assistant', score: 92, date: '2 hours ago', status: 'High Potential' },
            { title: 'Crypto Tax Calculator', score: 78, date: 'Yesterday', status: 'Promising' },
            { title: 'Local Pet Sitting Marketplace', score: 45, date: '3 days ago', status: 'Needs Refinement' },
            { title: 'VR Education Platform', score: 88, date: '1 week ago', status: 'High Potential' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">Analyzed {item.date}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  item.score > 80 ? 'bg-emerald-100 text-emerald-700' : 
                  item.score > 60 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {item.status}
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-slate-900">{item.score}</span>
                <span className="text-slate-400 font-medium mb-1.5">/ 100 Score</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    item.score > 80 ? 'bg-emerald-500' : 
                    item.score > 60 ? 'bg-blue-500' : 'bg-amber-500'
                  }`} 
                  style={{ width: `${item.score}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
