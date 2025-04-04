
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GitHubRepo } from "@/types/github";
import { Calendar, FileCode, Github, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RepositoryListProps {
  repositories: GitHubRepo[];
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  if (repositories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Repositories</CardTitle>
          <CardDescription>No repositories found</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Sort repositories by stars (desc) and then update date (desc)
  const sortedRepos = [...repositories].sort((a, b) => {
    // First by star count
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }
    // Then by update date
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-5 w-5" />
          Repositories ({repositories.length})
        </CardTitle>
        <CardDescription>Public repositories created or forked by this user</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden sm:table-cell">Language</TableHead>
                <TableHead className="text-right">Stars</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRepos.map((repo) => (
                <TableRow key={repo.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline flex items-center gap-1 group"
                      >
                        {repo.name}
                        <Github className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      {repo.fork && (
                        <span className="text-xs text-muted-foreground">Forked</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {repo.description ? (
                      <span className="line-clamp-2">{repo.description}</span>
                    ) : (
                      <span className="text-muted-foreground italic">No description</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {repo.language ? (
                      <Badge variant="outline">{repo.language}</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Star className="h-4 w-4 text-amber-400" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right text-sm text-muted-foreground">
                    <div className="flex items-center justify-end gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(repo.updated_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
