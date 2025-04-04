
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="h-24 rounded-none" />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col items-center -mt-12 md:-mt-16">
          <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full" />
          <div className="mt-4 text-center w-full">
            <Skeleton className="h-7 w-40 mx-auto" />
            <Skeleton className="h-5 w-32 mx-auto mt-2" />
          </div>

          <Skeleton className="h-16 w-3/4 mx-auto mt-4" />

          <div className="grid grid-cols-2 md:flex gap-4 mt-6 w-full">
            <div className="flex flex-col items-center flex-1">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="mt-1 h-6 w-8" />
              <Skeleton className="h-3 w-16 mt-1" />
            </div>
            <div className="flex flex-col items-center flex-1">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="mt-1 h-6 w-8" />
              <Skeleton className="h-3 w-16 mt-1" />
            </div>
            <div className="flex flex-col items-center flex-1">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="mt-1 h-6 w-8" />
              <Skeleton className="h-3 w-16 mt-1" />
            </div>
            <div className="flex flex-col items-center flex-1">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="mt-1 h-6 w-8" />
              <Skeleton className="h-3 w-16 mt-1" />
            </div>
          </div>

          <div className="mt-6 w-full grid gap-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
