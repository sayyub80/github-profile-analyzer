
import { toast } from "sonner";
import { GitHubCommitActivity, GitHubRepo, GitHubUser, LanguageStats } from "@/types/github";

const BASE_URL = "https://api.github.com";

export async function fetchUser(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    if (!response.ok) {
      if (response.status === 404) {
        toast.error("User not found");
        return null;
      }
      
      if (response.status === 403) {
        toast.error("API rate limit exceeded. Try again later.");
        return null;
      }
      
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    toast.error("Failed to fetch user information");
    return null;
  }
}

export async function fetchRepositories(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) {
      if (response.status === 403) {
        toast.error("API rate limit exceeded. Try again later.");
        return [];
      }
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching repositories:", error);
    toast.error("Failed to fetch repositories");
    return [];
  }
}

export async function fetchCommitActivity(username: string, repo: string): Promise<GitHubCommitActivity[]> {
  try {
    const response = await fetch(`${BASE_URL}/repos/${username}/${repo}/stats/commit_activity`);
    if (!response.ok) {
      if (response.status === 403) {
        console.warn("API rate limit exceeded for commit activity");
        return [];
      }
      
      if (response.status === 404) {
        console.warn(`No commit activity for ${repo}`);
        return [];
      }
      
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching commit activity for ${repo}:`, error);
    return [];
  }
}

export async function fetchLanguages(username: string, repo: string): Promise<LanguageStats> {
  try {
    const response = await fetch(`${BASE_URL}/repos/${username}/${repo}/languages`);
    if (!response.ok) {
      return {};
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching languages for ${repo}:`, error);
    return {};
  }
}

export async function fetchCommitStats(username: string): Promise<{ [date: string]: number }> {
  try {
    // Get user's repos
    const repos = await fetchRepositories(username);
    
    // Only look at the top 5 non-fork repos by stars to avoid rate limiting
    const topRepos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5);
    
    // Fetch commit activity for each repo
    const commitActivities = await Promise.all(
      topRepos.map(repo => fetchCommitActivity(username, repo.name))
    );
    
    // Process the data to count commits by date (last year)
    const commitsByDate: { [date: string]: number } = {};
    
    // Get current date and date 1 year ago
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    // Initialize dates for the past year with 0 commits
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      commitsByDate[dateStr] = 0;
    }
    
    // Fill in the actual commit counts
    commitActivities.forEach(repoActivity => {
      repoActivity.forEach(weekData => {
        const weekStart = new Date(weekData.week * 1000);
        
        weekData.days.forEach((count, dayIndex) => {
          const date = new Date(weekStart);
          date.setDate(date.getDate() + dayIndex);
          
          // Only include dates within our range
          if (date >= oneYearAgo && date <= today) {
            const dateStr = date.toISOString().split('T')[0];
            if (commitsByDate[dateStr] !== undefined) {
              commitsByDate[dateStr] += count;
            }
          }
        });
      });
    });
    
    return commitsByDate;
  } catch (error) {
    console.error("Error fetching commit stats:", error);
    return {};
  }
}
