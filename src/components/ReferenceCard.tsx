import { useState } from "react";
import { 
  Heart, 
  Download, 
  Share2, 
  ExternalLink, 
  Play,
  MoreHorizontal,
  Tag,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReferenceCardProps {
  id: string;
  title: string;
  imageUrl: string;
  isVideo?: boolean;
  source: string;
  date: string;
  tags: string[];
  isFavorited: boolean;
  onFavoriteToggle: (id: string) => void;
  onOpenDetail: (id: string) => void;
  viewMode: 'grid' | 'list';
}

export function ReferenceCard({
  id,
  title,
  imageUrl,
  isVideo = false,
  source,
  date,
  tags,
  isFavorited,
  onFavoriteToggle,
  onOpenDetail,
  viewMode
}: ReferenceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-card border border-border rounded-lg p-4 card-hover cursor-pointer"
        onClick={() => onOpenDetail(id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{source}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{date}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle(id);
              }}
              className={isFavorited ? 'text-neon-pink' : 'text-muted-foreground'}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem className="hover:bg-muted">
                  <Download className="w-4 h-4 mr-2" />
                  Скачать
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-muted">
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-muted">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Открыть источник
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden card-hover cursor-pointer group"
      onClick={() => onOpenDetail(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image/Video Preview */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Play className="w-8 h-8 text-white" />
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center space-x-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => e.stopPropagation()}
            className="bg-background/80 hover:bg-background"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => e.stopPropagation()}
            className="bg-background/80 hover:bg-background"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => e.stopPropagation()}
            className="bg-background/80 hover:bg-background"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(id);
          }}
          className={`absolute top-2 right-2 ${
            isFavorited ? 'text-neon-pink' : 'text-white'
          } hover:bg-black/20`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </Button>
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-medium text-foreground truncate mb-2">{title}</h3>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>{source}</span>
          <span>{date}</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}