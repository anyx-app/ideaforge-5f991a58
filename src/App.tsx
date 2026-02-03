import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import MyIdeas from './pages/MyIdeas'
import Analysis from './pages/Analysis'

// Simple placeholders to prevent routing errors during skeleton phase
const SettingsPlaceholder = () => <div className="p-8 text-center text-slate-500">Settings Component Coming Soon</div>

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ideas" element={<MyIdeas />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/settings" element={<SettingsPlaceholder />} />
      </Route>
    </Routes>
  )
}

