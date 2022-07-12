import React from "react";
import { ItemStatus } from "../../types";
import { Button } from "../ui/Button";
import styles from "./styles/Controls.module.scss";
interface ControlsProps {
  onClickEditing: () => void;
  onClickDelete: () => void;
  onClickPaid: () => void;
  onClickClearing: () => void;
  onClickCleared: () => void;
  status: ItemStatus;
}

export const Controls: React.FC<ControlsProps> = ({
  onClickEditing,
  onClickDelete,
  onClickPaid,
  onClickClearing,
  onClickCleared,
  status,
}) => {
  return (
    <div className={styles.buttons}>
      <Button variant={2} onClick={onClickEditing}>
        Edit
      </Button>
      <Button variant={4} onClick={onClickDelete}>
        Delete
      </Button>
      <Button variant={6} onClick={onClickClearing}>
        Send to clearing
      </Button>
      {status === "pending" && (
        <Button variant={1} onClick={onClickPaid}>
          Mark as Paid
        </Button>)}
      {status === "clearing" && (
        <Button variant={2} onClick={onClickCleared}>
            Mark as Cleared
          </Button>
        )}
      
    </div>
  );
};
