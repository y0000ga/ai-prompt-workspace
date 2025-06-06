#!/bin/bash

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-note-sidebar-profile \
  --load-extension=./dist \
  --new-window \
  "chrome://extensions"
