
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Pool } from '@/types';
import { mockPools, mockLeaderboard } from '@/lib/mockData';
import { getLeagueColor, formatCurrency } from '@/lib/utils';
import { isAuthenticated } from '@/lib/auth';
import { ChevronRight, Trophy, Calculator, Shield, Wallet } from 'lucide-react';

const Index = () => {
  const [featuredPools, setFeaturedPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    // Simulate API call
    const fetchFeaturedPools = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setFeaturedPools(mockPools);
      } catch (error) {
        console.error("Error fetching pools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPools();
  }, []);

  useEffect(() => {
    // Add animations to elements when they enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <Badge className="mb-6 py-1.5 px-6 text-sm font-medium bg-white">Soccer Betting Pool</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
              Predict. Compete. <span className="text-primary">Win.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
              Join our premier betting pool platform where soccer fans predict match outcomes,
              compete on leaderboards, and win exciting prizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-8 shadow-md hover:shadow-lg transition-all">
                <Link to="/pools">
                  Browse Pools
                </Link>
              </Button>
              {!isLoggedIn && (
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link to="/register">
                    Create Account
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Featured Pools */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Featured Pools</h2>
                <p className="text-muted-foreground mt-1">Join the most popular betting pools this week</p>
              </div>
              <Button asChild variant="outline" className="hidden md:flex">
                <Link to="/pools" className="flex items-center gap-1">
                  View All Pools <ChevronRight size={16} />
                </Link>
              </Button>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6 h-64"></CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPools.map((pool) => (
                  <Card key={pool.id} className="overflow-hidden hover-lift animate-on-scroll opacity-0">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <Badge className={`${getLeagueColor(pool.league)} text-white mb-3`}>
                          {pool.league}
                        </Badge>
                        <h3 className="text-xl font-bold mb-2">{pool.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Entry Fee: {formatCurrency(pool.entryFee)} • Jackpot: {formatCurrency(pool.jackpot)}
                        </p>
                        <p className="text-sm mb-4">
                          Predict 5 matches from {pool.league} to win.
                        </p>
                        <Button asChild className="w-full">
                          <Link to={`/pools/${pool.id}`}>Join Pool</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            <div className="mt-8 text-center md:hidden">
              <Button asChild variant="outline">
                <Link to="/pools">View All Pools</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform makes soccer betting fun, fair, and rewarding. Here's how to get started.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm animate-on-scroll opacity-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Trophy className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">1. Choose a Pool</h3>
                <p className="text-muted-foreground">
                  Select from our weekly pools covering top European leagues with different entry fees and prizes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm animate-on-scroll opacity-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calculator className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">2. Make Predictions</h3>
                <p className="text-muted-foreground">
                  Predict the exact scores for five matches in your chosen league's pool before kickoff.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm animate-on-scroll opacity-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">3. Earn Points</h3>
                <p className="text-muted-foreground">
                  Score points based on the accuracy of your predictions: 5 for correct scores, 3 for ties, 2 for outcomes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm animate-on-scroll opacity-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Wallet className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">4. Win Prizes</h3>
                <p className="text-muted-foreground">
                  Win payouts for correct predictions or by finishing in the top three on the leaderboard. Hit the jackpot with all five correct!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Leaderboard Preview */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Current Leaders</h2>
                <p className="text-muted-foreground mt-1">See who's topping the leaderboard this week</p>
              </div>
              <Button asChild variant="outline" className="hidden md:flex">
                <Link to="/leaderboards" className="flex items-center gap-1">
                  Full Leaderboards <ChevronRight size={16} />
                </Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden animate-on-scroll opacity-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Player</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Points</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Correct Scores</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockLeaderboard.slice(0, 5).map((entry, index) => (
                    <tr key={entry.userId} className={index === 0 ? 'bg-amber-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                          <span className="font-bold text-sm">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{entry.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-primary">{entry.points}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">{entry.correctScores}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Button asChild variant="outline">
                <Link to="/leaderboards">View Full Leaderboards</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Test Your Prediction Skills?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of soccer fans who are already winning prizes with their match predictions.
            </p>
            <Button asChild size="lg" className="px-8 shadow-md hover:shadow-lg transition-all">
              <Link to={isLoggedIn ? "/pools" : "/register"}>
                {isLoggedIn ? "Browse Pools" : "Sign Up Now"}
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
