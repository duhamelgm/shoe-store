import React, { useEffect, Suspense, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import { useAtom } from "jotai";
import {
  fetchStoresMetricsDashboardAtom,
  fetchStores
} from "../../atoms/stores.atoms";

import { getHoursAndMinutes } from "../../utils/dates";
import { getStatusIcon } from "../../utils/metrics";

export default function Table() {
  const [stores] = useAtom(fetchStores);
  const [storesMetrics, update] = useAtom(fetchStoresMetricsDashboardAtom);
  const [lastPool, setLastPool] = useState(new Date());

  useEffect(() => {
    update();
    const intervalId = window.setInterval(() => update(), 5000);

    return function cleanup() {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setLastPool(new Date());
  }, [storesMetrics]);

  return (
    <div className="flex flex-col">
      <h2 className="mb-4">Last updated at {getHoursAndMinutes(lastPool)}</h2>

      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Inventory
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Orders
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {stores.length &&
                  stores.map((store) => (
                    <tr className="bg-white" key={store.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {store.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {storesMetrics[store.id] ? (
                          <>
                            {storesMetrics[store.id].total_inventory}
                            <span className="material-icons-outlined table-icon">
                              {getStatusIcon(storesMetrics[store.id].trending)}
                            </span>
                          </>
                        ) : (
                          "Loading..."
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {storesMetrics[store.id]
                          ? storesMetrics[store.id].total_sales
                          : "Loading..."}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/stores/${store.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Inspect
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
