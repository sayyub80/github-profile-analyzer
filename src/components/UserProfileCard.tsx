
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GitHubUser } from "@/types/github";
import { CalendarIcon, FileCode, Github, MapPin, Users } from "lucide-react";

interface UserProfileCardProps {
  user: GitHubUser;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const formattedDate = new Date(user.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-24 bg-github" />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col items-center -mt-12 md:-mt-16">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-background"
          />
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary flex items-center justify-center gap-1"
            >
              <Github className="h-4 w-4" />
              @{user.login}
            </a>
          </div>

          {user.bio && <p className="mt-4 text-center">{user.bio}</p>}

          <div className="grid grid-cols-2 md:flex gap-4 mt-6">
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="mt-1 text-lg font-semibold">{user.followers}</span>
              <span className="text-xs text-muted-foreground">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="mt-1 text-lg font-semibold">{user.following}</span>
              <span className="text-xs text-muted-foreground">Following</span>
            </div>
            <div className="flex flex-col items-center">
              <FileCode className="h-5 w-5 text-muted-foreground" />
              <span className="mt-1 text-lg font-semibold">{user.public_repos}</span>
              <span className="text-xs text-muted-foreground">Repositories</span>
            </div>
            <div className="flex flex-col items-center">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <span className="mt-1 text-lg font-semibold">
                {new Date(user.created_at).getFullYear()}
              </span>
              <span className="text-xs text-muted-foreground">Joined</span>
            </div>
          </div>

          <div className="mt-6 w-full grid gap-2 text-sm">
            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.location}</span>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <a
                  href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary truncate"
                >
                  {user.blog}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>Joined on {formattedDate}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
