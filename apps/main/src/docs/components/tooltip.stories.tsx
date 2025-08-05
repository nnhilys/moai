import { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "../../core";
import { docsMetaArgTypes } from "../utils/arg-type";
import { PLACEMENTS } from "../utils/placement";

const meta: Meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  argTypes: docsMetaArgTypes({
    "": {
      placement: PLACEMENTS,
      content: false,
      children: false,
    }
  })
};

export default meta;

export const Primary: StoryObj<typeof Tooltip> = {
  render: (props) => (
    <Tooltip content="Hello Moai" placement={props.placement}>
      <span tabIndex={0}>Hover me</span>
    </Tooltip>
  )
};

/**
 * To have a tooltip for an element, wrap the `Tooltip` component outside it,
 * and define the information via the `content` prop.
 * The tooltip is shown when users hover or focus on the element.
 * 
 * To have your tooltips [accessible][1] to all users, even those who don't use a mouse,
 * ensure your elements are [focusable][2].
 * For example, if it's a non-interactive element like a `<span>`,
 * you may want to use `tabIndex={0}`.
 * You don't need to do anything for interactive elements like buttons and inputs.
 * 
 * [1]: https://www.nngroup.com/articles/tooltip-guidelines/
 * [2]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Keyboard#interactive_elements_must_be_focusable
 */
export const Basic: StoryObj = {
  render: () => (
    <Tooltip content="Hello Moai">
      <span tabIndex={0}>Hover me</span>
    </Tooltip>
  )
};

/**
 * By default, Tooltip positions the `content` on top of the `children`.
 * This can be changed via the `placement` prop,
 * which expects a string of [Tippy.js' `placement`][1] option.
 * You can see (and try!) all available placements at the [props table][2] below.
 * 
 * Note that this is more like a suggestion.
 * If there is no space in the selected placement,
 * Tooltip will choose another placement, usually the opposite one,
 * to keep the content in the viewport.
 * 
 * [1]: https://atomiks.github.io/tippyjs/v6/all-props/#placement
 * [2]: #props
 */
export const PlacementExample: StoryObj = {
  name: 'Placement',
  render: () => (
    <Tooltip content="Hello Moai" placement="right">
      <span tabIndex={0}>Hover me</span>
    </Tooltip>
  )
};
