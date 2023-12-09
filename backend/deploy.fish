#!/usr/bin/env fish

gcloud builds submit --tag gcr.io/(gcloud config get-value project)/dadgpt
gcloud run deploy dadgpt --image gcr.io/(gcloud config get-value project)/dadgpt --allow-unauthenticated --region=(gcloud config get-value compute/region)
