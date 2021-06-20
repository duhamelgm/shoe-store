# Create a new action sale event
module Actions
  class Search
    def initialize(page:, per_page:)
      @page = page.to_i
      @per_page = per_page.to_i
    end

    def call
      search = Action.__elasticsearch__.search(
        {
          size: per_page,
          from: per_page * page - 1,
          query: {
            match_all: {}
          },
          sort: [
            {
              created_at: { order: "desc" }
            }
          ]
        }
      )
      search.response['hits']['hits'].map(&:_source)
    end

    private

    attr_accessor :page, :per_page
  end
end