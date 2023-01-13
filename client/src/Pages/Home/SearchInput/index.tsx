import { useEffect, useState } from "react";
import { PostType } from "..";

export const SearchInput = ({ posts, setInputText }: SearchInputProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    // if (searchInput.length > 0) {
    //   posts.filter((post) => {
    //     console.log("filtered posts", post.title.match(searchInput));
    //     return post.title.match(searchInput);
    //   });
    // }
  };

  useEffect(() => {
    setInputText(searchInput);
  }, [searchInput]);

  return (
    <input
      type="search"
      placeholder="Search here"
      style={{ width: "300px" }}
      onChange={(e) => handleChange(e)}
      value={searchInput}
    />
  );
};

interface SearchInputProps {
  posts: PostType[];
  setInputText: (text: string) => void;
}
