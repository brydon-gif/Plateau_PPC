# Plateau PPC — working notes

## Client reporting conventions

### Izohome (Google Ads, customer ID 6705263850)

Campaign naming encodes the goal. Always split reporting by that goal and never
report a single account-wide ROAS as if the two segments were comparable.

**Campaigns with "Sales" in the name**
- Report ecomm ROAS and sales order value using the account's custom
  columns **"Ecomm ROAS"** and **"Sales Order Value"**.
- Do not use the generic `Conv. value` / `Conv. value / cost` columns for
  these campaigns — they mix purchase value with the assigned lead values and
  overstate revenue.
- Target: 6.0 blended ROAS (branded ~30.0, non-brand 2.0-4.0).

**Campaigns with "Leads" in the name**
- Use the normal conversion value and ROAS columns.
- Break contacts out by type: WhatsApp, phone, email, lead form submit.
- Assigned conversion values (as of Sept 2026): lead form €50, email €15,
  WhatsApp €10, phone €5. A lead form submit is worth 10x a WhatsApp.
- August 2026 and earlier used inconsistent values across campaigns, so any
  month-over-month value comparison that spans that change has to be
  re-weighted at current values to be like-for-like.

**Conversion actions in the account**
`conversion_purchase`, `conversion_whatsapp`, `conversion_téléphone`,
`conversion_mail`, `conversion_form_submit`.

**Known tooling limit:** Porter's Google Ads connector does not expose Google
Ads custom columns, and the `custom_column` resource is not queryable through
GAQL (`google_ads.report_query`) — it only lives on
`CustomColumnService.ListCustomColumns`, which no available action reaches.
Custom columns can only be read via GAQL as `custom_columns[<id>]`, so the
numeric IDs have to be supplied by hand. Until they are, the closest
reconstruction is `conversion_purchase` value from the
`conversion_action_name` breakdown, divided by cost.

**Report format:** flat bullet points, no tables, minimal commentary between
figures.
