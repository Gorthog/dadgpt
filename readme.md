for setup, run the following commands:

```fish
python3 -m venv venv
source venv/bin/activate.fish
pip install -r requirements.txt
```
update your api key in constants.py and then run

```fish
python main.py "your search query"
```

create a .env file and add your api key there like this 

```
OPENAI_API_KEY = "your api key"
```
