FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Initialize DB if not exists (in a real prod setup, use a migration tool or entrypoint script)
# For this simple setup, we'll let app.py create it on run if using sqlite
# Or use an entrypoint to wait for DB

EXPOSE 5000

CMD ["python", "app.py"]
