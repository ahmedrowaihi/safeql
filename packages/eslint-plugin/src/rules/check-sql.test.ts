import { ESLintUtils } from "@typescript-eslint/utils";
import path from "node:path";
import rules from ".";

const tsconfigRootDir = path.resolve(__dirname, "../../");
const project = "tsconfig.json";
const filename = path.join(tsconfigRootDir, "src/file.ts");

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: { project, tsconfigRootDir },
});

const options = [{ databaseUrl: "postgres://postgres:postgres@localhost:5432/medflyt_test_sim" }];

ruleTester.run("check-sql", rules["check-sql"], {
  valid: [
    {
      filename,
      options: options,
      code: "const a = conn.queryOne<{ x: Unknown<number>; }>(sql`SELECT 1 as x`);",
    },
  ],
  invalid: [
    {
      filename,
      options: options,
      code: "const a = conn.queryOne(sql`SELECT 1 as x`);",
      output: "const a = conn.queryOne<{ x: Unknown<number>; }>(sql`SELECT 1 as x`);",
      errors: [{ messageId: "queryMissingTypeAnnotations" }],
    },
    // {
    //   options: options,
    //   code: "const a = conn.queryOne(sql`SELECT 1 as x`);",
    //   output: "const a = conn.queryOne<{ x: Unknown<string>; }>(sql`SELECT 1 as x`);",
    //   errors: [{ messageId: "queryInvalidTypeAnnotations" }],
    // },
  ],
});
