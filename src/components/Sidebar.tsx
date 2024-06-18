import { useRef } from "preact/hooks";
import { downloadExport, storageImport } from "../lib/notesStorage";
import { SidebarHomeTab } from "./SidebarHomeTab";
import { SidebarNotesTab } from "./SidebarNotesTab";

export function Sidebar() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImport = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target?.result) {
                    try {
                        const json = JSON.parse(e.target.result as string);
                        storageImport(json);
                        // just mfing reload the page lol
                        window.location.reload();
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                        alert("The selected file is not a valid JSON.");
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    const handleExport = () => {
        downloadExport("ahh_notes.json");
    };

    return (
        <div className="hidden border-r bg-gray-800/40 lg:block overflow-y-scroll">
            <div className="flex h-[60px] items-center px-6">
                {/* HEADER WITH ICON */}
                <a
                    className="flex items-center justify-between gap-2 font-semibold"
                    href="#"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke-miterlimit="10"
                        viewBox="168.45 160.8 786.1 750.4"
                        fill-rule="nonzero"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="w-8"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            d="M706.763 591.198C487.108 734.611 271.782 630.654 245.675 587.593C245.675 587.593 243.241 461.371 286.977 398.907C286.977 398.907 275.227 359.998 297.734 311.221C297.734 311.221 344.121 303.407 386.147 325.166C386.147 325.166 475.02 281.754 586.899 316.732C586.899 316.732 651.192 275.357 707.316 275.891C707.316 275.891 722.547 343.267 712.65 381.429C712.65 381.429 732.389 410.685 740.274 448.182C740.274 448.182 912.349 523.818 832.191 757.558C832.191 757.558 785.408 768.211 763.526 760.355C763.526 760.355 791.888 714.947 793.129 609.486C793.129 609.486 793.62 771.895 723.623 803.366C723.623 803.366 651.23 813.887 622.556 801.725C622.556 801.725 617.352 726.491 619.536 708.958L619.295 742.611C619.295 742.611 474.538 748.03 421.751 699.374L451.38 718.183C454.827 763.896 427.123 789.498 427.123 789.498C427.123 789.498 348.064 794.96 337.774 788.237C337.774 788.237 312.613 771.607 296.482 625.491"
                            fill="none"
                            stroke="#67d78e"
                            stroke-width="22"
                        />
                    </svg>
                    <span className="">Notes</span>
                </a>
            </div>

            <nav className="grid items-start px-4 text-sm font-medium">
                <div className="flex-1">
                    {/* Home */}
                    <SidebarHomeTab />

                    {/* Notes */}
                    <SidebarNotesTab />

                </div>
                <div className="flex-1">
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-50"
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
                                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                            />
                        </svg>
                        Settings
                    </a>

                    {/* Export */}
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-50"
                        onClick={handleExport}
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
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                        </svg>
                        Export
                    </a>

                    {/* Import */}
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-50"
                        onClick={handleImport}
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
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                        </svg>
                        Import
                    </a>

                    <input
                        type="file"
                        accept="application/json"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </div>
            </nav>
        </div>
    );
}
