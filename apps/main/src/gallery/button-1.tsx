import { Button, ButtonProps } from "../core";
import { Shot } from "./shot/shot";
import s from "./styles.module.css";

const base: ButtonProps = {
  children: "Text",
  fill: true,
};

const flat: ButtonProps = {
  style: Button.styles.flat,
};

const Row = (props: ButtonProps): JSX.Element => (
  <>
    <Button {...props} {...base} highlight />
    <Button {...props} {...base} />
    <Button {...props} {...base} {...flat} highlight />
    <Button {...props} {...base} {...flat} />
  </>
);

export const GalleryButton1 = (): JSX.Element => (
  <Shot>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 8,
      }}
    >
      <Row />
      <Row busy />
      <Row selected />
      <Row disabled />
      <div className={s.colFull}>
        <Button fill children="Full width" />
      </div>
    </div>
  </Shot>
);
