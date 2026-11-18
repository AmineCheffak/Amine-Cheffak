"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
];

const navVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const linkVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Link
            href="#home"
            className="font-heading text-2xl font-bold tracking-tighter text-white"
          >
            AMINE<span className="text-red-500">.</span>
          </Link>
        </motion.div>

        {/* NAVIGATION */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            <motion.div
              variants={navVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-2"
            >
              {links.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <motion.div variants={linkVariants}>
                    <NavigationMenuLink
                      href={link.href}
                      className="rounded-full px-5 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:bg-red-500/10 hover:text-red-500 focus:bg-red-500/10 focus:text-red-500"
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </motion.div>
                </NavigationMenuItem>
              ))}
            </motion.div>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CONTACT BUTTON */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <Button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="group rounded-full bg-red-600 px-6 text-white shadow-[0_0_30px_-6px_rgba(220,38,38,0.6)] transition-all hover:bg-red-500"
          >
            Contact Me
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Button>
        </motion.div>

      </div>
    </motion.header>
  );
}