// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import TagFilter from './components/TagFilter/TagFilter';
import InstructionList from './components/InstructionList/InstructionList';
import ReferencesSection from './components/ReferencesSection/ReferencesSection';
import SelectedInstructionModal from './components/SelectedInstructionModal/SelectedInstructionModal';
import Footer from './components/Footer/Footer';
import instructions from './data/instructions.json';
import references from './data/references.json'; // Updated import path
import axios from 'axios';
import { load } from 'cheerio';
import debounce from 'lodash.debounce';
import TopInstructions from './components/TopInstructions';
import {
  loadStoredState,
  saveDarkMode,
  saveInstructionUsageStats,
  saveToolUsageStats,
  saveReferencesData,
  loadReferencesData,
  saveFavoriteInstructions
} from './utils/localStorage';

const PAGE_SIZE = 20; // Number of instructions to load at a time

const App = () => {
  const storedState = loadStoredState();
  const [isDarkMode, setIsDarkMode] = useState(storedState.darkMode);
  const [usageStats, setUsageStats] = useState(storedState.instructionUsageStats);
  const [toolUsageStats, setToolUsageStats] = useState(storedState.toolUsageStats);
  const [favoriteInstructions, setFavoriteInstructions] = useState(storedState.favoriteInstructions);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [visibleInstructions, setVisibleInstructions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedInstruction, setSelectedInstruction] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [referencesData, setReferencesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showHero, setShowHero] = useState(true);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    saveDarkMode(newMode);
  };

  // Extract all unique tags from instructions
  const allTags = [...new Set(instructions.flatMap((instruction) => instruction.tags || []))];

  // Calculate the number of instructions for each tag
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = instructions.filter((instruction) => (instruction.tags || []).includes(tag)).length;
    return acc;
  }, {});

  // Sort tags by popularity (number of instructions)
  const sortedTags = allTags.sort((a, b) => tagCounts[b] - tagCounts[a]);

  // Number of tags to show initially
  const INITIAL_TAGS_TO_SHOW = 10;

  // Slice the sorted tags array based on whether "Show More" is clicked
  const visibleTags = showAllTags ? sortedTags : sortedTags.slice(0, INITIAL_TAGS_TO_SHOW);

  // Calculate the total number of instructions
  const totalInstructions = instructions.length;

  // Group instructions by category
  const groupedInstructions = instructions.reduce((acc, instruction) => {
    const category = instruction.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(instruction);
    return acc;
  }, {});

  // Add icons for each category
  const categoryIcons = {};
  Object.keys(groupedInstructions).forEach(category => {
    categoryIcons[category] = "📁";  // Default icon for categories
  });

  // Filter instructions based on search query and selected tags
  const filterInstructions = useCallback(() => {
    return instructions.filter((instruction) => {
      const category = instruction.category || '';
      const subcategories = instruction.subcategories || [];
      const content = instruction.content || '';

      // Check if favorites filter is active
      if (selectedTags.includes('favorites') && !favoriteInstructions.includes(instruction.filename)) {
        return false;
      }

      const matchesSearch =
        category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subcategories.some((subcategory) =>
          subcategory.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => tag === 'favorites' || (instruction.tags || []).includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags, favoriteInstructions]);

  // Load more instructions for infinite scroll
  const loadMoreInstructions = () => {
    const filtered = selectedCategory ? groupedInstructions[selectedCategory] : filterInstructions();
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * PAGE_SIZE;
    const newInstructions = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    setVisibleInstructions((prev) => [...prev, ...newInstructions]);
    setPage(nextPage);
    setHasMore(startIndex + PAGE_SIZE < filtered.length);
  };

  // Debounced search handler
  const handleSearch = debounce((searchQuery) => {
    // If searchQuery is an array, join it into a string
    const query = Array.isArray(searchQuery) ? searchQuery.join(" ") : searchQuery;
    setSearchQuery(query);
    setPage(1);
    setVisibleInstructions([]);
    setHasMore(true);
  }, 300);

  // Reset visible instructions when search or tags change
  useEffect(() => {
    const filtered = filterInstructions();
    setVisibleInstructions(filtered.slice(0, PAGE_SIZE));
    setPage(1);
    setHasMore(filtered.length > PAGE_SIZE);
  }, [searchQuery, selectedTags, filterInstructions]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setVisibleInstructions(groupedInstructions[category].slice(0, PAGE_SIZE));
    setPage(1);
    setHasMore(groupedInstructions[category].length > PAGE_SIZE);
  };

  // Handle back to category view
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setVisibleInstructions(filterInstructions().slice(0, PAGE_SIZE));
    setPage(1);
    setHasMore(filterInstructions().length > PAGE_SIZE);
  };

  // Toggle a tag in the selected tags list
  const handleTagToggle = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(selectedInstruction.content).then(() => {
      setIsCopied(true); // Set copied state to true
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  // Handle starting a conversation with a selected website
  const handleStartConversation = (website, instructionContent) => {
    // Update AI tool usage stat
    setToolUsageStats((prevStats) => {
      const newStats = {
        ...prevStats,
        [website]: (prevStats[website] || 0) + 1,
      };
      saveToolUsageStats(newStats);
      return newStats;
    });

    // Copy the system instruction to the clipboard
    navigator.clipboard.writeText(instructionContent).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });

    // Find the tool URL from ai-tools.json
    const predefinedTool = aiTools.tools.find(tool => tool.name === website);

    let url = '';
    if (predefinedTool) {
      url = predefinedTool.url;
    } else {
      return;
    }

    window.open(url, '_blank');
  };

  // Add new handler for quick action
  const handleQuickAction = (instruction) => {
    // Determine the top AI tool (from aiTools)
    const stats = JSON.parse(localStorage.getItem('toolUsageStats')) || {};
    const allTools = aiTools.tools;
    let maxUsage = -1;
    allTools.forEach(tool => {
      const usage = stats[tool.name] || 0;
      if (usage > maxUsage) maxUsage = usage;
    });
    const candidates = allTools.filter(tool => (stats[tool.name] || 0) === maxUsage);
    if (candidates.length === 0) return;
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const topTool = candidates[randomIndex];

    // Update tool usage stat
    setToolUsageStats((prevStats) => {
      const newStats = { ...prevStats, [topTool.name]: (prevStats[topTool.name] || 0) + 1 };
      saveToolUsageStats(newStats);
      return newStats;
    });

    // Copy the instruction content to clipboard and then open the tool's URL
    navigator.clipboard.writeText(instruction.content).then(() => {
      const predefinedTool = aiTools.tools.find(tool => tool.name === topTool.name);
      let url = '';
      if (predefinedTool) {
        url = predefinedTool.url;
      }
      if (url) {
        window.open(url, '_blank');
      }
    });
  };

  // Optimized reference data fetching
  useEffect(() => {
    const fetchReferences = async () => {
      const cachedData = loadReferencesData();
      const newReferencesData = [];
      // Iterate over each reference item, supporting both string and object types
      for (const ref of references) {
        const actualUrl = typeof ref === 'object' ? ref.url : ref; // use ref.url if ref is an object
        if (cachedData[actualUrl]) {
          newReferencesData.push(cachedData[actualUrl]);
          continue;
        }
        try {
          const proxyUrl = `https://corsproxy.io/${actualUrl}`;
          const response = await axios.get(proxyUrl);
          const $ = load(response.data);
          const title = $('title').text().split('|')[0].trim() || 'No Title';
          let description = $('meta[name="description"]').attr('content');
          if (!description) {
            const firstPara = $('p').first().text();
            const sentences = firstPara.match(/[^.!?]+[.!?]+/g) || [];
            description = sentences.slice(0, 2).join(' ').trim();
          }
          const source = new URL(actualUrl).hostname
            .replace('www.', '')
            .split('.')
            .slice(0, -1)
            .join('.');
          const referenceData = {
            title,
            description: description || 'No description available.',
            url: actualUrl,
            source
          };
          cachedData[actualUrl] = referenceData;
          newReferencesData.push(referenceData);
        } catch (error) {
          console.error(`Error fetching data from ${actualUrl}:`, error);
          const errorData = {
            title: 'Error loading resource',
            description: 'Unable to fetch content. Please check the original source.',
            url: actualUrl,
            source: new URL(actualUrl).hostname.replace('www.', '')
          };
          cachedData[actualUrl] = errorData;
          newReferencesData.push(errorData);
        }
      }
      saveReferencesData(cachedData);
      setReferencesData(newReferencesData);
    };
    fetchReferences();
  }, []);

  // Enhanced URL parameter handling
  useEffect(() => {
    const handleUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      const sharedInstructionName = params.get('instruction');

      if (sharedInstructionName) {
        const instructionToShow = instructions.find(p => p.filename === decodeURIComponent(sharedInstructionName));
        if (instructionToShow) {
          setSelectedInstruction(instructionToShow);
        }
      }
    };

    // Handle initial load and browser back/forward
    handleUrlParams();
    window.addEventListener('popstate', handleUrlParams);

    return () => window.removeEventListener('popstate', handleUrlParams);
  }, []);

  // Update URL when modal opens/closes
  useEffect(() => {
    const url = new URL(window.location);

    if (selectedInstruction) {
      url.searchParams.set('instruction', encodeURIComponent(selectedInstruction.filename));
    } else {
      url.searchParams.delete('instruction');
    }

    // Only update if URL actually changed to avoid unnecessary history entries
    if (url.toString() !== window.location.href) {
      window.history.pushState({}, '', url);
    }
  }, [selectedInstruction]);

  // Handle modal close via browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (!new URLSearchParams(window.location.search).has('instruction')) {
        setSelectedInstruction(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL with selected filters - move outside component or memoize
  const updateUrlWithFilters = useCallback(() => {
    if (!window.history.pushState) return; // Guard against SSR

    const url = new URL(window.location);
    if (selectedTags.length > 0) {
      url.searchParams.set('tags', selectedTags.join(','));
    } else {
      url.searchParams.delete('tags');
    }

    // Only update if URL actually changed
    if (url.toString() !== window.location.href) {
      window.history.pushState({}, '', url);
    }
  }, [selectedTags]);

  // Separate effect for URL updates and hero visibility
  useEffect(() => {
    updateUrlWithFilters();
  }, [selectedTags, updateUrlWithFilters]);

  // Separate effect for hero visibility
  useEffect(() => {
    setShowHero(!selectedCategory && selectedTags.length === 0);
  }, [selectedCategory, selectedTags]);

  // Handle initial URL params - only run once on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    const tagsParam = params.get('tags');

    if (categoryParam && groupedInstructions[categoryParam]) {
      setSelectedCategory(categoryParam);
      setVisibleInstructions(groupedInstructions[categoryParam].slice(0, PAGE_SIZE) || []);
    }

    if (tagsParam) {
      const tags = tagsParam.split(',');
      setSelectedTags(tags);
    }
  }, []); // Removed [groupedInstructions]

  // Determine whether to show the category list or filtered instructions
  const showCategoryList = !searchQuery && selectedTags.length === 0 && !selectedCategory;

  const getFilterShareContent = () => {
    if (selectedTags.length === 0) return '';
    return `Check out these instructions with tags: ${selectedTags.join(', ')} from The Instruction Collection`;
  };

  // Get total number of filtered instructions
  const getTotalFilteredInstructions = useCallback(() => {
    if (selectedCategory) {
      return groupedInstructions[selectedCategory]?.length || 0;
    }
    return filterInstructions().length;
  }, [selectedCategory, filterInstructions, groupedInstructions]);

  // Helper function that increments the count of an instruction and updates localStorage
  const handleSelectInstruction = (instruction) => {
    setUsageStats((prevStats) => {
      const newStats = {
        ...prevStats,
        [instruction.filename]: (prevStats[instruction.filename] || 0) + 1,
      };
      saveInstructionUsageStats(newStats);
      return newStats;
    });
    setSelectedInstruction(instruction);
  };

  // Compute top 5 frequently used instructions from usageStats
  const topInstructions = Object.entries(usageStats)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([filename, count]) => {
      const instruction = instructions.find(p => p.filename === filename);
      return instruction ? { ...instruction, usageCount: count } : null;
    })
    .filter(instruction => instruction);

  const handleToggleFavorite = (instruction) => {
    setFavoriteInstructions((prev) => {
      const isFavorite = prev.includes(instruction.filename);
      const newFavorites = isFavorite
        ? prev.filter(filename => filename !== instruction.filename)
        : [...prev, instruction.filename];
      saveFavoriteInstructions(newFavorites);
      return newFavorites;
    });
  };

  // Get favorite instructions data - updated to sort by usage count
  const favoritesData = favoriteInstructions
    .map(filename => {
      const instruction = instructions.find(p => p.filename === filename);
      return instruction ? { ...instruction, usageCount: usageStats[filename] || 0 } : null;
    })
    .filter(instruction => instruction)
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)) // Sort by usage count
    .slice(0, 5);  // Take only top 5

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

        {showHero && (
          <div className="flex flex-col items-center justify-center py-16 space-y-8">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Awesome Github Copilot Instruction
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Explore curated, custom instructions that empower your coding and AI interactions.
              </p>
            </div>
          </div>
        )}

        {/* Search and Filters Section - Show search only when no filters are active */}
        <div className={`flex flex-col items-center justify-center ${showHero ? '' : 'py-2'} ${selectedTags.length > 0 ? 'space-y-2' : 'space-y-4'}`}>
          {(!selectedCategory && selectedTags.length === 0) && (
            <div className="w-full max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          )}

          <div className="w-full mx-auto space-y-0">  {/* reduced spacing from space-y-1 to space-y-0 */}
            <TagFilter
              tags={visibleTags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              showAllTags={showAllTags}
              onToggleShowAllTags={() => setShowAllTags(!showAllTags)}
              tagCounts={tagCounts}
              showShareButton={!showHero}
              shareContent={getFilterShareContent()}
              shareTitle="Filtered Instructions - The Instruction Collection"
              favoriteInstructions={favoriteInstructions}
            />
            {/* Extracted Top Instructions Section remains unchanged */}
            {showHero && (
              <TopInstructions
                topInstructions={topInstructions}
                favoriteInstructions={favoritesData}
                handleSelectInstruction={handleSelectInstruction}
                onRemoveFavorite={(instruction) => handleToggleFavorite(instruction)}
              />
            )}
          </div>
        </div>

        {/* Instructions List with full width */}
        <div className={`w-full ${(!showHero && (selectedCategory || selectedTags.length > 0)) ? 'mt-1' : 'mt-4'}`}>
          <InstructionList
            instructions={visibleInstructions}
            loadMoreInstructions={loadMoreInstructions}
            hasMore={hasMore}
            onSelectInstruction={handleSelectInstruction}
            onQuickAction={handleQuickAction} // pass quick action handler
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
            onBackToCategories={handleBackToCategories}
            groupedInstructions={groupedInstructions}
            categoryIcons={categoryIcons}  // <-- new prop for icons
            showCategoryList={showCategoryList}
            totalInstructions={totalInstructions}
            totalFilteredInstructions={getTotalFilteredInstructions()}
          />
        </div>

        <ReferencesSection referencesData={referencesData} />
        {selectedInstruction && (
          <SelectedInstructionModal
            selectedInstruction={selectedInstruction}
            onClose={() => setSelectedInstruction(null)}
            onCopy={handleCopy}
            isCopied={isCopied}
            onStartConversation={handleStartConversation}
            isFavorite={favoriteInstructions.includes(selectedInstruction.filename)}
            onToggleFavorite={() => handleToggleFavorite(selectedInstruction)}
          />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default App;