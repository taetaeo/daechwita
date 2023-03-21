import React from "react";
import { HTMLAttributes } from "react";
import { ColumnType, Schedule } from "types/schedule";
import { BadgeType } from "_common/components/badge/index.types";

export interface ColumnProps {}
export interface Props extends HTMLAttributes<HTMLDivElement>, ColumnProps {
  children?: React.ReactNode;
  badge?: boolean;
  addBtn?: boolean;
  column: ColumnType;
  data: Schedule[] | undefined;
}
