import React from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { useToggle } from "../../lib/hooks/useToggle";
import { FilterType, ScreenType } from "../../types";
import { Checkbox } from "./Checkbox";
import styles from "./styles/FilterDropdown.module.scss";

interface FilterDropdownProps {
  screenType: ScreenType;
  filters: {
    paid: FilterType;
    pending: FilterType;
    draft: FilterType;
    clearing: FilterType;
    cleared: FilterType;

  };
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  screenType,
  filters,
}) => {
  const { dark } = useThemeContext();
  const [open, openHandler] = useToggle(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOff = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        openHandler.off();
      }
    };

    if (open) {
      window.addEventListener("click", handleClickOff);
    } else {
      window.removeEventListener("click", handleClickOff);
    }

    return () => {
      window.removeEventListener("click", handleClickOff);
    };
  }, [open]);
  return (
    <div className={[styles.root, dark ? styles.darkRoot : ""].join(" ")}>
      <div onClick={openHandler.toggle}>
        {screenType === "phone" ? "Filter" : "Filter by status"}
        
      </div>
      {open && (
        <div
          className={[styles.dropdown, dark ? styles.darkDropdown : ""].join(
            " "
          )}
          ref={ref}
        >
          <Checkbox
            name="draft"
            label="Draft"
            onChange={filters.draft.onChange}
            checked={filters.draft.value}
          />
          <Checkbox
            name="pending"
            label="Pending"
            onChange={filters.pending.onChange}
            checked={filters.pending.value}
          />
          <Checkbox
            name="clearing"
            label="Clearing"
            onChange={filters.clearing.onChange}
            checked={filters.clearing.value}
          />
          <Checkbox
            name="paid"
            label="Paid"
            onChange={filters.paid.onChange}
            checked={filters.paid.value}
          />
          <Checkbox
            name="cleared"
            label="Cleared"
            onChange={filters.cleared.onChange}
            checked={filters.cleared.value}
          />
        </div>
      )}
    </div>
  );
};
