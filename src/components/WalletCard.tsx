
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from '@/lib/utils';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface WalletCardProps {
  balance: number;
  onDeposit: (amount: number) => Promise<void>;
  onWithdraw: (amount: number) => Promise<void>;
}

const WalletCard = ({ balance, onDeposit, onWithdraw }: WalletCardProps) => {
  const [amount, setAmount] = useState<string>('');
  const [isDepositing, setIsDepositing] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleTransaction = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    const numAmount = parseFloat(amount);
    
    if (!isDepositing && numAmount > balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough funds to withdraw",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (isDepositing) {
        await onDeposit(numAmount);
        toast({
          title: "Deposit successful",
          description: `${formatCurrency(numAmount)} has been added to your wallet`,
        });
      } else {
        await onWithdraw(numAmount);
        toast({
          title: "Withdrawal successful",
          description: `${formatCurrency(numAmount)} has been withdrawn from your wallet`,
        });
      }
      setAmount('');
    } catch (error) {
      toast({
        title: "Transaction failed",
        description: "There was an error processing your transaction",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Wallet className="h-6 w-6" />
          Your Wallet
        </CardTitle>
        <CardDescription>Manage your deposits and withdrawals</CardDescription>
        <div className="mt-4 bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl">
          <div className="text-sm text-muted-foreground">Current Balance</div>
          <div className="text-3xl font-bold mt-1">{formatCurrency(balance)}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            variant={isDepositing ? "default" : "outline"} 
            className="flex-1 gap-1"
            onClick={() => setIsDepositing(true)}
          >
            <TrendingUp size={16} />
            Deposit
          </Button>
          <Button 
            variant={!isDepositing ? "default" : "outline"} 
            className="flex-1 gap-1"
            onClick={() => setIsDepositing(false)}
          >
            <TrendingDown size={16} />
            Withdraw
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1"
              min="0"
              step="0.01"
            />
            <Button 
              onClick={handleTransaction} 
              disabled={isLoading || !amount}
              className="whitespace-nowrap"
            >
              {isLoading ? "Processing..." : isDepositing ? "Deposit Funds" : "Withdraw Funds"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
