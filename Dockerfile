
# Use an official Python runtime as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY .env .env

COPY keys keys

# Copy the rest of the application code into the container
COPY main.py main.py

# Set the command to run the application
CMD [ "python", "main.py" ]
