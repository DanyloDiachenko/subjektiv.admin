#!/usr/bin/env node

const { execSync } = require('child_process');
const { platform } = require('os');

// Function to open a URL in the default browser
function openUrl(url) {
    const start = platform() === 'darwin' ? 'open' : platform() === 'win32' ? 'start' : 'xdg-open';
    execSync(`${start} ${url}`);
}

// Base URL and target branch for the pull request
const githubBaseUrl = 'https://github.com/Subjektiv-co';
const targetBranch = 'dev';

// Helper function to execute a command and return its output
function execCommand(command) {
    try {
        return execSync(command).toString().trim();
    } catch (error) {
        // If the command fails (e.g., the submodule does not exist), exit the script.
        console.error(error.message);
        process.exit(1);
    }
}

// Get the submodule name from the command line argument
const submoduleArg = process.argv[2];

let prUrl;

if (submoduleArg) {
    // Find the submodule and branch information using git
    const submoduleStatus = execCommand(`git submodule status | grep "${submoduleArg}"`);

    // Extract the branch name using a regular expression
    const branchRegex = /\(([^)]+)\)/;
    const branchMatch = submoduleStatus.match(branchRegex);
    if (!branchMatch) {
        console.error('Error: Could not extract branch name from submodule status.');
        process.exit(1);
    }
    let branchName = branchMatch[1];

    // Remove 'heads/' from the branch name if it is present
    branchName = branchName.replace(/^heads\//, '');

    // Construct the full URL for the submodule pull request
    prUrl = `${githubBaseUrl}/${submoduleArg}/compare/${targetBranch}...${branchName}`;
} else {
    // No submodule provided, open PR for the root repository
    const rootRepoUrl = execCommand('git config --get remote.origin.url');
    const rootBranchName = execCommand('git rev-parse --abbrev-ref HEAD');

    // Remove the .git extension and possible git@ prefix in the repo URL
    const normalizedRootRepoUrl = rootRepoUrl
        .replace(/^git@/, 'https://')
        .replace(/\.git$/, '')
        .replace(/\bgithub\.com:/, 'github.com/');

    // Construct the full URL for the root repository pull request
    prUrl = `${normalizedRootRepoUrl}/compare/${targetBranch}...${rootBranchName}`;
}

// Open the URL in the default web browser
openUrl(prUrl);

// Output the URL for verification
console.log(`Opening PR URL: ${prUrl}`);
