import type { GraphicItem } from "../types";
import { returnImage } from "../utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const ModelGraphics = ({
  model_graphics,
}: {
  model_graphics: GraphicItem[];
}) => {
  return (
    <div className="">
      <h2 className="text-2xl">Model Graphics</h2>
      <div className="w-5/6 mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {model_graphics.map((graphic) => (
            <AccordionItem key={graphic.label} value={graphic.label}>
              <AccordionTrigger>{graphic.label}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <img
                  src={returnImage(graphic.path)}
                  className="w-full rounded"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ModelGraphics;
