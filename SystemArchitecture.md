# Elder Fraud Protection Architecture

This document describes the overall architecture of the Elder Fraud Protection Application. 

## High Level Component Diagram

```mermaid
flowchart LR
    WC["Web Client<br/>(Chrome Extension)"] -->|"HTTPS + JSON"| WS["Web Server<br/>(planned: Node/Express or Nginx)"]
    WS -->|"HTTP + JSON"| AS["App Server<br/>(Flask API)"]
    AS -->|"BSON/JSON via PyMongo"| DB[("MongoDB Atlas")]
```

The Web Client is currently accessed through our Elder Fraud Protection Chrome Extension. We are also thinking of having an additional option of an Elder Fraud Protection website or desktop application. The Chrome Extension calls the Web Server, which we haven't implemented yet but likely will be Node/Express or Nginx. The Web Server then calls the App Server (Flask). The App Server then accesses our database MongoDB Atlas. 

## Relationship Diagram

```mermaid
erDiagram
    USER {
        string _id
        string full_name
        string email
        datetime created_at
    }

    TRUSTED_CONTACT {
        string _id
        string user_id
        string contact_name
        string contact_channel
        datetime created_at
    }

    SCAN_EVENT {
        string _id
        string user_id
        string source_type
        string source_url
        datetime scanned_at
    }

    FRAUD_ANALYSIS {
        string _id
        string scan_event_id
        int risk_score
        string verdict
        datetime analyzed_at
    }

    ALERT {
        string _id
        string analysis_id
        string severity
        string status
        datetime created_at
    }

    USER ||--o{ TRUSTED_CONTACT : has
    USER ||--o{ SCAN_EVENT : triggers
    SCAN_EVENT ||--|| FRAUD_ANALYSIS : produces
    FRAUD_ANALYSIS ||--o{ ALERT : creates
```

The design shows each USER is the central record connected to both behavior and safety context: a user can have many TRUSTED_CONTACT entries and can trigger many SCAN_EVENT records as messages, emails, or pages are analyzed. Every scan event produces exactly one FRAUD_ANALYSIS document containing outputs such as risk score, verdict, and analysis timestamp, which makes each analysis traceable back to the original scan. From there, one analysis can generate multiple ALERT documents (for example, different severity levels or follow up states), allowing the system to track and manage warning outcomes over time. 

## Flow Diagram


