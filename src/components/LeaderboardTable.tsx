
import { LeaderboardEntry } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  title: string;
}

const LeaderboardTable = ({ entries, title }: LeaderboardTableProps) => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
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
                entry.rank === 1 && "bg-amber-50",
                entry.rank === 2 && "bg-gray-50",
                entry.rank === 3 && "bg-orange-50"
              )}>
                <TableCell className="text-center font-medium">
                  {entry.rank === 1 && (
                    <div className="inline-flex items-center justify-center w-7 h-7 bg-amber-500 text-white rounded-full">
                      <Trophy size={14} />
                    </div>
                  )}
                  {entry.rank === 2 && (
                    <div className="inline-flex items-center justify-center w-7 h-7 bg-gray-400 text-white rounded-full">
                      <Trophy size={14} />
                    </div>
                  )}
                  {entry.rank === 3 && (
                    <div className="inline-flex items-center justify-center w-7 h-7 bg-orange-400 text-white rounded-full">
                      <Trophy size={14} />
                    </div>
                  )}
                  {entry.rank && entry.rank > 3 && <span>{entry.rank}</span>}
                </TableCell>
                <TableCell className="font-medium">{entry.username}</TableCell>
                <TableCell className="text-center font-bold">{entry.points}</TableCell>
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
