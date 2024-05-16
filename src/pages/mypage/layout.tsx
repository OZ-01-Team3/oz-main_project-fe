import Footer from '@/components/Footer';
import SideBar from '@/components/SideNav';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="mx-auto max-w-7xl sm:px-6 lg:px-8 md:px-6 flex mt-20">
        <SideBar />
        {children}
      </section>
      <Footer />
    </>
  );
}