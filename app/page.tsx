import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Steps from '@/components/home/Steps';

// Dynamic imports for below-the-fold components
const FeaturedPrograms = dynamic(() => import('@/components/home/FeaturedPrograms'));
const FeaturedTutors = dynamic(() => import('@/components/home/FeaturedTutors'));
const CostSimulation = dynamic(() => import('@/components/home/CostSimulation'));
const StudentCTA = dynamic(() => import('@/components/home/StudentCTA'));
const TeacherCTA = dynamic(() => import('@/components/home/TeacherCTA'));
const LatestArticles = dynamic(() => import('@/components/home/LatestArticles'));
const ComplaintCTA = dynamic(() => import('@/components/home/ComplaintCTA'));

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
