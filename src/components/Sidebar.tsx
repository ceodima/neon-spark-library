import { useState } from "react";
import { 
  Video, 
  Palette, 
  MapPin, 
  Camera, 
  Star, 
  Calendar,
  Tag,
  Filter,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const categories = [
  { id: 'all', name: 'Все референсы', icon: Star, count: 156 },
  { id: 'video-ideas', name: 'Идеи для видео', icon: Video, count: 42 },
  { id: 'color-palettes', name: 'Цветовые палитры', icon: Palette, count: 28 },
  { id: 'locations', name: 'Локации', icon: MapPin, count: 34 },
  { id: 'composition', name: 'Композиция', icon: Camera, count: 52 },
];

const tags = [
  'минимализм', 'яркие цвета', 'портрет', 'природа', 'архитектура',
  'street-style', 'винтаж', 'неон', 'черно-белое', 'градиент'
];

export function Sidebar({ selectedCategory, onCategoryChange, selectedTags, onTagToggle }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    filters: true,
    tags: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="w-80 bg-card border-r border-border h-screen custom-scrollbar overflow-y-auto">
      <div className="p-6 space-y-6">
        
        {/* Категории */}
        <div>
          <Button
            variant="ghost"
            onClick={() => toggleSection('categories')}
            className="w-full justify-between p-0 h-auto text-left"
          >
            <h3 className="font-semibold text-foreground">Категории</h3>
            {expandedSections.categories ? 
              <ChevronDown className="w-4 h-4" /> : 
              <ChevronRight className="w-4 h-4" />
            }
          </Button>
          
          {expandedSections.categories && (
            <div className="mt-3 space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                
                return (
                  <Button
                    key={category.id}
                    variant={isSelected ? "secondary" : "ghost"}
                    onClick={() => onCategoryChange(category.id)}
                    className={`w-full justify-between text-left ${
                      isSelected ? 'bg-primary/10 text-primary border-primary/20' : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
                      <span>{category.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        <Separator className="bg-border" />

        {/* Фильтры */}
        <div>
          <Button
            variant="ghost"
            onClick={() => toggleSection('filters')}
            className="w-full justify-between p-0 h-auto text-left"
          >
            <h3 className="font-semibold text-foreground flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Фильтры</span>
            </h3>
            {expandedSections.filters ? 
              <ChevronDown className="w-4 h-4" /> : 
              <ChevronRight className="w-4 h-4" />
            }
          </Button>
          
          {expandedSections.filters && (
            <div className="mt-3 space-y-3">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  По дате
                </label>
                <select className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm">
                  <option>Все время</option>
                  <option>Сегодня</option>
                  <option>Эта неделя</option>
                  <option>Этот месяц</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Источник
                </label>
                <select className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm">
                  <option>Все источники</option>
                  <option>Instagram</option>
                  <option>Загруженные файлы</option>
                  <option>Ссылки</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <Separator className="bg-border" />

        {/* Теги */}
        <div>
          <Button
            variant="ghost"
            onClick={() => toggleSection('tags')}
            className="w-full justify-between p-0 h-auto text-left"
          >
            <h3 className="font-semibold text-foreground flex items-center space-x-2">
              <Tag className="w-4 h-4" />
              <span>Теги</span>
            </h3>
            {expandedSections.tags ? 
              <ChevronDown className="w-4 h-4" /> : 
              <ChevronRight className="w-4 h-4" />
            }
          </Button>
          
          {expandedSections.tags && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <Badge
                      key={tag}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground glow-neon' 
                          : 'hover:bg-muted border-border'
                      }`}
                      onClick={() => onTagToggle(tag)}
                    >
                      {tag}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <Separator className="bg-border" />

        {/* Избранное */}
        <div>
          <Button
            variant="ghost"
            onClick={() => onCategoryChange('favorites')}
            className={`w-full justify-start text-left ${
              selectedCategory === 'favorites' 
                ? 'bg-primary/10 text-primary' 
                : 'hover:bg-muted'
            }`}
          >
            <Star className="w-4 h-4 mr-3" />
            Избранное
            <Badge variant="outline" className="ml-auto">
              23
            </Badge>
          </Button>
        </div>
      </div>
    </aside>
  );
}