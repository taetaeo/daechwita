import { getClient, QueryKeys } from "queryClient";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./firebase.config";
import { mapUserData } from "./mapUserData";
import { getUserFromCookie, removeUserCookie } from "./userCookies";
import { useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { tokenAtom } from "store/atoms";

type User = {
  uid: string;
  email: string;
  token: string;
  name: string;
  profilePic: string;
};
const useUser = () => {
  const [token, setToken] = useRecoilState(tokenAtom);
  const [user, setUser] = React.useState<User>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 로그아웃할 경우 쿠키값 제거하는 함수
  // 쿠키값이 제거시, app파일에 설정한대로, Auth 페이지로 자동 이동하며,
  const logout = async () => {
    try {
      await authService.signOut();
      await queryClient.clear(); // 모든 캐시된 데이터를 무효화
      removeUserCookie();
      setToken("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    // Firebase는 매시간 ID 토큰을 업데이트를 하며,
    // 반응 상태와 쿠키가 모두 최신 상태로 유지되는지 확인하도록 구현
    const cancelAuthListener = authService.onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user);
        setUser(userData);
      } else {
        removeUserCookie();
      }
    });
    // 쿠키 가져와서 user state에 넣는다.
    return () => {
      cancelAuthListener();
    };
  }, []);
  return { user, logout };
};

export default useUser;
