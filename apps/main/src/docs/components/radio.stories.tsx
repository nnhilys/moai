import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "../../core";
import { Book, someBooks } from "../utils/example";
import { docsMetaArgTypes } from "../utils/arg-type";

const meta: Meta = {
  title: "Components/Radio",
  component: Radio,
  argTypes: docsMetaArgTypes({
    "": {
      disabled: "boolean",
      checked: "boolean",
      value: false,
      children: false,
      name: false,
      setValue: false,
      defaultChecked: false,
      forwardedRef: false,
    }
  })
};

export default meta;

export const Primary: StoryObj<typeof Radio> = {
  render: (props) => (
    <Radio
      checked={props.checked ?? true}
      disabled={props.disabled}
      name="radio"
      value="1"
      children="Radio"
    />
  ),
};

/**
 * It's recommended to use the [Radio Group][1] component.
 * However, when you need complex layout customization,
 * you can still use the Radio component manually.
 * 
 * It should be used as a controlled component,
 * but its props are a little bit more complicated than other input components:
 * 
 * - `checked`: whether the radio should be checked
 * - `value`: the text value of the radio
 * - `setValue`: a callback to set the radio as selected
 * 
 * Like in HTML,
 * a `name` prop is also required to group your radio buttons.
 * 
 * [1]: /docs/components-radio-group--docs
 */
export const Basic: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState(someBooks[1].isbn.toString());
    const toRadio = (book: Book, index: number): JSX.Element => (
      <li key={book.isbn} style={{ marginTop: index === 0 ? 0 : 8 }}>
        <Radio
          name="basic-radios"
          checked={selected === book.isbn.toString()}
          value={book.isbn.toString()}
          setValue={setSelected}
          children={book.title}
        />
      </li>
    );
    return <ul>{someBooks.map(toRadio)}</ul>;
  },
};

/**
 * The `children` prop of Radio accepts `ReactNode` 
 * but intentionally excludes the falsy values (e.g. `false`, `null`, `undefined`).
 * This ensures your radio buttons always have accessible labels,
 * even if the labels are not _displayed_.
 * 
 * To hide the label of a radio button,
 * set its `hideLabel` prop to `true`.
 * You'll still need to define a label at the `children` prop.
 * Sighted users won't see the label,
 * but screen readers will announce it for unsighted users.
 * 
 * This should be used where the surrounding context 
 * can visually tell your sighted users about the meaning of the radio buttons.
 * A common use case is to have a radio button for each row of a table.
 * In fact, for a real-life example,
 * see the [`selectable`][1] section of the Table component.
 * 
 * [1]: /docs/components-table--docs#selectable-single
 */
export const WithoutLabel: StoryObj = {
  render: () => (
    <Radio name="radio" value="1" hideLabel>
      Sample Radio
    </Radio>
  ),
};
