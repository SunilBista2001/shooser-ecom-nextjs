import { Tab } from "@headlessui/react";
import Image from "next/image";

const images = [
  {
    id: 1,
    img: "/hero.jpg",
    url: "/hero.jpg",
    name: "hero",
  },
];

const Gallery = ({ img }: { img: string }) => {
  return (
    <div>
      <Tab.Group as="div" className="flex flex-col-reverse">
        <div className="mt-6 w-full"></div>
        <Tab.Panels className="aspect-square w-full">
          <Tab.Panel>
            <div className="aspect-square relative h-full w-full rounded-lg overflow-hidden">
              <Image
                priority
                fill
                src={images[0].img}
                alt="Image"
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Gallery;
