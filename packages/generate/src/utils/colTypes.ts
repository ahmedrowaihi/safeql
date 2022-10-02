export const colTypes = [
  "int2",
  "int4",
  "int8",
  "smallint",
  "int",
  "bigint",
  "real",
  "float4",
  "float",
  "float8",
  "numeric",
  "decimal",
  "smallserial",
  "serial",
  "bigserial",
  "uuid",
  "text",
  "varchar",
  "char",
  "bpchar",
  "citext",
  "bit",
  "bool",
  "boolean",
  "date",
  "timestamp",
  "timestamptz",
  "time",
  "timetz",
  "interval",
  "inet",
  "cidr",
  "macaddr",
  "macaddr8",
  "money",
  "void",
  "json",
  "jsonb",
  "bytea",
] as const;

export type ColType = typeof colTypes[number];
