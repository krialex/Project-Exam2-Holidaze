import { useVenuesApi } from "../../common/getVenuesUrl";
import styles from "./home.module.css";
import { AllVenuesHtml } from "./../../components/VenuesHtml/AllVenuesHtml";
import { useFilteredVenues } from "./../../components/Search/Search"; 
import { useOutletContext } from "react-router-dom";

type ContextType = { searchTerm: string };

export function Home() {
  const { venues, isLoading, isError } = useVenuesApi();
  const { searchTerm } = useOutletContext<ContextType>();

  const filteredVenues = useFilteredVenues({ venues, searchTerm });

  return (
    <div className={styles.venuesContainerPage}>
      <h2>Browse our venues</h2>

      <AllVenuesHtml
        venues={filteredVenues}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
