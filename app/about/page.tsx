"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Users, Shield, Zap } from "lucide-react";

const team = [
  {
    name: "Alex Thompson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
];

const values = [
  {
    icon: Users,
    title: "Community First",
    description:
      "We believe in the power of community and collective support to drive innovation and change.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "Our platform is built on blockchain technology, ensuring complete transparency in all transactions.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We're constantly pushing the boundaries of what's possible in decentralized crowdfunding.",
  },
];

export default function AboutPage() {
  return (
    <div className="container space-y-16 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">
          About Web3 Fund
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          We're on a mission to revolutionize crowdfunding through blockchain
          technology and create a more transparent, efficient, and accessible
          platform for everyone.
        </p>
      </motion.div>

      <div className="grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="font-heading text-3xl font-bold">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2024, Web3 Fund emerged from a simple yet powerful idea:
              make crowdfunding more transparent, efficient, and accessible to
              everyone through blockchain technology.
            </p>
            <p>
              Our team of blockchain enthusiasts, developers, and crowdfunding
              experts came together with a shared vision of creating a platform
              that would revolutionize how people raise funds and support causes
              they believe in.
            </p>
            <p>
              Today, we're proud to be at the forefront of decentralized
              crowdfunding, helping creators and innovators bring their ideas to
              life while building a stronger, more connected community.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="font-heading text-3xl font-bold">Our Mission</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We believe that great ideas deserve the chance to become reality,
              regardless of where they come from. Our mission is to break down the
              barriers in traditional crowdfunding and create a more inclusive,
              transparent, and efficient platform powered by blockchain technology.
            </p>
            <p>
              Through Web3 Fund, we're not just facilitating fundraising – we're
              building a community where innovation thrives, trust is paramount,
              and success is shared.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h2 className="text-center font-heading text-3xl font-bold">Our Values</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border bg-card p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-heading text-xl font-semibold">
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h2 className="text-center font-heading text-3xl font-bold">Our Team</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-heading text-xl font-semibold">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}