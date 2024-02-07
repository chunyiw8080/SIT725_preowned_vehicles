import joblib
import pandas as pd
import numpy as np
import sys
import json

class CarPriceModel:
	def __init__(self):
		self.onehot = None #OneHotEncoder model for cat_columns
		self.scaler = None #Stand Scaler model for num_colums
		self.predictor = None #Target selling price

	def load_models(self):
		# print("load_models")
		model_dir = "public/python/models"
		self.onehot = joblib.load(f"{model_dir}/one_hot_encoder.joblib")
		self.scaler = joblib.load(f"{model_dir}/standard_Scaler.joblib")
		self.predictor = joblib.load(f"{model_dir}/random_model.joblib")


	def preprocess_input(self, input_data):
	# Assuming input_data is a dictionary with keys corresponding to feature names
		df = pd.DataFrame([input_data])
		# print(df.columns)
		cat_columns = ["fuel", "seller_type", "transmission", "owner"]
		load_cat_features = self.onehot.transform(df[cat_columns]).toarray()

		num_columns = ["km_driven", "mileage", "engine", "max_power", "torque", "seats"]
		load_num_features = self.scaler.transform(df[num_columns])

		load_final_features = np.hstack([load_cat_features, load_num_features])
		return load_final_features

	def predict(self, input_data):
		load_final_features = self.preprocess_input(input_data)
		result = self.predictor.predict(load_final_features)
		return result

input_data = sys.stdin.read()
data_dict = json.loads(input_data)
# print(data_dict)


carPriceModel = CarPriceModel()
carPriceModel.load_models()

prediction = int(carPriceModel.predict(data_dict))
# print("Prediction Result: ", prediction)

output_data = json.dumps(prediction)
sys.stdout.write(output_data)
sys.stdout.flush()
