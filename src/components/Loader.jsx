import { PageLoaderContent } from "./PageLoader";

export default function Loader({ label = "Loading your skincare experience..." }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center py-16">
      <PageLoaderContent message={label} />
    </div>
  );
}

export { PageLoaderContent };
