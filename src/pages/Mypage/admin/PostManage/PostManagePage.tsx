import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/stores";
import { Button, Modal } from "@/components/common";
import { ReviewList, ShowList } from "@/components/mypage";

const PostManagePage = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  return (
    <>
      <ShowList />
      <Button style={{ fontSize: "0.75rem", width: "fit-content", marginLeft: "auto" }} onClick={() => navigate("./upload")}>
        게시글 업로드
      </Button>
      {openModal.state && (
        <Modal title={openModal.type}>
          <ReviewList />
        </Modal>
      )}
    </>
  );
};

export default PostManagePage;
