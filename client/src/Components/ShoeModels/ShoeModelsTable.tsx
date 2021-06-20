import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  fetchShoeModelsByStore,
  fetchShoeModelsByStoreMetricsDashboard
} from "../../atoms/shoeModels.atoms";

import { getHoursAndMinutes } from "../../utils/dates";
import { getStatusIcon } from "../../utils/metrics";

export default function ShoeModelsTable({ storeId }: { storeId: string }) {
  const [shoeModelsByStore, getShoeModels] = useAtom(fetchShoeModelsByStore);
  const [metrics, getMetrics] = useAtom(fetchShoeModelsByStoreMetricsDashboard);
  const [lastPool, setLastPool] = useState(new Date());

  useEffect(() => {
    getShoeModels(storeId);

    getMetrics(storeId);
    const intervalId = window.setInterval(() => getMetrics(storeId), 5000);

    return function cleanup() {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setLastPool(new Date());
  }, [metrics]);

  return (
    <div className="flex flex-col">
      <h1 className="mb-1 text-lg font-bold">Shoes Inventory in Store</h1>

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
                    Shoe Model Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Inventory
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Orders
                  </th>
                </tr>
              </thead>
              <tbody>
                {shoeModelsByStore.map((shoeModel) => (
                  <tr className="bg-white" key={shoeModel.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {shoeModel.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {metrics[shoeModel.id] ? (
                        <>
                          {metrics[shoeModel.id].total_inventory}
                          <span className="material-icons-outlined table-icon">
                            {getStatusIcon(metrics[shoeModel.id].trending)}
                          </span>
                        </>
                      ) : (
                        "Loading..."
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {metrics[shoeModel.id]
                        ? metrics[shoeModel.id].total_sales
                        : "Loading..."}
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
