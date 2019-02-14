# Flink

An Art Website

# WIP

## instructions for the react app
```BASH
npm install
npm start
```

## Add this file to the root directory
secret.json
```JSON
{
    "appsecret":"A Secret",
    "dbpass":"A Differnt Secret",
    "dbuser":"A Username",
    "dbname":"A Database Name"
}
```

## instructions for the mock api
```BASH
python3 -m venv flink-env
```

On GNI/Unix:
```BASH
source flink-env/bin/activate
```
On Windows

```CMD
    flink-env\Scripts\activate.bat
```
```BASH
pip3 install -r requirements.txt
python3 website.py
```

### Don't forget to connect to the Server with the database and portforward port 5432!