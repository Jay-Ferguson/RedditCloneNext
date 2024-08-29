'use client'

import { FC } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import CustomCodeRenderer from "./renderers/CustomCodeRenderer";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false,
  }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const style = {
  paragraph: {
    fontSize: "0.74rem",
    lineHeight: "1.25rem",
  },
};



const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
       // @ts-ignore
       <Output
      clsasName="text-sm"
      data={content}
      style={style}
      renderers={renderers}
    />
  );
};


function CustomImageRenderer({data}: any) {
     const src = data.file.url

     return (

       <div className="relative w-full min-h-[15rem]">
            <pre className="bg-gray-800 rounded-md p-4">
              <code className="text-gray-800 rounded-md p-4">{data.code}</code>
            </pre>
               <Image alt='image' className='object-contain' fill src={src} ></Image>
          </div>
     )
}



export default EditorOutput;
