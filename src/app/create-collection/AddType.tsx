import TextArea from "@/lib/@core/TextArea";
import Button from "@/packages/@ui-kit/Button";
import Input from "@/packages/@ui-kit/Input";
import { useState } from "react";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { SPLIT_SYMBOL } from "@/constants/symbol";
import { useCreateCollection } from "@/services/providers/CreateCollectionProvider";

interface AddTypeProps {
  hide: () => void;
}

const AddType: React.FC<AddTypeProps> = ({ hide }) => {
  const { allState, setAllState } = useCreateCollection();
  const { onShowToast } = useToast();
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");

  const addNewType = () => {
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
        ...allState.traitManager,
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
        Add new Type
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
        <Button onClick={addNewType} title="ADD" className="w-full" />
      </div>
    </div>
  );
};

export default AddType;
