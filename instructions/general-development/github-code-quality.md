# GitHub Code Quality Instructions

## Project Context
- GitHub repository management
- Code review practices
- Pull request workflows
- CI/CD integration
- Quality metrics

## Code Style Guidelines
- Language-agnostic standards
- Code review checklist
- Documentation requirements
- Commit message format
- Branch naming conventions

## Architecture Patterns
- Repository organization
- Branch protection rules
- GitHub Actions workflow
- Code review process
- Release management

## Testing Requirements
- CI pipeline testing
- Code coverage requirements
- Security scanning
- Performance testing
- Integration testing

## Documentation Standards
- README requirements
- Pull request templates
- Issue templates
- Contributing guidelines
- Security policies

## Project-Specific Rules
### GitHub Workflows
```yaml
# Pull Request Template
---
name: Pull Request
about: Create a pull request to merge changes
title: '[Feature/Fix/Refactor]: Brief description'
labels: ''
assignees: ''

---

## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review performed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] Tests passing
- [ ] No new warnings

# GitHub Actions Workflow
name: Code Quality

on:
  pull_request:
    branches: [ main, develop ]
  push:
    branches: [ main, develop ]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Code Quality Checks
        run: |
          # Run linters
          npm run lint
          
          # Run tests with coverage
          npm run test:coverage
          
          # Security scan
          npm audit
          
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

# Branch Protection Rules
protected_branches:
  main:
    required_status_checks:
      strict: true
      contexts:
        - "Code Quality"
    enforce_admins: true
    required_pull_request_reviews:
      required_approving_review_count: 2
      dismiss_stale_reviews: true
    required_linear_history: true
    allow_force_pushes: false

# Commit Message Convention
commit_message_convention: |
  type(scope): description

  [optional body]

  [optional footer]

  Types:
  - feat: A new feature
  - fix: A bug fix
  - docs: Documentation only changes
  - style: Changes that do not affect the meaning of the code
  - refactor: A code change that neither fixes a bug nor adds a feature
  - perf: A code change that improves performance
  - test: Adding missing tests or correcting existing tests
  - chore: Changes to the build process or auxiliary tools

# Code Review Guidelines
code_review_checklist:
  functionality:
    - Logic correctness
    - Error handling
    - Edge cases covered
    - Performance considerations
  
  quality:
    - Code style compliance
    - Documentation completeness
    - Test coverage
    - No code smells
  
  security:
    - Input validation
    - Authentication/Authorization
    - Data protection
    - Dependencies checked

# Repository Configuration
repository_settings:
  merge_types_allowed:
    - squash
    - rebase
  default_branch: main
  delete_head_branches: true
  automatically_delete_branches: true
  require_signed_commits: true
```