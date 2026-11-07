# CMOTS API layer

All CMOTS data follows one path:

```
Page -> hooks/stocks -> lib/stocks/api-client -> app/api/stocks/* -> lib/cmots/services -> lib/cmots/client -> CMOTS
```

## Rules

- Only `client.ts` calls CMOTS.
- Only `endpoints.ts` defines CMOTS URLs.
- Only `config.ts` reads the base URL and token.
- Keep everything in `lib/cmots` on the server. Never import it into a client component.
- Pages use `hooks/stocks`, not `fetch`, and never see raw CMOTS fields.
- Convert CMOTS fields to UI data in `mappers/`.

## Folders

| Path | Purpose |
|---|---|
| `types/` | CMOTS response shapes |
| `services/` | One file per CMOTS data area; `stocks.ts` combines them for the routes |
| `mappers/` | Convert CMOTS data to `lib/stocks/types.ts` |
| `data/` | Temporary company list; see `services/company.ts` |

## Adding an endpoint

1. Add the URL to `endpoints.ts`.
2. Add its response shape to `types/`.
3. Add a function to the matching file in `services/`.
4. Add a mapper if the UI needs the data.
5. Expose it through `app/api/stocks/`.
6. Add it to `lib/stocks/api-client.ts` and `hooks/stocks/`.
