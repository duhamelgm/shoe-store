module Searchable
  extend ActiveSupport::Concern
  DATE_FORMAT = '%Y-%m-%dT%H:%M:%S.%LZ'.freeze

  included do
    include Elasticsearch::Model

    after_commit do
      ::Es::Indexer.perform_async(self.class.name, self.id)
    end

    def index_es
      __elasticsearch__.index_document
    end
  end
end
