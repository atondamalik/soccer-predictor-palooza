
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PoolCard from '@/components/PoolCard';
import { Pool, League } from '@/types';
import { mockPools } from '@/lib/mockData';
import { leagues } from '@/lib/mockData';
import { Search } from 'lucide-react';
import { isAuthenticated } from '@/lib/auth';

const Pools = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [filteredPools, setFilteredPools] = useState<Pool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Fetch pools
    const fetchPools = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setPools(mockPools);
      } catch (error) {
        console.error("Error fetching pools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, [navigate]);

  useEffect(() => {
    // Filter pools based on search query and selected league
    let filtered = [...pools];
    
    if (searchQuery) {
      filtered = filtered.filter(pool => 
        pool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedLeague !== 'all') {
      filtered = filtered.filter(pool => pool.league === selectedLeague);
    }
    
    setFilteredPools(filtered);
  }, [pools, searchQuery, selectedLeague]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Betting Pools</h1>
              <p className="text-muted-foreground mt-1">Join pools and predict match outcomes</p>
            </div>
            
            <div className="w-full md:w-auto flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search pools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={selectedLeague} onValueChange={setSelectedLeague} className="w-full mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                All Pools
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
          </Tabs>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-72 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : filteredPools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredPools.map((pool) => (
                <PoolCard key={pool.id} pool={pool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium mb-2">No pools found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or check back later</p>
              {searchQuery && (
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pools;
