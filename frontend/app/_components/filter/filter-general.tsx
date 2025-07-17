"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ICompanyProps {
  value: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;

  open: boolean;
  setOpen: (open: boolean) => void;

  placeholder: string;
}

export function GeneralFilter({
  value,
  selectedValue,
  onValueChange,
  open,
  setOpen,
  placeholder,
}: ICompanyProps) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] sm:w-[270px] justify-between text-gray-500"
        >
          <p className="truncate">
            {selectedValue !== "" ? selectedValue : placeholder}
          </p>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] sm:w-[270px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {value.map((company) => (
                <CommandItem
                  key={company}
                  value={company}
                  onSelect={(currentValue) => {
                    onValueChange(
                      currentValue === selectedValue ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === company ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {company}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
