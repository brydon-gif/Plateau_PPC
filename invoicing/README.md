# Monthly invoice run

Drafts the 1st-of-month PPC invoices as Gmail **drafts** with PDFs attached. It never sends.
Brydon reviews and sends.

## Why this exists

The Google Drive connector can read a Doc and rename it, but it cannot write content into
one. Earlier runs worked around that by pulling each Doc as a .docx, which the connector
returns as one long base64 string that has to be re-typed by hand - slow and lossy. So the
verified `document.xml` for each client lives here instead. A run patches a few text runs,
renders, and drafts. No Drive round-trip needed.

## Each run

1. **Read `clients.json`.** It holds recipients, amounts, billing cycle, and the last
   invoice number that actually went out.
2. **Reconcile against the sheet** (Invoicing Process,
   `1Rz-wLOnWNls0xoPDvusTqAh5aStLyeT-w5qSPez7oPc`) and against Gmail. Clients churn. Ask
   before inventing or dropping anyone.
3. **Confirm what actually shipped.** Search `in:sent` for last month's invoice to each
   client and read the attachment filename. A draft that was never sent, or one Brydon
   edited first, makes the stored invoice number wrong.
4. **Check in on amounts.** Standing instruction: amounts carry over unchanged, but say so
   explicitly and let Brydon correct before building anything.
5. **Patch** `templates/<client>/document.xml` with `lib/patch.py`: bump the invoice number,
   set the date to the 1st, and move the month in the line item. `patch.py` refuses any
   replacement that does not match exactly one run - a wrong invoice is worse than a crash.
6. **Render** with `lib/render.py` -> ~2KB PDF.
7. **Draft** with Gmail `create_draft`, replying in the thread where the last invoice was
   sent (`replyToMessageId` = the most recent message in it). Subject:
   `PPC services invoice <MONTH> <YEAR>`, where the month is the one being billed for, not
   the month you are sending in. A client with no prior invoice email gets a new thread.
8. **Verify every attachment.** Gmail indexes PDF text, so searching drafts for a string
   that only exists inside the PDF (the invoice number, the billing address) proves the
   attachment is a readable PDF and not a corrupted blob. Do this for each one.
9. **Update `clients.json`** with the new invoice numbers and commit.
10. **Report** to Brydon: client, recipients, invoice number, amount, and anything you
    changed or guessed at.

## Billing cycle

- `next_month` (CyberImpact, DataCM, PolicyMe): the invoice dated Nov 1 covers November.
- `prev_month` (Tonic Blooms): the invoice dated Nov 1 covers October.

Getting this backwards puts the wrong month in front of a client, so check `cycle` per
client rather than assuming.

## Tools

| file | does |
|---|---|
| `lib/patch.py` | replace exact `<w:t>` runs; refuses ambiguous matches |
| `lib/render.py` | document.xml -> HTML -> Chromium layout -> compact PDF |
| `lib/docx2html.py` | the WordprocessingML subset Google emits |
| `lib/extract.js` | reads back every painted rect and word position from the laid-out page |
| `lib/mkpdf.py` | paints that layout using base-14 fonts, no embedding (~2KB) |
| `lib/extract_member.py` | only needed to re-derive a template from a Doc; verifies each ZIP member's CRC |

```bash
python3 lib/render.py templates/cyberimpact/document.xml templates/shared out/cyberimpact
```

PDFs have to stay small: a Gmail attachment is hand-typed as base64 into the draft call, and
Chromium's own print output (~90KB, embedded font subsets) does not survive that. `mkpdf.py`
keeps them near 2KB.

## Known gaps

- **No logo.** The template has a ~1" image top-right. It cannot be pulled through the Drive
  connector intact. Drop the real file at `templates/shared/word__media__image2.png` and
  teach `docx2html.py` to map `rId7` to it, and it will render.
- **Google Docs are not updated.** The connector can only create new Docs, and Google Docs
  rejects the original's nested tables on import, so any Doc made here is a simplified
  rebuild. The PDFs are the faithful artifact.
- **The sheet is read-only from here.** Client renames (contentcloud -> DataCM) have to be
  made by hand in the sheet.
