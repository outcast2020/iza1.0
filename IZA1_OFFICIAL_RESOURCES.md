# IZA 1.0 Official Resources

## Official registry

- Spreadsheet ID: `12erNrXsDHWBrFYMJNpOs9cdV_R7k02MD2MXhqWjPrmU`
- URL: `https://docs.google.com/spreadsheets/d/12erNrXsDHWBrFYMJNpOs9cdV_R7k02MD2MXhqWjPrmU/edit`
- Main records tab: `records_flat`

## Check-in source

- Spreadsheet ID: `130CvfT6mwv0gzYQgmrylg4Q0T5xRI918dms8A4yzqO8`

## Poem base

- Spreadsheet ID: `1XTGgwtYjOepdz3zW8w4RBCBQdwm-bM5BUKMnvCf7fmE`
- Sheet name: `POEMS`

## Apps Script setup helper

- Preferred rerun function: `setupIza10OfficialRegistrySpreadsheet()`

## Local defaults already updated

The local `Iza1.0` files now default to:

- official registry spreadsheet
- `records_flat` as the records tab
- official poem base spreadsheet

## Remaining deployment step

After updating the Apps Script project for `Iza1.0`, publish a new Web App deployment and then replace the `WEBAPP_URL` in `app.js` with the new deployment URL.
