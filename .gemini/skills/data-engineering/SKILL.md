---
name: data-engineering
description: Comprehensive guidance for data pipelines, ETL processes, data modeling, and BigQuery optimization. Use when building data pipelines (Airflow, DBT), managing large datasets, or performing complex SQL transformations.
---

# Data Engineering Expert Skill

This skill provides expert guidance for data engineering, from data ingestion to warehouse optimization.

## Core Competencies

- **ETL/ELT**: Designing robust data ingestion and transformation pipelines.
- **Data Warehousing**: BigQuery, Snowflake, and Redshift schema optimization.
- **SQL Mastery**: Window functions, recursive CTEs, and UDFs.
- **Python for Data**: Pandas, Dask, PySpark, and Scikit-Learn.
- **Orchestration**: Airflow, Dagster, and dbt (data build tool).
- **Data Governance**: Lineage, cataloging, and quality monitoring.

## Common Workflows

### Building a Data Pipeline

1. Identify source systems and extraction methods (API, JDBC, File).
2. Design the data model (Star Schema, Data Vault).
3. Implement transformation logic using dbt or Spark.
4. Set up quality checks (data profiling, anomaly detection).
5. Orchestrate with Airflow or cron-based schedules.

### BigQuery Optimization

- **Partitioning**: Partition by date or timestamp to reduce scan costs.
- **Clustering**: Cluster by high-cardinality columns for faster filters.
- **Query Profiling**: Use Execution Details to identify bottlenecks.

## Best Practices

- **Idempotency**: Ensure pipeline runs are rerunnable without duplication.
- **Version Control**: Store SQL and pipeline definitions in Git.
- **Data Quality**: Implement Great Expectations or dbt tests.
- **Schema Evolution**: Handle schema changes gracefully with versioning.
- **Security**: Manage PII data with row-level security and masking.
