import Column from "components/kanban/column";
import { ColumnType } from "components/kanban/enums";
import Section from "components/section";
import React from "react";
import Box from "_common/components/box";
import Flex from "_common/components/flex";
import Text from "_common/components/text";

const Kanban = ({ leftNav }: { leftNav: React.ReactNode }) => {
  return (
    <div className="KanbanPage">
      <Flex as="main">
        {leftNav}
        <Box as="main" display="flex" direction="column" width="100%">
          <Text fontSize="md" textAlign="center">
            칸반페이지
          </Text>
          <Section
            as="section"
            sectionType="grid"
            gridTemplateColumns="repeat(4, 1fr)"
          >
            <Column column={ColumnType.TO_DO} />
            <Column column={ColumnType.IN_PROGRESS} />
            <Column column={ColumnType.BLOCKED} />
            <Column column={ColumnType.COMPLETED} />
          </Section>
        </Box>
      </Flex>
    </div>
  );
};

export default Kanban;