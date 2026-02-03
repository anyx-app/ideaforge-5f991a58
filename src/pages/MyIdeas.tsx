import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DashboardContainer, 
  DashboardSection, 
  DashboardHeader 
} from '@/components/recipes/layouts';
import { StatGrid } from '@/components/recipes/dashboard/StatCard';
import { SearchBar } from '@/components/recipes/filters/SearchBar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, ArrowRight, TrendingUp, Lightbulb, CheckCircle } from 'lucide-react';

// Mock Data
const MOCK_STATS = [
  {
    title: "Total Ideas",
    value: "12",
    change: "+2 this month",
    trend: "up" as const,
    icon: <Lightbulb className="h-4 w-4" />,
  },
  {
    title: "Validated",
    value: "4",
    change: "33% success rate",
    trend: "up" as const,
    icon: <CheckCircle className="h-4 w-4" />,
  },
  {
    title: "Avg. Score",
    value: "72/100",
    change: "+5.2 points",
    trend: "up" as const,
    icon: <TrendingUp className="h-4 w-4" />,
  },
];

const MOCK_IDEAS = [
  {
    id: '1',
    title: 'AI-Powered Plant Care',
    description: 'A mobile app that uses computer vision to diagnose plant diseases and suggest care routines.',
    status: 'Validated',
    score: 85,
    date: '2023-10-15',
    marketSize: '$1.2B',
  },
  {
    id: '2',
    title: 'Sustainable Packaging Marketplace',
    description: 'B2B platform connecting eco-friendly packaging suppliers with small e-commerce businesses.',
    status: 'In Progress',
    score: 62,
    date: '2023-10-20',
    marketSize: '$4.5B',
  },
  {
    id: '3',
    title: 'Virtual Interior Design Assistant',
    description: 'AR tool for visualizing furniture in your home with AI design recommendations.',
    status: 'Draft',
    score: 45,
    date: '2023-11-01',
    marketSize: '$800M',
  },
  {
    id: '4',
    title: 'Local Food Waste Redistribution',
    description: 'Community platform to connect restaurants with excess food to local shelters and food banks.',
    status: 'Validated',
    score: 92,
    date: '2023-11-05',
    marketSize: 'Non-profit',
  },
  {
    id: '5',
    title: 'Remote Team Bonding VR',
    description: 'Virtual reality experiences designed specifically for remote team building and social events.',
    status: 'In Progress',
    score: 58,
    date: '2023-11-10',
    marketSize: '$2.1B',
  },
];

const MyIdeas = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIdeas = MOCK_IDEAS.filter(idea => 
    idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validated': return 'default'; // primary
      case 'In Progress': return 'secondary';
      case 'Draft': return 'outline';
      default: return 'secondary';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <DashboardContainer>
      <DashboardHeader 
        title="My Ideas" 
        description="Manage and track your startup ideas and their validation progress."
      >
        <Button onClick={() => navigate('/new-idea')}>
          <Plus className="mr-2 h-4 w-4" />
          New Idea
        </Button>
      </DashboardHeader>

      <DashboardSection>
        <StatGrid stats={MOCK_STATS} columns={3} />
      </DashboardSection>

      <DashboardSection title="Your Ideas" description={`${filteredIdeas.length} ideas found`}>
        <div className="mb-6">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Search ideas by title or description..." 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <Card key={idea.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={getStatusColor(idea.status) as any}>
                    {idea.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{idea.date}</span>
                </div>
                <CardTitle className="line-clamp-1">{idea.title}</CardTitle>
                <CardDescription className="line-clamp-2 h-10">
                  {idea.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Validation Score</span>
                      <span className="font-medium">{idea.score}/100</span>
                    </div>
                    <Progress value={idea.score} className="h-2" indicatorClassName={getScoreColor(idea.score)} />
                  </div>
                  <div className="flex justify-between text-sm border-t pt-4">
                    <span className="text-muted-foreground">Market Size</span>
                    <span className="font-medium">{idea.marketSize}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between group" onClick={() => navigate(`/ideas/${idea.id}`)}>
                  View Details
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredIdeas.length === 0 && (
          <div className="text-center py-12 border rounded-lg bg-muted/10">
            <h3 className="text-lg font-medium text-muted-foreground">No ideas found</h3>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search terms or create a new idea.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </DashboardSection>
    </DashboardContainer>
  );
};

export default MyIdeas;

