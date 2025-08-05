import * as M from "../core";
import s from "./styles.module.css";

const items: M.MenuItemProps[] = [
  { label: "Menu item 1" },
  { label: "Menu item 2" },
  { label: "Disabled", disabled: true },
  "divider",
  { label: "Menu item 3" },
];

const items2: M.MenuItemProps[] = [
  { label: "Duplicate" },
  { label: "Delete", disabled: true },
];

const PopoverColumn = () => (
  <div className={s.col}>
    <M.Popover
      content={() => <div>Hello!</div>}
      target={(popover) => (
        <M.Button
          onClick={popover.toggle}
          selected={popover.opened}
          fill
          children="Open Popover"
        />
      )}
      placement="top"
    />
    <M.DivPx size={8} />
    <M.Pane>
      <M.Paragraph>Pane</M.Paragraph>
      <M.Paragraph>Lorem ipsum dolor sit amet, consectetur.</M.Paragraph>
    </M.Pane>
  </div>
);

const MenuColumn = () => (
  <div className={s.col}>
    <M.ButtonMenu
      items={items2}
      button={{ fill: true, children: "Open menu" }}
      placement="top"
    />
    <M.DivPx size={8} />
    <M.Menu items={items} />
  </div>
);

export const GalleryContainerPane = (): JSX.Element => (
  <div className={s.cols}>
    <PopoverColumn />
    <MenuColumn />
  </div>
);
