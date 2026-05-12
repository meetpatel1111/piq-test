# PipelineIQ Testing Repository

This repository demonstrates PipelineIQ integration with both GitHub Actions and Azure DevOps pipelines.

## 🚀 What's Included

- **Sample Node.js Application** - Simple web app with tests
- **GitHub Actions Workflow** - CI/CD pipeline with PipelineIQ integration
- **Azure DevOps Pipeline** - Equivalent pipeline for Azure DevOps
- **PipelineIQ Configuration** - Ready-to-use configuration files
- **Test Scenarios** - Various failure scenarios to test PipelineIQ

## 📁 Repository Structure

```
piq-test/
├── README.md                 # This file
├── package.json              # Node.js project setup
├── src/
│   ├── app.js                # Simple Express app
│   └── utils.js              # Utility functions
├── tests/
│   ├── app.test.js           # Unit tests
│   └── integration.test.js   # Integration tests
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions workflow
├── azure-pipelines.yml       # Azure DevOps pipeline
├── pipelineiq-config.json     # PipelineIQ configuration
├── .env.example              # Environment variables template
└── docs/
    ├── setup.md              # Setup instructions
    └── testing.md            # Testing guide
```

## 🎯 Testing PipelineIQ

### GitHub Actions
1. Fork this repository
2. Add required secrets (see setup.md)
3. Push changes to trigger the workflow
4. Intentionally break tests to see PipelineIQ in action

### Azure DevOps
1. Import this repository into Azure DevOps
2. Create pipeline using azure-pipelines.yml
3. Configure variable group with secrets
4. Run pipeline and test failure scenarios

## 🔧 Required Secrets

### GitHub Actions
- `JIRA_URL` - Your Jira instance URL
- `JIRA_EMAIL` - Jira service account email
- `JIRA_TOKEN` - Jira API token
- `AI_API_KEY` - OpenAI/Gemini API key (optional)

### Azure DevOps
- `jiraUrl` - Your Jira instance URL
- `jiraEmail` - Jira service account email
- `jiraToken` - Jira API token
- `aiApiKey` - OpenAI/Gemini API key (optional)

## 🧪 Test Scenarios

1. **Unit Test Failure** - Broken unit tests
2. **Integration Test Failure** - Database connection issues
3. **Build Failure** - Syntax errors, missing dependencies
4. **Linting Failure** - Code quality issues
5. **Security Scan Failure** - Vulnerability detection

## 📊 Expected Results

Each failure should create a Jira ticket with:
- ✅ AI-powered root cause analysis
- ✅ Step-by-step remediation instructions
- ✅ Proper severity and priority classification
- ✅ Links to commit, branch, and pipeline run
- ✅ Relevant labels and assignee suggestions

## 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/your-org/piq-test.git
cd piq-test
npm install

# Run tests (some will fail to demonstrate PipelineIQ)
npm test

# Check PipelineIQ configuration
cat pipelineiq-config.json
```

## 📚 Documentation

- [Setup Guide](docs/setup.md) - Complete setup instructions
- [Testing Guide](docs/testing.md) - How to test different scenarios
- [Troubleshooting](docs/troubleshooting.md) - Common issues and solutions

## 🤝 Contributing

This is a testing repository. Feel free to:
- Add new test scenarios
- Improve documentation
- Report issues with PipelineIQ integration
- Share your experience

---

**PipelineIQ** - Transforming CI/CD failures into operational intelligence.
