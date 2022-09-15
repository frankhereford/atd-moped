#!/usr/bin/python3

import os
import argparse

import psycopg2
import psycopg2.extras
import geojson


DB_HOST = os.environ.get("DB_HOST", "host.docker.internal")
DB_USER = os.environ.get("DB_USER", "moped")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "moped")
DB_NAME = os.environ.get("DB_NAME", "moped")

pg = psycopg2.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME)


def moped_proj_features(args):
    sql = """
    select feature_id, feature::character varying as feature
    from moped_proj_features;
    """

    if args.alter:
        alter = pg.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        alter.execute(
            "alter table moped_proj_features add column geography geography(GEOMETRYCOLLECTION, 4326);"
        )
        pg.commit()

    cursor = pg.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute(sql)
    features = cursor.fetchall()

    for record in features:
        feature = geojson.loads(record["feature"])
        # print("feature.is_valid(): " + str(feature.is_valid))
        # print("type(feature): " + str(type(feature)))
        # print(geojson.dumps(feature, indent=2))
        print(feature["geometry"]["type"])


def main(args):
    moped_proj_features(args)


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-a",
        "--alter",
        action="store_true",
        help=f"Alter tables",
    )
    args = parser.parse_args()
    main(args)
