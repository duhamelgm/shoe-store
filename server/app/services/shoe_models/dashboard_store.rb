# Get shoe models inventory and sales by store
module ShoeModels
  class DashboardStore
    def initialize(store_id:)
      @store_id = store_id
    end

    def call
      search = Action.__elasticsearch__.search(
        {
          track_total_hits: true,
          query: {
            bool: {
              must: {
                term: { store_id: store_id }
              }
            }
          },
          aggs: {
            shoe_models: {
              terms: { field: "shoe_model_id", size: 1000 },
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
      )
      search.response["aggregations"]["shoe_models"]["buckets"].reduce({}) do |res, shoe_model|
        key = shoe_model["key"]
        res[key] = {
          store_id: store_id,
          shoe_model_id: key.to_i,
          total_sales: 0,
          total_inventory: 0
        }
        res[key][:total_sales] += shoe_model["orders"]["doc_count"]
        res[key][:total_inventory] += shoe_model["group_stores"]["hits"]["hits"][0]["_source"]["inventory"]
        res
      end
    end

    private

    attr_accessor :store_id
  end
end