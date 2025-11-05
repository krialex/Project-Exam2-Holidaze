import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SearchBarProps = {
  searchTerm: string;
  onSearch: (term: string) => void;
};

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onSearch(e.target.value);
  }

  return (
    <div className="mt-8 text-center">
      <h1 className="font-henny text-4xl text-white dark:text-indigo-900">Where is your next destination?</h1>
      <div className="flex gap-1 max-w-xs mx-auto mt-4 p-1 rounded-md shadow-md bg-white dark:bg-gray-700">
        <FontAwesomeIcon icon={faLocationDot} className="text-[#6B37F8] dark:text-white" />
        <input
          type="text"
          aria-label="search"
          placeholder="Where to..."
          value={searchTerm}
          onChange={handleChange}
          className="border-none w-full focus:outline-none bg-white text-black dark:text-white dark:bg-gray-700"
        />
      </div>
    </div>
  );
}

