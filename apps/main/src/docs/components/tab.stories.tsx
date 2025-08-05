import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, DivPx, Switcher, Tab, Tabs } from "../../core";
import { GalleryTab1, GalleryTab2 } from "../../gallery";
import { TabComponent } from "./tab-fake";
import { docsMetaParameters } from "../utils/parameter";
import { docsMetaArgTypes } from "../utils/arg-type";

const meta: Meta = {
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: { Tab: TabComponent },
  argTypes: docsMetaArgTypes({
    Visual: {
      noPadding: "boolean",
      fullHeight: "boolean",
      style: Tabs.styles,
      tabs: false,
    },
    Controlled: {
      activeTab: false,
      setActiveTab: false,
    },
    Uncontrolled: {
      initialTab: false,
    }
  }),
  parameters: docsMetaParameters({
    gallery: (
      <>
        <GalleryTab1 />
        <GalleryTab2 />
      </>
    ),
  }),
};

export default meta;


export const Primary: StoryObj<typeof Tabs> = {
  render: (props) => (
    <div style={{ height: "150px" }}>
      <Tabs
        {...props}
        tabs={[
          { id: "first", title: "First", pane: () => <p>1st</p> },
          { id: "second", title: "Second", pane: () => <p>2nd</p> },
        ]}
      />
    </div>
  )
};

/**
 * Tabs can be used as both controlled or uncontrolled.
 * If you don't need to control the active tab state, 
 * it's best to use Tabs as an uncontrolled component.
 * You only need to provide the list of tabs via the `tabs` prop.
 * Each tab should have the following interface:
 * 
 * ```ts
 * interface Tab {
 *   id: string;            // Unique id for the tab
 *   title: ReactNode;      // Title of the tab
 *   pane: () => ReactNode; // Function that returns the tab's content
 * }
 * ```
 * 
 * The height of tabs depend on the content of the current tab.
 * Use the `fullHeight` prop to control the element's height.
 * The default padding can be removed via the `noPadding` prop.
 */
export const Basic: StoryObj = {
  render: () => (
    <Tabs
      tabs={[
        { id: "first", title: "First", pane: () => <p>1st</p> },
        { id: "second", title: "Second", pane: () => <p>2nd</p> },
      ]}
    />
  )
};

/**
 * [In most cases][1], Tabs should be used as an uncontrolled component.
 * However, you can also have a state for the active tab yourself, 
 * and give it to the Tabs via the `activeTab` and `setActiveTab` props, 
 * and use it as a controlled component.
 * 
 * You can control the active tab, from both outside and inside the tabs by setting your state.
 * 
 * [1]: #basic
 */
export const Controlled: StoryObj = {
  render: () => {
    const [tab, setTab] = useState("first");

    const FirstPane = (): JSX.Element => (
      <Button onClick={() => setTab("second")}>Next</Button>
    );
    const SecondPane = (): JSX.Element => (
      <Button onClick={() => setTab("first")}>Back</Button>
    );

    const tabs: Tab[] = [
      { id: "first", title: "First", pane: FirstPane },
      { id: "second", title: "Second", pane: SecondPane },
    ]

    return (
      <div>
        <Switcher<string>
          value={tab}
          setValue={setTab}
          options={tabs.map((tab) => ({ value: tab.id, label: tab.id }))}
        />
        <DivPx size={16} />
        <Tabs
          tabs={tabs}
          setActiveTab={setTab}
          activeTab={tab}
        />
      </div>
    );
  }
};
