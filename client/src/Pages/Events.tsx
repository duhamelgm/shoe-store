import React, {
  Suspense,
  useEffect,
  useMemo,
  useState,
  useCallback
} from "react";
import { useAtom } from "jotai";
import { fetchShoeModelsAtom } from "../atoms/shoeModels.atoms";
import { fetchStores } from "../atoms/stores.atoms";
import { fetchEventsAtom, checkNewEventsAtom } from "../atoms/events.atoms";
import { arrayToObjectWithIdsAsKeys } from "../utils/array";

import EventsEventItem from "../Components/Events/EventsEventItem";

export default function Stores() {
  const [stores] = useAtom(fetchStores);
  const [shoeModels] = useAtom(fetchShoeModelsAtom);
  const [events, fetchEvents] = useAtom(fetchEventsAtom);
  const [newEvents, checkNewEvents] = useAtom(checkNewEventsAtom);
  const [loading, setLoading] = useState(true);

  const storesObject = useMemo(
    () => arrayToObjectWithIdsAsKeys(stores),
    [shoeModels]
  );

  const shoeModelsObject = useMemo(
    () => arrayToObjectWithIdsAsKeys(shoeModels),
    [shoeModels]
  );

  const onFetchEvents = useCallback(() => {
    setLoading(true);
    fetchEvents(() => setLoading(false));
  }, []);

  useEffect(onFetchEvents, []);

  useEffect(() => {
    checkNewEvents();
    const intervalId = window.setInterval(() => checkNewEvents(), 5000);

    return function cleanup() {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8 pb-12">
      <h1 className="mb-3 font-bold text-xl">Events (Last 100 Events)</h1>

      {loading && <h2>Loading...</h2>}
      {!loading && (
        <>
          {!!newEvents.length && (
            <button
              type="button"
              className="mb-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onFetchEvents}
            >
              Load {newEvents.length} New Events
            </button>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="divide-y divide-gray-200">
              {events.map((event) => (
                <EventsEventItem
                  key={event.id}
                  storeName={storesObject[event.store_id].name}
                  totalInventory={event.inventory}
                  shoeModelName={shoeModelsObject[event.shoe_model_id].name}
                  eventName={event.name}
                  eventChange={event.change}
                  date={event.created_at}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
