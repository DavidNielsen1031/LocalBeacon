import { getAllPosts } from "@/lib/blog"
import LandingPage from "@/components/landing-content"

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3)
  return <LandingPage latestPosts={latestPosts} />
}
