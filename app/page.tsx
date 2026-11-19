import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ViewStatement from '@/components/ViewStatement';
import MilgardFeature from '@/components/MilgardFeature';
import Showroom from '@/components/Showroom';
import ProductCollection from '@/components/ProductCollection';
import RepairServices from '@/components/RepairServices';
import WhyEdelen from '@/components/WhyEdelen';
import Reviews from '@/components/Reviews';
import BrandShowcase from '@/components/BrandShowcase';
import ServiceArea from '@/components/ServiceArea';
import ConsultationForm from '@/components/ConsultationForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ViewStatement />
        <MilgardFeature />
        <Showroom />
        <ProductCollection />
        <RepairServices />
        <WhyEdelen />
        <Reviews />
        <BrandShowcase />
        <ServiceArea />
        <ConsultationForm />
      </main>
      <Footer />
    </>
  );
}
