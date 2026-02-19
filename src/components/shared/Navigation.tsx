'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const Navigation = () => {
  const pathname = usePathname()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Industries', href: '/industries' },
    { name: 'Team', href: '/team' },
    { name: 'About', href: '/about' },
  ]

  // Track whether intro animation has completed in this session
  const hasAnimatedRef = useRef<boolean>(false)
  const outerTimeoutRef = useRef<number | null>(null)
  const innerTimeoutRef = useRef<number | null>(null)

  // Auto-scroll animation on mobile (runs on every mount)
  useEffect(() => {
    if (!scrollContainerRef.current) return
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
    if (!isMobile) {
      hasAnimatedRef.current = true
      return
    }
    
    const container = scrollContainerRef.current
    const scrollToRight = () => {
      container.scrollTo({
        left: container.scrollWidth - container.clientWidth,
        behavior: 'smooth'
      })
    }
    
    const scrollToLeft = () => {
      container.scrollTo({
        left: 0,
        behavior: 'smooth'
      })
    }
    
    const timeout1 = window.setTimeout(() => {
      scrollToRight()
      const timeout2 = window.setTimeout(() => {
        scrollToLeft()
        hasAnimatedRef.current = true
      }, 1000)
      innerTimeoutRef.current = timeout2
    }, 500)
    outerTimeoutRef.current = timeout1
    
    return () => {
      if (innerTimeoutRef.current) {
        clearTimeout(innerTimeoutRef.current)
        innerTimeoutRef.current = null
      }
      if (outerTimeoutRef.current) {
        clearTimeout(outerTimeoutRef.current)
        outerTimeoutRef.current = null
      }
    }
  }, [])

  // Center selected route on route changes (mobile only)
  useEffect(() => {
    if (!scrollContainerRef.current) return
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
    if (!isMobile) return
    if (!pathname) return
    // Do not center during the initial intro animation; run only after it completes
    if (!hasAnimatedRef.current) {
      return
    }
    
    const container = scrollContainerRef.current
    
    // Defer a tick to ensure DOM links are rendered
    const raf = requestAnimationFrame(() => {
      const selector = `a[href="${pathname}"]`
      const activeLink = container.querySelector(selector) as HTMLElement | null
      if (!activeLink) {
        return
      }
      const containerRect = container.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      const scrollLeft = activeLink.offsetLeft - (containerRect.width / 2) + (linkRect.width / 2)
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname])

  // Track scroll and mark scrolled when Y >= threshold on home/about; otherwise always scrolled
  useEffect(() => {
    if (typeof window === 'undefined') return
    let raf = 0

    const compute = () => {
      const isDynamicRoute = pathname === '/' || pathname === '/about'
      const scrolled = isDynamicRoute ? window.scrollY >= 100 : true
      setIsScrolled(scrolled)
    }

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(compute)
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    // initial
    raf = requestAnimationFrame(compute)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [pathname])

  return (
    <nav
      className={`fixed w-full z-50 ${
        isScrolled ? "bg-white/85 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-8xl mx-auto">
        <div className={`px-3 lg:px-6 py-1 lg:py-2`}>
          {/* Desktop Layout */}
          <div className="hidden lg:flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-0.5 cursor-pointer [touch-action:manipulation] active:opacity-80"
            >
              <div className="flex items-center">
                {/* <Image
                  src={
                    isScrolled
                      ? "/logos/Black-Logo.png"
                      : "/logos/White-Logo.png"
                  }
                  alt="Second Logo"
                  width={200}
                  height={56}
                  className="h-10 w-auto object-contain mr-4"
                  priority
                /> */}
                <Image
                  src={
                    isScrolled
                      ? "/logos/DevSol-Black.png"
                      : "/logos/DevSol-White.png"
                  }
                  alt="Devsol Logo"
                  width={200}
                  height={56}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              {navItems.map(({ name, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={name}
                    href={href}
                    className={`text-lg transition-colors duration-150 font-medium cursor-pointer [touch-action:manipulation] active:opacity-80 ${
                      isScrolled
                        ? isActive
                          ? "text-[#08273b] font-semibold hover:text-[#08273b]"
                          : "text-gray-700 hover:text-primary"
                        : isActive
                        ? "text-[#1a6b8f] font-semibold hover:text-[#1a6b8f]"
                        : "text-white hover:text-white/80"
                    }`}
                  >
                    {name}
                  </Link>
                );
              })}
            </div>

            {/* Get Started Button */}
            <Link
              href="/contact"
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer [touch-action:manipulation] active:opacity-90 ${
                isScrolled
                  ? "bg-[#08273b] hover:bg-[#172554] text-white shadow-md hover:shadow-lg"
                  : "bg-white/15 text-[#1a6b8f] border border-[#1a6b8f] hover:bg-white/25"
              }`}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Layout - Everything scrollable */}
          <div
            ref={scrollContainerRef}
            className="lg:hidden overflow-x-auto scrollbar-hide [touch-action:pan-x] overscroll-x-contain"
          >
            <div className="flex items-center space-x-6 min-w-max">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center space-x-0.5 cursor-pointer [touch-action:manipulation] active:opacity-80"
              >
                <div>
                  <Image
                    src={
                      isScrolled
                        ? "/logos/DevSol-Black.png"
                        : "/logos/DevSol-White.png"
                    }
                    alt="Devsol Logo"
                    width={100}
                    height={32}
                    className="h-5 w-auto object-contain"
                    priority
                  />
                </div>
                {/* <span
                  className={`text-2xl font-[IBM-Plex-Sans] font-bold tracking-wide ${
                    isScrolled ? "text-black" : "text-white"
                  } mt-1`}
                >
                  evSol
                </span> */}
              </Link>

              {/* Navigation Items */}
              {navItems.map(({ name, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={name}
                    href={href}
                    className={`text-sm font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer [touch-action:manipulation] active:opacity-80 ${
                      isScrolled
                        ? isActive
                          ? "text-[#08273b] font-semibold hover:text-[#08273b]"
                          : "text-gray-700 hover:text-primary"
                        : isActive
                        ? "text-[#1a6b8f] font-semibold hover:text-[#1a6b8f]"
                        : "text-white hover:text-primary"
                    }`}
                  >
                    {name}
                  </Link>
                );
              })}

              {/* Get Started Button */}
              <Link
                href="/contact"
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all duration-200 text-xs cursor-pointer [touch-action:manipulation] active:opacity-90 ${
                  isScrolled
                    ? "bg-[#08273b] hover:bg-[#172554] text-white shadow-md hover:shadow-lg"
                    : "bg-white/15 text-[#1a6b8f] border border-[#1a6b8f] hover:bg-white/25"
                }`}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation