import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import documentsRoute from "./routes/documents";
import usersRoute from "./routes/users";
import itemARoute from "./routes/itemA";

const app: any = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET)); // get요청이 오면 uri변수들이 파싱되어 req.cookies객체에 저장된다.

const routes = [...documentsRoute, ...usersRoute, ...itemARoute];

routes.forEach(({ method, route, handler }) => {
  app[method](route, handler);
});

app.listen({ port: 8000 });
console.log("server is listening on port 8000...");

// app.get('/', (res:any,req)=>{
//   res.send('ok')
// })
// app.post('/documents', (req,res)=>{
//   ....
// })
