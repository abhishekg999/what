import { currentNoteId } from "../signals/userSignals";

export function SidebarNoteElement({ id, title }: { id: string, title: string }) {
    return (
        <a href="#" data-note-id={id} className="flex py-1 text-gray-400 hover:text-gray-5" onClick={() => currentNoteId.value = id}>{title}</a>
    );
}