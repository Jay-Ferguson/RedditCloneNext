'use client';


import { Prisma, Subreddit } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CommandGroup, CommandInput } from "cmdk";
import { debounce } from "lodash";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { Command, CommandEmpty, CommandItem, CommandList } from "./Command";
interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>("");

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Subreddit & {
        _count: Prisma.SubredditCountOutputType;
      })[];
    },
    queryKey: ["search-query"],
    enabled: false,
  });

const request = debounce(async() => {
  refetch();
}, 300)

  const debounceRequest = useCallback(() => {
    request()
  }, []);

  const router = useRouter();

  return (
    <div>
      <Command className="relative rounded-lg border- max-w-lg overflow-vissible">
        <CommandInput
          className="outline-none border-none focus:border-none focus:outline-none ring-0"
          placeholder="search communities...."
          value={input}
          onValueChange={(text) => {
            setInput(text);
            debounceRequest();
          }}
        />

        {input.length > 0 ? (
          <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
            {isFetched && <CommandEmpty> No results found</CommandEmpty>}
            {(queryResults?.length ?? 0) > 0 ? (
              <CommandGroup heading="Communities">
                {queryResults?.map((subreddit) => (
                  <CommandItem
                    onSelect={(e) => {
                      router.push(`/r/${e}`);
                      router.refresh();
                    }}
                    key={subreddit.id}
                    value={subreddit.name}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <a href={`/r/${subreddit.name}`}>r/{subreddit.name}</a>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
          </CommandList>
        ) : null}
      </Command>
    </div>
  );
};

export default SearchBar;
