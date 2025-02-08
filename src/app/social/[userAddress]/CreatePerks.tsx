import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import TextArea from "@/lib/@core/TextArea";
import { useSocial } from "@/services/providers/SocialProvider";
import { IPerks } from "@/types/Iperks";
import DatePickup from "@/packages/@ui-kit/DatePickup";
import Button from "@/packages/@ui-kit/Button";

interface CreateEditPerksProps {
  hide: () => void;
  perks: IPerks | null;
}

const CreateEditPerks: React.FC<CreateEditPerksProps> = ({ hide, perks }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(
    perks ? dayjs(perks.startTime) : null
  );
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(
    perks ? dayjs(perks.snapshotTime) : null
  );
  const [perksDescription, setPerksDescription] = useState<string>("");
  const [isLoadingCreateEdit, setIsLoadingCreateEdit] = useState(false);
  const { handleCreateNewEvent, handleUpdateEvent } = useSocial();

  const { onShowToast } = useToast();

  const createNewPerks = async () => {
    if (!startDate || !expiryDate) {
      onShowToast("Please select both start date and expiry date");
      return;
    }

    if (expiryDate.toDate().getTime() < startDate.toDate().getTime()) {
      onShowToast("Expiry date must be after start date");
      return;
    }

    if (!perksDescription.trim()) {
      onShowToast("Perks description is required");
      return;
    }

    const perksHtml = `<div>${perksDescription
      .split("\n\n")
      .map((line) => `<p>${line}</p>`)
      .join("<br/>")}</div>`;

    try {
      setIsLoadingCreateEdit(true);
      await handleCreateNewEvent(
        startDate.toDate().getTime(),
        expiryDate.toDate().getTime(),
        perksHtml
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCreateEdit(false);
    }

    hide();
  };

  const handleUpdatePerks = async () => {
    if (!perks) {
      return;
    }

    // check if the snapshot time minus the current time is less than a day
    if (perks.snapshotTime - new Date().getTime() < 24 * 60 * 60 * 1000) {
      onShowToast("Perks out of update time");
    }

    if (!startDate || !expiryDate) {
      onShowToast("Please select both start date and expiry date");
      return;
    }

    if (expiryDate.toDate().getTime() < startDate.toDate().getTime()) {
      onShowToast("Expiry date must be after start date");
      return;
    }

    if (!perksDescription.trim()) {
      onShowToast("Perks description is required");
      return;
    }

    const perksHtml = `<div>${perksDescription
      .split("\n\n")
      .map((line) => `<p>${line}</p>`)
      .join("<br/>")}</div>`;

    try {
      setIsLoadingCreateEdit(true);
      await handleUpdateEvent(
        perks._id,
        startDate.toDate().getTime(),
        expiryDate.toDate().getTime(),
        perksHtml
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCreateEdit(false);
    }

    hide();
  };

  useEffect(() => {
    if (perks) {
      setPerksDescription(
        perks.perks
          .replace(/^<div>/, "")
          .replace(/<\/div>$/, "")
          .split("<br/>")
          .map((paragraph) =>
            paragraph.replace(/^<p>/, "").replace(/<\/p>$/, "")
          )
          .join("\n\n")
      );
    }
  }, [perks]);

  return (
    <div className="p-4 border border-border rounded-md flex flex-col gap-4 w-[600px] max-w-full">
      <p className="text-2xl text-primary uppercase text-center font-bold">
        {perks ? "Edit Perks" : "Create Perks"}
      </p>
      <p className="text-grays text-center">
        {perks
          ? "Creators can only edit before the time ends 24 hours!"
          : "Create customized rewards for your fan with snapshot set-up"}
      </p>
      <div className="flex flex-col gap-2">
        <p>
          Time to snapshot <span className="text-cancel">*</span>
        </p>
        <div className="flex gap-4 justify-between max-md:flex-col">
          <div className="flex gap-2 flex-1 items-center">
            <p className="text-grays">Start</p>
            <DatePickup
              minDate={dayjs()}
              timeEnd={startDate}
              handleDateChange={(
                date: Dayjs | null,
                dateString: string | string[]
              ) => {
                setStartDate(date);
              }}
              showTime={false}
              className="w-full"
            />
          </div>
          <div className="flex gap-2 flex-1 items-center">
            <p className="text-grays">End</p>
            <DatePickup
              minDate={startDate}
              timeEnd={expiryDate}
              handleDateChange={(
                date: Dayjs | null,
                dateString: string | string[]
              ) => {
                setExpiryDate(date);
              }}
              showTime={false}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>
          Perks <span className="text-cancel">*</span>
        </p>
        <TextArea
          className="w-full p-2 border border-border rounded-md bg-transparent"
          placeholder="Input perks description"
          rows={8}
          value={perksDescription}
          onChange={(e) => setPerksDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-between gap-4">
        <Button
          onClick={hide}
          title="Cancel"
          className="flex-1"
          variant="outline"
        />
        {perks ? (
          <Button
            loading={isLoadingCreateEdit}
            onClick={handleUpdatePerks}
            title="Update"
            className="flex-1"
          />
        ) : (
          <Button
            loading={isLoadingCreateEdit}
            onClick={createNewPerks}
            title="Create"
            className="flex-1"
          />
        )}
      </div>
    </div>
  );
};

export default CreateEditPerks;
