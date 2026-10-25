# Jam Space — Lead Management & Coordinator Playbook

**Version:** 1.0 (Campaign Launch: 25 October 2026)  
**Website:** `jamroll.space`  
**Campaign Platform:** “A Space of Your Own.”  
**Primary CTA:** “Let’s Discuss Your Project.”  

---

## 1. Overview & Operating Model

During the campaign phases, all enquiries from the website Contact Us form are:
1. Validated and safely saved to the system backend (`data/leads.json` operational audit log).
2. Delivered to the Central Lead Coordinator with full UTM attribution metadata.
3. Manually maintained and tracked in a dedicated, secure **Google Sheets Lead Register**.

> **Decision Rule:** Never automate or replace the lead intake before the manual verification and qualification process is validated.

---

## 2. Google Sheets Structure (6 Core Tabs)

### Tab 1: Lead Register
| Column Name | Description / Values |
|---|---|
| **Lead ID** | Unique stable ID (`JS-YYYYMMDD-XXXX`) from website submission |
| **Created Date / Time** | Timestamp in Asia/Dhaka |
| **Name** | Full client name (Restricted access) |
| **Phone** | Verified phone number (01XXXXXXXXX) |
| **Project Type** | Residential / Office-commercial / Renovation / Space planning-consultancy / Other |
| **Location** | Client location (e.g., Bashundhara R/A, Gulshan, Uttara, Dhaka) |
| **Estimated Budget** | Below BDT 8 lakh / 8–15 lakh / 15–30 lakh / above 30 lakh / not sure |
| **Expected Start** | Immediately / within 1–3 months / 3–6 months / later / not sure |
| **Tracked Source** | Value from `utm_source` (e.g. `facebook` or `unattributed / unknown`) |
| **Tracked Campaign** | Value from `utm_campaign` (e.g. `js_m1_leads_residential`) |
| **Verified Source** | Confirmed by coordinator on initial call |
| **Score (0–100)** | Calculated based on the Priority Scoring Model |
| **Priority** | High (75–100) / Medium (45–74) / Low (0–44) |
| **Status** | New → Contacted → Qualified → Consultation → Proposal → Negotiation → Won / Lost / On Hold |
| **Assigned Owner** | Coordinator or Design Consultant assigned |
| **Next Action / Date** | Scheduled follow-up date and time |

---

### Tab 2: Follow-up Log
Each communication attempt is logged on its own row linked by Lead ID:
- `Lead ID` | `Interaction Date/Time` | `Channel (Phone / WhatsApp / Email)` | `Owner` | `Discussion Summary` | `Outcome` | `Next Step & Scheduled Date`

---

### Tab 3: Pipeline Milestones
1. **New:** Enquiry received from website or direct channel; uncontacted.
2. **Contacted:** Initial phone/WhatsApp outreach made within 15–30 mins.
3. **Qualified:** Genuine interest, valid phone, confirmed location and budget within service capacity.
4. **Consultation:** In-person or virtual design consultation scheduled / held.
5. **Proposal:** Design proposal, scope of work, and estimate submitted.
6. **Negotiation:** Revisions and final contract discussions.
7. **Won / Lost / On Hold:** Signed agreement or documented reason for closure.

---

### Tab 4: Priority Scoring Model (Total: 100 Points)

| Category | Criteria & Points |
|---|---|
| **Project Type (20 pts)** | Residential Full Home: 20 pts <br> Renovation / Commercial: 15 pts <br> Space Planning: 10 pts <br> Other / Unknown: 5 pts |
| **Location (15 pts)** | Prime Dhaka (Gulshan, Banani, Baridhara, Bashundhara, Dhanmondi, Uttara, DOHS): 15 pts <br> Greater Dhaka: 10 pts <br> Outside Dhaka / Unverified: 5 pts |
| **Budget (25 pts)** | Above 30 lakh: 25 pts <br> 15–30 lakh: 20 pts <br> 8–15 lakh: 15 pts <br> Below 8 lakh: 10 pts <br> Not sure / Unstated: 5 pts |
| **Timeline (20 pts)** | Immediately: 20 pts <br> Within 1–3 months: 15 pts <br> 3–6 months: 10 pts <br> Later / Not sure: 5 pts |
| **Readiness / Fit (20 pts)** | High engagement, floor plan ready: 20 pts <br> Standard inquiry: 12 pts <br> Casual browsing: 5 pts |

- **High Priority (75–100 pts):** Contact within 15 minutes during business hours. Immediate consultant assignment.
- **Medium Priority (45–74 pts):** Contact within 30–60 minutes.
- **Low Priority (0–44 pts):** Standard follow-up within same business day.

---

## 3. Coordinator Response Workflow

```
[Website Submission Received]
          │
          ▼
[Check for Duplicate by Phone/Email]
          │
          ├─► If Duplicate: Append notes to existing Lead ID in Follow-up Log
          │
          ▼
[Assign Lead ID & Initial Priority Score]
          │
          ▼
[Business Hours Outreach (Target: 15-30 mins)]
          │
          ├─► In Business Hours (9:00 AM - 7:00 PM): Phone call followed by WhatsApp confirmation
          │
          └─► After-Hours: Automated or prompt morning follow-up at 9:30 AM
          │
          ▼
[Log Call Summary & Update Milestone in Google Sheets]
```

---

## 4. Response Copy Templates

### WhatsApp / SMS Response Template:
> *"Hello [Client Name], thank you for reaching out to Jam Space. We have received your enquiry regarding your [Project Type] in [Location]. Our design team is excited to learn more about your space. When would be a convenient time for a brief 5-minute call today?"*

### After-Hours Email / Message Template:
> *"Thank you for contacting Jam Space. We have received your project enquiry and look forward to learning more about what you are planning. Our team will get in touch with you during business hours (9:00 AM – 7:00 PM). If your query is urgent, you may also reach us directly at +880 1629658114."*

