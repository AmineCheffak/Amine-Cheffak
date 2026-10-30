"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(
  () => import("@/components/Lanyard"),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" aria-hidden="true" />,
  }
);

export default function LanyardView() {
  return (
    <div
      className="relative h-[340px] w-full sm:h-[420px] md:h-[min(74vh,640px)] md:min-h-[500px]"
      role="group"
      aria-label="Carte professionnelle 3D interactive"
    >
      <Lanyard
        frontImage="https://media.licdn.com/dms/image/v2/D4D03AQHBVQE4Mrg5nw/profile-displayphoto-crop_800_800/B4DZmSdicDGgAI-/0/1759098842353?e=1795046400&v=beta&t=UXFRudA5pNVt8IDxanUTZ42hmcanvPByZmfVRUTUxA4"
        backImage="/lanyard/card-back.svg"
        cardColor="#000"
        strapColor="#000"
        metal="graphite"
        finish="glossy"
        size={0.68}
        strapLength={0.47}
        breeze={0.12}
        className="h-full w-full"
      />
    </div>
  );
}