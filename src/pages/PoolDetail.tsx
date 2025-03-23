
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MatchPredictionCard from '@/components/MatchPredictionCard';
import { Pool, Prediction, Match } from '@/types';
import { mockPools, mockPredictions } from '@/lib/mockData';
import { cn, formatCurrency, formatDate, getLeagueColor } from '@/lib/utils';
import { getCurrentUser, isAuthenticated } from '@/lib/auth';
import { ArrowLeft, AlertCircle, Trophy, Calendar, DollarSign, Clock } from 'lucide-react';

const PoolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pool, setPool] = useState<Pool | null>(null);
  const [userPredictions, setUserPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchPoolData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const foundPool = mockPools.find(p => p.id === id);
        
        if (!foundPool) {
          navigate('/pools');
          return;
        }
        
        setPool(foundPool);
        
        // Check if user has predictions for this pool
        if (user) {
          const predictions = mockPredictions.filter(
            p => p.userId === user.id && foundPool.matches.some(m => m.id === p.matchId)
          );
          setUserPredictions(predictions);
          setHasJoined(predictions.length > 0);
        }
      } catch (error) {
        console.error("Error fetching pool data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoolData();
  }, [id, navigate, user]);

  const handleJoinPool = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.wallet < (pool?.entryFee || 0)) {
      toast({
        title: "Insufficient funds",
        description: "Please add funds to your wallet to join this pool",
        variant: "destructive",
      });
      return;
    }
    
    setJoining(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "You have successfully joined the pool",
      });
      
      setHasJoined(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join pool. Please try again.",
        variant: "destructive",
      });
    } finally {
      setJoining(false);
    }
  };

  const handleSavePrediction = async (matchId: string, homeScore: number, awayScore: number) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Simulate API call to save prediction
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newPrediction: Prediction = {
      id: `pred_${Date.now()}`,
      userId: user.id,
      matchId,
      homeScore,
      awayScore,
      createdAt: new Date().toISOString(),
    };
    
    setUserPredictions(prev => {
      // Replace if exists, add if not
      const exists = prev.find(p => p.matchId === matchId);
      if (exists) {
        return prev.map(p => p.matchId === matchId ? newPrediction : p);
      } else {
        return [...prev, newPrediction];
      }
    });
    
    toast({
      title: "Prediction saved",
      description: `Your prediction for this match has been saved.`,
    });
  };

  const isPoolStarted = pool ? new Date(pool.startDate) < new Date() : false;
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-4">
          <div className="container mx-auto">
            <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!pool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Pool not found</h2>
            <p className="text-muted-foreground mb-6">The pool you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/pools">Back to Pools</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => navigate('/pools')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pools
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <Badge 
                className={cn(
                  "mb-3",
                  getLeagueColor(pool.league),
                  "text-white"
                )}
              >
                {pool.league}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{pool.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(pool.startDate)} - {formatDate(pool.endDate)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {isPoolStarted ? 'In Progress' : 'Starts Soon'}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto">
              {!hasJoined && !isPoolStarted && (
                <Card className="w-full md:w-[300px]">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Entry Fee:</span>
                        <span className="font-semibold">{formatCurrency(pool.entryFee)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Current Jackpot:</span>
                        <span className="font-bold text-lg">{formatCurrency(pool.jackpot)}</span>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={handleJoinPool}
                        disabled={joining}
                      >
                        {joining ? "Joining..." : "Join Pool"}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Entry fee will be deducted from your wallet
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {hasJoined && (
                <Card className="w-full md:w-[300px] border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-lg mb-1">You've Joined!</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Make your predictions before the matches start
                      </p>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                        <span className="text-sm">Jackpot:</span>
                        <span className="font-bold">{formatCurrency(pool.jackpot)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {isPoolStarted && !hasJoined && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Pool has started</AlertTitle>
                  <AlertDescription>
                    This pool has already started and is no longer accepting new entries.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          
          {isPoolStarted && hasJoined && userPredictions.length < pool.matches.length && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Complete your predictions</AlertTitle>
              <AlertDescription>
                You haven't predicted all matches yet. Complete your predictions before the matches start.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pool.matches.map((match) => (
              <MatchPredictionCard
                key={match.id}
                match={match}
                userPrediction={userPredictions.find(p => p.matchId === match.id)}
                onSavePrediction={handleSavePrediction}
                disabled={!hasJoined || isPoolStarted}
              />
            ))}
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Pool Rules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Scoring System</CardTitle>
                  <CardDescription>How points are calculated</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Correct Score</span>
                    <Badge className="bg-green-600">5 Points</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Correct Tie (Different Score)</span>
                    <Badge className="bg-blue-600">3 Points</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Correct Outcome (Win/Loss)</span>
                    <Badge className="bg-amber-600">2 Points</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payouts</CardTitle>
                  <CardDescription>Win conditions and prizes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Jackpot (All 5 Correct)</span>
                    <span className="font-bold">{formatCurrency(pool.jackpot)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>1st Place on Leaderboard</span>
                    <span className="font-semibold">{formatCurrency(pool.jackpot * 0.1)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>2nd Place on Leaderboard</span>
                    <span className="font-semibold">{formatCurrency(pool.jackpot * 0.05)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>3rd Place on Leaderboard</span>
                    <span className="font-semibold">{formatCurrency(pool.jackpot * 0.025)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PoolDetail;
