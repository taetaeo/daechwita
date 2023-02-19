import * as express from "express";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const PAGE_SIZE = 20;

const applicationsRoute = [
  // GET DOCUMENTS
  {
    method: "get",
    route: "/applications",
    handler: async (req: express.Request, res: express.Response) => {
      const {
        query: { title, tag },
      } = req;

      // 토큰에서 uid 가져오기
      const uid = req.headers.authorization?.split(" ")[1].trim();
      if (!uid) throw Error("유저 아이디가 없습니다.");

      console.log("-----pass------", uid);

      const applications = await collection(db, "applications");
      const queryOptions: any = [orderBy("createdAt", "desc")];
      queryOptions.unshift(where("uid", "==", uid)); // 해당 uid값이 있는 스케쥴 정보를 select

      const q = query(applications, ...queryOptions, limit(PAGE_SIZE));
      const applicationsSnapshot = await getDocs(q);
      const data: DocumentData[] = [];

      applicationsSnapshot.forEach((doc) => {
        const d = doc.data();
        data.push({
          id: doc.id,
          ...d,
        });
      });
      const newData = data;
      res.send(newData.map((data) => data.documents));
      return data;
    },
  },
];
export default applicationsRoute;
