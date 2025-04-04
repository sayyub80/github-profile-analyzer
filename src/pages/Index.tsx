
import { UserSearchBar } from "@/components/UserSearchBar";
import { useState } from "react";
import { GitHubRepo, GitHubUser } from "@/types/github";
import { UserProfileCard } from "@/components/UserProfileCard";
import { RepositoryList } from "@/components/RepositoryList";
import { CommitsActivityChart } from "@/components/CommitsActivityChart";
import { RepositoryListSkeleton } from "@/components/RepositoryListSkeleton";
import { UserProfileSkeleton } from "@/components/UserProfileSkeleton";
import { fetchCommitStats, fetchRepositories, fetchUser } from "@/services/githubService";
import { Github } from "lucide-react";

const Index = () => {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [commitsData, setCommitsData] = useState<{ [date: string]: number }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const handleSearch = async (searchUsername: string) => {
    setIsLoading(true);
    setUsername(searchUsername);
    
    try {
      // Fetch user data
      const userData = await fetchUser(searchUsername);
      if (!userData) {
        setIsLoading(false);
        return;
      }
      
      setUser(userData);
      
      // Fetch repositories
      const repos = await fetchRepositories(searchUsername);
      setRepositories(repos);
      
      // Fetch commit stats (this can take longer)
      const commits = await fetchCommitStats(searchUsername);
      setCommitsData(commits);
      
      setDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <h1 className="text-xl font-bold">GitHub Profile Analyzer</h1>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">GitHub Profile Analyzer</h1>
            <p className="text-muted-foreground mb-8">
              Enter a GitHub username to view their repositories and activity
            </p>
            <div className="flex justify-center">
              <UserSearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </section>

          {isLoading || dataLoaded ? (
            <div className="grid gap-8">
              {isLoading ? (
                <>
                  <UserProfileSkeleton />
                  <RepositoryListSkeleton />
                </>
              ) : (
                <>
                  {user && <UserProfileCard user={user} />}
                  <CommitsActivityChart 
                    commitsData={commitsData}
                    isLoading={isLoading} 
                  />
                  <RepositoryList repositories={repositories} />
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center p-8 bg-muted rounded-full mb-4">
                <Github className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No Profile Selected</h2>
              <p className="text-muted-foreground">
                Enter a GitHub username above to see their profile and repositories
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-card border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            GitHub Profile Analyzer • Uses the{" "}
            <a
              href="https://docs.github.com/en/rest"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              GitHub API
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
