import { Trash2, Clock, FileText } from 'lucide-react';
import { Note } from '@/types/note';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NotesListProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
}

export const NotesList = ({ notes, selectedNote, onSelectNote, onDeleteNote }: NotesListProps) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  if (notes.length === 0) {
    return (
      <div className="w-80 border-r border-border bg-card flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
          <p>No notes found</p>
          <p className="text-sm">Create your first note to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-r border-border bg-card">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">
          {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
        </h2>
      </div>
      
      <div className="overflow-y-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            className={cn(
              "group relative border-b border-note-border cursor-pointer transition-colors",
              selectedNote?.id === note.id 
                ? "bg-accent" 
                : "hover:bg-hover-bg"
            )}
            onClick={() => onSelectNote(note)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">
                    {note.title || 'Untitled'}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {truncateContent(note.content)}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDate(note.updatedAt)}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(note.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};