import Button from "@/packages/@ui-kit/Button";
import DatePickup from "@/packages/@ui-kit/DatePickup";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { useCreateDrop } from "@/services/providers/CreateDropProvider";
import { toast } from "react-toastify";

const CreateGroup = ({ hide }: { hide: () => void }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(null);

  const { setAllState } = useCreateDrop();

  const createNewGroup = async () => {
    if (!startDate || !expiryDate) {
      toast("Please select both start date and expiry date");
      return;
    }

    if (expiryDate.toDate().getTime() < startDate.toDate().getTime()) {
      toast("Expiry date must be after start date");
      return;
    }

    setAllState((prev) => ({
      ...prev,
      individualDropsStartDate: startDate,
      individualDropsExpiryDate: expiryDate,
    }));

    hide();
  };

  return (
    <div className="p-4 border border-border rounded-md flex flex-col gap-4 w-[600px] max-w-full">
      <p className="text-2xl text-primary uppercase text-center font-bold">
        Create Group for multiple drops
      </p>
      <p className="text-grays text-center">
        Set of Drops will be distributed at the same time
      </p>
      <div className="flex flex-col gap-2">
        <p>
          Start Date <span className="text-cancel">*</span>
        </p>
        <DatePickup
          minDate={dayjs()}
          timeEnd={startDate}
          handleDateChange={(
            date: Dayjs | null,
            dateString: string | string[]
          ) => {
            setStartDate(date);
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p>
          Expiry Date <span className="text-cancel">*</span>
        </p>
        <DatePickup
          minDate={startDate}
          timeEnd={expiryDate}
          handleDateChange={(
            date: Dayjs | null,
            dateString: string | string[]
          ) => {
            setExpiryDate(date);
          }}
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={createNewGroup} title="ADD" className="w-full" />
      </div>
    </div>
  );
};

export default CreateGroup;
