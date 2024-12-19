import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // JavaScript 및 JSX 파일 대상
    languageOptions: {
      globals: globals.browser, // 브라우저 환경 전역 변수
    },
    rules: {
      "no-useless-catch": "off", // Unnecessary try/catch 경고 비활성화
      "react/prop-types": "off", // PropTypes 관련 경고 비활성화
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
