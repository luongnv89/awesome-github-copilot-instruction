import React from 'react';
import { Zap } from 'lucide-react';
import { getMostFrequentTool } from '../../utils/localStorage';

const InstructionItem = ({ instruction, onSelectInstruction, onQuickAction, customTools = [] }) => {
  const mostFrequentTool = getMostFrequentTool([...customTools]);
  
  return (
    <div
      onClick={() => onSelectInstruction(instruction)}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col gap-3 h-full border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {instruction.usageCount !== undefined ? instruction.usageCount : 0}{' '}
          {(instruction.usageCount === 0)
            ? <span role="img" aria-label="no usage">😴</span>
            : <span role="img" aria-label="usage count">🔥</span>}
        </span>
        {onQuickAction && mostFrequentTool && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction(instruction);
            }}
            className="px-2 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center gap-1"
            title={`Quick configure with ${mostFrequentTool.name}`}
          >
            <Zap size={16} />
            {mostFrequentTool.name}
          </button>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1 dark:text-gray-100">
          {instruction.title || instruction.filename || 'Untitled Instruction'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-sm">
          {instruction.description || instruction.content.substring(0, 150) + '...'}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {instruction.tags && instruction.tags.length > 0 && instruction.tags.map((tag, i) => {
          let classes = "px-2 py-1 rounded text-xs";
          if (tag === 'system') {
            classes += " bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100 font-bold";
          } else if (tag === instruction.category) {
            classes += " bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-100 font-bold";
          } else {
            classes += " bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
          }
          return (
            <span key={i} className={classes}>
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default InstructionItem;
