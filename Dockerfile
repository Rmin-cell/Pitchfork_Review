# Start with a Python base image
FROM python:3.8

# Set the working directory
WORKDIR /app

# Copy the script to the container 
COPY requirements.txt .


# Install dependencies
RUN pip install -r requirements.txt



# Execute the script
CMD [ "python", "Pitchfork_last_stage.py" ]