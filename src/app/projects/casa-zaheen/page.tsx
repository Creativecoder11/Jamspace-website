import DesignHighlightSilde from '@/components/sections/projects/casa-zaheen/DesignHighlightSilde'
import DesignScope from '@/components/sections/projects/casa-zaheen/DesignScope'
import ZaheenHeroBanner from '@/components/sections/projects/casa-zaheen/ZaheenHeroBanner'
import MoreProjects from '@/components/sections/projects/casa-zaheen/MoreProjects'
import ProjectsBeforeAfter from '@/components/sections/projects/casa-zaheen/ProjectsBeforeAfter'
import ProjectsChallenges from '@/components/sections/projects/casa-zaheen/ProjectsChallenges'
import ProjectsPlanning from '@/components/sections/projects/casa-zaheen/ProjectsPlanning'
import ProjectsStoryBento from '@/components/sections/projects/casa-zaheen/ProjectsStoryBento'

export default function CasaZaheen() {
    return (
        <section>
            <ZaheenHeroBanner />
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