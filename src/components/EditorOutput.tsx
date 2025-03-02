"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import CustomCodeRenderer from "./renderers/CustomCodeRender";
import CustomImageRenderer from "./renderers/CustomImageRender";
import PostLoader from "./loaders/PostLoader";
import CustomListRenderer from "./renderers/CustomListRenderer";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false, loading: () => <PostLoader /> }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
  list: CustomListRenderer,
};

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      style={style}
      className="text-sm "
      renderers={renderers}
      data={content}
    />
  );
};

export default EditorOutput;
