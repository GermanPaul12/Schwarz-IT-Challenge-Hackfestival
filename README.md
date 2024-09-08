# Schwarz IT Challenge Hackfestival Team RheinHacker

## Steps to run b2b prototype web-app locally

1. `cd my-react-app`
2. `curl -fsSL https://bun.sh/install`
3. `bun install`
4. `bun dev`
5. Access `http://localhost:5174/` to view the web-app

## Steps to run containerized scheduler

- To start `docker-compose up -d`
- To stop `docker-compose down`

## Scheduler Structure

```txt
.
├── docker-compose.yml
├── scripts/
│   ├── get_raw_data.py              # Fetch raw data
│   ├── get_extra_features.py              # Add emissionFactor and foodCategory
│   ├── estimated_wastage.py         # Calculate estimated wastage
│   ├── wastage_score.py   # Calculate wastage score
│   ├── scheduler.sh                 # Shell script for cron job
├── logs/                            # Directory to store logs
│   └── cron.log                     # Log file for cron jobs
└── Dockerfile                       # Dockerfile for the app
```
