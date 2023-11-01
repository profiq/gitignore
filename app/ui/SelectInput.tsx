"use client";

// import { MultiSelect, ComboboxItem, OptionsFilter, MultiSelectFactory } from '@mantine/core';
import { searchTechOptions } from "@/app/api/lib/techOptions";
import { useEffect, useRef, useState } from "react";
import Select, { InputActionMeta, MultiValue } from "react-select";
import { get } from "http";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import classes from "./SelectInput.module.css";

// const allTechOptions = searchTechOptions("").map((option) => ({ value: option, label: option }));

export default function SelectInput({
  queryParams,
}: {
  queryParams?: string[];
}) {
  const [techOptions, setTechOptions] = useState<
    { value: string; label: string }[]
  >([]);
  // const [selectedOptions, setSelectedOptions] = useState<MultiValue<{ value: string; label: string; }>>([]);
  const [search, setSearch] = useState<string>("");
  const msRef = useRef(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const getTechOptions = async () => {
      if (search.length === 0) {
        setTechOptions([]);
        return;
      }
      let a = await searchTechOptions(search);
      // console.log(a, techOptions)
      setTechOptions(a.map((option) => ({ value: option, label: option })));
    };
    getTechOptions();
  }, [search]);

  async function handleSearchChange(
    value: string,
    actionMeta: InputActionMeta,
  ) {
    setSearch(value);
  }

  function handleChange(value: MultiValue<{ value: string; label: string }>) {
    console.log(value);
    // setSelectedOptions(value)

    const params = new URLSearchParams(searchParams);
    if (value.length > 0) {
      params.set("options", value.map((option) => option.value).join(","));
    } else {
      params.delete("options");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  const handleSubmit = () => {
    // if(selectedOptions.length===0){
    if (!searchParams.get("options")) {
      return;
    }
    console.log("submit");

    const params = new URLSearchParams(searchParams);
    router.push(`/api/result?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.length === 0) {
      handleSubmit();
    }
  };
  return (
    <div className="flex flex-row">
      <Select
        value={
          searchParams
            .get("options")
            ?.split(",")
            .map((option) => ({ value: option, label: option })) || []
        }
        options={techOptions}
        isMulti
        inputValue={search}
        filterOption={(option, search) => true}
        onChange={handleChange}
        onInputChange={handleSearchChange}
        components={{
          DropdownIndicator: null,
        }}
        noOptionsMessage={(value) =>
          value.inputValue.length === 0
            ? "Enter at least one character"
            : "No options found"
        }
        styles={{
          container: (baseStyles, state) => ({
            ...baseStyles,
            width: "500px",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isRtl
              ? "var(--profiq-blue)"
              : state.isFocused
              ? "var(--profiq-blue-transparent)"
              : "white",
            color: state.isFocused ? "white" : "black",
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: "4px 0 0 4px",
            borderColor: "var(--profiq-blue)",
            height: "100%",
          }),
        }}
        onKeyDown={handleKeyDown}
      />
      <button className={classes.button} onClick={handleSubmit}>
        Create
      </button>
      {/*
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={techOptions}
      onSearchChange={handleSearchChange}
      filter={optionsFilter}
      hidePickedOptions
      searchable
      clearable
      selectFirstOptionOnChange
      ref={msRef}
      onChange={handleChange}
      value={selectedOptions}
      onKeyDown={(e) => {
        console.log(e.target)
        console.log(e.target as HTMLInputElement)
        if (e.key === "Enter") {
          //setSelectedOptions([...selectedOptions, techOptions.filter((option)=>selectedOptions.indexOf(option)===-1)[0]])
        }
      }

      }
    /> */}
    </div>
  );
}
