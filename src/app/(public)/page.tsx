import MainLayout from "@/layouts/MainLayout/MainLayout";
import { SectionFeatures } from "@/components/Sections/SectionFeatures";
import { SectionHero } from "@/components/Sections/SectionHero";
import { SectionOnboard } from "@/components/Sections/SectionOnboard";
import { SectionWorkFlow } from "@/components/Sections/SectionWorkFlow";

export default function Home() {
  return (
    <MainLayout>
      <SectionHero />
      <SectionFeatures />
      <SectionWorkFlow />
      <SectionOnboard />
    </MainLayout>
  );
}
