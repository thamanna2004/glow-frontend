import PageLoader, { PageLoaderContent } from "./PageLoader";
import useUiStore from "../store/uiStore";

/** @deprecated Use PageLoaderContent — kept for existing imports */
export function LoadingView({ message = "Creating your glow..." }) {
  return <PageLoaderContent message={message} />;
}

export default function LoadingScreen() {
  const loadingScreen = useUiStore((state) => state.loadingScreen);

  return (
    <PageLoader
      visible={loadingScreen.visible}
      message={loadingScreen.message || "Creating your glow..."}
    />
  );
}
