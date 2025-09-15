import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioGroup, RadioOption } from "../../core";
import { Book, someBooks } from "../utils/example";
import { RadioOptionComponent } from "./radio-group-fake";
import { docsMetaArgTypes } from "../utils/arg-type";

const meta: Meta = {
  title: "Components/Radio Group",
  component: RadioGroup,
  subcomponents: { RadioOption: RadioOptionComponent },
  argTypes: docsMetaArgTypes({
    "": {
      row: "boolean",
      value: false,
      setValue: false,
      options: false,
      name: false,
    }
  }),
};

export default meta;

export const Primary: StoryObj<typeof RadioGroup> = {
  render: (props) => {
    const [value, setValue] = useState(someBooks[1].isbn);
    const toOption = (book: Book): RadioOption<number> => ({
      id: book.isbn.toString(),
      value: book.isbn,
      label: book.title,
    });
    return (
      <RadioGroup
        name="primary-group"
        value={value}
        setValue={setValue}
        options={someBooks.map(toOption)}
        row={props.row}
      />
    );
  }
};

/**
 * RadioGroup is a [controlled][1], [generic][2] component.
 * You should have a [state][3] of any type for your value, 
 * and give its control to a radio group via the `value` and `setValue` props.
 * Like in HTML, a radio group also require a `name` to group its options.
 * 
 * The options of a radio group are defined as an array via the `options` prop.
 * Each option should have a string `label`, a `value` of your type, and a unique `id`.
 * See the [`RadioOption` table][4] below for more detail.
 * 
 * [1]: https://reactjs.org/docs/forms.html#controlled-components
 * [2]: https://www.typescriptlang.org/docs/handbook/2/generics.html
 * [3]: https://reactjs.org/docs/hooks-state.html
 * [4]: #props
 */
export const Basic: StoryObj = {
  render: () => {
    type Value = Book["isbn"];

    const [value, setValue] = useState<Value>(someBooks[1].isbn);

    const toOption = (book: Book): RadioOption<Value> => ({
      id: book.isbn.toString(),
      value: book.isbn,
      label: book.title,
    });

    return (
      <RadioGroup<Value>
        name="basic-group"
        value={value}
        setValue={setValue}
        options={someBooks.map(toOption)}
      />
    );
  }
};
