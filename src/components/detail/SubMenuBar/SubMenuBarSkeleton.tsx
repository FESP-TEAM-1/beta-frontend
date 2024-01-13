import Skeleton from "react-loading-skeleton";

const SubMenuBarSkeleton = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
      <div style={{ width: "49%" }}>
        <Skeleton height={50} />
      </div>
      <div style={{ width: "49%" }}>
        <Skeleton height={50} />
      </div>
    </div>
  );
};

export default SubMenuBarSkeleton;
