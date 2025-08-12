import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ReferenceCard } from "./ReferenceCard";
import { ReferenceModal } from "./ReferenceModal";

// Mock data
const mockReferences = [
  {
    id: '1',
    title: 'Неоновая портретная фотография',
    imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop',
    isVideo: false,
    source: 'Instagram',
    sourceUrl: 'https://instagram.com/example',
    date: '2 дня назад',
    description: 'Потрясающая портретная съемка с использованием неонового освещения',
    tags: ['портрет', 'неон', 'фотография'],
    isFavorited: true
  },
  {
    id: '2',
    title: 'Минималистичный интерьер',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    isVideo: false,
    source: 'Загружен',
    sourceUrl: '#',
    date: '5 дней назад',
    description: 'Чистые линии и пространство в современном интерьере',
    tags: ['минимализм', 'интерьер', 'белый'],
    isFavorited: false
  },
  {
    id: '3',
    title: 'Уличная мода TikTok',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
    isVideo: true,
    source: 'Instagram',
    sourceUrl: 'https://instagram.com/example',
    date: '1 неделю назад',
    description: 'Трендовые образы уличной моды для социальных сетей',
    tags: ['мода', 'street-style', 'тренды'],
    isFavorited: true
  },
  {
    id: '4',
    title: 'Градиентный дизайн',
    imageUrl: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=400&fit=crop',
    isVideo: false,
    source: 'Ссылка',
    sourceUrl: 'https://dribbble.com/example',
    date: '3 дня назад',
    description: 'Красивые градиентные переходы в дизайне',
    tags: ['градиент', 'дизайн', 'яркие цвета'],
    isFavorited: false
  },
  {
    id: '5',
    title: 'Ночная архитектура',
    imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400&h=400&fit=crop',
    isVideo: false,
    source: 'Instagram',
    sourceUrl: 'https://instagram.com/example',
    date: '4 дня назад',
    description: 'Архитектурная фотография с ночным освещением',
    tags: ['архитектура', 'ночь', 'городской пейзаж'],
    isFavorited: false
  },
  {
    id: '6',
    title: 'Цветовая палитра природы',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    isVideo: false,
    source: 'Pinterest',
    sourceUrl: 'https://pinterest.com/example',
    date: '1 день назад',
    description: 'Естественная цветовая гамма из природных пейзажей',
    tags: ['природа', 'цветовая палитра', 'зеленый'],
    isFavorited: true
  }
];

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedReference, setSelectedReference] = useState<string | null>(null);
  const [references, setReferences] = useState(mockReferences);

  const handleFavoriteToggle = (id: string) => {
    setReferences(prev => 
      prev.map(ref => 
        ref.id === id ? { ...ref, isFavorited: !ref.isFavorited } : ref
      )
    );
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleUpdateTags = (id: string, tags: string[]) => {
    setReferences(prev => 
      prev.map(ref => 
        ref.id === id ? { ...ref, tags } : ref
      )
    );
  };

  const handleUpdateDescription = (id: string, description: string) => {
    setReferences(prev => 
      prev.map(ref => 
        ref.id === id ? { ...ref, description } : ref
      )
    );
  };

  // Filter references based on search, category, and tags
  const filteredReferences = references.filter(ref => {
    const matchesSearch = searchQuery === '' || 
      ref.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'favorites' && ref.isFavorited);
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => ref.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const selectedReferenceData = selectedReference 
    ? references.find(ref => ref.id === selectedReference)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <div className="flex">
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
        />
        
        <main className="flex-1 p-6 custom-scrollbar overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {selectedCategory === 'all' ? 'Все референсы' :
               selectedCategory === 'favorites' ? 'Избранное' :
               'Референсы'}
            </h2>
            <p className="text-muted-foreground">
              Найдено {filteredReferences.length} результатов
            </p>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredReferences.map((reference) => (
                <ReferenceCard
                  key={reference.id}
                  {...reference}
                  viewMode={viewMode}
                  onFavoriteToggle={handleFavoriteToggle}
                  onOpenDetail={setSelectedReference}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReferences.map((reference) => (
                <ReferenceCard
                  key={reference.id}
                  {...reference}
                  viewMode={viewMode}
                  onFavoriteToggle={handleFavoriteToggle}
                  onOpenDetail={setSelectedReference}
                />
              ))}
            </div>
          )}
          
          {filteredReferences.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg mb-2">
                Ничего не найдено
              </div>
              <p className="text-sm text-muted-foreground">
                Попробуйте изменить параметры поиска или фильтры
              </p>
            </div>
          )}
        </main>
      </div>
      
      <ReferenceModal
        isOpen={selectedReference !== null}
        onClose={() => setSelectedReference(null)}
        reference={selectedReferenceData}
        onFavoriteToggle={handleFavoriteToggle}
        onUpdateTags={handleUpdateTags}
        onUpdateDescription={handleUpdateDescription}
      />
    </div>
  );
}