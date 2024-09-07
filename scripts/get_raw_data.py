import requests
def get_raw_data():
    URL = "http://hackathon-products-api.apps.01.cf.eu01.stackit.cloud/api/articles"
    res = requests.get(URL)
    return res.json()

if __name__ == "__main__":
    print(get_raw_data())
    