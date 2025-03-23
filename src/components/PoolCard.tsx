
import { Link } from 'react-router-dom';
import { Pool } from '@/types';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, formatDate, getLeagueColor } from '@/lib/utils';
import { Trophy, Calendar, Users, Clock, ArrowRight } from 'lucide-react';

interface PoolCardProps {
  pool: Pool;
}

const PoolCard = ({ pool }: PoolCardProps) => {
  return (
    <Card className="overflow-hidden card-hover border-0 shadow-sm">
      <div className={cn(
        "h-2 w-full",
        getLeagueColor(pool.league),
      )} />
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Badge 
            variant="outline"
            className={cn(
              "mb-2",
              getLeagueColor(pool.league),
              "bg-opacity-10 font-medium"
            )}
          >
            {pool.league}
          </Badge>
          <Badge 
            variant={
              pool.status === 'upcoming' ? 'outline' : 
              pool.status === 'active' ? 'default' : 
              'secondary'
            }
            className={cn(
              pool.status === 'active' ? 'animate-pulse' : '',
              "rounded-full px-3"
            )}
          >
            {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
          </Badge>
        </div>

        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{pool.name}</h3>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4 gap-1.5">
          <Calendar size={14} className="text-primary" />
          {formatDate(pool.startDate)}
          <span className="mx-1">•</span>
          <Clock size={14} className="text-primary" />
          <span className="text-sm">{pool.matches.length} matches</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-lg p-3 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Trophy size={12} className="text-primary" />
              Jackpot
            </span>
            <span className="font-bold text-lg">{formatCurrency(pool.jackpot)}</span>
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-lg p-3 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Users size={12} className="text-primary" />
              Entry Fee
            </span>
            <span className="font-bold text-lg">{formatCurrency(pool.entryFee)}</span>
          </div>
        </div>
        
        <Link to={`/pools/${pool.id}`} className="block w-full">
          <Button 
            className="w-full group" 
            size="sm"
            variant={pool.status === 'upcoming' ? 'default' : 'outline'}
          >
            {pool.status === 'upcoming' ? 'Join Pool' : 'View Details'}
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PoolCard;
