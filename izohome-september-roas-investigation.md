# Izohome - September 2026 ROAS Drop Investigation

## Correction to the September recap first

- Sales revenue should be read from the purchase conversion action on **all conversions**, not primary conversions
- Several campaigns had purchases sitting outside the primary conversion set in August, so the recap understated August badly
- Affected: P AC Liquides étanchéité - FR (August purchases 0.6 / €57 on primary, actually 6.4 / €2,150) and P AC Vloeibare Waterdichting - NL (0 / €0 on primary, actually 11.6 / €2,906)
- Also affected: S AC - Panneaux d'isolation PIR - FR September (0 / €0 on primary, actually 2.0 / €708.45 - this is the €708 figure)
- My earlier statement that August purchase tracking was broken on the two PMax liquid campaigns was wrong. The purchases were recorded, just not as primary conversions

Restated sales segment:

- August: 56.0 purchases, €22,470 revenue, €7,527 cost, 2.98 ROAS, €401 AOV
- September: 63.6 purchases, €16,633 revenue, €6,813 cost, 2.44 ROAS, €262 AOV
- Purchases +14%, revenue -26%, AOV -35%, ROAS -18%

Restated per-campaign ROAS (August to September):

- P AD Colles - FR: 7.54 to 6.94
- S AC - PIR isolatieplaten - NL: 8.22 to 5.34
- P AB Revêtement - FR: 8.73 to 2.04
- P AC Liquides étanchéité - FR: 0.84 to 1.96
- P AC Vloeibare Waterdichting - NL: 1.16 to 1.80
- S AC - Panneaux d'isolation PIR - FR: 3.31 to 0.78

## 1. S AC - Panneaux d'isolation PIR - FR

Premise corrections:

- August purchases were 2.73, not 19.73. The 19.73 was total conversions: 2.73 purchases + 13.0 WhatsApp + 3.0 phone + 1.0 email
- September was 2.0 purchases at €708.45, not 1. The "1" is the primary-conversions figure

What actually happened:

- Cost €681 to €912, +34%
- Impressions 4,093 to 5,005, +22%
- Clicks 498 to 562, +13%
- CPC €1.37 to €1.62, +19%
- Search impression share 52.4% to 54.4%
- Absolute top impression share 29.4% to 32.6%
- Rank-lost impression share 33.3% to 26.2%
- Purchases 2.73 to 2.0, -27%
- Revenue €2,251 to €708, -69%
- AOV €824 to €354, -57%
- ROAS 3.31 to 0.78
- Checkout starts 11.8 to 8.0, value €11,623 to €2,576, -78%
- Contacts held: WhatsApp 13.0 to 16.5, phone 3.0 to 1.1, email 1.0 to 0
- Search terms are near-identical month over month (isolant pir, isolation pir, panneau pir, plus size variants)

So the auction side improved and traffic grew. The purchase funnel is what broke.

Cause - the landing page:

- Until Sept 14 the ad pointed at https://izohome.be/fr/isolation/isolation-pir/
- That URL now 301-redirects to a single product page: the 10cm panel at €14.10
- The campaign's search terms are size-specific: isolation pir 12 cm, isolant pir 14cm, pir 100mm, pir 20mm, pir 60mm, isolant pir 4cm, pir 16cm, pir 8 cm
- Every one of those searches was landing on a 10cm-only product page
- On Sept 14 the ad's final URL was changed to https://izohome.be/fr/shop/isolation/ (change history: mcmillenb94@gmail.com, Google Ads web client, old URL recorded as the PIR page)
- That page loads fine and lists 24 products, but it is all-Isolation, not PIR-specific
- The FR shop page's add-to-cart and checkout block renders untranslated Dutch ("Het artikel is toegevoegd aan je winkelwagen", "Naar de kassa", "Vaak samen gekocht") and its checkout CTA points to https://izohome.be/checkout/ rather than a French path

Scale caveat:

- August's €2,251 was two orders - Aug 27 (€890) and Aug 28 (€1,081) - plus three modelled fractions of €93 each
- At roughly two orders a month, this campaign's ROAS is noise. Judge it on checkout starts and contacts until volume supports a ROAS read

## 2. P AB Revêtement - FR

- Cost €1,065 to €1,048, flat
- Impressions 48,125 to 31,524, -35%
- Clicks 1,195 to 879, -26%
- CPC €0.89 to €1.19, +34%
- Search impression share 39.7% to 20.2%, halved
- Budget-lost impression share 13.6% to 29.4%, doubled
- Purchases 29.53 to 13.60, -54%
- Revenue €9,297 to €2,136, -77%
- AOV €315 to €157, -50%
- ROAS 8.73 to 2.04
- Checkout starts 65.4 to 19.7, -70%
- Checkout start value €24,864 to €3,077, -88%
- Average basket at checkout start €380 to €156, -59%
- Checkout-start rate per click 5.5% to 2.2%

Decomposition of the -77% revenue: clicks -26% x purchases-per-click -37% x AOV -50%

Timing:

- Weekly purchases: 10.12, 7.92, 7.99, 3.03, 3.24, then 7.12 for w/c Sept 7, then 1.24, 1.00, 1.00 from w/c Sept 14
- The collapse starts in the week of Sept 14

On the AOV halving:

- August was flattered by one week. W/c Aug 24 produced €3,344 from only 3.03 purchases, roughly €1,100 per order
- Strip that week and August was 26.5 purchases at €225 AOV
- So like-for-like the AOV move is €225 to €157, -30%, with one big-order week doing the rest

Structure:

- One live asset group, "Revêtement FR", pointing at https://izohome.be/fr/shop/?_categorie=revetement
- Two further asset groups (Colles FR, Liquide Roofing FR) are REMOVED but had no spend in August or September, so they are not the cause
- Purchase tracking plainly still works (13.6 purchases recorded), so this is a funnel problem, not a tag problem
- Timing matches the FR site restructure to /shop/ paths around Sept 14 and the Merchant Center problem already noted around Sept 16

## 3. S AC - PIR isolatieplaten - NL

Premise corrections:

- Purchases went UP, 5.36 to 8.05, +50%. The 27 was total conversions in August: 5.36 purchases + 14.95 WhatsApp + 5.0 form submits + 2.0 phone
- AOV went DOWN, not up: €1,051 to €606, -42%

What actually happened:

- Cost €685 to €912, +33%
- Impressions 5,658 to 8,639, +53%
- Clicks 436 to 644, +48%
- CPC €1.57 to €1.42, -10%
- Search impression share 41.4% to 51.4%
- Absolute top impression share 17.9% to 22.6%
- Rank-lost impression share 45.1% to 36.6%
- Purchases 5.36 to 8.05, +50%
- Revenue €5,635 to €4,875, -13%
- AOV €1,051 to €606, -42%
- ROAS 8.22 to 5.34
- Checkout starts 41.3 to 46.4, +12%, value €45,749 to €43,183, -6%
- Average basket at checkout start €1,106 to €931, -16%

So demand held. The campaign scaled cleanly and bought more, cheaper clicks. The gap is between baskets started and orders completed.

Cause - the bid strategy:

- This campaign runs on **Maximize Conversions**. The other two run on Maximize Conversion Value
- Maximize Conversions optimizes for conversion COUNT. A €13 panel order, a €1,600 pallet order and a WhatsApp click all count as 1
- In September it scaled 48% more clicks and did exactly what it was told: more conversions, smaller ones
- All five conversion actions are primary on this campaign, so WhatsApp, phone, email and form submits feed the bid strategy alongside purchases - four reasons to chase cheap contacts against one to chase revenue
- Weekly purchase AOV: €790, €1,657, €680, €1,232, €990, then €211 and €229 from w/c Sept 14, and zero purchases w/c Sept 28
- The w/c Sept 14 inflection also matches the site restructure, so both factors are likely in play

## Also found

- Cross-wired ad groups. The FR campaign (S AC - Panneaux d'isolation PIR - FR) contains an "NL PIR FOCUS KEYWORDS" ad group pointing at the Dutch page. The NL campaign contains an "FR PIR FOCUS KEYWORDS" ad group pointing at a French page, with its ad still in review
- Neither served in August or September, so they did not cause any of this, but they will once they start serving
- Conversion values switched to the current weighting (WhatsApp €10, phone €5, email €15, form €50) around Aug 27. Before that WhatsApp and phone were €1

## Recommended actions

1. Point the FR PIR ad group at the FR PIR category page (/fr/shop/isolation/isolation-pir/), not the all-Isolation page and not a single 10cm product
2. Fix the Dutch strings and the /checkout/ link on the French shop template
3. Switch S AC - PIR isolatieplaten - NL from Maximize Conversions to Maximize Conversion Value or tROAS
4. Demote WhatsApp, phone, email and form submits to secondary on all "Sales" campaigns so the bid strategies optimize on revenue only
5. Audit the Merchant Center feed URLs against the new /shop/ paths - the -88% checkout-start value on P AB Revêtement is the thing to chase
6. Remove or correct the two cross-wired ad groups before they serve
7. Report sales ROAS on all-conversions purchase value, not primary conversions
