#!/usr/bin/python3

import os
import json
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
    from moped_proj_features
    order by random();
    """

    if args.schema:
        alter = pg.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        alter.execute(
            """
            alter table moped_proj_features 
              add column geography_collection geography(GEOMETRYCOLLECTION, 4326),
              add column geography_point geography(POINT, 4326),
              add column geography_linestring geography(LINESTRING, 4326),
              add column attributes jsonb
              ;
            """
        )
        pg.commit()

    cursor = pg.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute(sql)
    features = cursor.fetchall()

    for record in features:
        feature = geojson.loads(record["feature"])

        if not feature.is_valid:
            raise Exception("Invalid feature")

        print(str(record["feature_id"]) + ": " + str(feature["geometry"]["type"]))

        if feature["geometry"]["type"] == "Point":
            sql = """
            update moped_proj_features 
            set 
            geography_collection = ST_ForceCollection(ST_GeomFromGeoJSON(%s)),
            geography_point = ST_GeomFromGeoJSON(%s),
            attributes = %s
            where feature_id = %s
            ;
            """
            try:
                update = pg.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
                update.execute(
                    sql,
                    (
                        geojson.dumps(feature["geometry"]),
                        geojson.dumps(feature["geometry"]),
                        geojson.dumps(feature["properties"]),
                        record["feature_id"],
                    ),
                )
            except psycopg2.errors.InternalError_ as e:
                print("\n\b🛎Postgres error: " + str(e))
                print(geojson.dumps(feature, indent=2))
                pg.rollback()
            else:  # no exception
                pg.commit()
        if feature["geometry"]["type"] == "LineString":
            sql = """
            update moped_proj_features 
            set 
            geography_collection = ST_ForceCollection(ST_GeomFromGeoJSON(%s)),
            geography_linestring = ST_GeomFromGeoJSON(%s),
            attributes = %s
            where feature_id = %s
            ;
            """
            try:
                update = pg.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
                update.execute(
                    sql,
                    (
                        geojson.dumps(feature["geometry"]),
                        geojson.dumps(feature["geometry"]),
                        geojson.dumps(feature["properties"]),
                        record["feature_id"],
                    ),
                )
            except psycopg2.errors.InternalError_ as e:
                print("\n\b🛎Postgres error: " + str(e))
                print(geojson.dumps(feature, indent=2))
                pg.rollback()
            else:  # no exception
                pg.commit()


def main(args):
    moped_proj_features(args)


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-s",
        "--schema",
        action="store_true",
        help=f"Make schema changes",
    )
    args = parser.parse_args()
    main(args)
