# Google Markdown Style Guide - Summary

- **Core Principles**
  - Source text should be readable and portable
  - Markdown corpus should be maintainable over time and across teams
  - Syntax should be simple and easy to remember
  - Prefer a small set of fresh, accurate docs over sprawling, outdated ones
  - Prioritize "better" over "best" to encourage fast iteration

- **Document Layout**
  - Start with a level-one heading as the document title
  - Follow with a short introduction (1-3 sentences)
  - Place [TOC] directive after introduction and before first H2 heading
  - Level-two headings for main sections
  - End with "See also" section for related resources

- **Formatting Rules**
  - Follow the 80-character line limit (except for links, tables, headings, code blocks)
  - Don't use trailing whitespace; use trailing backslash to break lines if needed
  - Use UTF-8 encoding
  - Preserve capitalization of product names and tools
  - Use unique, descriptive heading names

- **Headings**
  - Use ATX-style headings with hash marks (`# Heading 1`)
  - Use a single H1 heading per document
  - Add spacing after # and newlines before and after headings
  - Follow Google Developer Documentation Style Guide for capitalization

- **Lists**
  - Use lazy numbering (all "1.") for long numbered lists
  - Use 4-space indent for nested lists
  - Use 4-space indent for wrapped text in lists
  - For basic lists, either 4-space or 1-space indentation is acceptable

- **Code Formatting**
  - Use backticks for inline code
  - Use fenced code blocks with language specified
  - Prefer fenced code blocks (```` ```language ````) over indented code blocks
  - Escape newlines in command-line snippets with backslash
  - Indent code blocks within lists to maintain list formatting

- **Links**
  - Use explicit paths for links within Markdown
  - Avoid relative paths with `../` navigation
  - Use informative link text (not "here" or "link")
  - Use reference links for long URLs or repeated links
  - Define reference links after their first use, before the next heading
  - For links used across multiple sections, define at end of document

- **Images**
  - Use images sparingly and prefer simple screenshots
  - Always provide appropriate alt text descriptions
  - Use the explicit path for images

- **Tables**
  - Use tables only for tabular data that needs to be scanned quickly
  - Prefer lists when they would suffice
  - Use reference links in tables to keep content short
  - Avoid tables with unbalanced dimensions or empty cells

- **Best Practices**
  - Strongly prefer Markdown to HTML
  - Avoid HTML hacks that reduce readability and portability
  - Capitalize product names properly
  - Use code spans for escaping text that shouldn't be processed
