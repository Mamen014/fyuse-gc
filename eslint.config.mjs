import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "no-unused-vars": "warn", // Warn about unused variables
      "react/react-in-jsx-scope": "off", // Disable React import requirement for JSX (React 17+)
      "no-console": "warn", // Warn about console usage
    },
  },
];