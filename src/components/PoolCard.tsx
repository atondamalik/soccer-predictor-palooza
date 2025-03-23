
import { Link } from 'react-router-dom';
import { Pool } from '@/types';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, formatDate, getLeagueColor } from '@/lib/utils';
import { Trophy, Calendar, Users, Clock, ArrowRight, Zap } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface PoolCardProps {
  pool: Pool;
}

const PoolCard = ({ pool }: PoolCardProps) => {
  const isActive = pool.status === 'active';
  const isCompleted = pool.status === 'completed';
  
  return (
    <Card className="overflow-hidden hover-lift card-highlight border bg-card/50">
      <div className="relative">
        <div className="absolute top-0 right-0 m-3 z-10">
          <Badge 
            variant={
              isActive ? 'default' : 
              isCompleted ? 'secondary' : 
              'outline'
            }
            className={cn(
              isActive ? 'animate-pulse bg-accent' : '',
              "rounded-full px-3"
            )}
          >
            {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
          </Badge>
        </div>
        
        <div className="h-24 bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-between px-5">
          <Badge 
            variant="outline"
            className={cn(
              "font-medium border-0 bg-white/80 backdrop-blur-sm",
              getLeagueColor(pool.league)
            )}
          >
            {pool.league}
          </Badge>
          
          {isActive && (
            <span className="flex items-center gap-1 text-xs font-medium text-accent animate-pulse">
              <Zap size={14} className="text-accent" />
              Live Now
            </span>
          )}
        </div>
      </div>
      
      <CardContent className="p-5 pt-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{pool.name}</h3>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4 gap-2">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-primary" />
            {formatDate(pool.startDate)}
          </div>
          <span className="text-muted-foreground/40">•</span>
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-primary" />
            <span>{pool.matches.length} matches</span>
          </div>
        </div>

        <div className="flex gap-3 mb-5">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex-1 bg-secondary/50 rounded-lg p-3 flex flex-col items-center justify-center hover:bg-secondary/80 transition-colors cursor-help">
                <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Trophy size={12} className="text-primary" />
                  Jackpot
                </span>
                <span className="font-bold text-lg">{formatCurrency(pool.jackpot)}</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-60">
              <p className="text-sm">Win the entire jackpot by correctly predicting all {pool.matches.length} match outcomes!</p>
            </HoverCardContent>
          </HoverCard>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex-1 bg-secondary/50 rounded-lg p-3 flex flex-col items-center justify-center hover:bg-secondary/80 transition-colors cursor-help">
                <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Users size={12} className="text-primary" />
                  Entry Fee
                </span>
                <span className="font-bold text-lg">{formatCurrency(pool.entryFee)}</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-60">
              <p className="text-sm">This is the amount required to join this prediction pool.</p>
            </HoverCardContent>
          </HoverCard>
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
