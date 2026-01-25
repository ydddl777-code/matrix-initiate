import { useState } from "react";
import { BattlefieldLanding } from "@/components/BattlefieldLanding";
import { SanctuaryInterior } from "@/components/SanctuaryInterior";

type ZoneState = "battlefield" | "sanctuary";

const Index = () => {
  const [zone, setZone] = useState<ZoneState>("battlefield");

  const handleEnterSanctuary = () => {
    setZone("sanctuary");
  };

  const handleExitToGate = () => {
    setZone("battlefield");
  };

  return (
    <>
      {zone === "battlefield" ? (
        <BattlefieldLanding onEnterSanctuary={handleEnterSanctuary} />
      ) : (
        <SanctuaryInterior onExit={handleExitToGate} />
      )}
    </>
  );
};

export default Index;
