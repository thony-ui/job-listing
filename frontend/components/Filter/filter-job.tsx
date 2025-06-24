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

interface IJobProps {
  jobRoles: string[];
  selectedJobRole: string;
  onJobRoleChange: (value: string) => void;

  open: boolean;
  setOpen: (open: boolean) => void;
}

export function JobFilter({
  jobRoles,
  selectedJobRole,
  onJobRoleChange,
  open,
  setOpen,
}: IJobProps) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] sm:w-[270px] justify-between text-gray-500"
        >
          {selectedJobRole !== "" ? selectedJobRole : "Select job role"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] sm:w-[270px] p-0">
        <Command>
          <CommandInput placeholder="Search job role..." />
          <CommandList>
            <CommandEmpty>No job role found.</CommandEmpty>
            <CommandGroup>
              {jobRoles.map((role) => (
                <CommandItem
                  key={role}
                  value={role}
                  onSelect={(currentValue) => {
                    onJobRoleChange(
                      currentValue === selectedJobRole ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedJobRole === role ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {role}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
