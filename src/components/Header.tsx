import { Search, Plus, Star, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function Header({ searchQuery, onSearchChange, viewMode, onViewModeChange }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5 text-background" />
          </div>
          <h1 className="text-xl font-bold gradient-text">RefLibrary</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по ключевым словам, тегам..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-muted border-border focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex border border-border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="px-3"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Add Reference Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="glow-neon bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Добавить референс
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border">
              <DropdownMenuItem className="hover:bg-muted">
                📁 Загрузить файл
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-muted">
                🔗 Вставить ссылку
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-muted">
                📱 Импорт из Instagram
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}