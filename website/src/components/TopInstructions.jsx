import React from 'react';
import { Trash2, Zap, Heart } from 'lucide-react';

const InstructionList = ({ instructions, handleSelectInstruction, title, onRemoveFavorite, icon: Icon }) => {
  if (!instructions || instructions.length === 0) return null;
  return (
    <div className="w-full p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        {Icon && <Icon className="w-6 h-6" />}
        {title}
      </h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {instructions.map((instruction) => (
          <li
            key={instruction.filename}
            className="py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <div className="flex items-center gap-2">
              <span
                className="flex-1"
                onClick={() => handleSelectInstruction(instruction)}
              >
                {instruction.title || instruction.filename || 'Untitled Instruction'}
              </span>
              {instruction.tags && instruction.tags.map((tag, i) => {
                let classes = "px-1 py-0.5 rounded text-xs font-medium";
                if (tag === 'system') {
                  classes += " bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-100";
                } else if (tag === instruction.category) {
                  classes += " bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
                } else {
                  classes += " bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
                }
                return (
                  <span key={i} className={classes}>
                    {tag}
                  </span>
                );
              })}
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-100">
                {instruction.usageCount !== undefined ? instruction.usageCount : 0} { (instruction.usageCount === 0) ? <span role="img" aria-label="no usage">😴</span> : <span role="img" aria-label="usage count">🔥</span> }
              </span>
              {onRemoveFavorite && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFavorite(instruction);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 rounded"
                  title="Remove from favorites"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TopInstructions = ({ topInstructions, favoriteInstructions, handleSelectInstruction, onRemoveFavorite }) => {
  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InstructionList
          instructions={topInstructions}
          handleSelectInstruction={handleSelectInstruction}
          title="Top 5 Frequent Instructions"
          icon={Zap}
        />
        <InstructionList
          instructions={favoriteInstructions}
          handleSelectInstruction={handleSelectInstruction}
          title={`Favorite Instructions (${favoriteInstructions?.length || 0})`}
          onRemoveFavorite={onRemoveFavorite}
          icon={Heart}
        />
      </div>
    </section>
  );
};

export default TopInstructions;
