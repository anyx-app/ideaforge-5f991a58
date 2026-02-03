import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  TrendingUp, 
  Users, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Loader2,
  Lightbulb
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { StatCard, StatGrid } from '@/components/recipes/dashboard/StatCard'
import { ChartCard, ChartGrid } from '@/components/recipes/dashboard/ChartCard'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

// Mock data for charts
const trendData = [
  { month: 'Jan', value: 4000 },
  { month: 'Feb', value: 3000 },
  { month: 'Mar', value: 2000 },
  { month: 'Apr', value: 2780 },
  { month: 'May', value: 1890 },
  { month: 'Jun', value: 2390 },
  { month: 'Jul', value: 3490 },
]

const marketData = [
  { year: '2020', size: 10 },
  { year: '2021', size: 15 },
  { year: '2022', size: 25 },
  { year: '2023', size: 45 },
  { year: '2024', size: 80 },
]

export default function Analysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    market: ''
  })

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Market Analysis</h1>
        <p className="text-muted-foreground text-lg">
          Evaluate your startup idea with AI-powered market insights and validation scores.
        </p>
      </div>

      {/* Input Section */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            Describe Your Idea
          </CardTitle>
          <CardDescription>
            Provide details about your concept to generate a comprehensive market analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Idea Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g., EcoTrack" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="market">Target Market</Label>
                <Input 
                  id="market" 
                  placeholder="e.g., Sustainable Logistics" 
                  value={formData.market}
                  onChange={(e) => setFormData({...formData, market: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the problem you're solving and your proposed solution..." 
                className="min-h-[120px]"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                size="lg" 
                disabled={isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px]"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze Market
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {showResults && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Key Metrics */}
          <StatGrid
            stats={[
              {
                title: "Market Size (TAM)",
                value: "$4.2B",
                change: { value: 12.5, isPositive: true, label: "YoY Growth" },
                icon: Users,
              },
              {
                title: "Validation Score",
                value: "85/100",
                change: { value: 5, isPositive: true, label: "vs Avg" },
                icon: Target,
              },
              {
                title: "Competitor Density",
                value: "Medium",
                icon: TrendingUp,
              }
            ]}
            columns={3}
          />

          {/* Charts */}
          <ChartGrid
            charts={[
              {
                title: "Market Growth Trend",
                description: "Projected market size over next 5 years",
                children: (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={marketData}>
                        <defs>
                          <linearGradient id="colorSize" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="size" 
                          stroke="#2563eb" 
                          fillOpacity={1} 
                          fill="url(#colorSize)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )
              },
              {
                title: "Search Interest",
                description: "Keyword volume trend for related terms",
                children: (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#0ea5e9" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )
              }
            ]}
          />

          {/* Pros & Cons */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-emerald-100 bg-emerald-50/30">
              <CardHeader>
                <CardTitle className="text-emerald-700 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Strengths & Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Growing market demand in sustainable sector",
                    "Low barrier to entry for initial MVP",
                    "High potential for B2B partnerships",
                    "Clear regulatory tailwinds supporting adoption"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-amber-100 bg-amber-50/30">
              <CardHeader>
                <CardTitle className="text-amber-700 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Risks & Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Established competitors with significant market share",
                    "Complex supply chain integration required",
                    "Initial customer acquisition cost may be high",
                    "Requires behavioral change from end users"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Action CTA */}
          <div className="flex justify-center pt-4">
            <Button variant="outline" className="gap-2">
              Save Analysis <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

