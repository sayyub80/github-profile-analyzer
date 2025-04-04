
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubCommitActivity } from "@/types/github";
import { Calendar } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";

interface CommitsActivityChartProps {
  commitsData: { [date: string]: number };
  isLoading: boolean;
}

export function CommitsActivityChart({ commitsData, isLoading }: CommitsActivityChartProps) {
  const [chartData, setChartData] = useState<Array<{ date: string; commits: number }>>([]);

  useEffect(() => {
    // Transform the data for the chart
    const data = Object.entries(commitsData)
      .map(([date, count]) => ({
        date,
        commits: count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setChartData(data);
  }, [commitsData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-md">
          <p className="font-medium">{new Date(label).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</p>
          <p className="text-sm">
            <span className="font-medium">{payload[0].value}</span> commits
          </p>
        </div>
      );
    }
  
    return null;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Commit Activity
          </CardTitle>
          <CardDescription>Loading commit data...</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Commit Activity
          </CardTitle>
          <CardDescription>No commit data available</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
          No commit data found for the top repositories
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Commit Activity
        </CardTitle>
        <CardDescription>Daily commit activity over the past year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(date) => {
                  const d = new Date(date);
                  const isFirstOfMonth = d.getDate() === 1;
                  return isFirstOfMonth ? d.toLocaleDateString(undefined, { month: 'short' }) : '';
                }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="commits"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCommits)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
