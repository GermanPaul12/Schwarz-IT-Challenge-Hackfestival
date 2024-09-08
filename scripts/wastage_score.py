import numpy as np

# Function to calculate wastage score
def calculate_wastage_score(waste_amount, emission_factor, price_per_kg):
    """
    Calculate the wastage score.

    Parameters:
    waste_amount (float): Estimated amount going to waste (in kg)
    emission_factor (float): Emission factor (kg CO2 per kg of product)
    price_per_kg (float): Price of the product per kg (in €)

    Returns:
    float: The wastage score
    """
    wastage_score = waste_amount * emission_factor * price_per_kg
    return wastage_score

# Example data
estimated_waste = 12.0  # Estimated waste amount in kg (from the previous model)
emission_factor = 2.5   # Emission factor in kg CO2 per kg of product
price_per_kg = 5.0      # Price per kg in €

if __name__ == '__main__':
    # Calculate the wastage score
    wastage_score = calculate_wastage_score(estimated_waste, emission_factor, price_per_kg)

    print(f"Estimated Waste Amount: {estimated_waste} kg")
    print(f"Emission Factor: {emission_factor} kg CO2/kg")
    print(f"Price per kg: {price_per_kg} €")
    print(f"Wastage Score: {wastage_score} € (CO2-weighted cost of waste)")
