export const loadCustomTools = () => {
  const saved = localStorage.getItem('customTools');
  return saved ? JSON.parse(saved) : [];
};

export const saveCustomTools = (tools) => {
  localStorage.setItem('customTools', JSON.stringify(tools));
};

export const loadInstructionUsageStats = () => {
  const saved = localStorage.getItem('instructionUsageStats');
  return saved ? JSON.parse(saved) : {};
};

export const saveInstructionUsageStats = (stats) => {
  localStorage.setItem('instructionUsageStats', JSON.stringify(stats));
};

export const savePromptUsageStats = (stats) => {
  localStorage.setItem('instructionUsageStats', JSON.stringify(stats));
};

export const loadToolUsageStats = () => {
  const saved = localStorage.getItem('toolUsageStats');
  return saved ? JSON.parse(saved) : {};
};

export const saveToolUsageStats = (stats) => {
  localStorage.setItem('toolUsageStats', JSON.stringify(stats));
};

export const loadFavoriteInstructions = () => {
  const saved = localStorage.getItem('favoriteInstructions');
  return saved ? JSON.parse(saved) : [];
};

export const saveFavoriteInstructions = (favorites) => {
  localStorage.setItem('favoriteInstructions', JSON.stringify(favorites));
};

export function saveFavoritePrompts(favorites) {
  localStorage.setItem('favoriteInstructions', JSON.stringify(favorites));
}

export const loadReferencesData = () => {
  const saved = localStorage.getItem('referencesData');
  return saved ? JSON.parse(saved) : {};
};

export const saveReferencesData = (data) => {
  localStorage.setItem('referencesData', JSON.stringify(data));
};

export const loadDarkMode = () => {
  try {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (error) {
    console.error('Error loading dark mode:', error);
    return false;
  }
};

export const saveDarkMode = (isDarkMode) => {
  try {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (error) {
    console.error('Error saving dark mode:', error);
  }
};

// Function to load all stored state
export const loadStoredState = () => {
  return {
    darkMode: localStorage.getItem('darkMode') !== 'false', // Default to true if not set
    customTools: JSON.parse(localStorage.getItem('customTools') || '[]'),
    instructionUsageStats: JSON.parse(localStorage.getItem('instructionUsageStats') || '{}'),
    toolUsageStats: JSON.parse(localStorage.getItem('toolUsageStats') || '{}'),
    favoriteInstructions: JSON.parse(localStorage.getItem('favoriteInstructions') || '[]'),
  };
};

export const getMostFrequentTool = (tools) => {
  const stats = loadToolUsageStats();
  let maxUsage = -1;
  tools.forEach(tool => {
    const usage = stats[tool.name] || 0;
    if (usage > maxUsage) {
      maxUsage = usage;
    }
  });
  const candidates = tools.filter(tool => (stats[tool.name] || 0) === maxUsage);
  if (candidates.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
};

export const getModalUsageCount = () => {
  const count = parseInt(localStorage.getItem('modalUsageCount') || '0');
  return count;
};

export const incrementModalUsageCount = () => {
  const count = getModalUsageCount();
  localStorage.setItem('modalUsageCount', (count + 1).toString());
  return count + 1;
};
