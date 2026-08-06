import DesignHighlightSilde from '@/components/sections/projects/jalshiri-parkside/DesignHighlightSilde'
import DesignScope from '@/components/sections/projects/jalshiri-parkside/DesignScope'
import JalshiriHeroBanner from '@/components/sections/projects/jalshiri-parkside/JalshiriHeroBanner'
import MoreProjects from '@/components/sections/projects/jalshiri-parkside/MoreProjects'
import ProjectsBeforeAfter from '@/components/sections/projects/jalshiri-parkside/ProjectsBeforeAfter'
import ProjectsChallenges from '@/components/sections/projects/jalshiri-parkside/ProjectsChallenges'
import ProjectsPlanning from '@/components/sections/projects/jalshiri-parkside/ProjectsPlanning'
import ProjectsOverview from '@/components/sections/projects/jalshiri-parkside/ProjectsStoryBento'

export default function JalshiriParkside() {
  return (
    <section>
      <JalshiriHeroBanner />
      <ProjectsOverview />
      <DesignScope />
      <ProjectsPlanning />
      <ProjectsBeforeAfter />
      <ProjectsChallenges />
      <DesignHighlightSilde />
      <MoreProjects />
    </section>
  )
}
