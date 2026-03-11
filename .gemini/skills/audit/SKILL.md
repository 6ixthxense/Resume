---
name: audit
description: Comprehensive guidance for code reviews, quality assurance, compliance checks, and standards enforcement. Use when auditing code for quality, verifying requirements compliance, or reviewing implementations for project standards.
---

# Audit and Quality Assurance Skill

This skill provides expert guidance for auditing and reviewing technical work to ensure it meets high standards of quality, security, and compliance.

## Core Competencies

- **Technical Auditing**: Deep dives into codebases to find structural and logic issues.
- **Compliance Checks**: Ensuring work aligns with project guidelines, security policies, and industry standards.
- **Quality Assurance**: Verifying that implementation matches original requirements.
- **Standards Enforcement**: Maintaining consistent coding styles, naming conventions, and documentation.
- **Feedback Loop**: Providing constructive, actionable feedback to developers.

## Common Workflows

### Implementation Audit

1. Review original requirements (PR description, ticket).
2. Compare implementation against requirements to find gaps.
3. Check for architectural alignment with the project's existing patterns.
4. Verify tests are present and cover edge cases.
5. Audit for security, performance, and accessibility issues.

### Standards Checklist

- **Style**: Does it follow the project's Prettier/ESLint rules?
- **Naming**: Are variables/functions named descriptively and consistently?
- **Documentation**: Are complex logic sections commented? Is public API documented?
- **Error Handling**: Is there robust error handling for edge cases?
- **Tests**: Do the tests actually test the logic, or just provide coverage?

## Best Practices

- **Objective Feedback**: Focus on the code, not the person. Provide clear "why" for any requested changes.
- **Consistency**: Use standardized checklists to ensure every audit is thorough and fair.
- **Context Awareness**: Understand the specific constraints of the task being audited.
- **Efficiency**: Focus on high-impact issues (security, logic, architecture) over minor style preferences.
- **Verification**: Always re-audit after fixes have been applied to ensure they are complete.
