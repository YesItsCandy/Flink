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
                       .format(sql.Literal(username.lower())))
        return cursor.fetchone()


def update_user(username, data):
    with controlled_cursor() as cursor:
        cursor.execute(sql.SQL("""
        UPDATE public.users
	    SET 
        email={email},
        twitter={twitter},
        furaffinity={furaffinity},
        telegram={telegram},
        discord={discord}, 
        skype={skype},
        twitter_public={twitter_public},
        furaffinity_public={furaffinity_public}, 
        telegram_public={telegram_public},
        discord_public={discord_public},
        skype_public={skype_public}
	    WHERE username = {username};
        """)
        .format(
            username=sql.Literal(username.lower()),
            email=sql.Literal(data["email"]),
            twitter=sql.Literal(data["twitter"]),
            furaffinity=sql.Literal(data["furaffinity"]),
            telegram=sql.Literal(data["telegram"]),
            discord=sql.Literal(data["discord"]),
            skype=sql.Literal(data["skype"]),
            twitter_public=sql.Literal(data["twitter_public"]),
            telegram_public=sql.Literal(data["telegram_public"]),
            discord_public=sql.Literal(data["discord_public"]),
            skype_public=sql.Literal(data["skype_public"]),
            furaffinity_public=sql.Literal(data["furaffinity_public"]),
            )
        )


def create_user(username, password, email):
    salt = str(uuid.uuid4())
    with controlled_cursor() as cursor:
        try:
            cursor.execute(
                sql.SQL(
                    "INSERT INTO public.users (username, email, password_hash, salt) VALUES ({username},{email},{password},{salt});")
                .format(
                    username=sql.Literal(username.lower()),
                    email=sql.Literal(email),
                    password=sql.Literal(hashlib.sha512(password.encode(
                        'utf-8') + salt.encode('utf-8')).hexdigest()),
                    salt=sql.Literal(salt)
                ))
        except psycopg2.IntegrityError:
                return "Username Taken"
        return None
