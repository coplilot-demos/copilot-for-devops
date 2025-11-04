# Scripts

This directory contains utility scripts for managing the repository.

## delete-workflow-runs.sh

Deletes all GitHub Actions workflow runs from the repository.

### Prerequisites

- [GitHub CLI (gh)](https://cli.github.com/) installed
- GitHub personal access token with `repo` and `workflow` permissions

### Usage

#### Running locally:

```bash
# Set your GitHub token
export GH_TOKEN=your_personal_access_token

# Run the script
./scripts/delete-workflow-runs.sh
```

#### Running in GitHub Actions:

```yaml
- name: Delete all workflow runs
  env:
    GH_TOKEN: ${{ github.token }}
  run: ./scripts/delete-workflow-runs.sh
```

### What it does

1. Fetches all workflow runs for the repository
2. Iterates through each run and deletes it
3. Provides a summary of successful and failed deletions

### Notes

- Deleting workflow runs requires appropriate permissions
- Some runs may fail to delete if they are currently in progress
- The script will continue even if individual deletions fail
