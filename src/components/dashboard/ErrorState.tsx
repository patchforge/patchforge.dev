import { AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
        <AlertTriangle size={24} />
      </div>
      <h3 className="font-display text-lg font-semibold text-white">Error</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-sm">{message}</p>
      {onRetry && (
        <div className="mt-6">
          <Button size="sm" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
