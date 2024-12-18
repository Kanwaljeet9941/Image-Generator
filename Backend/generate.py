import vertexai
from vertexai.preview.vision_models import ImageGenerationModel
from PIL import Image
from google.cloud import storage
import os
import time

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = f'./image-generator-445004-6f47e17b51fb.json'

# TODO(developer): Update and un-comment below lines
project_id = "image-generator-445004"

vertexai.init(project=project_id, location="us-central1")

generation_model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-001")

prompt = """
create UI design for e-Commerce application.
"""

def generate(prompt):
    images = generation_model.generate_images(
        prompt=prompt,
        number_of_images=3,
        aspect_ratio="1:1",
        safety_filter_level="block_some",

    )
    return images

def  upload_to_google_cloud(destination_image_address, src_image_address):
    storage_client  = storage.Client()
    bucket_name = "image-generator-445004_cloudbuild"
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_image_address)
    blob.upload_from_filename(src_image_address)
    blob.make_public()

    url = blob.public_url 
    # url = blob.generate_signed_url(expiration=3600, method="GET")
    return url





# OPTIONAL: View the generated image in a notebook
# print(image[0])
# print(image)

# generate(prompt)