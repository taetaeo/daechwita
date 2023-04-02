import * as express from "express";
import multer from "multer";

import { dbService } from "../firebase";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query as firebaseQuery,
  where,
} from "firebase/firestore";

const upload = multer();

/**
 * POST MAN에서 사용시 Header에 token값으로 인증 사용
 * 그 외는 캐시 데이터의 uid로 인증 사용
 */
const charts = [
  {
    method: "get",
    route: "/total/schedules",
    upload: upload.none(),
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          query: { category = "" },
        } = req;
        // 토큰에서 uid 가져오기

        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const schedules = await collection(dbService, "schedules");
        const queryOptions: any = [orderBy("createdAt", "desc")];

        const q = firebaseQuery(schedules, ...queryOptions);
        const schedulesSnapshot = await getDocs(q);
        const data: DocumentData[] = [];

        schedulesSnapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            application: d.application,
          });
        });
        let refinedData: DocumentData[] = [];

        // company의 데이터만 정제
        if (category === "company") {
          const newArray = data.filter(
            (item) => item.application.company !== ""
          );
          newArray.forEach((item) => {
            const targetIndex = refinedData.findIndex(
              (d) => d.company === item.application.company
            );

            if (targetIndex < 0) {
              refinedData.push({
                company: item.application.company,
                count: 1,
              });
            } else {
              refinedData.splice(targetIndex, 1, {
                ...refinedData[targetIndex],
                count: refinedData[targetIndex].count + 1,
              });
            }
          });
        }
        // department의 데이터만 정제
        else if (category === "department") {
          const newArray = data.filter(
            (item) => item.application.department !== ""
          );
          newArray.forEach((item) => {
            const targetIndex = refinedData.findIndex(
              (d) => d.department === item.application.department
            );

            if (targetIndex < 0) {
              refinedData.push({
                department: item.application.department,
                count: 1,
              });
            } else {
              refinedData.splice(targetIndex, 1, {
                ...refinedData[targetIndex],
                count: refinedData[targetIndex].count + 1,
              });
            }
          });
        }

        res.send({ data: refinedData });
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },
  // GET RESUMES
  {
    method: "get",
    route: "/all/resumes",
    upload: upload.none(),
    handler: async (req: express.Request, res: express.Response) => {
      try {
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기

        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const resumes = await collection(dbService, "resumes");
        const queryOptions: any = [orderBy("createdAt", "desc")];
        queryOptions.unshift(where("publishing", "==", true));

        const q = firebaseQuery(resumes, ...queryOptions);
        const resumesSnapshot = await getDocs(q);
        const data: DocumentData[] = [];

        resumesSnapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            ...d,
          });
        });

        const refinedData: DocumentData[] = [];
        data.forEach((item) => {
          refinedData.push({
            apply: item.apply,
            tag: item.documents.map((d: any) => d.tag),
          });
        });

        res.send({ data: refinedData });
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },

  {
    method: "get",
    route: "/all/schedules",
    upload: upload.none(),
    handler: async (req: express.Request, res: express.Response) => {
      try {
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기
        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const schedules = await collection(dbService, "schedules");
        const queryOptions: any = [orderBy("createdAt", "desc")];

        const q = firebaseQuery(schedules, ...queryOptions);
        const schedulesSnapshot = await getDocs(q);
        const data: DocumentData[] = [];

        schedulesSnapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            ...d,
          });
        });

        const refinedData: DocumentData[] = [];
        data.forEach((item) => {
          refinedData.push({
            application: item.application,
            column: item.column,
          });
        });

        res.send({ data: refinedData });
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },
  {
    method: "get",
    route: "/user/resumes",
    upload: upload.none(),
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          query: { publishing },
        } = req;
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기

        const newPublishing = publishing
          ? JSON.parse(publishing as string)
          : false;

        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const resumes = await collection(dbService, "resumes"); // resumes 컬렉션에 접근
        // 쿼리 조건문
        const queryOptions: any = [orderBy("createdAt", "desc")]; // 가장 최근이 먼저 나오도록
        queryOptions.unshift(where("uid", "==", uid));

        queryOptions.unshift(where("publishing", "==", newPublishing));

        const q = firebaseQuery(resumes, ...queryOptions);
        const resumesSnapshot = await getDocs(q);
        const data: DocumentData[] = [];

        resumesSnapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            ...d,
          });
        });
        console.log("/user/resumes", data);
        const refinedData: DocumentData[] = [];
        data.forEach((item) => {
          refinedData.push({
            apply: item.apply,
            tag: item.documents.map((d: any) => d.tag),
          });
        });

        res.send({ data: refinedData });
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },
  {
    method: "get",
    route: "/user/schedules",
    upload: upload.none(),
    handler: async (req: express.Request, res: express.Response) => {
      try {
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기
        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const schedules = await collection(dbService, "schedules");
        const queryOptions: any = [orderBy("createdAt", "desc")];
        queryOptions.unshift(where("uid", "==", uid));

        const q = firebaseQuery(schedules, ...queryOptions);
        const schedulesSnapshot = await getDocs(q);
        const data: DocumentData[] = [];

        schedulesSnapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            ...d,
          });
        });

        const refinedData: DocumentData[] = [];
        data.forEach((item) => {
          refinedData.push({
            application: item.application,
            column: item.column,
          });
        });

        res.send({ data: refinedData });
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },
];
export default charts;
