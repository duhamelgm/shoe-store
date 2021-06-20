module Metrics
  class OrdersHistogram
    def initialize
    end

    def call
      search = Action.__elasticsearch__.search({
        query: {
          bool: {
            filter: [
              { term: { name: 'sale' }},
              { range: { created_at: { "gte": 2.hours.ago.iso8601, "lte": Time.now.iso8601 }}}
            ]
          }
        },
        aggs: {
          orders_over_time: {
            auto_date_histogram: {
              field: 'created_at',
              buckets: 50
            }
          }
        }
      })

      search.response["aggregations"]["orders_over_time"]["buckets"].map{|val| {date: val["key_as_string"], value: val["doc_count"]}}
    end
  end 
end