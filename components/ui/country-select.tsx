"use client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CountryFlag from "react-country-flag";
import { Country } from 'country-state-city'

interface CountrySelectProps {
  onValueChange: (value: string) => void;
  value?: string;
}

export function CountrySelect({ onValueChange, value }: CountrySelectProps) {
  const [options, setOptions] = useState<any[]>([]); // Country options

  useEffect(() => {
    const countryList = Country.getAllCountries().map((country) => ({
      label: country.name,
      value: country.name, // You can use ISO code here if needed
      flag: country.flag, // Flag emoji from the library
    }));
    setOptions(countryList);
  }, []);

  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Country" />
      </SelectTrigger>
      <SelectContent>
        {options.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            <div className="flex items-center">
              <CountryFlag
                countryCode={country.value.toLowerCase()} // Ensure country code is lowercase
                svg
                className="mr-2 h-4 w-4"
              />
              {country.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
