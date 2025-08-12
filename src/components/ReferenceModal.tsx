import { useState } from "react";
import { 
  X, 
  Download, 
  ExternalLink, 
  Heart, 
  Share2, 
  Tag, 
  Play,
  Edit3,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  reference: {
    id: string;
    title: string;
    imageUrl: string;
    isVideo?: boolean;
    source: string;
    sourceUrl: string;
    date: string;
    description: string;
    tags: string[];
    isFavorited: boolean;
  } | null;
  onFavoriteToggle: (id: string) => void;
  onUpdateTags: (id: string, tags: string[]) => void;
  onUpdateDescription: (id: string, description: string) => void;
}

export function ReferenceModal({
  isOpen,
  onClose,
  reference,
  onFavoriteToggle,
  onUpdateTags,
  onUpdateDescription
}: ReferenceModalProps) {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(reference?.description || '');
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState(reference?.tags || []);

  if (!reference) return null;

  const handleSaveDescription = () => {
    onUpdateDescription(reference.id, description);
    setIsEditingDescription(false);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      onUpdateTags(reference.id, updatedTags);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    onUpdateTags(reference.id, updatedTags);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-card border-border p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Media Preview */}
          <div className="flex-1 bg-black/20 relative">
            <div className="relative w-full h-full min-h-[60vh] flex items-center justify-center">
              <img
                src={reference.imageUrl}
                alt={reference.title}
                className="max-w-full max-h-full object-contain"
              />
              
              {reference.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="bg-black/50 hover:bg-black/70">
                    <Play className="w-8 h-8" />
                  </Button>
                </div>
              )}
            </div>
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-black/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Info Panel */}
          <div className="w-96 bg-card border-l border-border flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {reference.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {reference.source} • {reference.date}
              </p>
            </div>
            
            {/* Actions */}
            <div className="p-6 border-b border-border">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFavoriteToggle(reference.id)}
                  className={reference.isFavorited ? 'text-neon-pink border-neon-pink' : ''}
                >
                  <Heart className={`w-4 h-4 mr-2 ${reference.isFavorited ? 'fill-current' : ''}`} />
                  {reference.isFavorited ? 'В избранном' : 'В избранное'}
                </Button>
                
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Скачать
                </Button>
                
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => window.open(reference.sourceUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Открыть в источнике
              </Button>
            </div>
            
            {/* Description */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">Описание</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingDescription(!isEditingDescription)}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
              
              {isEditingDescription ? (
                <div className="space-y-2">
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Добавить описание или заметки..."
                    className="bg-muted border-border"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleSaveDescription}>
                      Сохранить
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditingDescription(false)}
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {description || 'Добавить описание...'}
                </p>
              )}
            </div>
            
            {/* Tags */}
            <div className="p-6 flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-4 h-4" />
                <h3 className="font-medium text-foreground">Теги</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive/20"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Добавить тег..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="bg-muted border-border"
                />
                <Button size="sm" onClick={handleAddTag}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}