import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { getClient, QueryKeys } from "queryClient";

import { getAllResumes } from "lib/apis/api/resumes";
import { getResumesService } from "lib/apis/service/getResumes";
import useInterSection from "hooks/app/useInterSection";

import Section from "components/section";
import { ResumeCard as Card } from "components/card";
import Text from "_common/components/text";
import Button from "_common/components/button";
import Box from "_common/components/box";
import Grid from "_common/components/grid";

import { emoji } from "utils/constants";
import { ResumesType } from "types/resumes";
import useResumes from "hooks/app/useResumes";

const Resumes = () => {
  const queryClient = getClient();
  const navigate = useNavigate();
  const location = useLocation();
  const decodeUri = decodeURI(location?.search);

  const { data, isLoading, isError, refetch } = useQuery<ResumesType[]>(
    QueryKeys.RESUMES(),
    () => getAllResumes().then(getResumesService)
  );
  /**
   * @abstract Resumes 서버 데이터의 상태관리를 위한 훅
   * @description Resumes의 쿼리 데이터를 useMutation하여 CRUD를 하는 훅
   * @param queryClient 쿼리 클라이언트
   * @param QueryKeys 쿼리키
   * @return onCreate onDelete onUpdate onPublishing
   */
  const { onCreate } = useResumes(queryClient, QueryKeys);

  const [toggle, setToggle] = React.useState<boolean>(false); // 모달 창 open/close를 위한 상태관리
  const fetchMoreRef = React.useRef<HTMLDivElement>(null); // 맨 밑의 무한스크롤을 감지하기 위한 DIV 태그

  /**
   * @description 무한스크롤을 위한 커스텀 훅
   * @params targetRef
   */
  const intersecting = useInterSection(fetchMoreRef);

  const handleAddClick = async () => {
    /**
     * @description useResumes의 Return 요소 중 하나로 Resumes 데이터들을 useMutation으로 캐싱 데이터를 관리하는 훅
     * @abstract POST 요청시에, 쿼리 무효화를 하고 reFetch를 실행
     */
    await onCreate();
    await navigate("write");
  };

  React.useEffect(() => {
    document.body.style.backgroundColor = "#eaeaf0;";
    return () => {
      document.body.style.backgroundColor = "transparent";
    };
  }, []);

  return (
    <>
      <Text
        fontSize="xxxl"
        fontWeight={700}
        textAlign="center"
        style={{ height: "10px", padding: "2rem 0" }}
      >
        나의 자소서 목록 {emoji.DOCUMENT}
      </Text>
      <Section
        as="section"
        width="100%"
        height="100%"
        paddingBottom={10}
        paddingRight={10}
        paddingLeft={10}
        paddingTop={10}
      >
        <Grid
          gridTemplateColumns="repeat(4, 1fr)"
          gridTemplateRows="repeat(4, 1fr)"
          placeItems="center"
        >
          <Box
            as="div"
            role="alert"
            variant="gray_200_border"
            width="100%"
            height="420px"
            marginTop={20}
            marginBottom={20}
            gap={20}
          >
            <Button
              width="100%"
              height="100%"
              variant="zinc_200"
              onClick={handleAddClick}
            >
              <AiOutlinePlusSquare size={100} />
            </Button>
          </Box>

          {data?.map(
            (
              {
                id,
                createdAt,
                imgUrl,
                updatedAt,
                uid,
                resumes,
                tag,
              }: ResumesType,
              index
            ) => (
              <Card
                key={`${id}-${index}`}
                id={id}
                uid={uid}
                imgUrl={imgUrl}
                createdAt={createdAt}
                updatedAt={updatedAt}
                resumes={resumes}
                tag={tag}
                toggle={toggle}
                setToggle={setToggle}
              />
            )
          )}
        </Grid>
        {/* <div className="fetchMore" ref={fetchMoreRef}></div> */}
      </Section>
    </>
  );
};

export default Resumes;
