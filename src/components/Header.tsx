import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
          Notes
        </h1>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background border-note-border"
          />
        </div>
      </div>
    </header>
  );
};