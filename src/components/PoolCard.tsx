
import { Link } from 'react-router-dom';
import { Pool } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, formatDate, getLeagueColor } from '@/lib/utils';
import { Trophy, Calendar, Users } from 'lucide-react';

interface PoolCardProps {
  pool: Pool;
}

const PoolCard = ({ pool }: PoolCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-300 hover-lift">
      <CardHeader className="relative pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge 
              className={cn(
                "mb-2",
                getLeagueColor(pool.league),
                "text-white"
              )}
            >
              {pool.league}
            </Badge>
            <CardTitle className="text-xl">{pool.name}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(pool.startDate)}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge 
              variant={
                pool.status === 'upcoming' ? 'outline' : 
                pool.status === 'active' ? 'default' : 
                'secondary'
              }
              className={
                pool.status === 'active' ? 'animate-pulse' : ''
              }
            >
              {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {pool.matches.length} matches
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-2">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Trophy size={12} />
              Jackpot
            </span>
            <span className="font-bold text-lg">{formatCurrency(pool.jackpot)}</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Users size={12} />
              Entry Fee
            </span>
            <span className="font-bold text-lg">{formatCurrency(pool.entryFee)}</span>
          </div>
        </div>
        
        <Link to={`/pools/${pool.id}`}>
          <Button className="w-full" size="sm">
            {pool.status === 'upcoming' ? 'Join Pool' : 'View Details'}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PoolCard;
