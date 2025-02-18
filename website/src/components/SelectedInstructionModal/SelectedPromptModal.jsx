// src/components/SelectedPromptModal/SelectedPromptModal.jsx
import React, { useState, useEffect } from "react";
import { disableScroll, enableScroll } from "../../utils/scrollLock";
import { X, Copy, Check, Heart, ArrowRight } from "lucide-react";
import ShareButton from "../ShareButton/ShareButton";
import "../../styles/animations.css";
import { getModalUsageCount, incrementModalUsageCount } from "../../utils/localStorage";

const SelectedInstructionModal = ({
  selectedInstruction,
  onClose,
  onCopy,
  isCopied,
  onStartConversation,
  isFavorite,
  onToggleFavorite,
}) => {
  const [shouldShowGuide] = useState(() => getModalUsageCount() < 3);

  const getShareUrl = () => {
    const url = new URL(window.location.origin);
    url.searchParams.set("instruction", encodeURIComponent(selectedInstruction.filename));
    return url.toString();
  };

  const shareContent = `Check out this GitHub Copilot instruction "${
    selectedInstruction.title || selectedInstruction.filename
  }" from GitHub Copilot Instructions Collection`;

  useEffect(() => {
    incrementModalUsageCount();
    disableScroll();
    return () => {
      enableScroll();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50" aria-modal="true">
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity" />
      <div className="flex min-h-screen items-start sm:items-center justify-center p-2 sm:p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl w-full max-w-3xl p-3 sm:p-6 overflow-hidden shadow-2xl animate-modal-entry">
          {/* Mobile buttons positioned absolutely */}
          <div className="absolute right-2 top-2 flex items-center gap-1 sm:hidden">
            <button
              onClick={onToggleFavorite}
              className={`p-1.5 rounded-full transition-colors duration-200 ${
                isFavorite
                  ? "text-red-500 hover:bg-red-100"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
            <div className="scale-75 origin-right">
              <ShareButton
                url={getShareUrl()}
                text="Share"
                content={shareContent}
                title={selectedInstruction.title || selectedInstruction.filename}
              />
            </div>
            <button
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              onClick={onClose}
            >
              <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Desktop header */}
          <div className="hidden sm:flex flex-row justify-between items-center border-b dark:border-gray-700 pb-1">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 pr-8">
              {selectedInstruction.title || selectedInstruction.filename}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={onToggleFavorite}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isFavorite
                    ? "text-red-500 hover:bg-red-100"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
                title={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
              <ShareButton
                url={getShareUrl()}
                text="Share"
                content={shareContent}
                title={selectedInstruction.title || selectedInstruction.filename}
              />
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                onClick={onClose}
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto sm:pt-10">
            <p className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 mb-2">
              {shouldShowGuide && "You can modify this instruction before using it:"}
            </p>
            <textarea
              className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              defaultValue={selectedInstruction.content}
              rows={window.innerWidth < 640 ? 10 : 15}
            />

            {/* Tags section moved here */}
            <div className="mt-4 mb-2">
              <div className="flex items-center gap-2 overflow-x-auto">
                {selectedInstruction.tags &&
                  selectedInstruction.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-2 sm:mt-6 border-t dark:border-gray-700 pt-2 sm:pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Step 1: Click the copy button to copy the instruction (modify if needed). 
                Step 2: Create a <code>.github/copilot-instructions.md</code> file and paste it.
              </p>
              <button
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base ${isCopied ? "bg-green-500" : "bg-blue-500"} text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700`}
                onClick={onCopy}
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedInstructionModal;
