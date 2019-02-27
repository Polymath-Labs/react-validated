FROM        node:10

# The base node image sets a very verbose log level.
ENV         NPM_CONFIG_LOGLEVEL warn

RUN         apt-get update
RUN         npm install -g npm create-react-app

RUN         echo 'export PATH=~/.local/bin:$PATH' >> ~/.bashrc

EXPOSE      3000

RUN         mkdir -p /root/react-validated/node_modules
WORKDIR     /root/react-validated

ENTRYPOINT  ["sleep", "2d"]