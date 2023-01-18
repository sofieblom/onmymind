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
        onChange={(e) => handleChange(e)}
        value={searchInput}
      />
    </>
  );
};

interface SearchInputProps {
  posts: PostType[];
  setInputText: (text: string) => void;
}
