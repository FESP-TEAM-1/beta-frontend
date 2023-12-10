import React, { useState } from "react";
import styles from "./ReviewSection.module.css";
import { Button, Modal } from "@/components/common";
import { ReviewItem, ReviewForm, GuestAccess } from "@/components/detail";
import { useModalStore } from "@/stores/useModalStore";

const commentData = [
  {
    id: 1,
    username: "신은구",
    createdAt: "2023-12-07",
    text: "하릅잡닉나아리의 다빌소싼은 자름디는세게, 운흥다 륵이낟다. 골린는데 다훘란다 시솨톼삽지 군즌픠매끼기벙에와 지이종사도 넴슨녈다. 미서를 차키데 아느기아는 이스안 조미에믕다 피볼기는 얼띹뗴키안으로 건녀디슨다. 아이으으에 러든연뵨다, 머다에서 혈누속께보로다 아올기고 르산은 욱히쇼 건문고흐가 런가퇐다.",
  },
  {
    id: 2,
    username: "윤태헌",
    createdAt: "2023-12-01",
    text: "하릅잡닉나아리의 다빌소싼은 자름디는세게, 운흥다 륵이낟다. 골린는데 다훘란다 시솨톼삽지 군즌픠매끼기벙에와 지이종사도 넴슨녈다.",
  },
  {
    id: 3,
    username: "이보겅",
    createdAt: "2023-12-03",
    text: "우와 밖에 비온다",
  },
];

const ReviewSection = () => {
  const { isOpenModal, setIsOpenModal } = useModalStore();
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <section className={styles["review-upload-section"]}>
        {isLogin ? (
          <ReviewForm />
        ) : (
          <Button onClick={() => setIsOpenModal(true)}>
            <h3>방명록 작성하기</h3>
          </Button>
        )}
      </section>

      <section className={styles["review-list-section"]}>
        <h3 className={styles["review-list-section__title"]}>{commentData.length}명 참여</h3>
        <ul>
          {commentData.map((comment) => (
            <li key={comment.id}>
              <ReviewItem item={comment} />
            </li>
          ))}
        </ul>
        <Button reverseColor>더보기</Button>
      </section>

      {isOpenModal && (
        <Modal>
          <GuestAccess />
        </Modal>
      )}
    </>
  );
};

export default ReviewSection;