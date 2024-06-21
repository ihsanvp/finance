"use client"

import { usePathname } from "next/navigation";

interface NavLinkProps {
  label: string
  href: string
}

export default function NavLink(props: NavLinkProps) {

  const pathname = usePathname()
  const isActive = pathname == props.href
  const styles = isActive ? "bg-neutral-900" : ""
  console.log(isActive, pathname)

  return <a className={`block text-sm w-full rounded-md px-5 py-3 hover:bg-neutral-900 ${styles}`} href={props.href}>{props.label}</a>
}