# Use Python as base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy all files from the app directory to the container
COPY ./app /app

# Install required Python packages
RUN pip install --no-cache-dir openai scikit-learn numpy pandas

# Set up cron inside the container
RUN apt-get update && apt-get install -y cron

# Copy the cronjob file
COPY ./app/scheduler.sh /app/scheduler.sh

# Set executable permissions for the scheduler
RUN chmod +x /app/scheduler.sh

# Start the cron service when the container starts
CMD cron && tail -f /logs/cron.log
