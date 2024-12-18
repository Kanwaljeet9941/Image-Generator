from flask import Flask, request, render_template, jsonify
from generate_img import generate, upload_to_google_cloud
from PIL import Image
import flask_cors
from flask_cors import CORS 

app = Flask(_name_)

CORS(app)


@app.route('/', methods=['GET'])
def get():
    return jsonify("from server"),200

@app.route("/getimage", methods=["POST"])
def get_image():
    try:
        data = request.get_json()
        print(data)
        print(data['prompt'])
        images = generate(data['prompt'])
        img_paths = []
        for i, image in enumerate(images):
            dest_path = f'sample{i}-?v=1.0.png'
            local_path = f'sample{i}.png'
            image.save(local_path)
            path = upload_to_google_cloud(dest_path, local_path)
            img_paths.append(path)
        return jsonify({"message": "success", "images": img_paths}), 200
    except Exception as e:
        return jsonify({"message": f"image generation failed. retry {e}"}), 500



prompt = """
A photorealistic image of a cookbook laying on a wooden kitchen table, the cover facing forward featuring a smiling family of animals sitting at a similar table, soft overhead lighting illuminating the scene, the cookbook is the main focus of the image.
"""

if _name_ == "_main_":
    app.run(debug=True)