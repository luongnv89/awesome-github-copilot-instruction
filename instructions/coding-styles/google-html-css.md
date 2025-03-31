# Google HTML/CSS Style Guide - Summary

- **General Style Rules**
  - Use HTTPS for embedded resources when possible
  - Use 2 spaces for indentation (no tabs)
  - Use only lowercase in HTML and CSS
  - Remove trailing whitespace
  - Use UTF-8 encoding without BOM
  - Use comments to explain code as needed
  - Mark action items with "TODO:" prefix

- **HTML Style Rules**
  - Use `<!doctype html>` declaration
  - Write valid HTML where possible
  - Use elements according to their semantic purpose
  - Provide alternative content for multimedia (alt text, transcripts)
  - Separate structure (HTML), presentation (CSS), and behavior (JavaScript)
  - Avoid entity references except for special characters
  - Omit optional tags when possible
  - Omit type attributes for stylesheets and scripts
  - Avoid unnecessary ID attributes; prefer class attributes
  - When using IDs, include a hyphen in the value

- **HTML Formatting**
  - Put each block, list, or table element on a new line
  - Indent child elements
  - Break long lines for readability (optional)
  - Use double quotes for attribute values

- **CSS Style Rules**
  - Write valid CSS where possible
  - Use meaningful class names that reflect purpose
  - Keep class names as short as possible, but descriptive
  - Separate words in class names with hyphens
  - Consider prefixing class names in large projects
  - Avoid qualifying class names with type selectors
  - Avoid ID selectors; use classes instead
  - Use shorthand properties where possible
  - Omit units after zero values unless required
  - Include leading zeros for values between -1 and 1
  - Use 3-character hex notation for colors when possible
  - Avoid `!important` declarations
  - Avoid browser detection hacks

- **CSS Formatting Rules**
  - Alphabetize declarations (optional)
  - Indent all block content
  - Use semicolon after every declaration
  - Use space after property name's colon
  - Put space between selector and opening brace
  - Put each selector and declaration on its own line
  - Separate rules with blank lines
  - Use single quotes for attribute selectors and property values
  - Don't use quotes in URI values
