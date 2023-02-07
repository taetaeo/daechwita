import React from "react";
import Section from "components/section";
import useFetch from "hooks/useFetch";
import Flex from "_common/components/flex";
import { Layout } from "components/layout";
import Column from "components/kanban/column";
import { ColumnType } from "components/kanban/enums";

const Home = ({ leftNav }: { leftNav: React.ReactNode }) => {
  // const { payload, loading } = useFetch("get", "/item");
  const { payload: usersPayload, loading, doFetch } = useFetch("get", "/users");

  const handleClick = () => {
    // doFetch({
    //   method: "post",
    //   data: {
    //     "test4@gmail.com": {
    //       email: "test4@gmail.com",
    //       nickName: "테스트3",
    //       pw: 1234,
    //       itemOfUser: [],
    //     },
    //   },
    // });
  };

  return (
    <>
      <div
        className="homepage"
        style={{ width: "100%", backgroundColor: "#eaeaea" }}
      >
        <Flex as="main">
          {leftNav}
          <Section
            as="section"
            sectionType="grid"
            gridTemplateColumns="repeat(5, 1fr)"
          >
            <div style={{ backgroundColor: "rosybrown" }} onClick={handleClick}>
              섹션1
            </div>
            <div>섹션2</div>
            <div>섹션3</div>
            <div>섹션4</div>
            <div>섹션5</div>
            <div>섹션6</div>
            <div>섹션7</div>
            <div>섹션8</div>
            <div>섹션9</div>
            <div style={{ backgroundColor: "rosybrown" }}>섹션10</div>
            <div>섹션11</div>
            <div>섹션12</div>
            {/* <>{!!!loading && usersPayload["test@gmail.com"].itemOfUser}</> */}
            <Column column={ColumnType.TO_DO} />
          </Section>
        </Flex>
      </div>
    </>
  );
};
export default Home;
