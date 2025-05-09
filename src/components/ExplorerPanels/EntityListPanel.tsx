import React from "react";
import { Sheet } from "lucide-react";

import type { IChainEntity } from "@/types";

interface IEntityListPanelProps {
  entities: IChainEntity[];
  onSelect: (entityId: string) => void;
}

export const EntityListPanel: React.FC<IEntityListPanelProps> = ({
  entities,
  onSelect,
}) => {
  return (
    <div className="flex flex-col p-4 border  gap-2  w-full">
      {entities.map(entity => (
        <button
          type="button"
          key={entity.name}
          onClick={() => onSelect(entity.name)}
          className="cursor-pointer py-2 px-2 rounded-md hover:bg-primary/10 text-sm text-left flex items-center space-x-2 lowercase font-medium"
        >
          <Sheet size={15} />
          <span> {entity.name}</span>
        </button>
      ))}
    </div>
  );
};
