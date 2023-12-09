for setup, run the following commands:

```fish
python3 -m venv venv
source activate.fish
pip install -r requirements.txt
```

create a .env file and add your api key there like this 

```
OPENAI_API_KEY = "your api key"
GOOGLE_APPLICATION_CREDENTIALS = "keys/GCP serviceaccount.json"
```

to enable deployment to cloudrun:
```fish
gcloud services enable run.googleapis.com
gcloud config set compute/region "me-west1"
gcloud auth configure-docker
```

to build docker file:
```fish
docker build -t dadgpt .
```

to run docker file:
```fish
docker run -p 3000:3000 dadgpt
```

to deploy container:
```fish
gcloud builds submit --tag gcr.io/(gcloud config get-value project)/dadgpt
gcloud run deploy dadgpt --image gcr.io/(gcloud config get-value project)/dadgpt --allow-unauthenticated --region=(gcloud config get-value compute/region)
```

to update requirements.txt file:
```fish
pip freeze > requirements.txt
```
