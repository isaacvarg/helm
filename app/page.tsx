import Background from "@/components/Background";
import ContentContainer from "@/components/ContentContainer";
import Header from "@/components/Header";
import Tabs from "@/components/TabBar/Tabs";
import EditModeToggle from "@/components/edit/EditModeToggle";
import EditorDrawer from "@/components/edit/EditorDrawer";
import { getDashboard } from "@/lib/getDashboard";

export const dynamic = "force-dynamic";

const Home = async () => {
  const dashboard = await getDashboard();
  if (!dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white/70">
        No dashboard found. Run <code className="mx-2 px-2 py-1 bg-white/10 rounded">pnpm db:seed</code>.
      </div>
    );
  }

  return (
    <Background
      image={dashboard.backgroundImage}
      overlayFrom={dashboard.bgOverlayFrom}
      overlayVia={dashboard.bgOverlayVia}
      overlayTo={dashboard.bgOverlayTo}
      overlayOpacity={dashboard.bgOverlayOpacity}
    >
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 pb-32">
        <Header
          title={dashboard.title}
          subtitle={dashboard.subtitle}
          gradientFrom={dashboard.titleGradientFrom}
          gradientVia={dashboard.titleGradientVia}
          gradientTo={dashboard.titleGradientTo}
        />
        <ContentContainer tabs={dashboard.tabs} />
        <Tabs tabs={dashboard.tabs} />
      </div>
      <EditModeToggle />
      <EditorDrawer dashboard={dashboard} />
    </Background>
  );
};

export default Home;
