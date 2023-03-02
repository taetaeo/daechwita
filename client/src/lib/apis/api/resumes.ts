import { authInstance } from "../utils/instance";
import {
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from "../utils/methods";
import { getUsers, updateUsers } from "./users";
import { BASE_URL_RESUMES } from "utils/constants/url";
import { handleError } from "../utils/helpers";

export const basePath = "/resumes";

export const resumeApiRoutes = {
  getResumeByResumeId: (resumeId: string) => `${basePath}/${resumeId}`,
  getLatestResumeByQuery: (query: string) => `${basePath}?latest=${query}`,
  updateResumeByResumeId: (resumeId: string) => `${basePath}/${resumeId}`,
  deleteResumeByResumeId: (resumeId: string) => `${basePath}/${resumeId}`,
};

/**
 * GET resume
 *
 * @param resumeId 해당 id를 가진 자기소개서만 가져온다.
 */
export const getResume = async (resumeId: string) => {
  try {
    const apiRoute = resumeApiRoutes.getResumeByResumeId(resumeId);
    console.info(`id: ${resumeId}가진 자기소개서를 가져오는 중 입니다...`);
    const { data } = await requestGet(apiRoute);
    console.info(`${resumeId}를 가진 자기소개서가 성공적으로 반환되었습니다!`);
    return { data };
  } catch (error) {
    console.error(`id: ${resumeId}를 가져오는 도중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
/**
 * GET resume
 *
 * @param resumeId 해당 id를 가진 자기소개서만 가져온다.
 */
export const getLatestResume = async ({ latest = false }) => {
  try {
    const apiRoute = resumeApiRoutes.getLatestResumeByQuery(String(latest));
    console.info(`latest: ${latest}인 자기소개서를 가져오는 중 입니다...`);
    const { data } = await requestGet(apiRoute);
    console.info(
      `latest: ${latest}인 최근 작성한 자기소개서가 성공적으로 반환되었습니다!`
    );
    return { data };
  } catch (error) {
    console.error(
      `latest: ${latest}인 자기소개서를 가져오는 도중 에러가 발생하였습니다!`
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
/**
 * GET resumes
 */
export const getAllResumes = async () => {
  try {
    console.info(`자기소개서 전부를 가져오는 중 입니다...`);
    const { data } = await requestGet(basePath);
    console.info(`자기소개서가 성공적으로 반환되었습니다!`);
    return { data };
  } catch (error) {
    console.error(`자기소개서를 가져오는 도중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

/**
 * POST resumes
 *
 * @param payload
 */
export const createResume = async (payload: unknown = {}) => {
  try {
    console.info("자기소개서를 작성성 중 입니다...");
    const { data } = await requestPost(basePath, payload);
    console.info(`임시 자기소개서 ${(data as any)?.id!}가 반환되었습니다!`);

    return data;
  } catch (error) {
    console.error(`자기소개서를 작성하던 중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

/**
 * PUT resumes
 *
 * @param resumeId
 * @param payload
 */
export const updateResume = async (resumeId: string, payload: unknown = {}) => {
  try {
    const apiRoute = resumeApiRoutes.updateResumeByResumeId(resumeId);
    console.info(`id: ${resumeId}가진 자기소개서를 저장 중 입니다...`);
    const response = await requestPut(apiRoute, payload);
    return response;
  } catch (error) {
    console.error(`자기소개서를 저장하던 중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

/**
 * DELETE resumes
 *
 * @param resumeId
 */
export const deleteResume = async (resumeId: string) => {
  try {
    const apiRoute = resumeApiRoutes.deleteResumeByResumeId(resumeId);
    console.info(`id: ${resumeId}가진 자기소개서를 삭제 중 입니다...`);
    const response = await requestDelete(apiRoute);
    return response;
  } catch (error) {
    console.error(`자기소개서를 저장하던 중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};