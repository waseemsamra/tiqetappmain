'use client';

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface SidebarLayoutProps {
  sidebarContent: React.ReactNode;
  headerContent?: React.ReactNode;
  children: React.ReactNode;
}

export default function SidebarLayout({
  sidebarContent,
  headerContent,
  children,
}: SidebarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
          md:fixed md:translate-x-0 md:z-30 md:flex-shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          Menu
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {!headerContent && (
          <header className="h-16 bg-white border-b border-gray-200 md:pl-64 flex items-center">
            <div className="px-4 flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Open Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 truncate">
                Claude Code
              </h1>
            </div>
          </header>
        )}

        {headerContent && (
          <div className="md:pl-64">{headerContent}</div>
        )}

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
