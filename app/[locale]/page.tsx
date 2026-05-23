import { setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { DetailGallery } from '@/components/sections/DetailGallery';
import { Enter } from '@/components/sections/Enter';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';

export default function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);

  return (
    <>
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Story />
        <DetailGallery />
        <Enter />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
