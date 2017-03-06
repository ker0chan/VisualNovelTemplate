#!/bin/bash

# Overwrites ./data/processed-data.js.
echo "var characters = `cat ./data/characters.json`;" > ./data/processed-data.js
echo "var places = `cat ./data/places.json`;" >> ./data/processed-data.js
echo "var story = `cat ./data/story.json`;" >> ./data/processed-data.js
