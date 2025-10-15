import { useVenuesApi } from "../../common/getVenuesUrl";
import { AllVenuesHtml } from "./../../components/VenuesHtml/AllVenuesHtml";
import { useFilteredVenues } from "./../../components/Search/Search"; 
import { useOutletContext } from "react-router-dom";

type ContextType = { searchTerm: string };

export function Home() {
  const { venues, isLoading, isError } = useVenuesApi();
  const { searchTerm } = useOutletContext<ContextType>();

  const filteredVenues = useFilteredVenues({ venues, searchTerm });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Browse our venues</h2>
      <AllVenuesHtml
        venues={filteredVenues}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}


