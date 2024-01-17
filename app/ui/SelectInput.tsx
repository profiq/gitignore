/**
 * A component that renders a searchable multi-select input field with tech options
 * @returns A React component.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Select, { InputActionMeta, MultiValue } from "react-select";
import { useRouter } from "next/navigation";

// function for searching tech options
import searchTechOptions from "@/app/api/lib/search";
import clsx from "clsx";

export default function SelectInput({
  className,
  searchParams,
}: {
  className?: string;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // state for currently searched tech options
  const [techOptions, setTechOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const inputRef = useRef<any>(null);

  // state for current search string
  const [search, setSearch] = useState<string>("");

  // state for currently selected options
  const [val, setValue] = useState<string[]>(
    searchParams.options
      ? [searchParams.options].flat().join(",").split(",")
      : [],
  );

  // state for remove duplicate rules checkbox
  const [remDupl, setRemDupl] = useState<boolean>(
    searchParams.remDupl
      ? (searchParams.remDupl as string).toLowerCase() != "false"
      : true,
  );

  // next.js navigation hooks for working with params
  const router = useRouter();

  // syncing search params with state
  useEffect(() => {
    setValue(
      searchParams.options ? (searchParams.options as string).split(",") : [],
    );
    setRemDupl(
      searchParams.remDupl
        ? (searchParams.remDupl as string).toLowerCase() != "false"
        : true,
    );
  }, [searchParams]);

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

  // focus on input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // if options are selected, prefetch result page
    if (val.length > 0) {
      // creating URLSearchParams object from search searchParams
      const params = new URLSearchParams();
      Object.keys(searchParams).forEach((key) => {
        params.append(key, [searchParams[key]].flat().join(","));
      });

      // prefetching result page
      router.prefetch(`/result?${params.toString()}`);
    }
  }, []);

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
    console.log(val);
    console.log(value);

    // creating URLSearchParams object from search searchParams
    const params = new URLSearchParams();
    Object.keys(searchParams).forEach((key) => {
      params.append(key, [searchParams[key]].flat().join(","));
    });

    // setting options param
    if (value.length > 0) {
      params.set("options", value.map((option) => option.value).join(","));
    } else {
      params.delete("options");
    }

    // setting selected options state
    setValue(value.map((option) => option.value));

    // replacing current url with new params
    router.replace(`/?${params.toString()}`);

    // prefetching result page
    if (value.length > 0) router.prefetch(`/result?${params.toString()}`);
  }

  function handleRemDuplChange(value: boolean) {
    console.log(value);

    // creating URLSearchParams object from search searchParams
    const params = new URLSearchParams();
    Object.keys(searchParams).forEach((key) => {
      params.append(key, [searchParams[key]].flat().join(","));
    });

    // setting remDupl param
    params.set("remDupl", value.toString());

    // setting remDupl state
    setRemDupl(value);

    // replacing current url with new params
    router.replace(`/?${params.toString()}`);

    // prefetching result page
    if (val.length > 0) router.prefetch(`/result?${params.toString()}`);
  }

  // function for handling submit on enter or button click
  const handleSubmit = () => {
    // if no options are selected, do nothing
    if (!searchParams.options) {
      return;
    }

    // creating URLSearchParams object from search searchParams
    const params = new URLSearchParams();
    Object.keys(searchParams).forEach((key) => {
      params.append(key, [searchParams[key]].flat().join(","));
    });

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
      <div
        className="mx-auto scale-125 flex flex-col w-2/3 m-20 mb-4 order-first" // scaling and adjusting width
      >
        <div className="flex flex-row">
          <Select
            ref={inputRef}
            className="flex-grow"
            // selected options
            value={val.map((option) => ({ value: option, label: option }))}
            // searched tech options
            options={techOptions}
            // enabling multi select
            isMulti
            // connecting value to search state
            inputValue={search}
            // disabling built-in search logic
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
                ":hover": {
                  borderColor: "var(--profiq-blue-light)",
                },
                height: "100%",
              }),
              menuList: (baseStyles, state) => ({
                ...baseStyles,
                maxHeight: "270px",
              }),
            }}
          />

          <button
            className={clsx(
              "ml-0.5 rounded-r text-white py-2 px-4 border-0 cursor-pointer",
              val.length > 0
                ? " bg-profiq-green hover:bg-profiq-blue"
                : "bg-gray-400 cursor-not-allowed",
            )}
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
        {/* Select note */}
        <div className="text-xs pl-2.5 pt-0.5">
          Search programming languages, IDEs, or OS
        </div>
      </div>
      {/* remove duplicates checkbox */}
      <div className={clsx("mt-5 flex flex-row justify-center items-center")}>
        <input
          className={clsx(
            "bg-checkbox bg-white checked:bg-profiq-green bg-bottom checked:bg-center bg-[length:0.5rem] checked:bg-[length:1.25rem] bg-no-repeat ",
            "transition-all duration-200",
            "rounded border border-gray-300 checked:border-profiq-green outline-none",
            "float-left appearance-none	 block h-5 w-5 m-0 p-0  cursor-pointer",
          )}
          id="chbx-rmeDupl"
          type="checkbox"
          checked={remDupl}
          onChange={(e) => handleRemDuplChange(e.currentTarget.checked)}
        />

        <label
          className={clsx("px-3 leading-4 h-4 cursor-pointer")}
          htmlFor="chbx-rmeDupl"
        >
          Remove dupplicate rules
        </label>
      </div>
    </div>
  );
}
