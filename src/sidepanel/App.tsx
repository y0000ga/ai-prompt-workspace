import PromptWorkspace from "@/sidepanel/components/PromptWorkspace";
import PromptProvider from "@/sidepanel/context/prompt/provider";
import TagProvider from "@/sidepanel/context/tag/provider";
import PromptFilterProvider from "./context/promptFilter/provider";

const App = () => {
  return (
    <TagProvider>
      <PromptProvider>
        <PromptFilterProvider>
          <PromptWorkspace />
        </PromptFilterProvider>
      </PromptProvider>
    </TagProvider>
  );
};

export default App;
