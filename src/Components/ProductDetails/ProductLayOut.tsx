import { Outlet, useParams } from "react-router-dom";

export default function ProductDetailsLayout() {
  const { slug } = useParams();

  return (
    <div className="px-[10%] mt-24">
      <Outlet context={{ slug }} />
    </div>
  );
}
