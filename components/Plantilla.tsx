"use client"

import React, { useRef } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';

const Plantilla = () => {

    const emailEditorRef = useRef<EditorRef>(null);

    const exportHtml = () => {
      const unlayer = emailEditorRef.current?.editor;
  
      unlayer?.exportHtml((data) => {
        const { design, html } = data;
        console.log('exportHtml', html);

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "template.html";
        a.click();
        URL.revokeObjectURL(url);
      });


    };
  
    const onReady: EmailEditorProps['onReady'] = (unlayer) => {
      // editor is ready
      // you can load your template here;
      // the design json can be obtained by calling
      // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)
      // const templateJson = { DESIGN JSON GOES HERE };
      // unlayer.loadDesign(templateJson);
    };


  
    return (
      <div>
        
          <button className='bg-orange-500 m-2 text-white px-4 py-2 rounded-md' onClick={exportHtml}>Export HTML</button>


        <div className='h-[100%] w-[90%]'>
            <EmailEditor ref={emailEditorRef} onReady={onReady} options={{
                appearance: {
                    theme: 'modern_dark',
                    panels: {
                        tools: {
                            dock: 'left',
                        }
                    }
                },
                displayMode: 'email',
            }} />
        </div>
  

      </div>
    );
}

export default Plantilla;