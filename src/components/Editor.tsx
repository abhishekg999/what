import { useEffect, useRef } from "preact/hooks";
import * as S from "../signals/noteSignals";
import { useSignalEffect } from "@preact/signals";

import "quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark-reasonable.min.css";

import type QuillType from "quill";

export function Editor() {
    console.log("Editor rendered");
    const quillRef = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<QuillType | null>(null);

    useEffect(() => {
        async function loadEditor() {
            const Quill = (await import("quill")).default;
            const hljs = (await import("highlight.js")).default;

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

                quillInstance.current.root.innerHTML = S.selectedNoteContent.value || "";
            }
        }

        loadEditor();
    }, []);

    useSignalEffect(() => {
        // @ts-ignore: this is to make sure the effect runs only on Id change
        const _ = S.selectedNoteId.value;
        if (quillInstance.current) {
            quillInstance.current.root.innerHTML = S.selectedNoteContent.peek() || "";
        }
    });

    const handleTitleChange = (e: Event) => {
        S.updateCurrentNoteTitle((e.target as HTMLInputElement).value);
    };

    return (
        <div className="flex h-full" data-note-id={S.selectedNoteId}>
            <div className="flex-1 flex flex-col">
                <div className="flex h-[40px] items-center border-b bg-gray-800/40 px-6 py-5">
                    <input
                        className="w-full text-2xl font-bold bg-transparent border-none outline-none text-gray-50"
                        placeholder="Untitled"
                        type="text"
                        value={S.selectedNoteTitle}
                        onInput={handleTitleChange}
                        maxLength={30}
                    />
                </div>
                <div className="flex-1 h-full m-4">
                    <div
                        ref={quillRef}
                        className="quill-editor max-h-[calc(100vh-12rem)] max-w-[calc(100vw-19rem)]"
                    />
                </div>
            </div>
        </div>
    );
}
