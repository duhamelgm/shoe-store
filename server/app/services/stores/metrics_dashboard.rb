# Get total sales and inventory for all stores
module Stores
  class MetricsDashboard
    def initialize
    end

    def call
      search = Action.__elasticsearch__.search(
        {
          track_total_hits: true,
          query: {
            match_all: {}
          },
          aggs: {
            stores: {
              terms: { field: "store_id" },
              aggs: {
                shoe_models: {
                  terms: { field: "shoe_model_id" },
                  aggs: {
                    group_stores: {
                      top_hits: {
                        size: 1,
                        sort: [
                          {
                            created_at: { order: "desc" }
                          }
                        ]
                      }
                    },
                    orders: {
                      filter: { term: { name: "sale" }}
                    }
                  }
                }
              }
            }
          }
        }
      )
      search.response["aggregations"]["stores"]["buckets"].reduce({}) do |res, store|
        key = store["key"]
        res[key] = {
          store_id: key.to_i,
          total_sales: 0,
          total_inventory: 0
        }

        store["shoe_models"]["buckets"].each do |shoe_model|
          res[key][:total_sales] += shoe_model["orders"]["doc_count"]
          res[key][:total_inventory] += shoe_model["group_stores"]["hits"]["hits"][0]["_source"]["inventory"]
        end

        res
      end
    end
  end
end