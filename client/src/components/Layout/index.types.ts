import { CSSProperties } from "@emotion/serialize";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { theme } from "styles";

export type LayoutType =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xs"
  | "write"
  | "default"
  | "amber_lg"
  | "xxl_gray";
export interface LayoutProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   *
   * @default div
   */
  as?: ElementType;
  /**
   * Layout의 variant을 설정합니다.
   *
   * @required
   */
  variant: LayoutType;

  /**
   * Layout의 배경 색상을 설정합니다.
   *
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof theme.colors;
  /**
   * Layout의 배경 이미지을 설정합니다.
   *
   * @default 'inherit'
   */
  background?: CSSProperties["backgroundImage"];
}
export interface Props extends HTMLAttributes<HTMLElement>, LayoutProps {
  inHeader?: boolean;
  header?: boolean;
  searchBar?: boolean;
  children?: ReactNode;
}
