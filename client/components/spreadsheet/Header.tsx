import {
  Search,
  Bell,
  ChevronRight,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-surface-tertiary bg-white px-4 py-2">
      {/* Left side - Breadcrumbs and Panel icon */}
      <div className="flex items-center gap-4">
        <div className="flex h-6 w-6 items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
          >
            <path
              d="M18.75 4C20.5449 4 22 5.45507 22 7.25V16.75C22 18.5449 20.5449 20 18.75 20H5.25C3.45507 20 2 18.5449 2 16.75V7.25C2 5.45507 3.45507 4 5.25 4H18.75ZM5.25 5.5C4.2835 5.5 3.5 6.2835 3.5 7.25V16.75C3.5 17.7165 4.2835 18.5 5.25 18.5H14.5V5.5H5.25Z"
              fill="#618666"
            />
          </svg>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-1">
          <span className="text-sm text-content-disabled">Workspace</span>
          <ChevronRight className="h-3 w-3 text-content-disabled" />
          <span className="text-sm text-content-disabled">Folder 2</span>
          <ChevronRight className="h-3 w-3 text-content-disabled" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-content-primary">
              Spreadsheet 3
            </span>
            <MoreHorizontal className="h-5 w-5 text-content-disabled" />
          </div>
        </div>
      </div>

      {/* Right side - Search, Notifications, Profile */}
      <div className="flex items-center gap-1">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-md bg-surface-secondary px-3 py-3">
          <Search className="h-4 w-4 text-content-disabled" />
          <input
            type="text"
            placeholder="Search within sheet"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-xs text-content-tertiary placeholder:text-content-tertiary focus:outline-none"
          />
        </div>

        {/* Notifications */}
        <div className="relative flex items-center rounded-lg bg-white p-2">
          <Bell className="h-6 w-6 text-content-primary" />
          <div className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-brand-600">
            <span className="text-xs font-medium text-white">2</span>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5">
          <div className="h-7 w-7 rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-0">
            <span className="text-xs text-content-primary">John Doe</span>
            <span className="text-xs text-content-tertiary">
              john.doe@companyname.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
