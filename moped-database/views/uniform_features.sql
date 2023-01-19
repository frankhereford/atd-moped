-- latest version: 1672872386695_update_uniform_features_feature_signals
CREATE
OR REPLACE VIEW "public"."uniform_features" AS
SELECT
  feature_signals.id,
  feature_signals.component_id,
  'feature_signals' :: text AS "table",
  feature_signals.name,
  json_build_object(
    'signal_id',
    feature_signals.signal_id,
    'knack_id',
    feature_signals.knack_id,
    'location_name',
    feature_signals.location_name,
    'render_type',
    feature_signals.render_type,
    'signal_type',
    feature_signals.signal_type
  ) AS attributes,
  feature_signals.geography
FROM
  feature_signals
WHERE
  (feature_signals.is_deleted = false)
UNION ALL
SELECT
  feature_street_segments.id,
  feature_street_segments.component_id,
  'feature_street_segments' :: text AS "table",
  feature_street_segments.name,
  json_build_object(
    'knack_id',
    feature_street_segments.knack_id,
    'ctn_segment_id',
    feature_street_segments.ctn_segment_id,
    'project_extent_id',
    feature_street_segments.project_extent_id,
    'from_address_min',
    feature_street_segments.from_address_min,
    'render_type',
    feature_street_segments.render_type,
    'to_address_max',
    feature_street_segments.to_address_max,
    'full_street_name',
    feature_street_segments.full_street_name,
    'line_type',
    feature_street_segments.line_type,
    'symbol',
    feature_street_segments.symbol,
    'source_layer',
    feature_street_segments.source_layer
  ) AS attributes,
  feature_street_segments.geography
FROM
  feature_street_segments
WHERE
  (feature_street_segments.is_deleted = false)
UNION ALL
SELECT
  feature_intersections.id,
  feature_intersections.component_id,
  'feature_intersections' :: text AS "table",
  feature_intersections.name,
  json_build_object(
    'intersection_id',
    feature_intersections.intersection_id,
    'project_extent_id',
    feature_intersections.project_extent_id,
    'source_layer',
    feature_intersections.source_layer,
    'render_type',
    feature_intersections.render_type
  ) AS attributes,
  feature_intersections.geography
FROM
  feature_intersections
WHERE
  (feature_intersections.is_deleted = false)
UNION ALL
SELECT
  feature_drawn_points.id,
  feature_drawn_points.component_id,
  'feature_drawn_points' :: text AS "table",
  feature_drawn_points.name,
  NULL :: json AS attributes,
  feature_drawn_points.geography
FROM
  feature_drawn_points
WHERE
  (feature_drawn_points.is_deleted = false)
UNION ALL
SELECT
  feature_drawn_lines.id,
  feature_drawn_lines.component_id,
  'feature_drawn_lines' :: text AS "table",
  feature_drawn_lines.name,
  NULL :: json AS attributes,
  feature_drawn_lines.geography
FROM
  feature_drawn_lines
WHERE
  (feature_drawn_lines.is_deleted = false);
