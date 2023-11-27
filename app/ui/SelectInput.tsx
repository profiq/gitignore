/**
 * A component that renders a searchable multi-select input field with tech options
 * @returns A React component.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Select, { InputActionMeta, MultiValue } from "react-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@mantine/core";

import classes from "./SelectInput.module.css";

// function for searching tech options
import { searchTechOptions } from "@/app/api/lib/techOptions";
import clsx from "clsx";

export default function SelectInput({ className }: { className?: string }) {
  // state for currently searched tech options
  const [techOptions, setTechOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // state for current search string
  const [search, setSearch] = useState<string>("");

  // next.js navigation hooks for working with params
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // get tech options on search change
  useEffect(() => {
    // asnyc wrapper function for getting tech options
    const getTechOptions = async () => {
      // if search is empty, clear tech options
      if (search.length === 0) {
        setTechOptions([]);
        return;
      }

      // get tech options
      let a = await searchTechOptions(search);
      // console.log(a, techOptions)
      setTechOptions(a.map((option) => ({ value: option, label: option })));
    };

    getTechOptions();
  }, [search]);

  // function for changing search state on search input change
  async function handleSearchChange(
    value: string,
    actionMeta: InputActionMeta,
  ) {
    setSearch(value);
  }

  // function for changing search params on select change
  function handleOptionsChange(
    value: MultiValue<{ value: string; label: string }>,
  ) {
    console.log(value);

    const params = new URLSearchParams(searchParams);
    if (value.length > 0) {
      params.set("options", value.map((option) => option.value).join(","));
    } else {
      params.delete("options");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleRemDuplChange(value: boolean) {
    console.log(value);

    const params = new URLSearchParams(searchParams);
    params.set("remDupl", value.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  // function for handling submit on enter or button click
  const handleSubmit = () => {
    if (!searchParams.get("options")) {
      return;
    }
    console.log("submit");

    const params = new URLSearchParams(searchParams);

    // redirecting to result page
    router.push(`/result?${params.toString()}`);
  };

  // function for handling enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.length === 0) {
      handleSubmit();
    }
  };

  return (
    <div className={clsx(className, "w-full flex flex-col")}>
      <Checkbox
        checked={
          searchParams.get("remDupl")
            ? searchParams.get("remDupl")?.toLowerCase() != "false"
            : true
        }
        onChange={(e) => handleRemDuplChange(e.currentTarget.checked)}
        className="mt-10 flex flex-row justify-center items-center"
        label="Remove dupplicate rules"
        color="var(--profiq-green)"
        styles={{ body: { zIndex: "0!important" } }}
      />

      <div
        className={clsx(
          "mx-auto scale-150 flex flex-row w-2/3 m-20 mb-0 order-first", // scaling and adjusting width
        )}
      >
        <Select
          className="flex-grow"
          // getting selected options from search params
          value={
            searchParams
              .get("options")
              ?.split(",")
              .map((option) => ({ value: option, label: option })) || []
          }
          // searched tech options
          options={techOptions}
          // enabling multi select
          isMulti
          // connecting value to search state
          inputValue={search}
          // disabling built-in serch logic
          filterOption={(option, search) => true}
          onChange={handleOptionsChange}
          onInputChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          // disabling dropdown indicator
          components={{
            DropdownIndicator: null,
          }}
          // different messages if not found or no input
          noOptionsMessage={(value) =>
            value.inputValue.length === 0
              ? "Enter at least one character"
              : "No options found"
          }
          // custom styles
          styles={{
            // width: if all select element
            container: (baseStyles, state) => ({
              ...baseStyles,
              width: "500px",
            }),

            // color of selected option in dropdown
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isFocused
                ? "var(--profiq-blue-transparent)"
                : "white",
              color: state.isFocused ? "white" : "black",
            }),
            multiValue: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "var(--profiq-green-shaddow)",
              color: "white",
            }),
            multiValueLabel: (baseStyles, state) => ({
              ...baseStyles,
              color: "white",
            }),
            multiValueRemove: (baseStyles, state) => ({
              ...baseStyles,
              ":hover": {
                backgroundColor: "#ffbdadad",
              },
            }),
            // styling of main component
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow: "0",
              borderRadius: "4px 0 0 4px",
              borderColor: state.isFocused
                ? "var(--profiq-blue)"
                : "var(--profiq-green)",
              ":hover": state.isFocused
                ? {
                    borderColor: "var(--profiq-blue-light)",
                  }
                : {
                    borderColor: "var(--profiq-blue-light)",
                  },
              height: "100%",
            }),
          }}
        />

        <button
          className={clsx(classes.button, "ml-0.5")}
          onClick={handleSubmit}
        >
          Create
        </button>
      </div>
    </div>
  );
}
