import type { ReactNode } from "react";

export type ControlValue = string | boolean;
export type ControlValues = Record<string, ControlValue>;

export interface SelectControl {
  type: "select";
  key: string;
  label: string;
  options: Array<{ label: string; value: string }>;
  default: string;
}

export interface TextControl {
  type: "text";
  key: string;
  label: string;
  default: string;
  placeholder?: string;
}

export interface BooleanControl {
  type: "boolean";
  key: string;
  label: string;
  default: boolean;
}

export type ControlDef = SelectControl | TextControl | BooleanControl;

export interface PlaygroundItem {
  id: string;
  name: string;
  description: string;
  controls: ControlDef[];
  render: (values: ControlValues) => ReactNode;
  generateCode: (values: ControlValues) => string;
}

export function defaultValues(controls: ControlDef[]): ControlValues {
  const values: ControlValues = {};
  for (const control of controls) {
    values[control.key] = control.default;
  }
  return values;
}
