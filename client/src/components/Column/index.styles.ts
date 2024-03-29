import styled from "@emotion/styled";
import { ColumnProps } from "./index.types";

export const Wrapper = styled.div<Required<ColumnProps>>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;
