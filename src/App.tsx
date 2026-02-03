import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'

// Simple placeholders to prevent routing errors during skeleton phase
const IdeasPlaceholder = () => <div className="p-8 text-center text-slate-500">My Ideas Component Coming Soon</div>
const AnalysisPlaceholder = () => <div className="p-8 text-center text-slate-500">Market Analysis Component Coming Soon</div>
const SettingsPlaceholder = () => <div className="p-8 text-center text-slate-500">Settings Component Coming Soon</div>

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ideas" element={<IdeasPlaceholder />} />
        <Route path="/analysis" element={<AnalysisPlaceholder />} />
        <Route path="/settings" element={<SettingsPlaceholder />} />
      </Route>
    </Routes>
  )
}
