#!/bin/sh
# wait-for-postgres.sh

set -e
  
until curl "$ELASTICSEARCH_URL/_cluster/health?wait_for_status=yellow&timeout=50s"; do
  >&2 echo "Elasticsearch is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Elasticsearch is up - executing command"
bundle exec sidekiq -e ${RAILS_ENV:-development} -c 10 -q default