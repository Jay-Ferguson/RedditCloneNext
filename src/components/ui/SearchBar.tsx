import { FC } from "react";
import { Command } from "./Command";
import { Dialog } from "./Dialog";
import { CommandInput } from "cmdk";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const {} = useQuery({
    queryFn: async () => {
      if (!input) return [];
    },
    queryKey: ["search-query"],
    enabled: false,
  });
  return (
    <div>
      <Command className="relative rounded-lg border- max-w-lg overflow-vissible">
        <CommandInput
          className="outline-none border-none focus:border-none focus:outline-none ring-0"
          placeholder="search communities...."
          value={input}
          onValueChange={(text) => {
            setInput(text);
          }}
        />
      </Command>
    </div>
  );
};

export default SearchBar;
