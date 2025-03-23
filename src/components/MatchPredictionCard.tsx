
import { useState, useEffect } from "react";
import { Match, Prediction } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, getFormattedMatchTime, getMatchStatus } from "@/lib/utils";

interface MatchPredictionCardProps {
  match: Match;
  userPrediction?: Prediction;
  onSavePrediction: (matchId: string, homeScore: number, awayScore: number) => void;
  disabled?: boolean;
}

const MatchPredictionCard = ({
  match,
  userPrediction,
  onSavePrediction,
  disabled = false,
}: MatchPredictionCardProps) => {
  const [homeScore, setHomeScore] = useState<string>(
    userPrediction ? userPrediction.homeScore.toString() : ""
  );
  const [awayScore, setAwayScore] = useState<string>(
    userPrediction ? userPrediction.awayScore.toString() : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!userPrediction);

  const handleSubmit = async () => {
    if (isEditing) {
      if (homeScore === "" || awayScore === "") return;

      setIsLoading(true);
      try {
        await onSavePrediction(
          match.id,
          parseInt(homeScore),
          parseInt(awayScore)
        );
        setIsEditing(false);
      } catch (error) {
        console.error("Error saving prediction:", error);
      }
      setIsLoading(false);
    } else {
      setIsEditing(true);
    }
  };

  const isMatchStarted = new Date(match.matchTime) < new Date();

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md",
      isMatchStarted && "opacity-75"
    )}>
      <CardContent className="p-0">
        <div className="bg-gray-50 py-2 px-4 border-b">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-muted-foreground">
              {getFormattedMatchTime(match.matchTime)}
            </span>
            <span className={cn(
              "text-xs font-semibold",
              match.status === "live" && "text-red-500 animate-pulse",
              match.status === "finished" && "text-green-600"
            )}>
              {getMatchStatus(match)}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                {match.homeTeamLogo ? (
                  <img
                    src={match.homeTeamLogo}
                    alt={match.homeTeam}
                    className="w-6 h-6 object-contain image-fade-in loaded"
                  />
                ) : (
                  <span className="text-xs font-semibold">
                    {match.homeTeam.substring(0, 2)}
                  </span>
                )}
              </div>
              <span className="font-medium">{match.homeTeam}</span>
            </div>
            
            {isEditing ? (
              <Input
                type="number"
                value={homeScore}
                onChange={(e) => setHomeScore(e.target.value)}
                className="w-14 text-center"
                min="0"
                max="99"
                disabled={disabled || isLoading}
              />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md font-semibold">
                {userPrediction ? userPrediction.homeScore : "-"}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                {match.awayTeamLogo ? (
                  <img
                    src={match.awayTeamLogo}
                    alt={match.awayTeam}
                    className="w-6 h-6 object-contain image-fade-in loaded"
                  />
                ) : (
                  <span className="text-xs font-semibold">
                    {match.awayTeam.substring(0, 2)}
                  </span>
                )}
              </div>
              <span className="font-medium">{match.awayTeam}</span>
            </div>
            
            {isEditing ? (
              <Input
                type="number"
                value={awayScore}
                onChange={(e) => setAwayScore(e.target.value)}
                className="w-14 text-center"
                min="0"
                max="99"
                disabled={disabled || isLoading}
              />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md font-semibold">
                {userPrediction ? userPrediction.awayScore : "-"}
              </div>
            )}
          </div>

          {!disabled && (
            <Button
              onClick={handleSubmit}
              disabled={isLoading || isMatchStarted}
              className="w-full mt-3"
              variant={isEditing ? "default" : "outline"}
              size="sm"
            >
              {isLoading
                ? "Saving..."
                : isEditing
                ? "Save Prediction"
                : "Edit Prediction"}
            </Button>
          )}

          {match.status === "finished" && match.result && (
            <div className="mt-4 pt-3 border-t border-dashed border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-muted-foreground">Final Score:</span>
                <span className="font-bold">
                  {match.result.homeScore} - {match.result.awayScore}
                </span>
              </div>
              {userPrediction && userPrediction.points !== undefined && (
                <div className="flex justify-between items-center text-sm mt-1">
                  <span className="font-semibold text-muted-foreground">Points Earned:</span>
                  <span className={cn(
                    "font-bold",
                    userPrediction.points === 5 && "text-green-600",
                    userPrediction.points === 3 && "text-blue-600",
                    userPrediction.points === 2 && "text-amber-600",
                    userPrediction.points === 0 && "text-red-600",
                  )}>
                    {userPrediction.points}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchPredictionCard;
