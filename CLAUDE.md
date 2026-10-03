# Plateau PPC — working notes

## Client reporting conventions

### Izohome (Google Ads, customer ID 6705263850)

Campaign naming encodes the goal. Always split reporting by that goal and never
report a single account-wide ROAS as if the two segments were comparable.

**Campaigns with "Sales" in the name**
- Segment by conversion action and count **only** `conversion_purchase` value.
  Sales order value = that purchase value. Ecomm ROAS = that purchase value
  divided by cost.
- Exclude the value of every lead action — `conversion_whatsapp`,
  `conversion_téléphone`, `conversion_mail`, `conversion_form_submit`.
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

**How to pull it**
`query_data` with dimensions `google_ads_campaign_name` +
`google_ads_conversion_action_name` and metrics `google_ads_conversions` +
`google_ads_conversions_value`, then keep only the `conversion_purchase` rows
for the sales segment. Cost comes from a separate campaign-level query —
`google_ads_cost_micros` cannot be combined with the conversion-action
breakdown.

**Do not try to read the Google Ads custom columns.** Porter's connector does
not expose them, and `custom_column` is not a GAQL resource
(`google_ads.report_query` returns HTTP 400) — it only lives on
`CustomColumnService.ListCustomColumns`, which no available action reaches.
The conversion-action method above is the agreed substitute.

**Report format:** flat bullet points, no tables, minimal commentary between
figures.
