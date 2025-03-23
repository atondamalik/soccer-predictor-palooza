
import { LeaderboardEntry } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { Trophy, Medal, Crown, Award } from 'lucide-react';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  title: string;
}

const LeaderboardTable = ({ entries, title }: LeaderboardTableProps) => {
  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b bg-secondary/40">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/60">
              <TableHead className="w-16 text-center">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-center">Points</TableHead>
              <TableHead className="text-center">Correct Scores</TableHead>
              <TableHead className="text-center">Correct Outcomes</TableHead>
              <TableHead className="text-center">Correct Ties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.userId} className={cn(
                "transition-colors",
                entry.rank === 1 && "bg-primary/5 hover:bg-primary/10",
                entry.rank === 2 && "bg-accent/5 hover:bg-accent/10",
                entry.rank === 3 && "bg-amber-50 hover:bg-amber-100"
              )}>
                <TableCell className="text-center font-medium">
                  {entry.rank === 1 && (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full shadow-sm">
                      <Crown size={16} />
                    </div>
                  )}
                  {entry.rank === 2 && (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-accent to-accent/80 text-white rounded-full shadow-sm">
                      <Medal size={16} />
                    </div>
                  )}
                  {entry.rank === 3 && (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-300 text-white rounded-full shadow-sm">
                      <Award size={16} />
                    </div>
                  )}
                  {entry.rank && entry.rank > 3 && <span>{entry.rank}</span>}
                </TableCell>
                <TableCell className="font-medium">{entry.username}</TableCell>
                <TableCell className="text-center font-bold text-primary">{entry.points}</TableCell>
                <TableCell className="text-center">{entry.correctScores}</TableCell>
                <TableCell className="text-center">{entry.correctOutcomes}</TableCell>
                <TableCell className="text-center">{entry.correctTies}</TableCell>
              </TableRow>
            ))}
            {entries.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No entries yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
