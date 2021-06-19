module Es
  class Indexer
    include Sidekiq::Worker
    sidekiq_options retry: 10, backtrace: true, queue: 'default'

    def perform(class_name, record_id)
      record = class_name.constantize.find_by(id: record_id)
      return unless record.present?
      record.__elasticsearch__.index_document
    end
  end
end