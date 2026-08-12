# SupplyPrescript Shipment API Filters

## GET /shipments

The `/shipments` endpoint supports filtering, searching, pagination,
date filtering, cost filtering, and sorting.

## Available Filters

| Parameter | Description |
|---|---|
| status | Filter shipments by shipment status |
| supplier | Filter by supplier name |
| warehouse | Filter by warehouse |
| transport_partner | Filter by transport partner |
| destination | Filter by destination |
| product | Filter by product name |
| search | Search across product, supplier, warehouse, destination and transport partner |
| skip | Number of records to skip |
| limit | Maximum number of records to return |
| start_date | Filter shipments from this shipment date |
| end_date | Filter shipments up to this shipment date |
| expected_delivery | Filter by expected delivery date |
| actual_delivery | Filter by actual delivery date |
| min_cost | Minimum shipment cost |
| max_cost | Maximum shipment cost |
| sort_by | Field used for sorting |
| order | Sort order: asc or desc |

## Example Requests

### Filter by Supplier

`GET /shipments?supplier=Dell`

### Filter by Warehouse

`GET /shipments?warehouse=Hyderabad`

### Filter by Transport Partner

`GET /shipments?transport_partner=DHL`

### Filter by Destination

`GET /shipments?destination=Chennai`

### Filter by Expected Delivery

`GET /shipments?expected_delivery=2026-07-20`

### Filter by Actual Delivery

`GET /shipments?actual_delivery=2026-07-21`

### Filter by Cost Range

`GET /shipments?min_cost=5000&max_cost=25000`

### Search Shipments

`GET /shipments?search=laptop`

### Pagination

`GET /shipments?skip=0&limit=10`

### Sorting

`GET /shipments?sort_by=shipment_cost&order=desc`

## Combined Example

Filters can be combined in a single request:

`GET /shipments?warehouse=Hyderabad&supplier=Dell&order=asc`

## Response

The endpoint returns:

- total number of matching shipments
- skip value
- limit value
- number of records returned
- shipment data