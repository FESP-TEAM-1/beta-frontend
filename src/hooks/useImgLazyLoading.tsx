import React, { useEffect } from "react";

/*
const options = {
  root: null, // 뷰포트를 기준으로 사용 (default: null)
  rootMargin: '0px', // 기본 여백 없음 (default: 0px)
  threshold: 0.1 // 타겟 요소의 10%가 보여질 때 콜백 실행 (default: 0)
};
*/

const useImgLazyLoading = (imgRef: React.RefObject<HTMLImageElement>, options = {}) => {
  useEffect(() => {
    // 참조된 이미지 요소가 없는 경우 함수 종료
    if (!imgRef.current) return;

    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        // 해당 요소가 뷰포트에 들어왔는지 확인
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          image.src = image.dataset.src || "";
          observer.unobserve(entry.target); // 더 이상 해당 이미지를 관찰하지 않도록 설정
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(imgRef.current);

    // 컴포넌트가 언마운트될 때 observer를 해제
    return () => observer.disconnect();
  }, [imgRef, options]);
};

export default useImgLazyLoading;
