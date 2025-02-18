import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PromptItem from './PromptItem'; // New import
import { FolderOpen } from 'lucide-react';

const PromptList = ({
  instructions,
  loadMoreInstructions,
  hasMore,
  onSelectInstruction,
  onQuickAction, // add onQuickAction prop here
  selectedCategory,
  onCategoryClick,
  onBackToCategories,
  groupedInstructions,
  showCategoryList,
  totalInstructions,
  totalFilteredInstructions, // Add this new prop
  customTools // Add this new prop
}) => {
  if (showCategoryList) {
    return (
      <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
            <FolderOpen className="w-7 h-7" />
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse through our collection of <span className="font-semibold text-blue-600 dark:text-blue-400">{totalInstructions}</span> GitHub Copilot instructions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Object.entries(groupedInstructions).map(([category, categoryInstructions]) => (
            <div
              key={category}
              onClick={() => onCategoryClick(category)}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {category}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {categoryInstructions.length} instructions
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 sm:mt-6 px-2 sm:px-0">
      <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          {selectedCategory && (
            <button
              onClick={onBackToCategories}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Back to Categories
            </button>
          )}
          <div className="text-sm text-gray-600 dark:text-gray-400 ml-0 sm:ml-auto">
            {totalFilteredInstructions} instructions found {/* Show total filtered count instead of visible prompts */}
            {instructions.length < totalFilteredInstructions && ` (showing ${instructions.length})`} {/* Show current visible count if less than total */}
          </div>
        </div>

        <InfiniteScroll
          dataLength={instructions.length}
          next={loadMoreInstructions}
          hasMore={hasMore}
          loader={<p className="text-center py-4 text-gray-600 dark:text-gray-400">Loading...</p>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
        >
          {instructions.map((instruction, index) => (
            <PromptItem
              key={index}
              instruction={instruction}
              onSelectInstruction={onSelectInstruction}
              onQuickAction={onQuickAction} // now correctly defined
              customTools={customTools} // Pass customTools to PromptItem
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default PromptList;