break > .\data\processed-data.js
echo var characters = >> .\data\processed-data.js
type .\data\characters.json >> .\data\processed-data.js
echo ; >> .\data\processed-data.js
echo. var places = >> .\data\processed-data.js
type .\data\places.json >> .\data\processed-data.js
echo ; >> .\data\processed-data.js
echo. var story = >> .\data\processed-data.js
type .\data\story.json >> .\data\processed-data.js
echo ; >> .\data\processed-data.js