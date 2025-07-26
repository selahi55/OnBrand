import os
import json
from pprint import pprint

import google.generativeai as genai
from dataclasses import dataclass, asdict
from typing import List, Dict, Any
from PIL import Image, ImageDraw, ImageFont

try:
    genai.configure(api_key="")
except KeyError:
    print("Error: The 'GEMINI_API_KEY' environment variable is not set.")
    exit()


@dataclass
class BrandProfileExtraction:
    tone_of_voice: str
    target_audience: str
    emotion: str


def extract_brand_profile(image_path: str) -> BrandProfileExtraction:
    """Analyzes a brand profile image to extract key characteristics using Gemini."""
    print(image_path)
    prompt_text = """
    Analyze the brand profile image and extract the specified attributes in JSON format.

    Please extract the following attributes:
    - tone_of_voice
    - target_audience
    - emotion

    Example Output:
    {
        "tone_of_voice": "Energetic and Fun",
        "target_audience": "Young Adults (18-25)",
        "emotion": "Excitement"
    }
    """

    try:
        image = Image.open(image_path)
        model = genai.GenerativeModel('gemini-2.5-flash')

        response = model.generate_content([prompt_text, image])

        # Clean the response text to ensure it's valid JSON
        json_text = response.text.strip().replace("```json", "").replace("```", "")
        response_data = json.loads(json_text)

        return BrandProfileExtraction(
            tone_of_voice=response_data.get("tone_of_voice", "N/A"),
            target_audience=response_data.get("target_audience", "N/A"),
            emotion=response_data.get("emotion", "N/A"),
        )
    except Exception as e:
        print(f"An error occurred during brand profile extraction: {e}")
        return BrandProfileExtraction(tone_of_voice="Error", target_audience="Error", emotion="Error")


def review_new_post(
        brand_standards: List[BrandProfileExtraction],
        to_review: BrandProfileExtraction
) -> Dict[str, Any]:
    brand_standards_json = json.dumps([asdict(bs) for bs in brand_standards], indent=2)
    to_review_json = json.dumps(asdict(to_review), indent=2)

    prompt = f"""
    You are a brand consistency expert. Your task is to review a new social media post against a list of established brand standards.

    Established Brand Standards (from previous successful posts):
    {brand_standards_json}

    New Post to Review:
    {to_review_json}

    Please provide a review of the new post in JSON format with the following structure:
    {{
        "engagement_score": "bad" | "medium" | "good",
        "on_brand_score": "bad" | "medium" | "good",
        "feedback": ["list of concise feedback strings"]
    }}

    Analyze the alignment in tone_of_voice, target_audience, and emotion. Provide constructive feedback.
    """

    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        generation_config = genai.types.GenerationConfig(response_mime_type="application/json")

        response = model.generate_content(prompt, generation_config=generation_config)

        review = json.loads(response.text)
        return review

    except Exception as e:
        print(f"An error occurred during post review: {e}")
        return {
            "engagement_score": "bad",
            "on_brand_score": "bad",
            "feedback": [f"An error occurred: {e}"]
        }


def create_dummy_image(path: str, text: str, size=(512, 512), bg_color="orange", text_color="white"):
    """Creates a simple placeholder image with text."""
    img = Image.new('RGB', size, color=bg_color)
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", 20)
    except IOError:
        font = ImageFont.load_default()

    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]

    position = ((size[0] - text_width) / 2, (size[1] - text_height) / 2)
    draw.text(position, text, font=font, fill=text_color)
    img.save(path)


if __name__ == "__main__":
    print("--- 1. Establishing Brand Standards from 'branding/' folder ---")

    brand_standards_list = [extract_brand_profile("branding/" + path) for path in os.listdir("branding/")]
    print(brand_standards_list)

    new_post_branding = extract_brand_profile("/Users/mattia/Desktop/testing1.png")

    pprint(review_new_post(brand_standards_list, new_post_branding))

    # aligned_post_extraction = extract_brand_profile(aligned_post_path)

    # aligned_review = review_new_post(brand_standards=brand_standards_list, to_review=aligned_post_extraction)

    # print(json.dumps(aligned_review, indent=2))

    # print("\n--- 3. Reviewing Misaligned Post ---")
    # misaligned_post_path = dummy_review_images["misaligned.jpg"]
    # misaligned_post_extraction = extract_brand_profile(misaligned_post_path)
    # print(f"New Misaligned Post Profile: {misaligned_post_extraction}")
    # misaligned_review = review_new_post(brand_standards=brand_standards_list, to_review=misaligned_post_extraction)
    # print("Review Result (Misaligned Post):")
    # print(json.dumps(misaligned_review, indent=2))

    # # Clean up dummy files and folder
    # for path in standard_paths:
    #     if os.path.exists(path):
    #         os.remove(path)
    # if os.path.exists(branding_folder):
    #     os.rmdir(branding_folder)
    # for path in dummy_review_images.keys():
    #      if os.path.exists(path):
    #         os.remove(path)
