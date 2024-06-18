import { Editor } from "./components/Editor";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import { currentNoteId } from "./signals/userSignals";
import { loadNoteById, initNewNote } from "./signals/noteSignals";
import { computed, signal } from "@preact/signals";

export function App() {
    if (!currentNoteId.value) {
        const noteId = initNewNote();
        localStorage.setItem("currentNoteId", noteId);
        currentNoteId.value = noteId;
    }

    loadNoteById(currentNoteId.value);

    const windowWidth = signal(window.innerWidth);
    window.addEventListener("resize", () => {
        windowWidth.value = window.innerWidth;
    });
    const screenTooSmall = computed(() => windowWidth.value < 1024);

    return (
        <>
            {screenTooSmall.value ? (
                <div className="text-center">Screen size too small</div>
            ) : (
                <div className="grid min-h-screen w-full grid-cols-[280px_1fr] bg-gray-950 text-gray-50">
                    <Sidebar />

                    <div className="flex flex-col">
                        <Header />
                        <main className="flex flex-1 flex-col">
                            <Editor />
                        </main>
                    </div>
                </div>
            )}
        </>
    );
}
