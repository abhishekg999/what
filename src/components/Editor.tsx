import * as S from "../signals/noteSignals";

const debounce = (fn: any, delay: number) => {
    let timeout: number;
    return (e: Event) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(e), delay);
    };
};

export function Editor({ noteId }: { noteId: string | null }) {
    const handleTitleChange = (e: Event) => {
        S.updateCurrentNoteTitle((e.target as HTMLInputElement).value);
    };

    const handleContentChange = (e: Event) => {
        S.updateCurrentNoteContent((e.target as HTMLTextAreaElement).value);
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
                        onInput={debounce(handleTitleChange, 200)}
                    />
                </div>
                <div className="flex-1 p-6">
                    <textarea
                        className="mt-4 w-full h-full resize-none border-none bg-transparent p-0 text-lg font-medium outline-none text-gray-50"
                        placeholder="Start writing your note..."
                        value={S.noteContent}
                        onInput={debounce(handleContentChange, 200)}
                    />
                </div>
            </div>
        </div>
    );
}
