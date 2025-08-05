import { GoSearch } from "react-icons/go";
import * as M from "../core";
import { Shot } from "./shot/shot";
import s from "./styles.module.css";
import { MATERIALS } from "./table/robots";

const materialOptions: M.SelectOption<string>[] = MATERIALS.map((material) => {
  const option = M.Select.toStringOption(material);
  // Trying to be random here but still keep the same result between server
  // and client render (thus no "Math.random")
  option.disabled = material.length % 2 === 1;
  return option;
});

materialOptions.unshift({
  ...M.Select.toStringOption("Select"),
  disabled: true,
});

const modelOptions: M.SelectOption<string>[] = (() => {
  const arr = ["Posts", "Users", "Tags", "All"];
  return arr.map(M.Select.toStringOption);
})();

type ColumnProps = Pick<M.SelectProps<unknown>, "style">;

const base: M.SelectProps<string> = {
  options: materialOptions,
  defaultValue: "Select",
};

const Column = ({ style }: ColumnProps): JSX.Element => (
  <div className={[s.col, s.rows].join(" ")}>
    <M.Select {...base} style={style} />
    <M.Select {...base} style={style} disabled />
  </div>
);

const Full = (): JSX.Element => (
  <M.Select
    options={[
      {
        id: "full",
        label: "Full-width Select",
        value: "full",
        disabled: true,
      },
      ...materialOptions,
    ]}
    defaultValue="full"
    fill
  />
);

const Group = (): JSX.Element => {
  const select = <M.Select options={modelOptions} defaultValue="Posts" />;
  const input = <M.Input defaultValue="" placeholder="Type to search" />;
  const button = <M.Button iconLabel="Search" icon={GoSearch} />;
  const children: M.ButtonGroupItemProps[] = [
    { fill: false, element: select },
    { fill: true, element: input },
    { fill: false, element: button },
  ];
  return <M.ButtonGroup fill children={children} />;
};

export const GallerySelect = (): JSX.Element => (
  <Shot>
    <div className={s.rows}>
      <div className={s.cols}>
        <Column style={M.Select.styles.outset} />
        <Column style={M.Select.styles.flat} />
      </div>
      <Group />
      <Full />
    </div>
  </Shot>
);
