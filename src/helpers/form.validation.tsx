import { Rule } from "antd/es/form";

export const requireFormField = (message: string): Rule => ({
  required: true,
  message: message,
});
