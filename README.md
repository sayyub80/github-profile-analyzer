## GitHub Profile Analyzer
A React + TypeScript app with ShadCN UI to fetch and display GitHub user repositories and commit activity.

# 🚀 Technologies Used
1.Frontend: React.js

2.UI Components: ShadCN

3.Language: TypeScript

4.API: GitHub REST API

5.Charts: Recharts

# 📦 How to Run the Project Locally
Prerequisites
Node.js (v18+)

npm / yarn

Setup Steps
Clone/Download the Project

sh
Copy
git clone [your-repo-url] (if applicable)
cd github-profile-analyzer
Install Dependencies

sh
Copy
npm install
# or
yarn install
Run the Development Server

sh
Copy
npm start
# or
yarn start
App will open at http://localhost:3000.


# 🌐 How to Deploy (For Reviewers)
Option 1: Vercel / Netlify (Recommended)
Push your code to a GitHub repository.

Import the repo into:

Vercel (for React apps)

Netlify

Deploy with default settings.

Option 2: Local Build
Generate a production build:

sh
Copy
npm run build
Host the build/ folder on any static hosting service (e.g., GitHub Pages, Surge).

🔍 Features Implemented
GitHub Username Input

Fetches and displays public repositories.

Repository List

Shows repo names, descriptions, and stars.

Commit Activity Chart (Advanced)

Visualizes daily commits using Recharts.


# 🛠 Troubleshooting
CORS Issues? Use a local proxy or deploy to bypass GitHub API limits.

ShadCN Not Loading? Run npx shadcn-ui@latest init again.