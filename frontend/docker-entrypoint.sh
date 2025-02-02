#!/usr/bin/env sh
set -eu

# Print all environment variables to the console
# env

# Replace placeholders in the nginx config template with environment variables
envsubst '${VITE_API_URL}' < /opt/bitnami/nginx/conf/nginx.conf.template > /opt/bitnami/nginx/conf/nginx.conf

# Print the contents of the generated nginx.conf
# cat /opt/bitnami/nginx/conf/nginx.conf

# Execute the command provided as arguments to the script
exec "$@"