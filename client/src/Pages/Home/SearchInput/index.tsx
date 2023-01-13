import { Input, TextField } from "@mui/material";
import { height } from "@mui/system";
import { useEffect, useState } from "react";
import { PostType } from "..";
import styles from "./styles.module.scss";

export const SearchInput = ({ posts, setInputText }: SearchInputProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    <>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="Search for title"
        style={{ width: "300px" }}
        onChange={(e) => handleChange(e)}
        value={searchInput}
      />

      {/* <Input
        placeholder="Search by title"
        type="search"
        onChange={(e) => handleChange(e)}
        margin="none"
        size="small"
        className={styles.test}
        sx={{
          input: {
            color: "white",
            margin: "0px",
          },
        }}
      /> */}
    </>
  );
};

interface SearchInputProps {
  posts: PostType[];
  setInputText: (text: string) => void;
}
