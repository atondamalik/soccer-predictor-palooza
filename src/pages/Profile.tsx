
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MatchPredictionCard from '@/components/MatchPredictionCard';
import TransactionHistoryTable from '@/components/TransactionHistoryTable';
import { User, Prediction, Match, Transaction } from '@/types';
import { mockPredictions, mockMatches, mockTransactions } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { getCurrentUser, isAuthenticated, logout } from '@/lib/auth';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userPredictions, setUserPredictions] = useState<Prediction[]>([]);
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);
  const [userMatches, setUserMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const currentUser = getCurrentUser();
    if (!isAuthenticated() || !currentUser) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setUser(currentUser);
        setUsername(currentUser.username);
        setEmail(currentUser.email);
        
        // Filter data for current user
        if (currentUser) {
          // Get user predictions
          const predictions = mockPredictions.filter(p => p.userId === currentUser.id);
          setUserPredictions(predictions);
          
          // Get matches for user predictions
          const matchIds = predictions.map(p => p.matchId);
          const matches = mockMatches.filter(m => matchIds.includes(m.id));
          setUserMatches(matches);
          
          // Get user transactions
          const transactions = mockTransactions.filter(t => t.userId === currentUser.id);
          setUserTransactions(transactions);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user data
    const updatedUser: User = {
      ...user,
      username,
      email,
    };
    
    localStorage.setItem('soccer_betting_current_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated",
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading || !user) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto animate-fade-in">
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Info Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="text-2xl bg-primary text-white">
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {editMode ? (
                    <div className="space-y-4">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <CardTitle className="text-xl">{user.username}</CardTitle>
                      <CardDescription className="text-sm">{user.email}</CardDescription>
                    </>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {!editMode && (
                      <>
                        <div>
                          <div className="mb-2 text-sm text-muted-foreground">Account Status</div>
                          {user.isAdmin ? (
                            <Badge className="bg-amber-600">Admin</Badge>
                          ) : (
                            <Badge>Member</Badge>
                          )}
                        </div>
                        <div>
                          <div className="mb-2 text-sm text-muted-foreground">Member Since</div>
                          <div>{formatDate(user.createdAt)}</div>
                        </div>
                        <div>
                          <div className="mb-2 text-sm text-muted-foreground">Wallet Balance</div>
                          <div className="font-semibold text-lg">{formatCurrency(user.wallet)}</div>
                        </div>
                      </>
                    )}
                    
                    <div className="pt-4 space-y-2">
                      {editMode ? (
                        <>
                          <Button 
                            className="w-full" 
                            onClick={handleUpdateProfile}
                          >
                            Save Changes
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => setEditMode(false)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => setEditMode(true)}
                          >
                            Edit Profile
                          </Button>
                          <Button 
                            variant="destructive" 
                            className="w-full" 
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="predictions">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="predictions">My Predictions</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="predictions">
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Your Recent Predictions</h2>
                    
                    {userPredictions.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userMatches.map((match) => {
                          const prediction = userPredictions.find(p => p.matchId === match.id);
                          if (!prediction) return null;
                          
                          return (
                            <MatchPredictionCard
                              key={match.id}
                              match={match}
                              userPrediction={prediction}
                              onSavePrediction={() => {}}
                              disabled={true}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">No predictions yet</h3>
                        <p className="text-muted-foreground mb-6">Join a pool to start making predictions</p>
                        <Button asChild>
                          <Button onClick={() => navigate('/pools')}>Browse Pools</Button>
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="transactions">
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Transaction History</h2>
                    
                    {userTransactions.length > 0 ? (
                      <TransactionHistoryTable transactions={userTransactions} />
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
                        <p className="text-muted-foreground mb-6">Your transaction history will appear here</p>
                        <Button asChild>
                          <Button onClick={() => navigate('/wallet')}>Go to Wallet</Button>
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="stats">
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Your Statistics</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Total Predictions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">{userPredictions.length}</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Pools Entered</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">
                            {Math.ceil(userPredictions.length / 5) || 0}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Total Points</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">
                            {userPredictions.reduce((sum, pred) => sum + (pred.points || 0), 0)}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Prediction Accuracy</CardTitle>
                        <CardDescription>How accurate your predictions have been</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Correct Scores</span>
                              <span className="text-sm font-medium">
                                {userPredictions.filter(p => p.points === 5).length} of {userPredictions.length}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-600 rounded-full"
                                style={{ 
                                  width: `${(userPredictions.filter(p => p.points === 5).length / Math.max(userPredictions.length, 1)) * 100}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Correct Ties</span>
                              <span className="text-sm font-medium">
                                {userPredictions.filter(p => p.points === 3).length} of {userPredictions.length}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-600 rounded-full"
                                style={{ 
                                  width: `${(userPredictions.filter(p => p.points === 3).length / Math.max(userPredictions.length, 1)) * 100}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Correct Outcomes</span>
                              <span className="text-sm font-medium">
                                {userPredictions.filter(p => p.points === 2).length} of {userPredictions.length}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-amber-600 rounded-full"
                                style={{ 
                                  width: `${(userPredictions.filter(p => p.points === 2).length / Math.max(userPredictions.length, 1)) * 100}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
