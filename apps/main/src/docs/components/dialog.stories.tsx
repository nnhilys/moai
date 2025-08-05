import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, Dialog, DivGrow, Paragraph } from "../../core";
import { GalleryDialog } from "../../gallery";
import { docsMetaParameters } from "../utils/parameter";
import { docsMetaArgTypes } from "../utils/arg-type";

const meta: Meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: docsMetaParameters({
    gallery: <GalleryDialog />,
    primary: "none",
  }),
  argTypes: docsMetaArgTypes({
    "": {
      onEsc: false,
      width: false,
      children: false,
    },
  }),
};

export default meta;

export const Primary: StoryObj<typeof Dialog> = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button onClick={() => setVisible(true)} children="Show" />
        {visible && (
          <Dialog onEsc={() => setVisible(false)}>Hello world!</Dialog>
        )}
      </>
    );
  },
};

/**
 * Dialog is a [controlled][1], [declarative][3] component:
 * you should have a boolean [state][2] for whether the dialog should be visible or not,
 * and conditionally render a dialog based on that state.
 *
 * A dialog will call its `onEsc` function when the user press the "Esc" key or click on the backdrop.
 * It's common to set your state to `false` here to "close" the dialog.
 *
 * [1]: https://reactjs.org/docs/forms.html#controlled-components
 * [2]: https://reactjs.org/docs/hooks-state.html
 * [3]: https://reactjs.org/docs/refs-and-the-dom.html#when-to-use-refs
 */
export const Basic = Primary;

/**
 * Out of the box, dialogs render their children as-is, without even a padding,
 * to allow maximum customization.
 * Therefore, the Dialog component has supporting components to give you common dialog layout:
 *
 * - `Dialog.Body` wraps its children inside a padding.
 * - `Dialog.Footer` places its children horizontally, with gaps, aligned to end.
 * - `Dialog.Title` makes its children bold and larger, like a title.
 */
export const Layout: StoryObj = {
  render: () => {
    const [visible, setVisible] = useState(false);

    const dialog = visible && (
      <Dialog onEsc={() => setVisible(false)}>
        <Dialog.Body>
          <Dialog.Title>Title</Dialog.Title>
          <Paragraph>Body</Paragraph>
        </Dialog.Body>
        <Dialog.Footer>
          <Button>First</Button>
          <DivGrow />
          <Button>Second</Button>
          <Button highlight>Third</Button>
        </Dialog.Footer>
      </Dialog>
    )

    return (
      // Increase canvas height to show the whole dialog
      <div style={{ height: "300px", }} >
        <Button onClick={() => setVisible(true)} children="Show" />
        <p style={{ marginTop: "10px" }}>
          (Intentional empty space for the dialog)
        </p>
        {dialog}
      </div>
    );
  },
};

/**
 * The Dialog component has some utility methods as alternatives to the browser's built-in dialogs:
 *
 * - `Dialog.alert` for [`window.alert`][1]
 * - `Dialog.confirm` for [`window.confirm`][2]
 * - `Dialog.prompt` for [`window.prompt`][3]
 *
 * They accept the same parameters as their built-in counterparts,
 * but return async results and thus do not block the main flow.
 * They are implemented using Moai's components.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/API/Window/alert
 * [2]: https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
 * [3]: https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt
 */
export const Utilities: StoryObj = {
  render: () => (
    <Button
      onClick={async () => {
        const name = await Dialog.prompt("What's your name?");
        const yes = await Dialog.confirm(`Is your name: "${name}"?`);
        Dialog.alert(yes ? `Hello ${name}!` : "But you said so!");
      }}
      children="Ask name"
    />
  ),
};
