import React from "react";
import { BasicCard, TicketCard } from "@/components/common";
import { ShowType } from "@/types";

interface PropsType {
  item: ShowType;
}

const LikeItem = React.memo<PropsType>(({ item }) => {
  const CardComponent = item.show_type === "전시" ? BasicCard : TicketCard;
  return (
    <li>
      <CardComponent item={item} />
    </li>
  );
});

export default LikeItem;
