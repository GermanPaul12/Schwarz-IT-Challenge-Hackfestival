import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from datetime import datetime

# Sample data (for demonstration purposes)
data = {
    'avg_sold_per_day': [20, 15, 25, 30, 18, 22],
    'expiry_date': ['2024-09-15', '2024-09-10', '2024-09-20', '2024-09-25', '2024-09-12', '2024-09-18'],
    'available_amount': [100, 50, 120, 80, 60, 90],
    'waste_amount': [10, 5, 15, 20, 8, 12]  # Target: estimated waste amount (this is just example data)
}

# Create a DataFrame
df = pd.DataFrame(data)

# Convert expiry_date to days remaining
df['expiry_date'] = pd.to_datetime(df['expiry_date'])  # Convert to datetime
df['days_remaining'] = (df['expiry_date'] - pd.to_datetime(datetime.now())).dt.days

# Select the features (X) and target (y)
X = df[['avg_sold_per_day', 'days_remaining', 'available_amount']]
y = df['waste_amount']

# Split data into training and test sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse}")

# Example prediction
example_input = np.array([[20, 5, 100]])  # avg_sold_per_day=20, days_remaining=5, available_amount=100
predicted_waste = model.predict(example_input)
print(f"Predicted waste amount: {predicted_waste[0]}")
