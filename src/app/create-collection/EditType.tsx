import TextArea from "@/lib/@core/TextArea";
import Button from "@/packages/@ui-kit/Button";
import Input from "@/packages/@ui-kit/Input";
import { useState } from "react";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { SPLIT_SYMBOL } from "@/constants/symbol";
import {
  TraitManager,
  useCreateCollection,
} from "@/services/providers/CreateCollectionProvider";

interface EditTypeProps {
  hide: () => void;
  trait: TraitManager | undefined;
}

const EditType: React.FC<EditTypeProps> = ({ hide, trait }) => {
  if (!trait) return;

  const { allState, setAllState } = useCreateCollection();
  const { onShowToast } = useToast();
  const [type, setType] = useState(trait.type);
  const [subType, setSubType] = useState(trait.subType.join(SPLIT_SYMBOL));

  const editType = () => {
    const typeFormatted = type.trim();
    let subTypeFormatted: string[] = subType.trim().split(SPLIT_SYMBOL);

    subTypeFormatted = subTypeFormatted.filter((subType) => subType != "");

    if (!typeFormatted) {
      onShowToast("Please fill the type");
      return;
    }
    if (subTypeFormatted.length == 0) {
      onShowToast("Please fill the sub type");
      return;
    }

    setAllState((prevState) => ({
      ...prevState,
      traitManager: [
        ...allState.traitManager.filter((traitItem) => {
          return traitItem.type != trait.type;
        }),
        {
          type: typeFormatted,
          subType: subTypeFormatted,
        },
      ],
    }));

    hide();
  };

  return (
    <div className="p-4 border border-border rounded-md flex flex-col gap-4 w-[400px] max-w-full">
      <p className="text-2xl text-primary uppercase text-center font-bold">
        Edit type
      </p>
      <Input
        value={type}
        onChange={(e: any) => setType(e.target.value)}
        placeholder="Type - Ex: Eyes"
      />
      <TextArea
        value={subType}
        onChange={(e: any) => setSubType(e.target.value)}
        placeholder={`Sub type - Ex: Sad${SPLIT_SYMBOL}Happy${SPLIT_SYMBOL}Cry${SPLIT_SYMBOL}Blink Blink${SPLIT_SYMBOL}Angry`}
      />
      <div className="flex justify-end">
        <Button onClick={editType} title="Save" className="w-full" />
      </div>
    </div>
  );
};

export default EditType;
