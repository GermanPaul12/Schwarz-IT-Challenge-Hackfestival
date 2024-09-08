import json
import openai
from get_raw_data import get_raw_data
import os

# OpenAI API key setup
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Example raw JSON data (simulating the data you provided)
raw_json = get_raw_data()

# Function to get the food category using OpenAI API
def get_food_category(product_name):
    prompt = f"Determine the food category (e.g., fruit, vegetable, dairy, meat) for the following product: '{product_name}'"
    
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=10,
        temperature=0
    )
    
    # Extract the category from the response
    category = response.choices[0].text.strip().lower()
    return category

def get_emission_factor(product_name):
    """
    This function prompts OpenAI to estimate the emission factor (kg CO2e per kg) for a given product name.
    
    Parameters:
    - product_name: str, the name of the product (e.g., "Organic Cherry Tomatoes")

    Returns:
    - emission_factor: float, the estimated emission factor in kg CO2e per kg
    """
    prompt = f"Estimate the carbon emission factor in kg CO2 per kg for the following food product: '{product_name}'. Only return a number."

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=10,
        temperature=0
    )
    
    # Extract the emission factor from the response
    emission_factor = response.choices[0].text.strip()
    
    try:
        # Convert the response to a float
        emission_factor = float(emission_factor)
    except ValueError:
        # If the response is not a valid number, default to 1.0
        emission_factor = 1.0
    
    return emission_factor


# Function to process raw JSON data and add emission factor and food category
def process_json_data(raw_data):
    processed_data = []

    for product in raw_data:
        # Extract product details
        product_name = product['name']

        # Use OpenAI API to get food category
        food_category = get_food_category(product_name)
        
        # Get emission factor based on food category
        emission_factor = get_emission_factor(product_name)  # Default to 1.0 if category is not found

        # Add food category and emission factor to the product data
        product['foodCategory'] = food_category
        product['emissionFactor'] = emission_factor

        processed_data.append(product)

    return processed_data

# Load raw JSON data
raw_data = json.loads(raw_json)

# Process the data to add emission factors and categories
processed_data = process_json_data(raw_data)

# Output the processed data
print(json.dumps(processed_data, indent=2))
