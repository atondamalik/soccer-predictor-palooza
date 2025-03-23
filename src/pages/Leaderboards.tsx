
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeaderboardTable from '@/components/LeaderboardTable';
import { LeaderboardEntry, League } from '@/types';
import { mockLeaderboard } from '@/lib/mockData';
import { leagues } from '@/lib/mockData';
import { isAuthenticated } from '@/lib/auth';

const Leaderboards = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchLeaderboardData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setLeaderboard(mockLeaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Leaderboards</h1>
          <p className="text-muted-foreground mb-8">See who's topping the charts in each league</p>
          
          <Tabs defaultValue="all" value={selectedLeague} onValueChange={setSelectedLeague} className="w-full mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All Leagues
              </TabsTrigger>
              {leagues.map((league) => (
                <TabsTrigger 
                  key={league} 
                  value={league}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {league}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              {loading ? (
                <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
              ) : (
                <LeaderboardTable 
                  entries={leaderboard} 
                  title="Overall Leaderboard"
                />
              )}
            </TabsContent>
            
            {leagues.map((league) => (
              <TabsContent key={league} value={league} className="mt-6">
                {loading ? (
                  <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
                ) : (
                  <LeaderboardTable 
                    entries={leaderboard.map((entry, index) => ({
                      ...entry,
                      rank: index + 1, // Simulate different rankings per league
                      points: Math.floor(entry.points * (0.7 + Math.random() * 0.6)),
                      correctScores: Math.floor(entry.correctScores * (0.5 + Math.random() * 0.8)),
                    }))}
                    title={`${league} Leaderboard`}
                  />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboards;
