FROM        node

# The base node image sets a very verbose log level.
ENV         NPM_CONFIG_LOGLEVEL warn

EXPOSE      3001

RUN         mkdir -p /react-validated
WORKDIR     /react-validated

ENTRYPOINT  ["sleep", "2d"]