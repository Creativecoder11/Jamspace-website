import DesignHighlightSilde from '@/components/sections/projects/taqwaa/DesignHighlightSilde'
import DesignScope from '@/components/sections/projects/taqwaa/DesignScope'
import JalshiriHeroBanner from '@/components/sections/projects/taqwaa/TaqwaaHeroBanner'
import MoreProjects from '@/components/sections/projects/taqwaa/MoreProjects'
import ProjectsBeforeAfter from '@/components/sections/projects/taqwaa/ProjectsBeforeAfter'
import ProjectsChallenges from '@/components/sections/projects/taqwaa/ProjectsChallenges'
import ProjectsPlanning from '@/components/sections/projects/taqwaa/ProjectsPlanning'
import ProjectsStoryBento from '@/components/sections/projects/taqwaa/ProjectsStoryBento'

export default function JalshiriParkside() {
  return (
    <section>
      <JalshiriHeroBanner />
      <ProjectsStoryBento />
      <DesignScope />
      <ProjectsPlanning />
      <ProjectsBeforeAfter />
      <ProjectsChallenges />
      <DesignHighlightSilde />
      <MoreProjects />
    </section>
  )
}