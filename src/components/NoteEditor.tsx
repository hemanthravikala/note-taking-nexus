import { useState, useEffect } from 'react';
import { Edit3, Save, X, Tag } from 'lucide-react';
import { Note, Category } from '@/types/note';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NoteEditorProps {
  note: Note | null;
  categories: Category[];
  isEditing: boolean;
  onEdit: () => void;
  onSave: (title: string, content: string, category: string) => void;
  onCancel: () => void;
}

export const NoteEditor = ({ note, categories, isEditing, onEdit, onSave, onCancel }: NoteEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('personal');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
    }
  }, [note]);

  const handleSave = () => {
    onSave(title, content, category);
  };

  const handleCancel = () => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
    }
    onCancel();
  };

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-note-bg">
        <div className="text-center text-muted-foreground">
          <Edit3 className="mx-auto h-16 w-16 mb-4 opacity-30" />
          <h3 className="text-lg font-medium mb-2">No note selected</h3>
          <p>Select a note from the list or create a new one to start writing</p>
        </div>
      </div>
    );
  }

  const selectedCategory = categories.find(cat => cat.id === category);

  if (isEditing) {
    return (
      <div className="flex-1 flex flex-col bg-note-bg">
        <div className="border-b border-note-border bg-card p-4">
          <div className="flex items-center gap-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title..."
              className="flex-1 font-medium text-lg border-0 bg-transparent px-0 focus-visible:ring-0"
            />
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center gap-2">
                      <Tag className="h-3 w-3" style={{ color: cat.color }} />
                      {cat.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm" className="bg-gradient-warm hover:opacity-90">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your note..."
            className="w-full h-full resize-none border-0 bg-transparent text-base leading-relaxed focus-visible:ring-0 p-0"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-note-bg">
      <div className="border-b border-note-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground">
              {note.title || 'Untitled'}
            </h1>
            {selectedCategory && (
              <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-accent">
                <Tag className="h-3 w-3" style={{ color: selectedCategory.color }} />
                <span className="text-xs font-medium">{selectedCategory.name}</span>
              </div>
            )}
          </div>
          
          <Button onClick={onEdit} variant="outline" size="sm">
            <Edit3 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
        
        <div className="mt-2 text-sm text-muted-foreground">
          Last updated: {note.updatedAt.toLocaleDateString()} at {note.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="prose prose-sm max-w-none">
          {content ? (
            <div className="whitespace-pre-wrap text-base leading-relaxed text-foreground">
              {content}
            </div>
          ) : (
            <div className="text-muted-foreground italic">
              This note is empty. Click "Edit" to add content.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};