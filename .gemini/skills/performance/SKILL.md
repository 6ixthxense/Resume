---
name: performance
description: Comprehensive guidance for code optimization, resource management, and profiling. Use when the user needs to improve bundle sizes, lazy load assets, optimize database queries, or identify memory leaks.
---

# Performance Optimization Skill

This skill provides expert guidance for optimizing software and systems for speed and efficiency.

## Core Competencies

- **Frontend Performance**: Bundle size reduction (tree-shaking), lazy loading, and rendering optimization.
- **Backend Performance**: Database query optimization (indexing), caching (Redis), and asynchronous processing.
- **Profiling**: Chrome DevTools, Node.js Profiler, and Flamegraphs.
- **Resource Management**: Memory leak detection and garbage collection analysis.
- **Scalability**: Horizontal vs. Vertical scaling, load balancing, and connection pooling.

## Common Workflows

### Identifying Performance Bottlenecks

1. Baseline measurements (Lighthouse, Web Vitals, API latency).
2. Profile the application (Flamegraphs, CPU profiling).
3. Identify hotspots (slowest functions, heaviest assets).
4. Apply optimizations (memoization, lazy loading).
5. Measure again to confirm improvements.

### Database Query Optimization

- **Indexing**: Ensure columns used in WHERE, JOIN, and ORDER BY are indexed.
- **Query Rewriting**: Replace subqueries with JOINs or CTEs where appropriate.
- **Connection Pooling**: Use a pool to reuse database connections.
- **N+1 Problem**: Identify and fix N+1 query patterns using `JOIN` or eager loading.

## Best Practices

- **Avoid Early Optimization**: Focus on readable code first, then optimize hotspots.
- **Measurement Over Guesswork**: Use data from profiling tools, not intuition.
- **Lazy Load Everything**: Only load what's needed for the current task.
- **Minimize Bundle Size**: Audit dependencies for heavy libraries.
- **Cache Strategically**: Cache at the edge (CDN), application level, and database level.
