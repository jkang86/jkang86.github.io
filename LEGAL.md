# Data Sources & Legal Attribution

## Riot Games API (League of Legends)

This project uses the [Riot Games API](https://developer.riotgames.com/) to fetch League of Legends match data, champion statistics, and ranked information.

- **Data used:** Summoner profile, ranked stats, match history (last 20 matches), champion win rates, role distribution, KDA trends, champion performance comparisons
- **Account:** gamjahtang#galbi (NA)
- **Terms:** [Riot Games API Terms of Service](https://developer.riotgames.com/terms)

> This project is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc.

## Data Handling

- All data is fetched via a local Node.js script (`scripts/fetch-data.js`) and stored as static JSON files
- No user data from other players is collected or stored
- Only the site owner's publicly available match data is used
- Data is refreshed manually by running the fetch script
- When live data is unavailable, sample/fabricated data is displayed with clear labeling

## Attribution

Gaming data powered by Riot Games API. Not endorsed by Riot Games.
