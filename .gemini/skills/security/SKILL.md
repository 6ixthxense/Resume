---
name: security
description: Comprehensive guidance for secure coding, threat modeling, and vulnerability mitigation. Use when the user needs help with OWASP Top 10, authentication (OAuth, SAML), data encryption, or secure infrastructure design.
---

# Security Expert Skill

This skill provides expert guidance for secure software development and system architecture.

## Core Competencies

- **OWASP Top 10**: Mitigating common vulnerabilities (SQLi, XSS, SSRF).
- **Authentication & Authorization**: OAuth2, OpenID Connect, RBAC, and ABAC.
- **Cryptography**: Secure data at rest (AES) and in transit (TLS/SSL).
- **Threat Modeling**: STRIDE, DREAD, and attack tree analysis.
- **Dependency Management**: Software Composition Analysis (SCA) and SBOM.
- **Secure DevOps**: DevSecOps integration and vulnerability scanning.

## Common Workflows

### Secure Code Review

1. Scan for hardcoded credentials or API keys.
2. Check for unsafe use of `eval()`, `exec()`, or dynamic commands.
3. Validate all user inputs against injection (SQLi, XSS).
4. Verify that sensitive data is logged correctly (no PII).
5. Confirm that secure headers (HSTS, CSP, X-Frame-Options) are present.

### Threat Modeling Session

- **Spoofing**: Can someone impersonate a user?
- **Tampering**: Can someone modify data in transit or at rest?
- **Repudiation**: Can a user deny an action they took?
- **Information Disclosure**: Can an unauthorized user access sensitive data?
- **Denial of Service**: Can the system be overwhelmed?
- **Elevation of Privilege**: Can a regular user gain admin access?

## Best Practices

- **Least Privilege**: Grant only the minimum permissions needed.
- **Defense in Depth**: Layered security controls.
- **Fail Securely**: Systems should fail to a safe state.
- **Zero Trust**: Never trust, always verify.
- **Secret Management**: Use a vault (HashiCorp, AWS Secrets Manager).
