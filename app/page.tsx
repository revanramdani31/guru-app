'use client';

import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Steps from '@/components/home/Steps';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import FeaturedTutors from '@/components/home/FeaturedTutors';
import CostSimulation from '@/components/home/CostSimulation';
import StudentCTA from '@/components/home/StudentCTA';
import TeacherCTA from '@/components/home/TeacherCTA';
import LatestArticles from '@/components/home/LatestArticles';
import ComplaintCTA from '@/components/home/ComplaintCTA';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Hero />
      <About />
      <Steps />
      <FeaturedPrograms />
      <FeaturedTutors />
      <CostSimulation />
      <StudentCTA />
      <TeacherCTA />
      <LatestArticles />
      <ComplaintCTA />
    </main>
  );
}
