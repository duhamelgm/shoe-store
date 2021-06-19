require 'graphql/batch'

class ServerSchema < GraphQL::Schema
  query(Types::QueryType)

  use GraphQL::Batch
end
