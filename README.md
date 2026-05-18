# PipelineIQ Production-Grade Test Suite (v0.8.0)

This repository serves as the official demonstration and testing ground for **PipelineIQ**. It features a modern TypeScript application with intentional "failure injection" points to showcase PipelineIQ's AI-driven root cause analysis and remediation capabilities.

## 🚀 Key Features

- **Unstable API**: A Node.js/Express server with endpoints designed to simulate common CI/CD failure scenarios (Validation errors, Logic errors, Infrastructure outages).
- **TypeScript & Vitest**: Built with modern tooling for type safety and fast test execution.
- **Dual-Platform CI/CD**: Integrated with both **GitHub Actions** and **Azure DevOps** using production-standard pipeline configurations.

## 📁 Project Structure

```
piq-test/
├── src/
│   └── index.ts          # Express API with intentional failure modes
├── tests/
│   └── api.test.ts       # Test suite designed to trigger PipelineIQ
├── package.json          # Modern TS + Vitest configuration
├── pipelineiq-config.json # Optimized configuration for v0.8.0
├── azure-pipelines.yml   # Production-ready Azure DevOps pipeline
└── .github/
    └── workflows/
        └── ci.yml        # Production-ready GitHub Actions workflow
```

## 🧪 Failure Scenarios for PipelineIQ

1. **Division by Zero**: Triggers a logic error in the calculator API. PipelineIQ will analyze the stack trace and suggest a fix.
2. **Database Outage Simulation**: Triggers a `503 Service Unavailable` response. PipelineIQ will recognize this as an infrastructure issue.
3. **Zod Validation Failure**: Triggers a `400 Bad Request`. PipelineIQ will identify the malformed payload in the logs.

## 🛠 Getting Started

```bash
# Install dependencies
npm install

# Run the API locally
npm run dev

# Run tests (some are designed to fail for PipelineIQ testing)
npm test
```

## 🛰 CI/CD Integration

This repository is pre-configured to run PipelineIQ automatically on failures:

### GitHub Actions
The workflow in `.github/workflows/ci.yml` uses the official PipelineIQ GitHub Action.

### Azure DevOps
The pipeline in `azure-pipelines.yml` uses the PipelineIQ CLI to analyze failed builds.

---
**Maintained by Meetkumar Patel <pmeet464@gmail.com>**
