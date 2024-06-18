import { SidebarNoteElement } from "./SidebarNoteElement";
import { allNotes } from "../signals/noteSignals";
import { expandedSidebar } from "../signals/userSignals";

export function SidebarNotesTab() {
    return (
        <>
            <a
                href="#"
                className="flex items-center gap-3 rounded-lg bg-gray-800 px-3 py-2 text-gray-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                </svg>
                Notes
            </a>

            {expandedSidebar.value === "notes" && (
                <div className="pl-12">
                    {Object.entries(allNotes.value).map(([id, title]) => (
                        SidebarNoteElement({ id, title })
                    ))}
                </div>
            )}
        </>
    )
}