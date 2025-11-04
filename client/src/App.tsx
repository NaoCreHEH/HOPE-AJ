import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import Services from "./pages/Services";
import Projets from "./pages/Projets";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminMessages from "./pages/admin/AdminMessages";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/mission"} component={Mission} />
      <Route path={"/services"} component={Services} />
      <Route path={"/projets"} component={Projets} />
      <Route path={"/a-propos"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/admin/login"} component={AdminLogin} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/services"} component={AdminServices} />
      <Route path={"/admin/projets"} component={AdminProjects} />
      <Route path={"/admin/equipe"} component={AdminTeam} />
      <Route path={"/admin/messages"} component={AdminMessages} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
