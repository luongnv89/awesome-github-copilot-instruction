const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const instructionsDir = path.join(__dirname, '../instructions');
const outputFilePath = path.join(__dirname, '../website/src/data/instructions.json');

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function generateInstructionData() {
  const allInstructions = [];

  function walkSync(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walkSync(filePath);
      } else if (path.extname(file) === '.md') {
        const content = fs.readFileSync(filePath, 'utf8').trim();
        const { data, content: markdownContent } = matter(content);
        const relativePath = path.relative(instructionsDir, filePath);
        const pathParts = relativePath.split(path.sep);

        // Extract category and subcategories
        const category = pathParts[0];
        const subcategories = pathParts.slice(1, -1);

        // Generate initial tags from category, subcategories and frontmatter tags
        const tags = new Set([
          category,
          ...subcategories,
          ...(data.tags || [])
        ]);

        // Extract additional tags from the markdown content based on language, architecture, library, etc.
        const additionalTags = new Set();
        const languageKeywords = ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Ruby", "Go", "Rust"];
        const archKeywords = ["x86", "x64", "ARM", "MIPS"];
        const libraryKeywords = ["React", "Angular", "Vue", "Laravel", "Django", "Spring", "Node", "Express"];
        
        languageKeywords.forEach(keyword => {
          const regex = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i");
          if (regex.test(markdownContent)) {
            additionalTags.add(keyword);
          }
        });
        
        archKeywords.forEach(keyword => {
          const regex = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i");
          if (regex.test(markdownContent)) {
            additionalTags.add(keyword);
          }
        });
        
        libraryKeywords.forEach(keyword => {
          const regex = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i");
          if (regex.test(markdownContent)) {
            additionalTags.add(keyword);
          }
        });
        
        // Merge additional tags
        additionalTags.forEach(tag => tags.add(tag));

        const title = data.title || file.replace('.md', '');
        const description = data.description || markdownContent.split('\n')[0];

        allInstructions.push({
          id: relativePath.replace(/\//g, '-').replace(/\.md$/, ''),
          title,
          description,
          category,
          subcategories,
          content: markdownContent,
          filename: file,
          tags: Array.from(tags),
          metadata: {
            language: data.language || 'General',
            framework: data.framework || null,
            compatibility: data.compatibility || ['VS Code', 'Visual Studio', 'JetBrains', 'Neovim'],
            difficulty: data.difficulty || 'Intermediate',
            topics: data.topics || [],
            lastUpdated: stat.mtime,
            contributor: data.contributor || 'Community'
          }
        });
      }
    });
  }

  walkSync(instructionsDir);

  // Sort instructions by last updated date
  allInstructions.sort((a, b) => new Date(b.metadata.lastUpdated) - new Date(a.metadata.lastUpdated));

  fs.writeFileSync(outputFilePath, JSON.stringify(allInstructions, null, 2));
  console.log('GitHub Copilot instruction data generated successfully!');
}

generateInstructionData();