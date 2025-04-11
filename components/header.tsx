"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Menu, X, User, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-900 dark:bg-slate-700"></div>
          <span className="text-xl font-bold">StockInfo</span>
        </Link>

        {/* Desktop Navigation */}
        {isDesktop ? (
          <nav className="hidden space-x-6 md:flex">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              홈
            </Link>
            <Link href="/stocks" className="text-sm font-medium transition-colors hover:text-primary">
              종목
            </Link>
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              대시보드
            </Link>
            <Link href="/news" className="text-sm font-medium transition-colors hover:text-primary">
              뉴스
            </Link>
          </nav>
        ) : null}

        {/* Right Side - Search, User, Theme */}
        <div className="flex items-center space-x-4">
          {isDesktop && (
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="종목 검색..."
                className="h-9 rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          )}

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <ModeToggle />

          <Button variant="outline" size="sm" className="hidden md:flex">
            <User className="mr-2 h-4 w-4" />
            로그인
          </Button>

          {/* Mobile Menu Button */}
          {!isDesktop && (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!isDesktop && isMenuOpen && (
        <div className="container mx-auto px-4 pb-4">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="종목 검색..."
              className="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              홈
            </Link>
            <Link href="/stocks" className="text-sm font-medium transition-colors hover:text-primary">
              종목
            </Link>
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              대시보드
            </Link>
            <Link href="/news" className="text-sm font-medium transition-colors hover:text-primary">
              뉴스
            </Link>
            <Button className="w-full">
              <User className="mr-2 h-4 w-4" />
              로그인
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
