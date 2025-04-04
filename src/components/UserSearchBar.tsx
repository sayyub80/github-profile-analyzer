
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";

interface UserSearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export function UserSearchBar({ onSearch, isLoading }: UserSearchBarProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Enter GitHub username"
          className="pl-9"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading || !username.trim()}>
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}
