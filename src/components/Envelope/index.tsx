import EnvelopeBase from "./EnvelopeBase";
import christmasTreeSvg from "../../assets/christmas_tree.svg?react";
import heartSvg from "../../assets/heart.svg?react";

export default function Envelope({ theme }: { theme: string }) {
  switch (theme) {
    case "christmas":
      return <EnvelopeBase theme={theme} EnvelopeSealIcon={christmasTreeSvg} />;
    case "love":
      return <EnvelopeBase theme={theme} EnvelopeSealIcon={heartSvg} />;
    // case "birthday":
    //   return <BirthdayEnvelope {...props} />;
    // case "newyear":
    //   return <NewYearEnvelope {...props} />;
    default:
      return <EnvelopeBase theme={theme} />;
  }
}
