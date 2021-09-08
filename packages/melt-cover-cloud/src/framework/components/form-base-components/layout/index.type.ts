import React from "react";
import { IFormBaseComponentsUnion } from "../index.type";

export type LayoutType = {
  type: 'Layout';
  props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  children?: IFormBaseComponentsUnion[]|(IFormBaseComponentsUnion[])[];
}