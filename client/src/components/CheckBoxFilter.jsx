import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const options = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Grape",
  "Mango",
  "Orange",
  "Peach",
  "Strawberry",
  "Watermelon",
];

export default function CheckBoxFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSearch = (e) => setSearch(e.target.value);
  const handleSelect = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-64">
      <Button
        onClick={toggleDropdown}
        className="w-full flex justify-between items-center"
      >
        Select Options
        <ChevronDown className="w-4 h-4" />
      </Button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10"
        >
          <Input
            type="text"
            placeholder="Filter..."
            value={search}
            onChange={handleSearch}
            className="mb-2 w-full"
          />
          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <Checkbox
                    checked={selected.includes(option)}
                    onChange={() => handleSelect(option)}
                  />
                  {option}
                </label>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center">
                No results found
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
