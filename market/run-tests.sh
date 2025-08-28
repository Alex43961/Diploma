#!/bin/bash

echo "Starting Playwright Tests for Market App..."
echo

echo "Installing Playwright browsers if needed..."
npx playwright install

echo
echo "Running Playwright tests..."
npm run test:e2e

echo
echo "Tests completed!"
