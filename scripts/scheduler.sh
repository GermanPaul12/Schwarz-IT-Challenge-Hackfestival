#!/bin/bash

# Write out current cron job
echo "0 2 * * * /usr/bin/python3 /app/get_raw_data.py >> /logs/cron.log 2>&1 && \
      /usr/bin/python3 /app/add_features.py >> /logs/cron.log 2>&1 && \
      /usr/bin/python3 /app/calculate_wastage.py >> /logs/cron.log 2>&1 && \
      /usr/bin/python3 /app/calculate_wastage_score.py >> /logs/cron.log 2>&1" > /etc/cron.d/wastage_pipeline

# Give execution rights on the cron job
chmod 0644 /etc/cron.d/wastage_pipeline

# Apply cron job
crontab /etc/cron.d/wastage_pipeline

# Start cron
cron
