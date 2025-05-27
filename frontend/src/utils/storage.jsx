// src/utils/storage.js

// 현재 로그인한 사용자 ID 가져오기
export const getUserId = () => localStorage.getItem("userId") || "";

// 일정 저장용 키 생성
export const getScheduleKey = (userId) => `schedule_${userId}`;

// 일기 저장용 키 생성
export const getDiaryKey = (userId, date) => `diary_${userId}_${date}`;

// 로그인 상태 확인
export const isLoggedIn = () => Boolean(localStorage.getItem("userId"));

// 로그인 수행
export const login = (userId) => {
  if (userId.trim()) {
    localStorage.setItem("userId", userId);
  }
};

// 로그아웃 수행
export const logout = () => {
  localStorage.removeItem("userId");
};
