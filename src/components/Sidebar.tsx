import { Plus, FileText, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/note';
import { cn } from '@/lib/utils';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onCreateNote: () => void;
}

export const Sidebar = ({ categories, selectedCategory, onCategorySelect, onCreateNote }: SidebarProps) => {
  return (
    <div className="w-64 bg-sidebar-bg border-r border-border flex flex-col">
      <div className="p-4">
        <Button onClick={onCreateNote} className="w-full bg-gradient-warm hover:opacity-90 shadow-soft">
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>
      
      <nav className="flex-1 px-2">
        <div className="space-y-1">
          <button
            onClick={() => onCategorySelect('all')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors",
              selectedCategory === 'all' 
                ? "bg-accent text-accent-foreground" 
                : "hover:bg-hover-bg"
            )}
          >
            <FileText className="h-4 w-4" />
            All Notes
          </button>
          
          <div className="pt-4">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Categories
            </h3>
            <div className="mt-2 space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategorySelect(category.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors",
                    selectedCategory === category.id 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-hover-bg"
                  )}
                >
                  <Tag 
                    className="h-4 w-4" 
                    style={{ color: category.color }}
                  />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};