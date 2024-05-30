export function Header() {
    return (
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-800/40 px-6">
            <div className="ml-auto flex items-center">
                <div className="relative">
                    <input
                        className="h-10 w-full rounded-md border border-gray-800 bg-transparent p-3 text-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-950"
                        placeholder="Search notes..."
                        type="search"
                    />
                </div>
            </div>
        </header>
    );
}
