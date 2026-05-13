# PipelineIQ Testing Repository Setup Guide

This guide will help you set up the PipelineIQ testing repository with both GitHub Actions and Azure DevOps pipelines.

## 🔧 Prerequisites

1. **Jira Instance** - Cloud or Server instance with API access
2. **GitHub Repository** - Fork this repository to your GitHub account
3. **Azure DevOps Project** - Optional, for Azure DevOps pipeline testing
4. **Node.js** - Version 18 or higher
5. **API Keys** - OpenAI or Gemini for AI features (optional)

## 📋 Required Secrets and Variables

### GitHub Actions Secrets
Go to your repository → Settings → Secrets and variables → Actions

| Secret Name | Value | Required |
|-------------|-------|----------|
| `JIRA_URL` | `https://your-org.atlassian.net` | ✅ Yes |
| `JIRA_EMAIL` | `your-email@company.com` | ✅ Yes |
| `JIRA_TOKEN` | `atatt3xfgf0...` | ✅ Yes |
| `JIRA_PROJECT` | `DEVOPS` (or your project key) | ✅ Yes |
| `JIRA_ASSIGNEE` | `user123` (Jira user ID) | ⚪ Optional |
| `AI_API_KEY` | `sk-...your-openai-key` | ⚪ Optional |
| `GEMINI_API_KEY` | `AIzaSy...your-gemini-key` | ⚪ Optional |

### Azure DevOps Variable Groups
Go to your project → Pipelines → Library → Variable groups

| Variable Name | Value | Secret? |
|---------------|-------|--------|
| `jiraUrl` | `https://your-org.atlassian.net` | ✅ Yes |
| `jiraEmail` | `your-email@company.com` | ✅ Yes |
| `jiraToken` | `atatt3xfgf0...` | ✅ Yes |
| `jiraProject` | `DEVOPS` | ✅ Yes |
| `jiraAssignee` | `user123` | ⚪ Optional |
| `aiApiKey` | `sk-...your-openai-key` | ✅ Yes |
| `geminiApiKey` | `AIzaSy...your-gemini-key` | ⚪ Optional |

## 🎯 Jira Project Configuration

### Step 1: Create or Identify Your Jira Project
1. Log in to your Jira instance
2. Go to **Projects** → **Create project** (if needed)
3. Choose a project type (e.g., **Software**, **Kanban**, or **Scrum**)
4. Note your **Project Key** (e.g., `DEVOPS`, `TEST`, `CI`)

### Step 2: Configure Project Settings
1. Go to **Project Settings** → **Issues**
2. Ensure **Bug** issue type exists (or create your preferred issue type)
3. Check **Workflow** allows issue creation via API
4. Verify **Permissions** allow API access

### Step 3: Get Project Information
```bash
# Test your Jira connection
curl -X GET "https://your-org.atlassian.net/rest/api/3/project/DEVOPS" \
  -H "Authorization: Bearer YOUR_JIRA_TOKEN"
```

## 🔑 API Key Setup

### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Click **"Create new secret key"**
3. Copy the key (starts with `sk-`)
4. Add to secrets as `AI_API_KEY`

### Gemini API Key
1. Go to https://aistudio.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the key (starts with `AIza`)
4. Add to secrets as `GEMINI_API_KEY`

## 🚀 Quick Setup

### 1. Clone and Setup
```bash
git clone https://github.com/your-username/piq-test.git
cd piq-test
npm install
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit with your values
nano .env
```

### 3. Test Configuration
```bash
# Test Jira connection
npx pipelineiq test \
  --jira-url $JIRA_URL \
  --jira-email $JIRA_EMAIL \
  --jira-token $JIRA_TOKEN

# Test AI integration (optional)
npx pipelineiq test \
  --ai-provider gemini \
  --ai-api-key $AI_API_KEY
```

### 4. Run Tests
```bash
# Run all tests (some will fail to test PipelineIQ)
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:fail  # This will fail and trigger PipelineIQ
```

## 🔄 Testing PipelineIQ

### Method 1: GitHub Actions
1. Push changes to trigger the workflow
2. Intentionally break a test to see PipelineIQ in action
3. Check your Jira project for the created ticket

### Method 2: Azure DevOps
1. Import repository into Azure DevOps
2. Create pipeline using `azure-pipelines.yml`
3. Configure variable group with secrets
4. Run pipeline and check Jira for tickets

### Method 3: Local Testing
```bash
# Simulate a failure
npm run test:fail

# Analyze with PipelineIQ
pipelineiq analyze \
  --logs-path ./logs \
  --config ./pipelineiq-config.json \
  --jira-url $JIRA_URL \
  --jira-email $JIRA_EMAIL \
  --jira-token $JIRA_TOKEN \
  --jira-project $JIRA_PROJECT
```

## 📊 Expected Results

When a pipeline fails, PipelineIQ will create a Jira ticket with:

### **Basic Information**
- ✅ **Project**: Your specified Jira project
- ✅ **Issue Type**: Bug (or configured type)
- ✅ **Summary**: AI-generated or template-based
- ✅ **Description**: Rich markdown with failure details

### **AI-Enhanced Content** (if AI enabled)
- 🤖 **Root Cause Analysis**: AI-generated explanation
- 🛠 **Remediation Steps**: Specific fix instructions
- 📊 **Severity Classification**: Critical/High/Medium/Low
- 🏷 **Smart Tags**: Relevant labels and categories

### **Context Information**
- 🔗 **Repository Links**: GitHub/Azure DevOps URLs
- 🌿 **Branch Information**: Source branch details
- 📝 **Commit Details**: Commit SHA and message
- 🌍 **Environment**: Development/Staging/Production
- 👤 **Assignee**: Suggested or default assignee

## 🔧 Configuration Options

### PipelineIQ Configuration (`pipelineiq-config.json`)
```json
{
  "jira": {
    "project": "DEVOPS",           // Your Jira project key
    "issueType": "Bug",             // Issue type to create
    "strictGDPR": true              // Enable GDPR compliance
  },
  "ai": {
    "mode": "assist",               // disabled | assist | full
    "provider": "gemini",            // openai | anthropic | gemini
    "model": "gemini-2.5-flash",    // AI model to use
    "confidence": 0.7               // Minimum confidence threshold
  },
  "dedup": {
    "enabled": true,                // Enable deduplication
    "windowHours": 24               // Time window for matching
  }
}
```

### Custom Fields Mapping
```json
{
  "customFields": {
    "repository": "customfield_10010",
    "branch": "customfield_10011",
    "commit": "customfield_10012",
    "pipeline": "customfield_10013",
    "environment": "customfield_10014"
  }
}
```

## 🚨 Troubleshooting

### Common Issues

#### 1. "Jira project not found"
- **Cause**: Incorrect project key or permissions
- **Fix**: Verify project key and API permissions
- **Test**: `curl -H "Authorization: Bearer $JIRA_TOKEN" "$JIRA_URL/rest/api/3/project/PROJECT_KEY"`

#### 2. "AI API key invalid"
- **Cause**: Incorrect or expired API key
- **Fix**: Regenerate API key and update secrets
- **Test**: Test with CLI or API documentation

#### 3. "No logs found"
- **Cause**: Logs not in expected location
- **Fix**: Check log paths in workflow configuration
- **Solution**: Ensure logs are saved to `./logs` directory

#### 4. "Permission denied"
- **Cause**: Insufficient Jira permissions
- **Fix**: Grant "Create Issues" permission to service account
- **Check**: Jira project permissions and API tokens

### Debug Mode
Enable debug logging to troubleshoot issues:
```bash
# Set debug environment variable
export DEBUG=pipelineiq:*

# Run with verbose output
pipelineiq analyze --verbose --config ./pipelineiq-config.json
```

## 📚 Additional Resources

- [PipelineIQ Documentation](https://github.com/meetpatel1111/PipelineIQ)
- [Jira API Documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Gemini API Documentation](https://ai.google.dev/docs)

## 🎉 Success!

Once configured, your PipelineIQ testing repository will automatically:
1. **Detect** CI/CD failures in both GitHub Actions and Azure DevOps
2. **Analyze** failures with AI-powered insights
3. **Create** rich Jira tickets in your specified project
4. **Deduplicate** to prevent ticket spam
5. **Enrich** with operational context and links

Your PipelineIQ integration is ready to bridge your CI/CD failures to Jira! 🚀
