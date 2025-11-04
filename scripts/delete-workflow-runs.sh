#!/bin/bash

# Script to delete all GitHub Actions workflow runs
# 
# Usage: 
#   Local: GH_TOKEN=your_token ./scripts/delete-workflow-runs.sh
#   In Actions: GH_TOKEN=${{ github.token }} ./scripts/delete-workflow-runs.sh
#
# Requirements:
#   - GitHub CLI (gh) installed
#   - Valid GitHub token with repo and workflow permissions

set -e

REPO="${GITHUB_REPOSITORY:-copilot-demos/copilot-for-devops}"

# Check if GH_TOKEN is set
if [ -z "$GH_TOKEN" ]; then
    echo "Error: GH_TOKEN environment variable is not set"
    echo "Please set it with: export GH_TOKEN=your_token"
    exit 1
fi

echo "Fetching all workflow runs for repository: $REPO"

# Get all workflow runs and delete them
run_count=0
deleted_count=0
failed_count=0

# Use process substitution to preserve counter values
while read -r run_id; do
    ((run_count++))
    echo "Deleting workflow run: $run_id"
    
    if gh api -X DELETE "repos/$REPO/actions/runs/$run_id" 2>/dev/null; then
        ((deleted_count++))
        echo "  ✓ Deleted run $run_id"
    else
        ((failed_count++))
        echo "  ✗ Failed to delete run $run_id (may require admin permissions)"
    fi
done < <(gh api "repos/$REPO/actions/runs" --paginate --jq '.workflow_runs[].id')

echo ""
echo "Summary:"
echo "  Total runs found: $run_count"
echo "  Successfully deleted: $deleted_count"
echo "  Failed to delete: $failed_count"
