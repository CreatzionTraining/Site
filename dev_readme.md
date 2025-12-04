# -----------------------------
# Initialize a new project repo and pushing first time
# -----------------------------
git init                   # Start a new Git repository
git add .                  # Stage all project files
git commit -m "first commit"   # Create the first commit

git branch -M main         # Rename branch to main
git remote add origin <repo-url>   # Connect local repo to GitHub
git push -u origin main    # Push code to GitHub main branch


# -----------------------------
# Clone an existing repository and pushing first time
# -----------------------------
git clone <repo-url>       # Download the full project
cd <project-folder>        # Enter the project directory
npm install                # Install dependencies
git init                   # Start a new Git repository
git add .                  # Stage all project files
git commit -m "first commit"   # Create the first commit

git branch -M main         # Rename branch to main
git remote add origin <repo-url>   # Connect local repo to GitHub
git push -u origin main    # Push code to GitHub main branch


# -----------------------------
# Start the development server
# -----------------------------
npm run dev                # Run the project locally


# -----------------------------------------
# Pull latest updates BEFORE starting work
# -----------------------------------------
git pull origin main       # Get updates from GitHub main branch

# -----------------------------------------
# Push latest updates AFTER work done
# -----------------------------------------
git add .                  # Stage all project files
git commit -m "first commit"
git push -u origin main    # Push code to GitHub main branch



Thank you okay gkab sfsf sakhiter