import { useEffect, useRef } from "preact/hooks";
import Quill from "quill";

import * as S from "../signals/noteSignals";
import "quill/dist/quill.snow.css";

import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.min.css";

export function Editor({ noteId }: { noteId: string | null }) {
    const quillRef = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<Quill | null>(null);

    useEffect(() => {
        if (quillRef.current) {
            quillInstance.current = new Quill(quillRef.current, {
                theme: "snow",
                placeholder: "Start writing your note...",
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"], 
                        ["blockquote", "code-block"],
                        ["link", "image"],

                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [
                            { list: "ordered" },
                            { list: "bullet" },
                            { list: "check" },
                        ],
                        [{ script: "sub" }, { script: "super" }],
                        [{ indent: "-1" }, { indent: "+1" }],

                        [{ color: [] }, { background: [] }],
                        [{ font: [] }],
                        [{ align: [] }],

                        ["clean"], 
                    ],
                    syntax: { hljs },
                },
            });

            quillInstance.current.on("text-change", () => {
                const content = quillInstance.current?.root.innerHTML || "";
                S.updateCurrentNoteContent(content);
            });

            quillInstance.current.root.innerHTML = S.noteContent.value || "";
        }
    }, []);

    const handleTitleChange = (e: Event) => {
        S.updateCurrentNoteTitle((e.target as HTMLInputElement).value);
    };

    return (
        <div className="flex h-full" data-note-id={noteId}>
            <div className="flex-1 flex flex-col">
                <div className="flex h-[40px] items-center border-b bg-gray-800/40 px-6 py-5">
                    <input
                        className="w-full text-2xl font-bold bg-transparent border-none outline-none text-gray-50"
                        placeholder="Untitled"
                        type="text"
                        value={S.noteTitle}
                        onInput={handleTitleChange}
                    />
                </div>
                <div className="flex-1 p-4">
                    <div ref={quillRef} className="quill-editor"/>
                </div>
            </div>
        </div>
    );
}
