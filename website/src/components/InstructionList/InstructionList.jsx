import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import InstructionItem from './InstructionItem';
import { FolderOpen } from 'lucide-react';

const InstructionList = ({
  instructions,
  loadMoreInstructions,
  hasMore,
  onSelectInstruction,
  onQuickAction,
  selectedCategory,
  onCategoryClick,
  onBackToCategories,
  groupedInstructions,
  showCategoryList,
  totalInstructions,
  totalFilteredInstructions,
  customTools
}) => {
  if (showCategoryList) {
    return (
      <div className="copilot-card p-6">
        <div className="text-center mb-8">
          <h2 className="copilot-heading flex items-center justify-center gap-2">
            <FolderOpen className="w-7 h-7" />
            Browse by Category
          </h2>
          <p className="copilot-subheading">
            Browse through our collection of <span className="font-semibold text-copilot-primary">{totalInstructions}</span> GitHub Copilot instructions
          </p>
        </div>
        <div className="copilot-grid">
          {Object.entries(groupedInstructions).map(([category, categoryInstructions]) => (
            <div
              key={category}
              onClick={() => onCategoryClick(category)}
              className="copilot-card p-4 hover:border-copilot-primary cursor-pointer"
            >
              <h3 className="copilot-heading text-lg mb-2">
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
      <div className="copilot-card p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          {selectedCategory && (
            <button
              onClick={onBackToCategories}
              className="copilot-button"
            >
              ← Back to Categories
            </button>
          )}
          <div className="text-sm text-gray-600 dark:text-gray-400 ml-0 sm:ml-auto">
            {totalFilteredInstructions} instructions found
            {instructions.length < totalFilteredInstructions && ` (showing ${instructions.length})`}
          </div>
        </div>
        <InfiniteScroll
          dataLength={instructions.length}
          next={loadMoreInstructions}
          hasMore={hasMore}
          loader={<p className="text-center py-4 text-gray-600 dark:text-gray-400">Loading...</p>}
          className="copilot-grid"
        >
          {instructions.map((instruction, index) => (
            <InstructionItem
              key={index}
              instruction={instruction}
              onSelectInstruction={onSelectInstruction}
              onQuickAction={onQuickAction}
              customTools={customTools}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default InstructionList;