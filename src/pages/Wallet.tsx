
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WalletCard from '@/components/WalletCard';
import TransactionHistoryTable from '@/components/TransactionHistoryTable';
import { Transaction } from '@/types';
import { mockTransactions } from '@/lib/mockData';
import { getCurrentUser, isAuthenticated } from '@/lib/auth';
import { useToast } from "@/components/ui/use-toast";

const Wallet = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchWalletData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const user = getCurrentUser();
        
        if (user) {
          setBalance(user.wallet);
          
          // Filter transactions for current user
          const userTransactions = mockTransactions.filter(
            t => t.userId === user.id
          );
          setTransactions(userTransactions);
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [navigate]);

  const handleDeposit = async (amount: number): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = getCurrentUser();
    
    if (user) {
      const newBalance = user.wallet + amount;
      
      // Update user balance
      user.wallet = newBalance;
      localStorage.setItem('soccer_betting_current_user', JSON.stringify(user));
      
      // Add transaction
      const newTransaction: Transaction = {
        id: `t_${Date.now()}`,
        userId: user.id,
        amount: amount,
        type: 'deposit',
        status: 'completed',
        description: 'Wallet deposit',
        createdAt: new Date().toISOString(),
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setBalance(newBalance);
    }
  };

  const handleWithdraw = async (amount: number): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = getCurrentUser();
    
    if (user) {
      const newBalance = user.wallet - amount;
      
      if (newBalance < 0) {
        toast({
          title: "Insufficient funds",
          description: "You don't have enough funds to withdraw",
          variant: "destructive",
        });
        throw new Error("Insufficient funds");
      }
      
      // Update user balance
      user.wallet = newBalance;
      localStorage.setItem('soccer_betting_current_user', JSON.stringify(user));
      
      // Add transaction
      const newTransaction: Transaction = {
        id: `t_${Date.now()}`,
        userId: user.id,
        amount: -amount,
        type: 'withdrawal',
        status: 'completed',
        description: 'Wallet withdrawal',
        createdAt: new Date().toISOString(),
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setBalance(newBalance);
    }
  };

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto animate-fade-in">
          <h1 className="text-3xl font-bold mb-8">Your Wallet</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <WalletCard 
                balance={balance}
                onDeposit={handleDeposit}
                onWithdraw={handleWithdraw}
              />
            </div>
            
            <div className="lg:col-span-2">
              <TransactionHistoryTable transactions={transactions} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wallet;
