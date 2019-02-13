import psycopg2
from psycopg2 import sql
import psycopg2.extras
import json
import hashlib
import uuid

with open("secret.json") as secret:
    secrets = json.load(secret)
    dbuser = secrets["dbuser"]
    dbname = secrets["dbname"]
    password = secrets["dbpass"]


class controlled_cursor:
    def __enter__(self):
        self.conn = psycopg2.connect(
            dbname=dbname, user=dbuser, password=password, host="localhost")
        self.cursor = self.conn.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor)
        return self.cursor

    def __exit__(self, type, value, traceback):
        self.cursor.close()
        self.conn.commit()
        self.conn.close()


def get_user(username):
    with controlled_cursor() as cursor:
        cursor.execute(sql.SQL("SELECT * FROM public.users WHERE username = {}")
                       .format(sql.Literal(username)))
        return cursor.fetchone()


def create_user(username, password, email):
    salt = str(uuid.uuid4())
    with controlled_cursor() as cursor:
        try:
            cursor.execute(
                sql.SQL(
                    "INSERT INTO public.users (username, email, password_hash, salt) VALUES ({username},{email},{password},{salt});")
                .format(
                    username=sql.Literal(username),
                    email=sql.Literal(email),
                    password=sql.Literal(hashlib.sha512(password.encode(
                        'utf-8') + salt.encode('utf-8')).hexdigest()),
                    salt=sql.Literal(salt)
                ))
        except psycopg2.IntegrityError:
                return "Username Taken"
        return None
