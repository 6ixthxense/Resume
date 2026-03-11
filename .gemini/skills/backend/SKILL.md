---
name: backend
description: Comprehensive guidance for API design, server-side development, database orchestration, and secure backend architectures. Use when building Node.js/Express APIs, managing databases (Prisma, PostgreSQL, MongoDB), or implementing authentication and middleware.
---

# Backend Expert Skill

This skill provides expert guidance for backend development, from system architecture to API implementation.

## Core Competencies

- **API Design**: RESTful, GraphQL, and gRPC patterns.
- **Node.js**: Asynchronous patterns, streams, and event loop management.
- **ORM & DB**: Schema design with Prisma, PostgreSQL, MongoDB, and Redis caching.
- **Middleware**: Authentication (JWT, OAuth2), error handling, and request validation.
- **Infrastructure**: Docker, CI/CD, and serverless deployment.

## Common Workflows

### API Endpoint Implementation

1. Define the route and request parameters (Zod validation).
2. Implement business logic in services, keeping controllers thin.
3. Add database queries with proper indexing.
4. Implement comprehensive error handling (try/catch blocks).
5. Add unit and integration tests.

### Authentication & Authorization

- **Auth**: Use JWT for stateless authentication.
- **Authz**: Implement RBAC (Role-Based Access Control) for endpoint protection.

## Best Practices

- **Layered Architecture**: Controller -> Service -> Repository.
- **Validation**: Use Zod or Joi for request/response validation.
- **Idempotency**: Ensure state-changing operations are idempotent where possible.
- **Security Headers**: Use Helmet and CORS policies.
- **Error Handling**: Use consistent error response formats.
